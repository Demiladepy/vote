import React from "react";
import {
  User,
  BarChart2,
  BookOpen,
  Settings,
  Bot,
  Users,
} from "lucide-react";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { label: "Profile", key: "profile", icon: <User size={18} /> },
    { label: "Insights", key: "insights", icon: <BarChart2 size={18} /> },
    { label: "Education", key: "education", icon: <BookOpen size={18} /> },
    { label: "AI Assistant", key: "chatbot", icon: <Bot size={18} /> },
    { label: "Candidates", key: "candidates", icon: <Users size={18} /> },
    { label: "Admin Panel", key: "admin", icon: <Settings size={18} /> },
  ];

  return (
    <div className="w-64 bg-indigo-700 text-white flex flex-col p-5 shadow-lg">
      <h1 className="text-2xl font-bold mb-8 text-center">VoteSmart Africa</h1>
      <nav className="space-y-3">
        {menuItems.map((item) => (
          <button
            key={item.key}
            onClick={() => setActiveTab(item.key)}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-left transition-all duration-200 ${
              activeTab === item.key
                ? "bg-indigo-500 shadow-md"
                : "hover:bg-indigo-600"
            }`}
          >
            {item.icon}
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto text-center text-xs text-gray-300 pt-6 border-t border-indigo-500">
        © 2025 VoteSmart Africa
      </div>
    </div>
  );
};

export default Sidebar;
