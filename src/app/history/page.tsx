"use client";

import DashboardLayout from "@/components/dashboard/DashBoardLayout";
import React, { useState } from "react";

// Tabs navigation options
const tabs = [
  "Dashboard",
  "Operations",
  "Products",
  "Move History",
  "Settings",
];

// Demo data
const moveHistoryData = [
  {
    reference: "WH/IN/0001",
    date: "12/1/2001",
    contact: "Azure Interior",
    from: "vendor",
    to: "WH/Stock1",
    quantity: 20,
    status: "Ready",
    direction: "in",
    product: "Office Chair",
  },
  {
    reference: "WH/IN/0001",
    date: "12/1/2001",
    contact: "Azure Interior",
    from: "vendor",
    to: "WH/Stock1",
    quantity: 30,
    status: "Ready",
    direction: "in",
    product: "Desk Lamp",
  },
  {
    reference: "WH/OUT/0002",
    date: "12/1/2001",
    contact: "Azure Interior",
    from: "WH/Stock1",
    to: "vendor",
    quantity: 15,
    status: "Ready",
    direction: "out",
    product: "Office Chair",
  },
  {
    reference: "WH/OUT/0002",
    date: "12/1/2001",
    contact: "Azure Interior",
    from: "WH/Stock2",
    to: "vendor",
    quantity: 10,
    status: "Ready",
    direction: "out",
    product: "Desk Lamp",
  },
  {
    reference: "WH/OUT/0003",
    date: "12/2/2001",
    contact: "Modern Furnish",
    from: "WH/Stock1",
    to: "customer",
    quantity: 25,
    status: "Pending",
    direction: "out",
    product: "Monitor Stand",
  },
  {
    reference: "WH/IN/0004",
    date: "12/3/2001",
    contact: "Modern Furnish",
    from: "vendor",
    to: "WH/Stock2",
    quantity: 40,
    status: "In Progress",
    direction: "in",
    product: "Conference Table",
  },
];

function getStatusBadge(row: { direction: string; status: string }) {
  if (row.direction === "in") {
    return (
      <span
        style={{
          padding: "4px 12px",
          borderRadius: "9999px",
          fontSize: "12px",
          fontWeight: "500",
          border: "1px solid rgb(34 197 94 / 0.3)",
          backgroundColor: "rgb(220 252 231 / 0.2)",
          color: "rgb(34 197 94)",
        }}
      >
        {row.status}
      </span>
    );
  }
  return (
    <span
      style={{
        padding: "4px 12px",
        borderRadius: "9999px",
        fontSize: "12px",
        fontWeight: "500",
        border: "1px solid rgb(239 68 68 / 0.3)",
        backgroundColor: "rgb(254 226 226 / 0.2)",
        color: "rgb(239 68 68)",
      }}
    >
      {row.status}
    </span>
  );
}

