import React, { useState } from "react";
import { Search, List, LayoutGrid } from "lucide-react";

export default function ReceiptPage() {
  const ACCENT = "cyan-500";
  const tabs = ["Dashboard", "Operations", "Products", "Move History", "Settings"];
  
  const [activeTab, setActiveTab] = useState("Operations");
  const [viewMode, setViewMode] = useState("list"); // 'list' or 'kanban'
  const [searchTerm, setSearchTerm] = useState("");
  const [showSettingsOptions, setShowSettingsOptions] = useState(false);

  // Sample receipt data
  const [receipts] = useState([
    {
      reference: "WH/IN/0001",
      from: "vendor",
      to: "WH/Stock1",
      contact: "Azure Interior",
      scheduleDate: "",
      status: "Ready"
    },
    {
      reference: "WH/IN/0002",
      from: "vendor",
      to: "WH/Stock1",
      contact: "Azure Interior",
      scheduleDate: "",
      status: "Ready"
    }
  ]);

  const filteredReceipts = receipts.filter(receipt =>
    receipt.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
    receipt.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectSetting = (option) => {
    setShowSettingsOptions(false);
    alert(`Selected: ${option}`);
  };

  return (
    <div className="bg-[#0f172a] min-h-screen text-slate-200">
      <div className="mx-auto max-w-7xl">
        {/* Topbar */}
        <div className="flex items-center justify-between border-b border-[#253045] px-4 py-3">
          <nav className="flex gap-6 items-center">
            {tabs.map((t) => {
              if (t === "Settings") {
                return (
                  <div key={t} className="relative inline-block">
                    <button
                      onClick={() => {
                        setActiveTab(t);
                        setShowSettingsOptions((s) => !s);
                      }}
                      className={`relative rounded-md px-3 py-1 text-sm font-medium transition-colors ${
                        activeTab === t ? "text-cyan-400" : "text-slate-400 hover:text-cyan-400"
                      }`}
                    >
                      {t}
                      {activeTab === t && (
                        <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 inline-block w-10 border-b-2 border-cyan-400" />
                      )}
                    </button>

                    {showSettingsOptions && (
                      <div className="absolute left-0 mt-2 w-44 rounded-md border border-[#253045] bg-[#1a2233] shadow-lg z-50">
                        <button
                          onClick={() => selectSetting("Warehouse")}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-[#1e293b] text-slate-200"
                        >
                          Warehouse
                        </button>
                        <button
                          onClick={() => selectSetting("Locations")}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-[#1e293b] text-slate-200"
                        >
                          Locations
                        </button>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={t}
                  onClick={() => {
                    setActiveTab(t);
                    setShowSettingsOptions(false);
                  }}
                  className={`relative rounded-md px-3 py-1 text-sm font-medium transition-colors ${
                    activeTab === t ? "text-cyan-400" : "text-slate-400 hover:text-cyan-400"
                  }`}
                >
                  {t}
                  {activeTab === t && (
                    <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 inline-block w-10 border-b-2 border-cyan-400" />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg bg-cyan-500 flex items-center justify-center`}>
                <img
                  src="https://imgs.search.brave.com/utT25WVux7fu6UdlgoinfQQGZOjbmgUOAfG958an2SE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTk4/NDc5MzcxMy92ZWN0/b3IvZ3JhcGgtbW92/aW5nLXVwd29yZHMt/aWNvbi5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9S0lCdHZI/OFNBZHdyQmJDRXQ0/T1lKempmclR5U21L/d3BMb0FxRGNtODB5/WT0"
                  alt=""
                  className="h-10 w-10 rounded-md"
                />
              </div>
              <span className="text-2xl font-bold text-slate-100">StockMaster</span>
            </div>
          </div>
        </div>

        {/* Receipt Section */}
        <div className="p-6">
          {/* Header with NEW button and view toggles */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition">
                <span className="text-lg">+</span> NEW
              </button>
              <h1 className="text-2xl font-bold text-slate-100">Receipts</h1>
            </div>

            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by reference & contacts"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-[#1e293b] border border-[#253045] rounded-md text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 w-80"
                />
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-1 bg-[#1e293b] border border-[#253045] rounded-md p-1">
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded transition ${
                    viewMode === "list" 
                      ? "bg-cyan-600 text-white" 
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("kanban")}
                  className={`p-2 rounded transition ${
                    viewMode === "kanban" 
                      ? "bg-cyan-600 text-white" 
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                  title="Kanban View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Table View */}
          {viewMode === "list" && (
            <div className="border border-[#253045] rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-[#1e293b]/60">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm font-medium text-slate-400">Reference</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-slate-400">From</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-slate-400">To</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-slate-400">Contact</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-slate-400">Schedule Date</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-slate-400">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReceipts.map((receipt, index) => (
                    <tr
                      key={index}
                      className="border-t border-[#253045] hover:bg-[#1e293b]/30 transition cursor-pointer"
                    >
                      <td className="px-4 py-3 text-sm text-cyan-400 font-medium">
                        {receipt.reference}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-300">{receipt.from}</td>
                      <td className="px-4 py-3 text-sm text-slate-300">{receipt.to}</td>
                      <td className="px-4 py-3 text-sm text-slate-300">{receipt.contact}</td>
                      <td className="px-4 py-3 text-sm text-slate-300">{receipt.scheduleDate || "-"}</td>
                      <td className="px-4 py-3">
                        <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                          {receipt.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredReceipts.length === 0 && (
                <div className="text-center py-12 text-slate-500">
                  No receipts found matching your search.
                </div>
              )}
            </div>
          )}

          {/* Kanban View */}
          {viewMode === "kanban" && (
            <div className="grid grid-cols-3 gap-4">
              {/* Ready Column */}
              <div className="bg-[#1e293b]/40 border border-[#253045] rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-200">Ready</h3>
                  <span className="bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded text-xs font-medium">
                    {filteredReceipts.filter(r => r.status === "Ready").length}
                  </span>
                </div>
                <div className="space-y-3">
                  {filteredReceipts
                    .filter(r => r.status === "Ready")
                    .map((receipt, index) => (
                      <div
                        key={index}
                        className="bg-[#0f172a] border border-[#253045] rounded-lg p-3 hover:border-cyan-500/50 transition cursor-pointer"
                      >
                        <div className="font-medium text-cyan-400 text-sm mb-2">
                          {receipt.reference}
                        </div>
                        <div className="text-xs text-slate-400 space-y-1">
                          <div>From: {receipt.from}</div>
                          <div>To: {receipt.to}</div>
                          <div>Contact: {receipt.contact}</div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Other status columns can be added here */}
              <div className="bg-[#1e293b]/40 border border-[#253045] rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-200">In Progress</h3>
                  <span className="bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded text-xs font-medium">
                    0
                  </span>
                </div>
                <div className="text-center py-8 text-slate-500 text-sm">
                  No items
                </div>
              </div>

              <div className="bg-[#1e293b]/40 border border-[#253045] rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-200">Done</h3>
                  <span className="bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded text-xs font-medium">
                    0
                  </span>
                </div>
                <div className="text-center py-8 text-slate-500 text-sm">
                  No items
                </div>
              </div>
            </div>
          )}

          {/* Info Note */}
          <div className="mt-6 p-4 bg-[#1e293b]/40 border border-[#253045] rounded-lg">
            <p className="text-sm text-slate-400">
              <span className="font-semibold text-slate-300">Reference Structure:</span> WH/IN/001
            </p>
            <p className="text-sm text-slate-400 mt-2">
              Warehouse = ID of warehouse | Operation = IN/OUT | ID = auto incremental unique id
            </p>
            <p className="text-sm text-slate-400 mt-2">
              📝 Populate all work orders added to manufacturing order
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}