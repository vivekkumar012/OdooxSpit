import React, { useState } from "react";

export default function StockPage() {
  // initial demo data with more fields (SKU, category, location)
  const [items, setItems] = useState([
    { id: 1, sku: "DSK-001", product: "Desk", category: "Furniture", location: "WH-A", cost: 3000, onHand: 50, freeToUse: 45 },
    { id: 2, sku: "TBL-002", product: "Table", category: "Furniture", location: "WH-B", cost: 3000, onHand: 50, freeToUse: 50 },
    { id: 3, sku: "CHR-003", product: "Chair", category: "Furniture", location: "WH-C", cost: 1200, onHand: 120, freeToUse: 118 },
    { id: 4, sku: "MON-004", product: "Monitor", category: "Electronics", location: "WH-E1", cost: 8500, onHand: 30, freeToUse: 25 },
    { id: 5, sku: "LPT-005", product: "Laptop", category: "Electronics", location: "WH-E2", cost: 55000, onHand: 20, freeToUse: 19 },
    { id: 6, sku: "CAB-006", product: "HDMI Cable", category: "Accessories", location: "WH-A2", cost: 150, onHand: 300, freeToUse: 295 },
    { id: 7, sku: "MSE-007", product: "Mouse", category: "Electronics", location: "WH-D1", cost: 450, onHand: 80, freeToUse: 76 },
    { id: 8, sku: "KBD-008", product: "Keyboard", category: "Electronics", location: "WH-D2", cost: 700, onHand: 60, freeToUse: 58 },
    { id: 9, sku: "BAG-009", product: "Office Bag", category: "Accessories", location: "WH-B3", cost: 900, onHand: 40, freeToUse: 37 },
    { id: 10, sku: "PNL-010", product: "Wooden Panel", category: "Raw Material", location: "WH-R1", cost: 500, onHand: 200, freeToUse: 185 }
  ]);

  const [editing, setEditing] = useState(null); // item being edited
  const [form, setForm] = useState({ product: "", sku: "", category: "", location: "", cost: 0, onHand: 0, freeToUse: 0 });
  const [query, setQuery] = useState("");

  function openEdit(item) {
    setEditing(item.id);
    setForm({
      product: item.product,
      sku: item.sku,
      category: item.category,
      location: item.location,
      cost: item.cost,
      onHand: item.onHand,
      freeToUse: item.freeToUse,
    });
  }

  function closeEdit() {
    setEditing(null);
    setForm({ product: "", sku: "", category: "", location: "", cost: 0, onHand: 0, freeToUse: 0 });
  }

  function saveEdit(id) {
    // basic validation
    const costN = Number(form.cost);
    const onHandN = Math.max(0, Math.floor(Number(form.onHand) || 0));
    const freeN = Math.max(0, Math.floor(Number(form.freeToUse) || 0));

    if (isNaN(costN) || onHandN < 0 || freeN < 0) {
      alert("Please enter valid numeric values (≥ 0).");
      return;
    }

    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, product: form.product, sku: form.sku, category: form.category, location: form.location, cost: costN, onHand: onHandN, freeToUse: freeN } : it))
    );
    closeEdit();
  }

  function deleteItem(id) {
    setItems((prev) => prev.filter((p) => p.id !== id));
  }

  const filtered = items.filter((it) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      it.product.toLowerCase().includes(q) ||
      String(it.sku).toLowerCase().includes(q) ||
      (it.category || "").toLowerCase().includes(q) ||
      (it.location || "").toLowerCase().includes(q)
    );
  });

  // Colors consistent with your dashboard theme but with no page background (per request)
  const panelBg = "bg-[#1a2233]";
  const cardBg = "bg-[#1e293b]/40";
  const border = "border-[#253045]";
  const text = "text-slate-200";
  const subtext = "text-slate-300";

  return (
    <div className={`min-h-screen p-6 bg-[#0f172a] text-slate-200`}>
        {/* Top heading area */}
        <div className="flex items-center justify-between border-b px-6 py-4" style={{ borderColor: "#253045" }}>
          <div className="flex items-center gap-4">
            <div>
              <h2 className="text-2xl font-semibold">Stock</h2>
              <p className={`${subtext} text-sm`}>Products, on-hand quantities and available stock.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* replaced the Add product button and icon with a search input for "search the stock" */}
            <div className="relative">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search the stock... (product, SKU, category, location)"
                className="w-72 rounded-md border px-3 py-2 bg-[#0f172a] text-slate-200"
                style={{ borderColor: "#253045" }}
              />
            </div>
          </div>
        </div>

        {/* Table header */}
        <div className="p-6">
          <div className="rounded-md border-b pb-2 mb-4" style={{ borderColor: "#253045" }}>
            <h3 className="text-lg font-semibold">Stock</h3>
          </div>

          <div className="overflow-x-auto rounded-md">
            <table className="w-full table-auto border-collapse text-slate-200">
              <thead>
                <tr className={`${subtext} text-left`}> 
                  <th className="pb-3 pr-6">Product</th>
                  <th className="pb-3 pr-6">SKU</th>
                  <th className="pb-3 pr-6">Category</th>
                  <th className="pb-3 pr-6">Location</th>
                  <th className="pb-3 pr-6">Per unit cost</th>
                  <th className="pb-3 pr-6">On hand</th>
                  <th className="pb-3 pr-6">Free to Use</th>
                  <th className="pb-3 pr-6">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((it, idx) => (
                  <tr key={it.id} className={`${idx % 2 === 0 ? "" : "bg-[#0f172a]/8"} border-t`} style={{ borderColor: "#213042" }}>
                    <td className="py-4 pr-6 align-top">
                      <div className="text-sm">{it.product}</div>
                    </td>
                    <td className="py-4 pr-6 align-top">
                      <div className="text-sm">{it.sku}</div>
                    </td>
                    <td className="py-4 pr-6 align-top">
                      <div className="text-sm">{it.category}</div>
                    </td>
                    <td className="py-4 pr-6 align-top">
                      <div className="text-sm">{it.location}</div>
                    </td>
                    <td className="py-4 pr-6 align-top">
                      <div className="text-sm">₹{it.cost.toLocaleString()}</div>
                    </td>
                    <td className="py-4 pr-6 align-top">
                      <div className="text-sm">{it.onHand}</div>
                    </td>
                    <td className="py-4 pr-6 align-top">
                      <div className="text-sm">{it.freeToUse}</div>
                    </td>
                    <td className="py-4 pr-6 align-top">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEdit(it)}
                          className="rounded-md px-3 py-1 text-sm"
                          style={{ border: "1px solid #253045" }}
                        >
                          Edit
                        </button>
                        <button onClick={() => deleteItem(it.id)} className="rounded-md px-3 py-1 text-sm text-rose-400"
                            style={{ border: "1px solid #253045" }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-400">
                      No products match your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* large blank area like the sketch with hint text */}
          <div className="mt-12 min-h-[120px] flex items-center justify-center text-slate-400">
            <div>User must be able to update the stock from here.</div>
          </div>
        </div>

      {/* Edit modal (simple inline modal) */}
      {editing !== null && (
        <div className="fixed inset-0 z-40 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={closeEdit} />

          <div className="relative w-full max-w-lg rounded-lg p-6" style={{ background: "#1a2233", border: "1px solid #253045" }}>
            <h4 className="text-lg font-semibold mb-4">Edit stock</h4>

            <div className="grid grid-cols-1 gap-3">
              <label className="text-sm text-slate-300">
                Product
                <input
                  value={form.product}
                  onChange={(e) => setForm((f) => ({ ...f, product: e.target.value }))}
                  className="mt-1 w-full rounded-md border px-3 py-2 bg-[#0f172a] text-slate-200"
                  style={{ borderColor: "#253045" }}
                />
              </label>

              <label className="text-sm text-slate-300">
                SKU
                <input
                  value={form.sku}
                  onChange={(e) => setForm((f) => ({ ...f, sku: e.target.value }))}
                  className="mt-1 w-full rounded-md border px-3 py-2 bg-[#0f172a] text-slate-200"
                  style={{ borderColor: "#253045" }}
                />
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label className="text-sm text-slate-300">
                  Category
                  <input
                    value={form.category}
                    onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                    className="mt-1 w-full rounded-md border px-3 py-2 bg-[#0f172a] text-slate-200"
                    style={{ borderColor: "#253045" }}
                  />
                </label>
                <label className="text-sm text-slate-300">
                  Location
                  <input
                    value={form.location}
                    onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                    className="mt-1 w-full rounded-md border px-3 py-2 bg-[#0f172a] text-slate-200"
                    style={{ borderColor: "#253045" }}
                  />
                </label>
              </div>

              <label className="text-sm text-slate-300">
                Per unit cost (₹)
                <input
                  value={form.cost}
                  type="number"
                  onChange={(e) => setForm((f) => ({ ...f, cost: e.target.value }))}
                  className="mt-1 w-full rounded-md border px-3 py-2 bg-[#0f172a] text-slate-200"
                  style={{ borderColor: "#253045" }}
                />
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label className="text-sm text-slate-300">
                  On hand
                  <input
                    value={form.onHand}
                    type="number"
                    onChange={(e) => setForm((f) => ({ ...f, onHand: e.target.value }))}
                    className="mt-1 w-full rounded-md border px-3 py-2 bg-[#0f172a] text-slate-200"
                    style={{ borderColor: "#253045" }}
                  />
                </label>
                <label className="text-sm text-slate-300">
                  Free to Use
                  <input
                    value={form.freeToUse}
                    type="number"
                    onChange={(e) => setForm((f) => ({ ...f, freeToUse: e.target.value }))}
                    className="mt-1 w-full rounded-md border px-3 py-2 bg-[#0f172a] text-slate-200"
                    style={{ borderColor: "#253045" }}
                  />
                </label>
              </div>

              <div className="mt-4 flex justify-end gap-3">
                <button onClick={closeEdit} className="rounded-md px-4 py-2 text-sm" style={{ border: "1px solid #253045" }}>
                  Cancel
                </button>
                <button onClick={() => saveEditHandler()} className="rounded-md bg-cyan-500 px-4 py-2 text-sm font-medium text-slate-900">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* helper to call save with the currently editing id */}
      {/* moved to bottom to keep JSX above clean */}
    </div>
  );

  function saveEditHandler() {
    if (editing == null) return;
    saveEdit(editing);
  }
}
