"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Upload,
  FileText,
  Loader2,
  CheckCircle,
  X
} from "lucide-react";
import PageTransition from "../../components/PageTransition";
import ScrollToTop from "../../components/ScrollToTop";
import { storage } from "../../lib/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function ApplyPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [generatedAppId, setGeneratedAppId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  // Form Fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [position] = useState("Business Executive");
  const [experience, setExperience] = useState("");
  const [qualification, setQualification] = useState("");
  const [currentCompanyCollege, setCurrentCompanyCollege] = useState("");
  const [noticePeriod, setNoticePeriod] = useState("");
  const [expectedSalary, setExpectedSalary] = useState("");
  
  // Skills tags state
  const [skillsList, setSkillsList] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");

  const [coverLetter, setCoverLetter] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [portfolio, setPortfolio] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    validateAndSetFile(selectedFile);
  };

  const validateAndSetFile = (selectedFile: File) => {
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("File size exceeds 5MB limit.");
      return;
    }

    const allowedExtensions = ["pdf", "doc", "docx"];
    const ext = selectedFile.name.split(".").pop()?.toLowerCase();
    if (!ext || !allowedExtensions.includes(ext)) {
      setError("Invalid file format. Please upload PDF, DOC, or DOCX only.");
      return;
    }

    setFile(selectedFile);
  };

  // Drag and drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  // Skills tags handlers
  const handleAddSkill = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanSkill = skillInput.trim().replace(/,$/, "");
    if (cleanSkill && !skillsList.includes(cleanSkill)) {
      setSkillsList([...skillsList, cleanSkill]);
    }
    setSkillInput("");
  };

  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleRemoveSkill = (idx: number) => {
    setSkillsList(skillsList.filter((_, i) => i !== idx));
  };

  const removeFile = () => {
    setFile(null);
    setUploadProgress(0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!file) {
      setError("Please upload your resume.");
      return;
    }

    if (skillsList.length === 0 && !skillInput.trim()) {
      setError("Please add at least one key skill.");
      return;
    }

    const finalSkills = skillsList.length > 0 
      ? skillsList.join(", ") 
      : skillInput.trim();

    try {
      setIsUploading(true);

      const cleanFileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, "_")}`;
      const storageRef = ref(storage, `career-resumes/${cleanFileName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(Math.round(progress));
        },
        (uploadError) => {
          console.error("Storage upload error:", uploadError);
          setError("Failed to upload resume. Please try again.");
          setIsUploading(false);
        },
        async () => {
          const resumeURL = await getDownloadURL(uploadTask.snapshot.ref);
          setIsUploading(false);
          setIsSubmitting(true);

          const payload = {
            fullName,
            email,
            phone,
            city,
            state,
            position,
            experience,
            qualification,
            currentCompanyCollege,
            noticePeriod,
            expectedSalary,
            skills: finalSkills,
            coverLetter,
            linkedin,
            portfolio,
            resumeURL,
            resumeFileName: file.name,
          };

          const res = await fetch("/api/careers", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

          const responseData = await res.json();
          setIsSubmitting(false);

          if (res.ok && responseData.success) {
            setGeneratedAppId(responseData.appId);
            setIsSuccess(true);
          } else {
            setError(responseData.error || "Submission failed. Please try again.");
          }
        }
      );

    } catch (err: unknown) {
      console.error("Submission crash:", err);
      setError("An unexpected error occurred. Please try again.");
      setIsUploading(false);
      setIsSubmitting(false);
    }
  };

  return (
    <PageTransition>
      <main className="min-h-screen bg-bg-base text-text-primary py-24 md:py-32 relative overflow-hidden">
        {/* Glow Element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-250 h-175 bg-linear-to-b from-brand-accent/5 via-brand-accent/2 to-transparent blur-35 pointer-events-none" />
        <div className="absolute inset-0 bg-tech-grid opacity-25 pointer-events-none" />

        <div className="max-w-2xl mx-auto px-6 relative z-10">
          
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white border border-border-subtle rounded-[2.5rem] p-12 text-center shadow-xl flex flex-col items-center justify-center"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-6 border border-emerald-500/15">
                <CheckCircle size={32} />
              </div>
              <h2 className="text-3xl font-black text-text-primary mb-2">
                🎉 Application Submitted Successfully
              </h2>
              <div className="bg-brand-accent/5 border border-brand-accent/15 px-6 py-3 rounded-2xl mb-6 inline-flex flex-col items-center">
                <span className="text-[10px] font-mono text-text-muted/60 uppercase tracking-widest">Application ID</span>
                <span className="text-xl font-mono font-black text-brand-accent">{generatedAppId}</span>
              </div>
              <p className="text-text-muted text-base max-w-md mx-auto mb-10 leading-relaxed font-normal">
                We&apos;ve received your application and resume. <br />
                A confirmation email has been sent to your inbox. <br />
                Our recruitment team will contact you if you&apos;re shortlisted.
              </p>
              <Link
                href="/careers"
                className="group glass-btn-primary px-8 py-3.5 text-sm font-bold shadow-sm h-auto justify-center"
              >
                Back to Careers
              </Link>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-border-subtle rounded-[2.5rem] p-8 md:p-12 shadow-xl"
            >
              {/* Header */}
              <div className="mb-10">
                <div className="system-tag bg-brand-accent/5 border-brand-accent/10 text-brand-accent w-fit mb-4">
                  APPLICATION PROTOCOL
                </div>
                <h1 className="text-3xl font-black text-text-primary leading-tight tracking-tight">
                  Apply for Business Executive
                </h1>
                <p className="text-text-muted text-sm font-normal mt-1">
                  Please complete the form below. Fields marked with * are required.
                </p>
              </div>

              {error && (
                <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl text-xs font-bold text-red-600">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 1. Personal Info */}
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-text-muted/65 mb-4">1 // Personal Info</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label className="text-[11px] font-bold text-text-muted mb-1.5 uppercase tracking-wider">Full Name *</label>
                      <input
                        type="text"
                        required
                        className="border border-border-subtle bg-bg-light focus:bg-white focus:border-brand-accent rounded-xl px-4 py-3 text-sm outline-none transition-all font-semibold text-text-primary"
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-[11px] font-bold text-text-muted mb-1.5 uppercase tracking-wider">Email Address *</label>
                      <input
                        type="email"
                        required
                        className="border border-border-subtle bg-bg-light focus:bg-white focus:border-brand-accent rounded-xl px-4 py-3 text-sm outline-none transition-all font-semibold text-text-primary"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-[11px] font-bold text-text-muted mb-1.5 uppercase tracking-wider">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        className="border border-border-subtle bg-bg-light focus:bg-white focus:border-brand-accent rounded-xl px-4 py-3 text-sm outline-none transition-all font-semibold text-text-primary"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <label className="text-[11px] font-bold text-text-muted mb-1.5 uppercase tracking-wider">City *</label>
                        <input
                          type="text"
                          required
                          className="border border-border-subtle bg-bg-light focus:bg-white focus:border-brand-accent rounded-xl px-3 py-3 text-sm outline-none transition-all font-semibold text-text-primary"
                          value={city}
                          onChange={e => setCity(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-[11px] font-bold text-text-muted mb-1.5 uppercase tracking-wider">State *</label>
                        <input
                          type="text"
                          required
                          className="border border-border-subtle bg-bg-light focus:bg-white focus:border-brand-accent rounded-xl px-3 py-3 text-sm outline-none transition-all font-semibold text-text-primary"
                          value={state}
                          onChange={e => setState(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Job Profile */}
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-text-muted/65 mb-4">2 // Job Profile & Core Details</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label className="text-[11px] font-bold text-text-muted mb-1.5 uppercase tracking-wider">Target Position</label>
                      <input
                        type="text"
                        disabled
                        className="border border-border-subtle bg-black/2 text-text-muted rounded-xl px-4 py-3 text-sm outline-none font-bold"
                        value={position}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-[11px] font-bold text-text-muted mb-1.5 uppercase tracking-wider">Experience Level *</label>
                      <select
                        required
                        className="border border-border-subtle bg-bg-light focus:bg-white focus:border-brand-accent rounded-xl px-4 py-3 text-sm outline-none transition-all font-semibold cursor-pointer text-text-primary"
                        value={experience}
                        onChange={e => setExperience(e.target.value)}
                      >
                        <option value="">Select Experience</option>
                        <option value="Fresher">Fresher (0 Years)</option>
                        <option value="1 Year">1 Year</option>
                        <option value="2 Years">2 Years</option>
                        <option value="3+ Years">3+ Years</option>
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <label className="text-[11px] font-bold text-text-muted mb-1.5 uppercase tracking-wider">Highest Qualification *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. B.E Computer Science, MBA"
                        className="border border-border-subtle bg-bg-light focus:bg-white focus:border-brand-accent rounded-xl px-4 py-3 text-sm outline-none transition-all font-semibold text-text-primary"
                        value={qualification}
                        onChange={e => setQualification(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-[11px] font-bold text-text-muted mb-1.5 uppercase tracking-wider">Current College / Company</label>
                      <input
                        type="text"
                        className="border border-border-subtle bg-bg-light focus:bg-white focus:border-brand-accent rounded-xl px-4 py-3 text-sm outline-none transition-all font-semibold text-text-primary"
                        value={currentCompanyCollege}
                        onChange={e => setCurrentCompanyCollege(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-[11px] font-bold text-text-muted mb-1.5 uppercase tracking-wider">Notice Period (Optional)</label>
                      <input
                        type="text"
                        placeholder="e.g. Immediate, 30 days"
                        className="border border-border-subtle bg-bg-light focus:bg-white focus:border-brand-accent rounded-xl px-4 py-3 text-sm outline-none transition-all font-semibold text-text-primary"
                        value={noticePeriod}
                        onChange={e => setNoticePeriod(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-[11px] font-bold text-text-muted mb-1.5 uppercase tracking-wider">Expected Salary (Optional)</label>
                      <input
                        type="text"
                        placeholder="e.g. 4.5 LPA"
                        className="border border-border-subtle bg-bg-light focus:bg-white focus:border-brand-accent rounded-xl px-4 py-3 text-sm outline-none transition-all font-semibold text-text-primary"
                        value={expectedSalary}
                        onChange={e => setExpectedSalary(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Skills Tags Input */}
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-text-muted/65 mb-2">3 // Core Capabilities *</p>
                  <label className="text-[11px] font-bold text-text-muted mb-1.5 block uppercase tracking-wider">Key Skills (Press Enter or Comma to add)</label>
                  
                  <div className="border border-border-subtle bg-bg-light focus-within:bg-white focus-within:border-brand-accent rounded-2xl p-3 flex flex-wrap gap-2 transition-all">
                    {skillsList.map((skill, index) => (
                      <span key={index} className="inline-flex items-center gap-1 bg-brand-accent/5 border border-brand-accent/15 text-brand-accent px-2.5 py-1 rounded-lg text-xs font-bold font-mono">
                        {skill}
                        <button type="button" onClick={() => handleRemoveSkill(index)} className="text-brand-accent/65 hover:text-brand-accent">
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      placeholder={skillsList.length === 0 ? "e.g., Sales, CRM, Communication" : ""}
                      className="bg-transparent border-none outline-none text-sm flex-1 min-w-40 py-1 font-semibold text-text-primary placeholder:font-normal"
                      value={skillInput}
                      onChange={e => setSkillInput(e.target.value)}
                      onKeyDown={handleSkillKeyDown}
                      onBlur={handleAddSkill}
                    />
                  </div>
                </div>

                {/* 4. Portals */}
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-text-muted/65 mb-4">4 // Optional Portals</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label className="text-[11px] font-bold text-text-muted mb-1.5 uppercase tracking-wider">LinkedIn URL</label>
                      <input
                        type="url"
                        placeholder="https://linkedin.com/in/..."
                        className="border border-border-subtle bg-bg-light focus:bg-white focus:border-brand-accent rounded-xl px-4 py-3 text-sm outline-none transition-all font-semibold text-text-primary"
                        value={linkedin}
                        onChange={e => setLinkedin(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-[11px] font-bold text-text-muted mb-1.5 uppercase tracking-wider">Portfolio Website</label>
                      <input
                        type="url"
                        placeholder="https://..."
                        className="border border-border-subtle bg-bg-light focus:bg-white focus:border-brand-accent rounded-xl px-4 py-3 text-sm outline-none transition-all font-semibold text-text-primary"
                        value={portfolio}
                        onChange={e => setPortfolio(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Cover Letter */}
                <div className="flex flex-col">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Cover Letter *</label>
                    <span className="text-[10px] font-mono text-text-muted/60">{coverLetter.length} / 1000</span>
                  </div>
                  <textarea
                    required
                    rows={4}
                    maxLength={1000}
                    placeholder="Tell us why you're a great fit for VEXA TECH..."
                    className="border border-border-subtle bg-bg-light focus:bg-white focus:border-brand-accent rounded-2xl px-4 py-3.5 text-sm outline-none transition-all font-semibold resize-none text-text-primary"
                    value={coverLetter}
                    onChange={e => setCoverLetter(e.target.value)}
                  />
                </div>

                {/* Resume Upload Drag & Drop */}
                <div className="flex flex-col">
                  <label className="text-[11px] font-bold text-text-muted mb-2 uppercase tracking-wider">Resume Attachment (PDF, DOC, DOCX - Max 5MB) *</label>
                  
                  {file ? (
                    <div className="border border-purple-100 bg-purple-50/20 rounded-2xl p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600 shrink-0">
                          <FileText size={18} />
                        </div>
                        <div className="text-left">
                          <p className="text-xs font-bold text-text-primary max-w-xs md:max-w-sm truncate">{file.name}</p>
                          <p className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-wider">
                            {(file.size / (1024 * 1024)).toFixed(2)} MB • Attachment Verified
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={removeFile}
                        className="p-2 text-purple-600 hover:bg-purple-100/50 rounded-full transition-colors"
                        title="Remove resume"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                      className={`relative border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 ${
                        isDragActive 
                          ? "border-brand-accent bg-brand-accent/5 scale-102"
                          : "border-border-subtle bg-bg-light hover:border-brand-accent/40 hover:bg-white"
                      }`}
                    >
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        required
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={handleFileChange}
                      />
                      <div className="w-12 h-12 rounded-2xl bg-black/5 text-text-muted flex items-center justify-center transition-colors mb-3">
                        <Upload size={20} />
                      </div>
                      <p className="text-sm font-bold text-text-primary">Drag & drop your resume file here</p>
                      <p className="text-xs text-text-muted font-normal mt-1">Accepts PDF, DOC, or DOCX up to 5MB</p>
                    </div>
                  )}
                </div>

                {/* Progress bar */}
                {(isUploading || isSubmitting) && (
                  <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold text-text-muted">
                      <span className="flex items-center gap-2">
                        <Loader2 size={14} className="animate-spin text-brand-accent" />
                        {isUploading ? "Uploading Resume to Cloud Storage..." : "Transmitting Application Record..."}
                      </span>
                      {isUploading && <span>{uploadProgress}%</span>}
                    </div>
                    {isUploading && (
                      <div className="w-full h-1.5 bg-black/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-brand-accent rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Submit buttons */}
                <div className="flex items-center justify-end gap-4 pt-4 border-t border-black/5">
                  <Link
                    href="/careers"
                    className="px-6 py-3 rounded-xl border border-gray-200 text-xs font-bold text-text-muted hover:text-text-primary hover:bg-gray-50 transition-colors text-center"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={isUploading || isSubmitting}
                    className="group glass-btn-primary px-8 py-3.5 rounded-xl text-xs font-bold shadow-sm h-auto justify-center whitespace-nowrap inline-flex items-center gap-1.5"
                  >
                    {isUploading || isSubmitting ? "Processing..." : "Submit Application"}
                    {!isUploading && !isSubmitting && (
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

        </div>
        <ScrollToTop />
      </main>
    </PageTransition>
  );
}
