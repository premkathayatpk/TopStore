import React from "react";

const AdminDashboard = () => {
  // Mock statistical metrics for display
  const metrics = [
    {
      id: 1,
      name: "Total Revenue",
      value: "$48,250.00",
      change: "+12.5%",
      isPositive: true,
      timeframe: "from last month",
      iconBg: "bg-green-50 text-green-600",
      iconPath:
        "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      id: 2,
      name: "Active Orders",
      value: "142",
      change: "+8.2%",
      isPositive: true,
      timeframe: "vs yesterday",
      iconBg: "bg-amber-50 text-amber-600",
      iconPath: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z",
    },
    {
      id: 3,
      name: "Total Customers",
      value: "1,840",
      change: "+4.3%",
      isPositive: true,
      timeframe: "from last week",
      iconBg: "bg-indigo-50 text-indigo-600",
      iconPath:
        "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    },
    {
      id: 4,
      name: "Support Tickets",
      value: "12 Pending",
      change: "-18.4%",
      isPositive: false, // Negative drop here means fewer tickets, which is good!
      timeframe: "vs last week",
      iconBg: "bg-red-50 text-red-600",
      iconPath:
        "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    },
  ];

  // Mock array for recent operational events
  const recentActivity = [
    {
      id: 1,
      user: "Prem Kathayat",
      action: "submitted a support ticket",
      time: "2 mins ago",
    },
    {
      id: 2,
      user: "System Core",
      action: "automatically backed up database successfully",
      time: "45 mins ago",
    },
    {
      id: 3,
      user: "Admin",
      action: "marked Order #732E41 as Shipped",
      time: "2 hours ago",
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto font-sans text-gray-900">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Dashboard Overview
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Real-time platform metrics, sales health status indicators, and
          background process auditing.
        </p>
      </div>

      {/* Grid of 4 KPI Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {metrics.map((card) => (
          <div
            key={card.id}
            className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between"
          >
            <div className="space-y-2">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">
                {card.name}
              </span>
              <span className="text-2xl font-bold tracking-tight block">
                {card.value}
              </span>
              <div className="flex items-center space-x-1.5 text-xs font-medium">
                <span
                  className={
                    card.isPositive ? "text-green-600" : "text-red-600"
                  }
                >
                  {card.change}
                </span>
                <span className="text-gray-400">{card.timeframe}</span>
              </div>
            </div>

            {/* Dynamic SVG Icon Wrapper */}
            <div
              className={`h-12 w-12 rounded-xl flex items-center justify-center ${card.iconBg}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={card.iconPath}
                />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Two-Column Midsection Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Large Analytics Chart Box (2/3 width) */}
        <div className="lg:col-span-2 bg-white p-6 border border-gray-200 rounded-xl shadow-sm flex flex-col justify-between min-h-[350px]">
          <div>
            <h2 className="text-base font-bold text-gray-900">
              Revenue Analytics Engine
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Visual representation of weekly performance trajectories.
            </p>
          </div>

          {/* Visual Grid Graphic Mock */}
          <div className="flex-1 my-6 bg-gray-50 border border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-400 p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-gray-300 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d={
                  /* Grid Icon */ "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z"
                }
              />
            </svg>
            <span className="text-xs font-semibold text-gray-500">
              Graph Datastream Canvas Ready
            </span>
            <span className="text-xxs text-gray-400 mt-1 max-w-xs text-center">
              Connect Chart.js, Recharts, or ApexCharts to hook into your data
              objects.
            </span>
          </div>

          <div className="flex items-center justify-between text-xs font-medium text-gray-400 pt-2 border-t border-gray-100">
            <span>Data updated 1 min ago</span>
            <button className="text-indigo-600 hover:text-indigo-700 hover:underline transition-colors">
              View Deep Audit
            </button>
          </div>
        </div>

        {/* Right Side: Operational Activity Feed (1/3 width) */}
        <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm flex flex-col justify-between min-h-[350px]">
          <div>
            <h2 className="text-base font-bold text-gray-900">
              Live Operation Stream
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Background audit track of modifications across collections.
            </p>
          </div>

          {/* Activity Event Feed Timeline */}
          <div className="flex-1 my-5 space-y-4 overflow-y-auto pr-1">
            {recentActivity.map((act) => (
              <div
                key={act.id}
                className="text-xs border-l-2 border-indigo-500 pl-3 py-0.5 space-y-0.5"
              >
                <p className="text-gray-700 leading-normal">
                  <span className="font-bold text-gray-900">{act.user}</span>{" "}
                  {act.action}
                </p>
                <span className="text-gray-400 block font-medium">
                  {act.time}
                </span>
              </div>
            ))}
          </div>

          <button className="w-full text-center py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-bold rounded-xl border border-gray-200 transition-colors">
            View All Access Logs
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
