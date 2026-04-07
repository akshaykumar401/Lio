import { useState } from "react";
import {
  BackgroundOrbs,
  Navbar,
  Footer
} from "../components/index.ts";

interface LinkItem {
  id: string;
  originalUrl: string;
  shortCode: string;
  clicks: number;
  createdAt: string;
  status: "active" | "expired";
}

const MOCK_LINKS: LinkItem[] = [
  {
    id: "1",
    originalUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=PLrAXtmErZgOeiKm4sgNOknGvNjby9efdf",
    shortCode: "yt-rick",
    clicks: 12847,
    createdAt: "2026-04-01",
    status: "active",
  },
  {
    id: "2",
    originalUrl: "https://github.com/user/awesome-project/blob/main/README.md",
    shortCode: "gh-proj",
    clicks: 3291,
    createdAt: "2026-03-28",
    status: "active",
  },
  {
    id: "3",
    originalUrl: "https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms/edit",
    shortCode: "gdoc-q1",
    clicks: 856,
    createdAt: "2026-03-15",
    status: "active",
  },
  {
    id: "4",
    originalUrl: "https://stackoverflow.com/questions/12345678/how-to-center-a-div",
    shortCode: "so-css",
    clicks: 4123,
    createdAt: "2026-02-20",
    status: "expired",
  },
  {
    id: "5",
    originalUrl: "https://medium.com/@user/building-modern-web-apps-with-react-2026",
    shortCode: "med-rct",
    clicks: 1560,
    createdAt: "2026-03-05",
    status: "active",
  },
];