export default function MoveHistoryPage() {
  const [search, setSearch] = useState("");
  const [view, setView] = useState("list");
  const [activeTab, setActiveTab] = useState("Move History");

  // Filter by reference or contact
  const filteredData = moveHistoryData.filter(
    (item) =>
      item.reference.toLowerCase().includes(search.toLowerCase()) ||
      item.contact.toLowerCase().includes(search.toLowerCase())
  );

  // Kanban group by status
  const statusGroups = {
    Ready: filteredData.filter((m) => m.status === "Ready"),
    "In Progress": filteredData.filter((m) => m.status === "In Progress"),
    Pending: filteredData.filter((m) => m.status === "Pending"),
  };

  return (
    <DashboardLayout>
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "rgb(17 24 39)",
          color: "white",
          padding: "16px",
        }}
      >
        <div
          style={{
            backgroundColor: "rgb(31 41 55)",
            border: "1px solid rgb(55 65 81)",
            borderRadius: "16px",
            padding: "24px",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              fontSize: "30px",
              marginBottom: "32px",
              fontWeight: "600",
              color: "rgb(243 244 246)",
            }}
          >
            Move History Page
          </div>

          {/* Tabs */}
          <nav
            style={{
              display: "flex",
              gap: "16px",
              marginBottom: "24px",
              borderBottom: "1px solid rgb(55 65 81)",
              paddingBottom: "8px",
            }}
          >
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  fontWeight: "500",
                  padding: "8px 12px",
                  transition: "all 0.2s",
                  color:
                    activeTab === tab ? "rgb(59 130 246)" : "rgb(156 163 175)",
                  borderBottom:
                    activeTab === tab ? "2px solid rgb(59 130 246)" : "none",
                }}
              >
                {tab}
              </button>
            ))}
          </nav>

          {/* Header and Actions */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <button
                style={{
                  backgroundColor: "rgb(59 130 246)",
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontWeight: "600",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                + NEW
              </button>
              <h1
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "rgb(243 244 246)",
                }}
              >
                Move History
              </h1>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {/* Search */}
              <input
                type="text"
                placeholder="Search by reference or contact..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  padding: "6px 16px",
                  border: "1px solid rgb(55 65 81)",
                  borderRadius: "8px",
                  backgroundColor: "rgb(31 41 55)",
                  color: "white",
                  width: "256px",
                  outline: "none",
                }}
              />
              {/* View Toggle */}
              <div
                style={{
                  display: "flex",
                  backgroundColor: "rgb(31 41 55)",
                  borderRadius: "8px",
                  border: "1px solid rgb(55 65 81)",
                }}
              >
                <button
                  onClick={() => setView("list")}
                  style={{
                    padding: "8px",
                    borderRadius: "6px",
                    transition: "all 0.2s",
                    backgroundColor:
                      view === "list" ? "rgb(59 130 246)" : "transparent",
                    color: view === "list" ? "white" : "rgb(156 163 175)",
                    border: "none",
                    cursor: "pointer",
                  }}
                  title="List View"
                >
                  List
                </button>
                <button
                  onClick={() => setView("kanban")}
                  style={{
                    padding: "8px",
                    borderRadius: "6px",
                    transition: "all 0.2s",
                    backgroundColor:
                      view === "kanban" ? "rgb(59 130 246)" : "transparent",
                    color: view === "kanban" ? "white" : "rgb(156 163 175)",
                    border: "none",
                    cursor: "pointer",
                  }}
                  title="Kanban View"
                >
                  Kanban
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          {view === "list" ? (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%" }}>
                <thead
                  style={{
                    background:
                      "linear-gradient(to right, rgb(29 78 216), rgb(30 64 175))",
                    color: "white",
                  }}
                >
                  <tr>
                    <th
                      style={{
                        padding: "12px 24px",
                        textAlign: "left",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      Reference
                    </th>
                    <th
                      style={{
                        padding: "12px 24px",
                        textAlign: "left",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      Date
                    </th>
                    <th
                      style={{
                        padding: "12px 24px",
                        textAlign: "left",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      Contact
                    </th>
                    <th
                      style={{
                        padding: "12px 24px",
                        textAlign: "left",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      From
                    </th>
                    <th
                      style={{
                        padding: "12px 24px",
                        textAlign: "left",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      To
                    </th>
                    <th
                      style={{
                        padding: "12px 24px",
                        textAlign: "left",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      Product
                    </th>
                    <th
                      style={{
                        padding: "12px 24px",
                        textAlign: "left",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      Quantity
                    </th>
                    <th
                      style={{
                        padding: "12px 24px",
                        textAlign: "left",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody style={{ borderTop: "1px solid rgb(55 65 81)" }}>
                  {filteredData.map((row, idx) => (
                    <tr
                      key={idx}
                      style={{
                        borderBottom: "1px solid rgb(55 65 81)",
                        transition: "background-color 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "rgb(55 65 81)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      <td
                        style={{
                          padding: "12px 24px",
                          color: "rgb(59 130 246)",
                          fontWeight: "500",
                        }}
                      >
                        {row.reference}
                      </td>
                      <td
                        style={{
                          padding: "12px 24px",
                          color: "rgb(209 213 219)",
                        }}
                      >
                        {row.date}
                      </td>
                      <td
                        style={{
                          padding: "12px 24px",
                          color: "rgb(209 213 219)",
                        }}
                      >
                        {row.contact}
                      </td>
                      <td
                        style={{
                          padding: "12px 24px",
                          color: "rgb(209 213 219)",
                        }}
                      >
                        {row.from}
                      </td>
                      <td
                        style={{
                          padding: "12px 24px",
                          color: "rgb(209 213 219)",
                        }}
                      >
                        {row.to}
                      </td>
                      <td
                        style={{
                          padding: "12px 24px",
                          color: "rgb(209 213 219)",
                        }}
                      >
                        {row.product}
                      </td>
                      <td
                        style={{
                          padding: "12px 24px",
                          color: "rgb(209 213 219)",
                        }}
                      >
                        {row.quantity}
                      </td>
                      <td style={{ padding: "12px 24px" }}>
                        {getStatusBadge(row)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "20px",
              }}
            >
              {Object.entries(statusGroups).map(([status, items]) => (
                <div
                  key={status}
                  style={{
                    backgroundColor: "rgb(31 41 55)",
                    border: "1px solid rgb(55 65 81)",
                    borderRadius: "12px",
                    padding: "16px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "12px",
                    }}
                  >
                    <span
                      style={{
                        fontWeight: "bold",
                        fontSize: "18px",
                        color: "rgb(243 244 246)",
                      }}
                    >
                      {status}
                    </span>
                    <span
                      style={{
                        backgroundColor: "rgb(59 130 246)",
                        color: "white",
                        padding: "4px 12px",
                        borderRadius: "9999px",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      {items.length}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                    }}
                  >
                    {items.map((row, idx) => (
                      <div
                        key={idx}
                        style={{
                          background:
                            "linear-gradient(to bottom right, rgb(31 41 55), rgb(55 65 81))",
                          border: "1px solid rgb(55 65 81)",
                          borderRadius: "8px",
                          padding: "12px",
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.boxShadow =
                            "0 4px 12px rgba(0, 0, 0, 0.3)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        <div
                          style={{
                            fontWeight: "600",
                            color: "rgb(59 130 246)",
                            marginBottom: "4px",
                          }}
                        >
                          {row.reference} - {row.product}
                        </div>
                        <div
                          style={{
                            fontSize: "12px",
                            color: "rgb(156 163 175)",
                            display: "flex",
                            flexDirection: "column",
                            gap: "2px",
                          }}
                        >
                          <div>Contact: {row.contact}</div>
                          <div>Date: {row.date}</div>
                          <div>
                            From: {row.from}, To: {row.to}
                          </div>
                          <div>Qty: {row.quantity}</div>
                        </div>
                        <div style={{ marginTop: "8px" }}>
                          {getStatusBadge(row)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Info note */}
          <div
            style={{
              marginTop: "24px",
              fontSize: "14px",
              color: "rgb(156 163 175)",
              backgroundColor: "rgb(31 41 55)",
              border: "1px solid rgb(55 65 81)",
              borderRadius: "8px",
              padding: "16px",
            }}
          >
            Populate all moves done between{" "}
            <span style={{ fontWeight: "600" }}>from</span> and{" "}
            <span style={{ fontWeight: "600" }}>to</span> location in inventory.
            <br />
            If a single reference has multiple products, display them in
            multiple rows.
            <br />
            <span style={{ color: "rgb(34 197 94)", fontWeight: "600" }}>
              In events
            </span>{" "}
            will be shown in green.
            <br />
            <span style={{ color: "rgb(239 68 68)", fontWeight: "600" }}>
              Out moves
            </span>{" "}
            will be shown in red.
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
