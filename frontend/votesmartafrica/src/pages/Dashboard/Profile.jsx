
import React from "react";
import { User, Mail, Settings, LogOut, MapPin, Shield, Edit } from "lucide-react";
import { useUser } from "../../context/UserContext";

const Profile = () => {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100">
        <div className="bg-white rounded-2xl shadow-xl p-10 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Profile Data</h2>
          <p className="text-gray-500 mb-4">Please log in or create a profile to view your information.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col items-center py-12 px-4 md:px-10">
      {/* Header */}
      <div className="max-w-5xl w-full mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">My Profile</h1>
        <p className="text-gray-600 text-lg">
          Manage your account information, voter identity, and system preferences.
        </p>
      </div>

      {/* Profile Card */}
      <div className="max-w-5xl w-full grid md:grid-cols-3 gap-10">
        {/* Left Panel */}
        <div className="bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center text-center border border-blue-100">
          <div className="relative mb-4">
            <img
              src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name || 'user'}`}
              alt="User Avatar"
              className="w-36 h-36 rounded-full shadow-lg border-4 border-blue-200 object-cover"
            />
            <span className="absolute bottom-2 right-2 bg-green-400 border-2 border-white w-5 h-5 rounded-full"></span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">{user.name}</h2>
          <p className="text-blue-600 text-base font-medium mb-2">{user.role}</p>
          <p className="text-gray-500 text-base mb-4">{user.location}</p>

          <button className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-base rounded-xl shadow hover:from-blue-700 hover:to-purple-700 transition-all font-semibold">
            <Edit size={18} />
            Edit Profile
          </button>
        </div>

        {/* Middle Panel */}
        <div className="md:col-span-2 bg-white rounded-3xl shadow-xl p-10 border border-blue-100">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Personal Information</h3>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <User className="text-blue-600" size={24} />
              <p className="text-gray-800 text-lg"><strong>Name:</strong> {user.name}</p>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="text-blue-600" size={24} />
              <p className="text-gray-800 text-lg"><strong>Email:</strong> {user.email}</p>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="text-blue-600" size={24} />
              <p className="text-gray-800 text-lg"><strong>Location:</strong> {user.location}</p>
            </div>
            <div className="flex items-center gap-4">
              <Shield className="text-blue-600" size={24} />
              <p className="text-gray-800 text-lg"><strong>Voter ID:</strong> {user.voterId}</p>
            </div>
            <div className="flex items-center gap-4">
              <Settings className="text-blue-600" size={24} />
              <p className="text-gray-800 text-lg"><strong>Member Since:</strong> {user.joined}</p>
            </div>
          </div>

          <div className="mt-10 border-t pt-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Account Settings</h3>
            <div className="space-y-4">
              <button className="w-full flex justify-between items-center text-gray-800 hover:text-blue-600 transition-all text-lg font-medium">
                Change Password
                <span className="text-base text-gray-400">&gt;</span>
              </button>
              <button className="w-full flex justify-between items-center text-gray-800 hover:text-blue-600 transition-all text-lg font-medium">
                Manage Two-Factor Authentication
                <span className="text-base text-gray-400">&gt;</span>
              </button>
              <button className="w-full flex justify-between items-center text-gray-800 hover:text-blue-600 transition-all text-lg font-medium">
                Privacy & Security
                <span className="text-base text-gray-400">&gt;</span>
              </button>
            </div>

            <button className="mt-10 flex items-center gap-3 text-red-600 font-semibold hover:text-red-700 transition-all text-lg">
              <LogOut size={22} />
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
