
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Users, Database, Shield } from "lucide-react";

const initialUsers = [
  { name: "Admin User", email: "admin@votesmart.africa", role: "Administrator" },
  { name: "Field Officer", email: "officer@votesmart.africa", role: "Officer" },
  { name: "Data Analyst", email: "analyst@votesmart.africa", role: "Analyst" },
];

const AdminPanel = () => {
  // General settings state
  const [appName, setAppName] = useState("VoteSmart Africa");
  const [electionDate, setElectionDate] = useState("");
  const [notifications, setNotifications] = useState(true);

  // Users state
  const [users, setUsers] = useState(initialUsers);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "Officer" });
  const [editingIndex, setEditingIndex] = useState(null);
  const [editUser, setEditUser] = useState({ name: "", email: "", role: "Officer" });

  // Security state
  const [twoFA, setTwoFA] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState(true);
  const [auditLogging, setAuditLogging] = useState(true);

  // Handlers
  const handleUserChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };
  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) return;
    setUsers([...users, newUser]);
    setNewUser({ name: "", email: "", role: "Officer" });
  };
  const handleEditUser = (index) => {
    setEditingIndex(index);
    setEditUser(users[index]);
  };
  const handleEditUserChange = (e) => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  };
  const handleSaveEditUser = () => {
    const updated = [...users];
    updated[editingIndex] = editUser;
    setUsers(updated);
    setEditingIndex(null);
  };
  const handleDeleteUser = (index) => {
    setUsers(users.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-10 px-4 md:px-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">Admin Panel</h1>
          <p className="text-gray-600 text-lg">System configuration and management</p>
        </div>

        <Tabs defaultValue="general" className="space-y-8">
          <TabsList className="grid w-full max-w-2xl grid-cols-4 mx-auto mb-6">
            <TabsTrigger value="general">
              <Settings className="h-5 w-5 mr-2" /> General
            </TabsTrigger>
            <TabsTrigger value="users">
              <Users className="h-5 w-5 mr-2" /> Users
            </TabsTrigger>
            <TabsTrigger value="data">
              <Database className="h-5 w-5 mr-2" /> Data
            </TabsTrigger>
            <TabsTrigger value="security">
              <Shield className="h-5 w-5 mr-2" /> Security
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-8">
            <Card className="rounded-3xl shadow-xl border-blue-100">
              <CardHeader>
                <CardTitle className="text-2xl">General Settings</CardTitle>
                <CardDescription>Manage your application settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="app-name">Application Name</Label>
                  <Input id="app-name" name="appName" value={appName} onChange={e => setAppName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="election-date">Election Date</Label>
                  <Input id="election-date" name="electionDate" type="date" value={electionDate} onChange={e => setElectionDate(e.target.value)} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Notifications</Label>
                    <p className="text-sm text-gray-500">Send email notifications for important updates</p>
                  </div>
                  <Switch checked={notifications} onCheckedChange={setNotifications} />
                </div>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 font-semibold">Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* User Management */}
          <TabsContent value="users" className="space-y-8">
            <Card className="rounded-3xl shadow-xl border-blue-100">
              <CardHeader>
                <CardTitle className="text-2xl">User Management</CardTitle>
                <CardDescription>Manage system users and permissions in real time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {users.map((user, index) => (
                    <div key={index} className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border border-blue-100 rounded-xl bg-white shadow-sm">
                      {editingIndex === index ? (
                        <div className="flex flex-col md:flex-row gap-2 md:items-center w-full">
                          <Input name="name" value={editUser.name} onChange={handleEditUserChange} placeholder="Name" className="md:w-40" />
                          <Input name="email" value={editUser.email} onChange={handleEditUserChange} placeholder="Email" className="md:w-56" />
                          <Input name="role" value={editUser.role} onChange={handleEditUserChange} placeholder="Role" className="md:w-32" />
                          <Button onClick={handleSaveEditUser} className="bg-blue-600 hover:bg-blue-700 text-white">Save</Button>
                          <Button onClick={() => setEditingIndex(null)} className="bg-gray-200 text-gray-700">Cancel</Button>
                        </div>
                      ) : (
                        <>
                          <div>
                            <p className="font-semibold text-lg text-gray-900">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                              {user.role}
                            </span>
                            <Button onClick={() => handleEditUser(index)} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">Edit</Button>
                            <Button onClick={() => handleDeleteUser(index)} className="bg-red-100 text-red-600">Delete</Button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                  <div className="flex flex-col md:flex-row gap-2 mt-6">
                    <Input name="name" value={newUser.name} onChange={handleUserChange} placeholder="Name" className="md:w-40" />
                    <Input name="email" value={newUser.email} onChange={handleUserChange} placeholder="Email" className="md:w-56" />
                    <Input name="role" value={newUser.role} onChange={handleUserChange} placeholder="Role" className="md:w-32" />
                    <Button onClick={handleAddUser} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">Add User</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Data Management */}
          <TabsContent value="data" className="space-y-8">
            <Card className="rounded-3xl shadow-xl border-blue-100">
              <CardHeader>
                <CardTitle className="text-2xl">Data Management</CardTitle>
                <CardDescription>Export and manage election data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">Export Voter Data</Button>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">Export Turnout Report</Button>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">Export Analytics</Button>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">Backup Database</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-8">
            <Card className="rounded-3xl shadow-xl border-blue-100">
              <CardHeader>
                <CardTitle className="text-2xl">Security Settings</CardTitle>
                <CardDescription>Configure security and access controls</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-500">Require 2FA for all admin users</p>
                  </div>
                  <Switch checked={twoFA} onCheckedChange={setTwoFA} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Session Timeout</Label>
                    <p className="text-sm text-gray-500">Auto logout after 30 minutes of inactivity</p>
                  </div>
                  <Switch checked={sessionTimeout} onCheckedChange={setSessionTimeout} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Audit Logging</Label>
                    <p className="text-sm text-gray-500">Track all administrative actions</p>
                  </div>
                  <Switch checked={auditLogging} onCheckedChange={setAuditLogging} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
