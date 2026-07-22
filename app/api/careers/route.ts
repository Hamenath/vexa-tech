import { NextResponse } from "next/server";
import { db } from "../../lib/firebase-admin";
import { sendCareerNotifications } from "../../lib/notifications";
import { checkRateLimit } from "../../lib/rate-limiter";

export async function POST(req: Request) {
  try {
    // 1. Rate Limiting Check
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "127.0.0.1";
    const limitStatus = checkRateLimit(ip);
    if (!limitStatus.allowed) {
      return NextResponse.json({
        error: "Too many submissions. Please wait an hour before submitting again.",
      }, { status: 429 });
    }

    const data = await req.json();

    // Basic validation
    const requiredFields = [
      "fullName",
      "email",
      "phone",
      "city",
      "state",
      "position",
      "experience",
      "qualification",
      "skills",
      "coverLetter",
      "resumeURL",
      "resumeFileName",
    ];

    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json({ error: `Missing field: ${field}` }, { status: 400 });
      }
    }

    // 2. Duplicate Application Check
    const duplicateQuery = await db.collection("careerApplications")
      .where("email", "==", data.email)
      .where("position", "==", data.position)
      .limit(1)
      .get();

    if (!duplicateQuery.empty) {
      return NextResponse.json({
        error: "You have already applied for this position. If you need to update your resume, please contact us at vexatech.connect@gmail.com.",
      }, { status: 400 });
    }

    // 3. Sequential ID Generation via Transaction
    const counterRef = db.collection("counters").doc("careerApplications");
    let nextIdVal = 1;
    const currentYear = new Date().getFullYear();

    await db.runTransaction(async (transaction) => {
      const counterDoc = await transaction.get(counterRef);
      if (counterDoc.exists) {
        const counterData = counterDoc.data();
        if (counterData && typeof counterData.value === "number") {
          nextIdVal = counterData.value + 1;
        }
      }
      transaction.set(counterRef, { value: nextIdVal }, { merge: true });
    });

    const appId = `VTX-${currentYear}-${String(nextIdVal).padStart(4, "0")}`;

    const application = {
      appId,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      city: data.city,
      state: data.state,
      position: data.position,
      experience: data.experience,
      qualification: data.qualification,
      currentCompanyCollege: data.currentCompanyCollege || "",
      noticePeriod: data.noticePeriod || "",
      expectedSalary: data.expectedSalary || "",
      skills: data.skills,
      coverLetter: data.coverLetter,
      linkedin: data.linkedin || "",
      portfolio: data.portfolio || "",
      resumeURL: data.resumeURL,
      resumeFileName: data.resumeFileName,
      status: "New",
      createdAt: Date.now(),
    };

    // Save to Firestore
    await db.collection("careerApplications").doc(appId).set(application);

    // Trigger Notifications (Email to HR & Candidate)
    try {
      await sendCareerNotifications(application);
    } catch (emailError) {
      console.error("Email notification error:", emailError);
    }

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully",
      appId,
    }, { status: 200 });

  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : "Unknown error";
    console.error("Career application API failure:", error);
    return NextResponse.json({ error: "Internal Server Error", details: errMsg }, { status: 500 });
  }
}