const Dashboard = () => {
  const [links, setLinks] = useState<LinkItem[]>(MOCK_LINKS);
  const [newUrl, setNewUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "expired">("all");

  const totalClicks = links.reduce((sum, l) => sum + l.clicks, 0);
  const activeLinks = links.filter((l) => l.status === "active").length;

  const filteredLinks = links.filter((l) => {
    const matchesSearch =
      l.originalUrl.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.shortCode.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || l.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl.trim()) return;
    setIsCreating(true);
    await new Promise((r) => setTimeout(r, 800));
    const newLink: LinkItem = {
      id: Date.now().toString(),
      originalUrl: newUrl,
      shortCode: customAlias || Math.random().toString(36).substring(2, 8),
      clicks: 0,
      createdAt: new Date().toISOString().split("T")[0],
      status: "active",
    };
    setLinks([newLink, ...links]);
    setNewUrl("");
    setCustomAlias("");
    setIsCreating(false);
    setShowCreateModal(false);
  };

  const handleCopy = (shortCode: string, id: string) => {
    navigator.clipboard.writeText(`https://lio.to/${shortCode}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (id: string) => {
    setLinks(links.filter((l) => l.id !== id));
  };

  const truncateUrl = (url: string, max = 45) =>
    url.length > max ? url.substring(0, max) + "..." : url;

  return (
    <div className="relative min-h-screen">
      <BackgroundOrbs />
      <Navbar />
      
      <main className="relative pt-24 pb-16 px-4 max-w-7xl mx-auto" id="dashboard-main">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-dark-300 text-sm mt-1">Manage and track your shortened links</p>
          </div>
          <button
            id="create-link-btn"
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-2.5 text-sm font-semibold text-white rounded-xl btn-glow inline-flex items-center gap-2 self-start sm:self-auto"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            New Link
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8" id="dashboard-stats">
          {[
            {
              label: "Total Links",
              value: links.length.toString(),
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
              ),
              color: "from-accent-500/20 to-accent-500/5",
              iconBg: "bg-accent-500/20",
              iconColor: "text-accent-400",
            },
            {
              label: "Total Clicks",
              value: totalClicks.toLocaleString(),
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
                </svg>
              ),
              color: "from-neon-blue/20 to-neon-blue/5",
              iconBg: "bg-neon-blue/20",
              iconColor: "text-neon-blue",
            },
            {
              label: "Active Links",
              value: activeLinks.toString(),
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <path d="M22 4L12 14.01l-3-3" />
                </svg>
              ),
              color: "from-green-500/20 to-green-500/5",
              iconBg: "bg-green-500/20",
              iconColor: "text-green-400",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="glass-card stat-card p-5 sm:p-6 glass-card-hover"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-dark-300 uppercase tracking-wider mb-1">
                    {stat.label}
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</p>
                </div>
                <div className={`w-10 h-10 rounded-xl ${stat.iconBg} flex items-center justify-center ${stat.iconColor}`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search & Filters */}
        <div className="glass-card p-4 mb-6" id="dashboard-filters">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark-400">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <input
                type="text"
                id="search-links"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search links..."
                className="w-full pl-10 pr-4 py-2.5 bg-transparent text-white placeholder:text-dark-400 rounded-lg input-glow text-sm border-0"
              />
            </div>
            <div className="flex gap-2">
              {(["all", "active", "expired"] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2.5 text-xs font-medium rounded-lg transition-all duration-200 capitalize ${filterStatus === status
                      ? "bg-accent-500/20 text-accent-300 border border-accent-500/30"
                      : "text-dark-300 hover:text-white hover:bg-white/5 border border-transparent"
                    }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Links Table */}
        <div className="glass-card overflow-hidden" id="links-table">
          {/* Table Header */}
          <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-3.5 border-b border-glass-border text-xs font-medium text-dark-300 uppercase tracking-wider">
            <div className="col-span-5">Original URL</div>
            <div className="col-span-2">Short Link</div>
            <div className="col-span-2 text-center">Clicks</div>
            <div className="col-span-1 text-center">Status</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          {/* Table Body */}
          {filteredLinks.length === 0 ? (
            <div className="py-16 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-dark-700 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-dark-400" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
              </div>
              <p className="text-dark-300 text-sm">No links found</p>
              <p className="text-dark-400 text-xs mt-1">Create your first short link to get started</p>
            </div>
          ) : (
            filteredLinks.map((link) => (
              <div
                key={link.id}
                className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-center px-4 sm:px-6 py-4 border-b border-glass-border last:border-b-0 table-row-hover"
              >
                {/* Original URL */}
                <div className="sm:col-span-5 min-w-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-dark-700 flex items-center justify-center shrink-0">
                      <img
                        src={`https://www.google.com/s2/favicons?domain=${new URL(link.originalUrl).hostname}&sz=32`}
                        alt=""
                        className="w-4 h-4 rounded-sm"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                    <a
                      href={link.originalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-dark-200 hover:text-white truncate transition-colors"
                      title={link.originalUrl}
                    >
                      {truncateUrl(link.originalUrl)}
                    </a>
                  </div>
                </div>

                {/* Short Link */}
                <div className="sm:col-span-2">
                  <span className="text-sm font-medium text-accent-300">
                    lio.to/{link.shortCode}
                  </span>
                </div>

                {/* Clicks */}
                <div className="sm:col-span-2 text-center">
                  <span className="text-sm font-semibold text-white">
                    {link.clicks.toLocaleString()}
                  </span>
                </div>

                {/* Status */}
                <div className="sm:col-span-1 text-center">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${link.status === "active"
                        ? "bg-green-500/15 text-green-400"
                        : "bg-red-500/15 text-red-400"
                      }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${link.status === "active" ? "bg-green-400" : "bg-red-400"
                        }`}
                    />
                    {link.status}
                  </span>
                </div>

                {/* Actions */}
                <div className="sm:col-span-2 flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleCopy(link.shortCode, link.id)}
                    className="p-2 rounded-lg text-dark-300 hover:text-white hover:bg-white/5 transition-all"
                    title="Copy short link"
                  >
                    {copiedId === link.id ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" />
                        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                      </svg>
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(link.id)}
                    className="p-2 rounded-lg text-dark-300 hover:text-red-400 hover:bg-red-500/10 transition-all"
                    title="Delete link"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z" />
                      <line x1="10" y1="11" x2="10" y2="17" />
                      <line x1="14" y1="11" x2="14" y2="17" />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* ═══════════ Create Modal ═══════════ */}
      {showCreateModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          id="create-modal-overlay"
        >
          <div
            className="absolute inset-0 bg-dark-900/80 backdrop-blur-sm"
            onClick={() => setShowCreateModal(false)}
          />
          <div className="relative glass-card w-full max-w-lg p-6 sm:p-8 animate-scale-in border border-glass-border">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Create Short Link</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 rounded-lg text-dark-300 hover:text-white hover:bg-white/5 transition-all"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleCreate}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-dark-200 mb-2">
                    Destination URL
                  </label>
                  <input
                    type="url"
                    id="modal-url-input"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    placeholder="https://example.com/your-long-url"
                    className="w-full px-4 py-3 bg-transparent text-white placeholder:text-dark-400 rounded-xl input-glow text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-200 mb-2">
                    Custom Alias
                    <span className="text-dark-400 font-normal ml-1">(optional)</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-dark-400 shrink-0">lio.to/</span>
                    <input
                      type="text"
                      id="modal-alias-input"
                      value={customAlias}
                      onChange={(e) => setCustomAlias(e.target.value.replace(/[^a-zA-Z0-9-_]/g, ""))}
                      placeholder="my-link"
                      className="w-full px-4 py-3 bg-transparent text-white placeholder:text-dark-400 rounded-xl input-glow text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-8">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-3 text-sm font-medium text-dark-200 rounded-xl border border-glass-border hover:bg-white/5 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="modal-create-btn"
                  disabled={isCreating}
                  className="flex-1 px-4 py-3 text-sm font-semibold text-white rounded-xl btn-glow disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isCreating ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeLinecap="round" />
                      </svg>
                      Creating...
                    </>
                  ) : (
                    "Create Link"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;