import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Profile from "../pages/Dashboard/Profile";
import ElectionInsights from "../pages/Dashboard/ElectionInsights";
import VoterEducation from "../pages/Dashboard/VoterEducation";
import AdminPanel from "../pages/Dashboard/AdminPanel";
import Chatbot from "../pages/Dashboard/Chatbot";
import Candidates from "../pages/Dashboard/Candidates";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <Profile />;
      case "insights":
        return <ElectionInsights />;
      case "education":
        return <VoterEducation />;
      case "admin":
        return <AdminPanel />;
      case "chatbot":
        return <Chatbot />;
      case "candidates":
        return <Candidates />;
      default:
        return <Profile />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6 bg-white shadow-inner rounded-tl-3xl">
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
