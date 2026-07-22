"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  Search,
  Mail,
  Phone,
  PackageSearch,
  ChevronLeft,
  ChevronRight,
  Download,
  Briefcase,
  X,
  FileText,
  ExternalLink,
  Trash2,
  Check,
  CheckCircle,
  Ban,
  FileSpreadsheet,
  Copy,
  Clock,
  ArrowRight
} from "lucide-react";
import PageHeader from "@/app/components/admin/PageHeader";

interface CareerApplication {
  id: string;
  appId: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  position: string;
  experience: string;
  qualification: string;
  currentCompanyCollege?: string;
  noticePeriod?: string;
  expectedSalary?: string;
  skills: string;
  coverLetter: string;
  linkedin?: string;
  portfolio?: string;
  resumeURL: string;
  resumeFileName: string;
  status: "New" | "Shortlisted" | "Interview" | "Rejected" | "Hired";
  createdAt: number;
  updatedAt?: number;
}

const statusColors = {
  New: "text-blue-600 bg-blue-50 border-blue-100",
  Shortlisted: "text-purple-600 bg-purple-50 border-purple-100",
  Interview: "text-amber-600 bg-amber-50 border-amber-100",
  Hired: "text-emerald-600 bg-emerald-50 border-emerald-100",
  Rejected: "text-red-600 bg-red-50 border-red-100",
};

