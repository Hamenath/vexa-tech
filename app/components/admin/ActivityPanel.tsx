"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  UserPlus, 
  Clock,
  History,
  ArrowRight
} from "lucide-react";
import { Lead } from "@/app/types/lead";
import { cn, formatDate } from "@/app/lib/utils";

interface ActivityPanelProps {
  leads: Lead[];
}

export default function ActivityPanel({ leads }: ActivityPanelProps) {
  const [now] = useState(() => Date.now());

  const activities = leads.slice(0, 5).map(lead => {
    const isNew = now - (lead.createdAt || 0) < 86400000;
    return {
      type: "lead",
      message: isNew ? `New inquiry from ${lead.fullName}` : `Lead updated: ${lead.fullName}`,
      time: formatDate(lead.updatedAt || lead.createdAt, "hh:mm a"),
      icon: isNew ? UserPlus : Clock,
      color: isNew ? "text-[#38bdf8] bg-brand-accent/10 border-brand-accent/30" : "text-amber-400 bg-amber-500/10 border-amber-500/30"
    };
  });

  return (
    <div className="bg-bg-card rounded-4xl border border-gray-100 p-8 flex flex-col h-full overflow-hidden relative group text-gray-900 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-bold tracking-tight text-gray-900">System Events</h3>
          <p className="text-sm font-normal text-gray-500">Track all administrative workflows.</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 border border-gray-100 group-hover:border-brand-accent group-hover:text-brand-accent transition-all duration-300">
          <History size={18} />
        </div>
      </div>

      <div className="space-y-1 relative">
        <div className="space-y-6">
          {activities.length === 0 ? (
            <div className="py-12 text-center opacity-40 italic text-xs font-mono uppercase tracking-widest text-gray-500">
              No recent events.
            </div>
          ) : (
            activities.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 relative group"
              >
                <div className={cn(
                  "relative z-10 shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center border transition-transform duration-300",
                  item.color
                )}>
                  <item.icon size={18} />
                </div>
                <div className="flex-1 space-y-0.5 mt-0.5 border-b border-gray-100 pb-5 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-gray-900">{item.message}</h4>
                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">{item.time}</span>
                  </div>
                  <p className="text-xs font-medium text-gray-500">Inquiry Pipeline</p>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      <div className="mt-auto pt-8 text-center">
        <button className="text-xs font-bold text-gray-500 hover:text-brand-accent uppercase tracking-widest transition-all flex items-center justify-center gap-2 group mx-auto">
          View Complete Log <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
