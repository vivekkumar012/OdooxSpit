import React, { useState } from "react";

export default function MoveHistory() {
  const [query, setQuery] = useState("");
  const [showNewModal, setShowNewModal] = useState(false);

  // More hard-coded movement data (expanded)
  const [data, setData] = useState([
    {
      reference: "WH/IN/0001",
      date: "2001-12-01",
      contact: "Azure Interior",
      from: "vendor",
      to: "WH/Stock1",
      qty: 50,
      type: "IN",
      notes: "Received shipment from vendor. Quality check passed.",
      attachment: "/mnt/data/Screenshot 2025-11-22 151004.png",
    },
    {
      reference: "WH/OUT/0002",
      date: "2001-12-01",
      contact: "Azure Interior",
      from: "WH/Stock1",
      to: "vendor",
      qty: 20,
      type: "OUT",
      notes: "Return to vendor - monitors.",
    },
    {
      reference: "WH/OUT/0003",
      date: "2001-12-01",
      contact: "Azure Interior",
      from: "WH/Stock2",
      to: "vendor",
      qty: 30,
      type: "OUT",
      notes: "Dispatch for client X.",
    },
    {
      reference: "WH/IN/0004",
      date: "2001-12-02",
      contact: "Blue Supplies",
      from: "vendor",
      to: "WH/Stock1",
      qty: 120,
      type: "IN",
      notes: "Bulk chairs received.",
    },
    {
      reference: "WH/IN/0005",
      date: "2001-12-03",
      contact: "Gamma Traders",
      from: "vendor",
      to: "WH/Stock3",
      qty: 10,
      type: "IN",
    },
    {
      reference: "WH/OUT/0006",
      date: "2001-12-04",
      contact: "Retail Partner",
      from: "WH/Stock3",
      to: "retail",
      qty: 5,
      type: "OUT",
    },
    {
      reference: "WH/IN/0007",
      date: "2001-12-05",
      contact: "Supplier Z",
      from: "vendor",
      to: "WH/Stock2",
      qty: 75,
      type: "IN",
    },
    {
      reference: "WH/OUT/0008",
      date: "2001-12-06",
      contact: "Client Y",
      from: "WH/Stock1",
      to: "client",
      qty: 12,
      type: "OUT",
    },
  ]);

  // New-move form state
  const [form, setForm] = useState({
    reference: "",
    date: "",
    contact: "",
    from: "",
    to: "",
    qty: "",
    type: "IN",
    notes: "",
    attachment: "", // url or path to file
  });

  function openNew() {
    setForm({
      reference: generateNextReference(),
      date: new Date().toISOString().slice(0, 10),
      contact: "",
      from: "",
      to: "",
      qty: "",
      type: "IN",
      notes: "",
      attachment: "",
    });
    setShowNewModal(true);
  }

  function generateNextReference() {
    const nextNum = data.length + 1;
    const padded = String(nextNum).padStart(4, "0");
    const kind = nextNum % 2 === 1 ? "IN" : "OUT";
    return `WH/${kind}/${padded}`;
  }

  function saveNew() {
    // Validation
    if (!form.reference.trim()) return alert("Reference is required");
    if (!form.date.trim()) return alert("Date is required");
    if (!form.contact.trim()) return alert("Contact is required");
    if (!form.from.trim()) return alert("From is required");
    if (!form.to.trim()) return alert("To is required");
    const qtyN = Number(form.qty);
    if (!Number.isFinite(qtyN) || qtyN <= 0) return alert("Quantity must be a positive number");

    // Add to data (prepend so new appears at top)
    setData((prev) => [
      {
        reference: form.reference,
        date: form.date,
        contact: form.contact,
        from: form.from,
        to: form.to,
        qty: qtyN,
        type: form.type,
        notes: form.notes,
        attachment: form.attachment || undefined,
      },
      ...prev,
    ]);

    setShowNewModal(false);
  }

  const filtered = data.filter((row) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      row.reference.toLowerCase().includes(q) ||
      (row.contact || "").toLowerCase().includes(q) ||
      (row.from || "").toLowerCase().includes(q) ||
      (row.to || "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen text-slate-200 bg-[#0f172a] p-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#253045] px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={openNew}
              className="bg-cyan-700 px-4 py-1 rounded-md text-sm font-semibold hover:bg-cyan-600 transition"
            >
              NEW
            </button>
            <h2 className="text-2xl font-semibold">Move History</h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="w-56 rounded-md border px-3 py-2 bg-[#0f172a] text-slate-200"
              style={{ borderColor: "#253045" }}
            />

          </div>
        </div>

        {/* Table */}
        <div className="p-6">
          <table className="w-full border-collapse text-slate-200">
            <thead>
              <tr className="text-slate-300 text-left border-b border-[#253045]">
                <th className="pb-3 pr-6">Reference</th>
                <th className="pb-3 pr-6">Date</th>
                <th className="pb-3 pr-6">Contact</th>
                <th className="pb-3 pr-6">From</th>
                <th className="pb-3 pr-6">To</th>
                <th className="pb-3 pr-6">Quantity</th>
                <th className="pb-3 pr-6">Status</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((row, idx) => (
                <tr
                  key={idx}
                  className={`border-b border-[#253045] ${idx % 2 === 0 ? "bg-transparent" : "bg-[#0f172a]/10"}`}
                >
                  <td className="py-4 pr-6">{row.reference}</td>
                  <td className="py-4 pr-6">{row.date}</td>
                  <td className="py-4 pr-6">{row.contact}</td>
                  <td className="py-4 pr-6">{row.from}</td>
                  <td className="py-4 pr-6">{row.to}</td>
                  <td className="py-4 pr-6">{row.qty}</td>
                  <td className="py-4 pr-6">
                    <span className={`font-semibold ${row.type === "IN" ? "text-green-400" : "text-rose-400"}`}>
                      Ready
                    </span>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          
        </div>

      {/* NEW modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowNewModal(false)} />

          <div className="relative w-full max-w-2xl rounded-lg p-6" style={{ background: "#1a2233", border: "1px solid #253045" }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Create new move</h3>
              <button onClick={() => setShowNewModal(false)} className="text-slate-300">Close</button>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <div className="grid grid-cols-2 gap-3">
                <label className="text-sm text-slate-300">
                  Reference
                  <input
                    value={form.reference}
                    onChange={(e) => setForm((f) => ({ ...f, reference: e.target.value }))}
                    className="mt-1 w-full rounded-md border px-3 py-2 bg-[#0f172a] text-slate-200"
                    style={{ borderColor: "#253045" }}
                  />
                </label>

                <label className="text-sm text-slate-300">
                  Date
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                    className="mt-1 w-full rounded-md border px-3 py-2 bg-[#0f172a] text-slate-200"
                    style={{ borderColor: "#253045" }}
                  />
                </label>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <label className="text-sm text-slate-300">
                  Contact
                  <input
                    value={form.contact}
                    onChange={(e) => setForm((f) => ({ ...f, contact: e.target.value }))}
                    className="mt-1 w-full rounded-md border px-3 py-2 bg-[#0f172a] text-slate-200"
                    style={{ borderColor: "#253045" }}
                  />
                </label>

                <label className="text-sm text-slate-300">
                  Quantity
                  <input
                    value={form.qty}
                    onChange={(e) => setForm((f) => ({ ...f, qty: e.target.value }))}
                    type="number"
                    min="1"
                    className="mt-1 w-full rounded-md border px-3 py-2 bg-[#0f172a] text-slate-200"
                    style={{ borderColor: "#253045" }}
                  />
                </label>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <label className="text-sm text-slate-300">
                  From
                  <input
                    value={form.from}
                    onChange={(e) => setForm((f) => ({ ...f, from: e.target.value }))}
                    className="mt-1 w-full rounded-md border px-3 py-2 bg-[#0f172a] text-slate-200"
                    style={{ borderColor: "#253045" }}
                  />
                </label>

                <label className="text-sm text-slate-300">
                  To
                  <input
                    value={form.to}
                    onChange={(e) => setForm((f) => ({ ...f, to: e.target.value }))}
                    className="mt-1 w-full rounded-md border px-3 py-2 bg-[#0f172a] text-slate-200"
                    style={{ borderColor: "#253045" }}
                  />
                </label>

                <label className="text-sm text-slate-300">
                  Type
                  <select
                    value={form.type}
                    onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
                    className="mt-1 w-full rounded-md border px-3 py-2 bg-[#0f172a] text-slate-200"
                    style={{ borderColor: "#253045" }}
                  >
                    <option value="IN">IN</option>
                    <option value="OUT">OUT</option>
                  </select>
                </label>
              </div>

              <label className="text-sm text-slate-300">
                Notes
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                  className="mt-1 w-full rounded-md border px-3 py-2 bg-[#0f172a] text-slate-200"
                  style={{ borderColor: "#253045" }}
                  rows={3}
                />
              </label>

              <label className="text-sm text-slate-300">
                Attachment (optional URL or local path)
                <input
                  value={form.attachment}
                  onChange={(e) => setForm((f) => ({ ...f, attachment: e.target.value }))}
                  placeholder="e.g. /mnt/data/Screenshot 2025-11-22 151004.png"
                  className="mt-1 w-full rounded-md border px-3 py-2 bg-[#0f172a] text-slate-200"
                  style={{ borderColor: "#253045" }}
                />
                {/* preview if user entered the known local file path */}
                {form.attachment && (
                  <div className="mt-2">
                    <div className="text-xs text-slate-400 mb-1">Attachment preview:</div>
                    <div className="rounded-md overflow-hidden border" style={{ borderColor: "#253045" }}>
                      <img src={form.attachment} alt="attachment preview" className="w-full object-cover" />
                    </div>
                  </div>
                )}
              </label>

              <div className="mt-4 flex justify-end gap-3">
                <button onClick={() => setShowNewModal(false)} className="rounded-md px-4 py-2 text-sm" style={{ border: "1px solid #253045" }}>
                  Cancel
                </button>
                <button onClick={saveNew} className="rounded-md bg-cyan-500 px-4 py-2 text-sm font-medium text-slate-900">
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