export default function AdminCareersPage() {
  const [applications, setApplications] = useState<CareerApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [timeFilter, setTimeFilter] = useState<string>("all"); // "all", "today", "week", "month"
  const [selectedApp, setSelectedApp] = useState<CareerApplication | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const itemsPerPage = 8;

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/careers");
      if (res.ok) {
        const data = await res.json();
        setApplications(data);
      }
    } catch (error) {
      console.error("Failed to load applications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const updateStatus = async (id: string, newStatus: CareerApplication["status"]) => {
    try {
      const res = await fetch("/api/admin/careers", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setApplications(prev =>
          prev.map(app => (app.id === id ? { ...app, status: newStatus, updatedAt: Date.now() } : app))
        );
        if (selectedApp && selectedApp.id === id) {
          setSelectedApp(prev => prev ? { ...prev, status: newStatus, updatedAt: Date.now() } : null);
        }
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const deleteApplication = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this application? This action is irreversible.")) return;
    try {
      const res = await fetch(`/api/admin/careers?id=${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        setApplications(prev => prev.filter(app => app.id !== id));
        if (selectedApp?.id === id) {
          setSelectedApp(null);
        }
      }
    } catch (error) {
      console.error("Failed to delete application:", error);
    }
  };

  // Copy to clipboard helper
  const handleCopyPhone = (phone: string, id: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (filteredApplications.length === 0) return;
    
    const headers = [
      "Application ID", "Full Name", "Email", "Phone", "Location", 
      "Position", "Experience", "Qualification", "Company/College", 
      "Notice Period", "Expected Salary", "Skills", "Status", "Applied Date"
    ];

    const rows = filteredApplications.map(app => [
      app.appId,
      app.fullName,
      app.email,
      app.phone,
      `"${app.city}, ${app.state}"`,
      app.position,
      app.experience,
      app.qualification,
      `"${app.currentCompanyCollege || 'N/A'}"`,
      app.noticePeriod || "N/A",
      app.expectedSalary || "N/A",
      `"${app.skills}"`,
      app.status,
      new Date(app.createdAt).toLocaleDateString()
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `VexaTech_Recruitment_Report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter & Search Logic
  const filteredApplications = useMemo(() => {
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;

    return applications.filter(app => {
      // 1. Search Query (Name, Email, Phone, College)
      const query = search.toLowerCase();
      const matchSearch =
        app.fullName.toLowerCase().includes(query) ||
        app.email.toLowerCase().includes(query) ||
        app.phone.includes(query) ||
        (app.currentCompanyCollege || "").toLowerCase().includes(query);

      // 2. Status Filter
      const matchStatus = statusFilter === "all" || app.status === statusFilter;

      // 3. Time Filter
      let matchTime = true;
      if (timeFilter === "today") {
        matchTime = now - app.createdAt < oneDay;
      } else if (timeFilter === "week") {
        matchTime = now - app.createdAt < oneDay * 7;
      } else if (timeFilter === "month") {
        matchTime = now - app.createdAt < oneDay * 30;
      }

      return matchSearch && matchStatus && matchTime;
    });
  }, [applications, search, statusFilter, timeFilter]);

  // Statistics
  const stats = useMemo(() => {
    const counts = {
      total: applications.length,
      New: 0,
      Shortlisted: 0,
      Interview: 0,
      Rejected: 0,
      Hired: 0
    };
    applications.forEach(app => {
      if (counts[app.status] !== undefined) {
        counts[app.status]++;
      }
    });
    return counts;
  }, [applications]);

  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
  const currentItems = filteredApplications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatDate = (millis: number) => {
    return new Date(millis).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Career Applications"
        description="Review job applications, download resumes, and manage applicant status pipeline."
      />

      {/* --- DASHBOARD STATISTICS BOARDS --- */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: "Applications", val: stats.total, color: "text-gray-900 bg-gray-50 border-gray-100" },
          { label: "New", val: stats.New, color: "text-blue-700 bg-blue-50/50 border-blue-100" },
          { label: "Shortlisted", val: stats.Shortlisted, color: "text-purple-700 bg-purple-50/50 border-purple-100" },
          { label: "Interview", val: stats.Interview, color: "text-amber-700 bg-amber-50/50 border-amber-100" },
          { label: "Hired", val: stats.Hired, color: "text-emerald-700 bg-emerald-50/50 border-emerald-100" },
          { label: "Rejected", val: stats.Rejected, color: "text-red-700 bg-red-50/50 border-red-100" },
        ].map((st, i) => (
          <div key={i} className={`p-5 rounded-2xl border flex flex-col items-center justify-center text-center shadow-xs ${st.color}`}>
            <span className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">{st.label}</span>
            <span className="text-3xl font-black">{st.val}</span>
          </div>
        ))}
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col lg:flex-row items-center gap-4 bg-white p-4 rounded-[28px] border border-gray-100 shadow-sm">
        {/* Search */}
        <div className="flex-1 w-full bg-gray-50 border border-transparent rounded-2xl px-5 py-3.5 flex items-center gap-3 focus-within:bg-white focus-within:border-blue-600/30 transition-all group shadow-inner">
          <Search size={18} className="text-gray-300 group-focus-within:text-blue-600 transition-colors" />
          <input
            placeholder="Search by name, email, phone, or college..."
            className="bg-transparent border-none outline-none text-sm w-full text-gray-900 placeholder-gray-300 font-semibold italic tracking-tight"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {/* Status */}
          <select
            className="bg-white border border-gray-100 rounded-2xl px-5 py-3.5 text-xs font-bold outline-none cursor-pointer hover:bg-gray-50 transition-all text-gray-500 hover:text-gray-900 shadow-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Stages</option>
            <option value="New">New</option>
            <option value="Shortlisted">Shortlisted</option>
            <option value="Interview">Interview</option>
            <option value="Hired">Hired</option>
            <option value="Rejected">Rejected</option>
          </select>

          {/* Time Filter */}
          <select
            className="bg-white border border-gray-100 rounded-2xl px-5 py-3.5 text-xs font-bold outline-none cursor-pointer hover:bg-gray-50 transition-all text-gray-500 hover:text-gray-900 shadow-sm"
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>

          {/* Export Report */}
          <button
            onClick={handleExportCSV}
            disabled={filteredApplications.length === 0}
            className="flex items-center gap-2 bg-emerald-500 text-white hover:bg-emerald-600 disabled:opacity-30 disabled:cursor-not-allowed px-5 py-3.5 rounded-2xl text-xs font-bold transition-all shadow-sm active:scale-95 whitespace-nowrap"
          >
            <FileSpreadsheet size={16} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Main Content Table */}
      {loading ? (
        <div className="flex flex-col items-center justify-center p-24 text-center">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-sm font-semibold text-gray-400">Inventorying submissions...</p>
        </div>
      ) : (
        <div className="bg-white rounded-4xl border border-gray-100 shadow-sm overflow-hidden overflow-x-auto relative">
          <table className="w-full text-left border-collapse min-w-225">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-8 py-6 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Applicant Details</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Position & Qualification</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Status Stage</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Applied On</th>
                <th className="px-8 py-6 text-right text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <AnimatePresence mode="popLayout">
                {currentItems.map((app, i) => (
                  <motion.tr
                    key={app.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ delay: i * 0.05 }}
                    className="group hover:bg-gray-50/50 transition-all cursor-default"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 text-gray-400 font-bold flex items-center justify-center text-lg shadow-sm group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-500 shrink-0">
                          {app.fullName.charAt(0)}
                        </div>
                        <div className="space-y-0.5 min-w-0">
                          <span className="text-[15px] font-bold text-gray-900 leading-none block truncate">{app.fullName}</span>
                          <span className="text-[10px] font-mono font-black text-brand-accent uppercase tracking-widest block">{app.appId}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-gray-900">{app.position}</p>
                        <p className="text-[11px] font-semibold text-gray-400 flex items-center gap-2 truncate">
                          <Briefcase size={12} />
                          {app.qualification} ({app.experience})
                        </p>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${statusColors[app.status]}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-xs font-bold text-gray-900">{formatDate(app.createdAt)}</p>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => setSelectedApp(app)}
                          className="w-9 h-9 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-600 transition-all shadow-sm"
                          title="View Application Details"
                        >
                          <Eye size={16} />
                        </button>
                        <a
                          href={`mailto:${app.email}`}
                          className="w-9 h-9 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-600 transition-all shadow-sm"
                          title="Email Candidate"
                        >
                          <Mail size={16} />
                        </a>
                        <button
                          onClick={() => handleCopyPhone(app.phone, app.id)}
                          className="w-9 h-9 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-600 transition-all shadow-sm relative"
                          title="Copy Phone Number"
                        >
                          {copiedId === app.id ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                        </button>
                        <a
                          href={app.resumeURL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-purple-600 hover:border-purple-600 transition-all shadow-sm"
                          title="Download/Open Resume"
                        >
                          <Download size={16} />
                        </a>
                        <button
                          onClick={() => updateStatus(app.id, "Shortlisted")}
                          disabled={app.status === "Shortlisted"}
                          className="w-9 h-9 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-emerald-600 hover:border-emerald-600 disabled:opacity-30 transition-all shadow-sm"
                          title="Shortlist"
                        >
                          <CheckCircle size={16} className="text-emerald-500" />
                        </button>
                        <button
                          onClick={() => updateStatus(app.id, "Rejected")}
                          disabled={app.status === "Rejected"}
                          className="w-9 h-9 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-600 hover:border-red-600 disabled:opacity-30 transition-all shadow-sm"
                          title="Reject"
                        >
                          <Ban size={16} className="text-red-500" />
                        </button>
                        <button
                          onClick={() => deleteApplication(app.id)}
                          className="w-9 h-9 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-600 hover:border-red-600 transition-all shadow-sm"
                          title="Delete Application"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>

          {filteredApplications.length === 0 && (
            <div className="p-24 flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 rounded-4xl bg-gray-50 flex items-center justify-center border border-gray-100 mb-6 text-gray-200">
                <PackageSearch size={48} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">No applications found</h3>
              <p className="text-xs font-semibold text-gray-400 max-w-xs uppercase tracking-widest">Adjust filters or modify keyword queries.</p>
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      {!loading && filteredApplications.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 px-2">
          <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">
            Inventorying {currentItems.length} of {filteredApplications.length} Entries
          </p>
          <div className="flex items-center gap-3">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              className="w-11 h-11 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="px-6 h-11 flex items-center rounded-2xl bg-white border border-gray-100 text-[10px] font-black uppercase text-gray-400 tracking-widest shadow-inner">
              Index {currentPage} / {totalPages || 1}
            </div>
            <button
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              className="w-11 h-11 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Details Drawer */}
      <AnimatePresence>
        {selectedApp && (
          <div className="fixed inset-0 z-100 flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedApp(null)}
              className="fixed inset-0 bg-black/15 backdrop-blur-md"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative w-full max-w-xl bg-white h-screen shadow-2xl flex flex-col p-8 md:p-10 border-l border-gray-100 z-10 overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-gray-50 mb-8">
                <div>
                  <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${statusColors[selectedApp.status]} mb-2 inline-block`}>
                    {selectedApp.status}
                  </span>
                  <h3 className="text-2xl font-black text-gray-900">{selectedApp.fullName}</h3>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{selectedApp.appId} • {selectedApp.position}</p>
                </div>
                <button
                  onClick={() => setSelectedApp(null)}
                  className="p-2 text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Status Update Actions */}
              <div className="mb-8 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-3">Update Applicant Status</p>
                <div className="flex flex-wrap gap-2">
                  {(["New", "Shortlisted", "Interview", "Hired", "Rejected"] as const).map(s => (
                    <button
                      key={s}
                      onClick={() => updateStatus(selectedApp.id, s)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border active:scale-95 ${
                        selectedApp.status === s
                          ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                          : "bg-white border-gray-100 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Candidate Info Grid */}
              <div className="space-y-6 flex-1">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400">Phone Number</span>
                    <a href={`tel:${selectedApp.phone}`} className="text-sm font-bold text-gray-900 flex items-center gap-1.5 hover:text-blue-600 transition-colors">
                      <Phone size={14} />
                      {selectedApp.phone}
                    </a>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400">Email Address</span>
                    <a href={`mailto:${selectedApp.email}`} className="text-sm font-bold text-gray-900 flex items-center gap-1.5 hover:text-blue-600 transition-colors">
                      <Mail size={14} />
                      {selectedApp.email}
                    </a>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400">Experience</span>
                    <p className="text-sm font-bold text-gray-900">{selectedApp.experience}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400">Highest Qualification</span>
                    <p className="text-sm font-bold text-gray-900">{selectedApp.qualification}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400">Location</span>
                    <p className="text-sm font-bold text-gray-900">{selectedApp.city}, {selectedApp.state}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400">Company / College</span>
                    <p className="text-sm font-bold text-gray-900">{selectedApp.currentCompanyCollege || "N/A"}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400">Notice Period</span>
                    <p className="text-sm font-bold text-gray-900">{selectedApp.noticePeriod || "N/A"}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400">Expected Salary</span>
                    <p className="text-sm font-bold text-gray-900">{selectedApp.expectedSalary || "N/A"}</p>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400">Skills / Assets</span>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {selectedApp.skills.split(",").map((sk, index) => (
                      <span key={index} className="text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-gray-50 border border-gray-100 text-gray-700">
                        {sk.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                {(selectedApp.linkedin || selectedApp.portfolio) && (
                  <div className="flex gap-4">
                    {selectedApp.linkedin && (
                      <a
                        href={selectedApp.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 p-3 bg-gray-50 border border-gray-100 hover:border-blue-600/30 rounded-xl text-center text-xs font-bold text-gray-700 hover:text-blue-600 transition-all flex items-center justify-center gap-2"
                      >
                        LinkedIn
                        <ExternalLink size={12} />
                      </a>
                    )}
                    {selectedApp.portfolio && (
                      <a
                        href={selectedApp.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 p-3 bg-gray-50 border border-gray-100 hover:border-blue-600/30 rounded-xl text-center text-xs font-bold text-gray-700 hover:text-blue-600 transition-all flex items-center justify-center gap-2"
                      >
                        Portfolio
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                )}

                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-2">Cover Letter</span>
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 text-xs font-medium text-gray-700 leading-relaxed white-space: pre-wrap">
                    {selectedApp.coverLetter}
                  </div>
                </div>

                {/* --- PIPELINE ACTION LOG TIMELINE --- */}
                <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-1.5">
                    <Clock size={12} />
                    Application Timeline
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-900">Application Received</p>
                        <p className="text-[10px] text-gray-400 font-semibold">{new Date(selectedApp.createdAt).toLocaleString()}</p>
                      </div>
                    </div>

                    {selectedApp.updatedAt && (
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shrink-0 mt-0.5">
                          <ArrowRight size={12} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-900">Status Updated to: {selectedApp.status}</p>
                          <p className="text-[10px] text-gray-400 font-semibold">{new Date(selectedApp.updatedAt).toLocaleString()}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-50">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-3">Resume Attachment</span>
                  <a
                    href={selectedApp.resumeURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-purple-50/50 border border-purple-100 hover:bg-purple-50 rounded-2xl text-purple-700 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                        <FileText size={18} />
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-bold truncate max-w-xs">{selectedApp.resumeFileName}</p>
                        <p className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-wider">Download / Print PDF</p>
                      </div>
                    </div>
                    <Download size={18} className="group-hover:translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
