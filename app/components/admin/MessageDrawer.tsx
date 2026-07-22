"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Briefcase, 
  Save,
  Loader2
} from "lucide-react";
import { Lead, LeadStatus } from "@/app/types/lead";
import { useState } from "react";
import { db } from "@/app/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { cn, formatDate, getGmailLink } from "@/app/lib/utils";

interface MessageDrawerProps {
  lead: Lead | null;
  onClose: () => void;
  onUpdateStatus?: (id: string, status: LeadStatus) => void;
}

export default function MessageDrawer({ lead, onClose, onUpdateStatus }: MessageDrawerProps) {
  const [note, setNote] = useState(lead?.notes || "");
  const [saving, setSaving] = useState(false);

  if (!lead) return null;

  const handleSaveNotes = async () => {
    if (!lead.id) return;
    setSaving(true);
    try {
      const docRef = doc(db, "leads", lead.id);
      await updateDoc(docRef, { notes: note, updatedAt: new Date() });
    } catch (e) {
      console.error("Error saving note:", e);
    } finally {
      setSaving(false);
    }
  };

  const handleStatusChange = async (newStatus: LeadStatus) => {
    if (!lead.id) return;
    try {
      const docRef = doc(db, "leads", lead.id);
      await updateDoc(docRef, { status: newStatus, updatedAt: new Date() });
      if (onUpdateStatus) onUpdateStatus(lead.id, newStatus);
    } catch (e) {
      console.error("Error updating status:", e);
    }
  };

  return (
    <AnimatePresence>
      {lead && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-xl bg-white z-50 shadow-2xl flex flex-col justify-between border-l border-gray-100 overflow-y-auto"
          >
            {/* Header */}
            <div className="p-8 border-b border-gray-50 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-10">
              <div>
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                  Lead File #{lead.id?.slice(0, 6)}
                </span>
                <h2 className="text-2xl font-bold text-gray-900 mt-2 tracking-tight">{lead.fullName}</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-3 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-2xl transition-all border border-gray-50"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-8 space-y-10 flex-1">
              
              {/* Quick Actions & Status */}
              <section className="space-y-4">
                <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] px-1">Pipeline Control</h3>
                <div className="grid grid-cols-2 gap-3">
                  {(["new", "contacted", "in_progress", "closed"] as LeadStatus[]).map((st) => (
                    <button
                      key={st}
                      onClick={() => handleStatusChange(st)}
                      className={cn(
                        "py-3 px-4 rounded-2xl text-xs font-bold capitalize transition-all border text-center flex items-center justify-center gap-2",
                        lead.status === st 
                          ? "bg-gray-900 text-white border-gray-900 shadow-md" 
                          : "bg-gray-50/50 border-gray-100 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                      )}
                    >
                      {lead.status === st && <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />}
                      {st.replace("_", " ")}
                    </button>
                  ))}
                </div>
              </section>

              {/* Direct Outreach */}
              <section className="space-y-4">
                  <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] px-1">Communication Channel</h3>
                  <div className="flex gap-4">
                    <a
                      href={getGmailLink(lead.email, `Re: Inquiry for ${lead.serviceRequired}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all"
                    >
                      Email Prospect
                    </a>
                    {lead.phone && (
                      <a
                        href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-4 px-6 bg-emerald-500 text-white rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all"
                      >
                        WhatsApp
                      </a>
                    )}
                  </div>
              </section>

              {/* Message Content */}
              <section className="space-y-4">
                  <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] px-1">Inquiry Payload</h3>
                  <div className="bg-gray-50/50 p-8 rounded-4xl border border-gray-100 relative group">
                     <p className="text-[15px] font-semibold text-gray-800 leading-relaxed italic">
                        &quot;{lead.message}&quot;
                     </p>
                     <div className="mt-8 pt-8 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-gray-400">
                              <Briefcase size={14} />
                           </div>
                           <div>
                              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Service Requested</p>
                              <p className="text-xs font-bold text-gray-900">{lead.serviceRequired}</p>
                           </div>
                        </div>
                        <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest italic">{formatDate(lead.createdAt, "MMM dd, yyyy")}</span>
                     </div>
                  </div>
              </section>

              {/* Internal Notes */}
              <section className="space-y-4">
                  <div className="flex items-center justify-between px-1">
                     <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Internal Annotation</h3>
                     <button 
                        onClick={handleSaveNotes}
                        disabled={saving}
                        className="text-[10px] font-black text-blue-600 hover:text-blue-700 uppercase tracking-widest flex items-center gap-2 transition-all active:scale-95"
                      >
                        {saving ? <Loader2 size={12} className="animate-spin" /> : <Save size={12} />}
                        Sync Note
                      </button>
                  </div>
                  <textarea 
                    className="w-full h-40 bg-gray-50/50 border border-gray-100 rounded-[28px] p-8 text-sm font-semibold italic text-gray-700 placeholder-gray-300 outline-none focus:bg-white focus:border-blue-600/30 transition-all resize-none shadow-inner"
                    placeholder="Record your observations here for future audit..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
              </section>

            </div>

          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function CheckCircle2(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
