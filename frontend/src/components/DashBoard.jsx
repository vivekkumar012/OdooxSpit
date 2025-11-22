import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function MernDashboard() {
  const ACCENT = "cyan-500";
  const tabs = ["Dashboard", "Operations", "Stock", "Move History", "Settings"];

  const [activeTab, setActiveTab] = useState("Dashboard");
  const [receipt] = useState({ toReceive: 4, late: 1, ops: 6 });
  const [delivery] = useState({ toDeliver: 4, late: 1, waiting: 2, ops: 6 });
  const [showSettingsOptions, setShowSettingsOptions] = useState(false);
  const [pageBgClass, setPageBgClass] = useState("bg-[#0f172a]");

  const navigate = useNavigate();


  const selectSetting = (option) => {
    if (option === "Warehouse" || option === "Locations") {
      // set to a valid background class (dark navy)
      setPageBgClass("bg-[#0f172a]");
      setShowSettingsOptions(false);
      alert(`Selected: ${option} (mock) — page color set to dark navy`);
    }
  };

  return (
    <div className={`${pageBgClass} min-h-screen p-6 text-slate-200`}>
      {/* container mimics the sketch border and spacing */}
      <div className="mx-auto max-w-7xl">
        {/* Topbar */}
        <div className="flex items-center justify-between border-b border-[#253045] px-4 py-3">
          {/* NAV: make the Settings tab wrapper relative so dropdown positions under it */}
          <nav className="flex gap-6 items-center">
            {tabs.map((t) => {
              // For the Settings tab we render a relative wrapper that contains the button and dropdown
              if (t === "Settings") {
                return (
                  <div key={t} className="relative inline-block">
                    <button
                      onClick={() => {
                        setActiveTab(t);
                        setShowSettingsOptions((s) => !s);
                      }}
                      className={`relative rounded-md px-3 py-1 text-sm font-medium transition-colors ${
                        activeTab === t ? "text-cyan-700" : "text-slate-400 hover:text-cyan-700"
                      }`}
                    >
                      {t}
                      {activeTab === t && (
                        <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 inline-block w-10 border-b-2 border-cyan-100" />
                      )}
                    </button>

                    {/* Dropdown rendered relative to this wrapper, so it appears below the Settings button */}
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

                    // ROUTING FIX → works properly now
                    if (t === "Dashboard") window.location.href = "/";
                    if (t === "Operations") window.location.href = "/operations";
                    if (t === "Stock") window.location.href = "/stock";
                    if (t === "Move History") window.location.href = "/move-history";
                  }}
                  className={`relative rounded-md px-3 py-1 text-sm font-medium transition-colors ${
                    activeTab === t ? "text-cyan-700" : "text-slate-400 hover:text-cyan-700"
                  }`}
                >
                  {t}
                  {activeTab === t && (
                    <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 inline-block w-10 border-b-2 border-cyan-100" />
                  )}
                </button>
              );

              // Default tab rendering
              return (
                <button
                  key={t}
                  onClick={() => {
                    setActiveTab(t);
                    setShowSettingsOptions(false);
                  }}
                  className={`relative rounded-md px-3 py-1 text-sm font-medium transition-colors ${
                    activeTab === t ? "text-cyan-700" : "text-slate-400 hover:text-cyan-700"
                  }`}
                >
                  {t}
                  {activeTab === t && (
                    <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 inline-block w-10 border-b-2 border-cyan-100" />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="relative flex items-center gap-3">
            {/* Brand / icon */}
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg bg-${ACCENT} flex items-center justify-center`}>
                <img
                  src="https://imgs.search.brave.com/utT25WVux7fu6UdlgoinfQQGZOjbmgUOAfG958an2SE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTk4/NDc5MzcxMy92ZWN0/b3IvZ3JhcGgtbW92/aW5nLXVwd29yZHMt/aWNvbi5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9S0lCdHZI/OFNBZHdyQmJDRXQ0/T1lKempmclR5U21L/d3BMb0FxRGNtODB5/WT0"
                  alt=""
                  className="h-10 w-10 rounded-md"
                />
              </div>
              <span className="text-2xl font-bold text-slate-100">StockMaster</span>
            </div>

            {/* Note: removed the duplicate dropdown that was on the right side.
                Settings dropdown is now rendered below the Settings tab button in the nav above. */}
          </div>
        </div>

        {/* Main content area */}
        <div className="p-6">
          {/* two cards side-by-side */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Receipt Card */}
            <div className="rounded-lg border border-cyan-100 bg-[#1e293b]/40 p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-400">Receipt</h3>
                  <p className="mt-3 text-sm text-slate-300">Operations related to incoming stock</p>
                </div>
                <div className="text-sm text-slate-400">
                  {receipt.late} Late
                  <br />
                  {receipt.ops} operations
                </div>
              </div>

              <div className="mt-6 flex items-center gap-4">
                <div>
                  <button
                    onClick={() => navigate("/receipt")}
                    className="rounded-md border border-[#253045] bg-cyan-900 px-4 py-2 text-sm font-medium shadow-sm hover:bg-[#1e293b]"
                  >
                    {receipt.toReceive} to receive
                  </button>
                </div>
              </div>
            </div>

            {/* Delivery Card */}
            <div className="rounded-lg border border-cyan-100 bg-[#1e293b]/40 p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-400">Delivery</h3>
                  <p className="mt-3 text-sm text-slate-300">Operations related to outgoing stock</p>
                </div>
                <div className="text-sm text-slate-400">
                  {delivery.late} Late
                  <br />
                  {delivery.waiting} waiting
                  <br />
                  {delivery.ops} operations
                </div>
              </div>

              <div className="mt-6 flex items-center gap-4">
                <button
                  onClick={() => alert("Navigate to Delivery list (mock)")}
                  className="rounded-md border border-[#253045] bg-cyan-900 px-4 py-2 text-sm font-medium shadow-sm hover:bg-[#1e293b]"
                >
                  {delivery.toDeliver} to deliver
                </button>
              </div>
            </div>
          </div>

          {/* large empty area to match sketch's empty main region */}
          <div className="mt-8 rounded-md border border-dashed border-[#253045] p-6 text-center text-sm text-slate-400">
            Main content area — add tables, stock lists, charts or move history here.
          </div>
        </div>
      </div>
    </div>
  );
}
