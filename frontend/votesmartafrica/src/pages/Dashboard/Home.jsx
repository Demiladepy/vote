import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Vote, TrendingUp, AlertCircle } from "lucide-react";

const Home = () => {
  const stats = [
    {
      title: "Registered Voters",
      value: "2.4M",
      icon: Users,
      change: "+12.5%",
      changeType: "positive",
    },
    {
      title: "Polling Stations",
      value: "8,234",
      icon: Vote,
      change: "+3.2%",
      changeType: "positive",
    },
    {
      title: "Voter Turnout",
      value: "68.9%",
      icon: TrendingUp,
      change: "+5.4%",
      changeType: "positive",
    },
    {
      title: "Pending Issues",
      value: "24",
      icon: AlertCircle,
      change: "-8.1%",
      changeType: "negative",
    },
  ];

  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome Back!</h1>
        <p className="text-gray-600">
          Here's what's happening with your election monitoring today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <Icon className="h-5 w-5 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <p
                  className={`text-sm mt-1 ${
                    stat.changeType === "positive"
                      ? "text-blue-600"
                      : "text-red-600"
                  }`}
                >
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Latest updates from your election monitoring system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: "Voter registration updated", time: "5 minutes ago", type: "success" },
              { action: "New polling station added", time: "1 hour ago", type: "info" },
              { action: "Security alert resolved", time: "3 hours ago", type: "warning" },
              { action: "Daily report generated", time: "5 hours ago", type: "info" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-gray-100">
                <div
                  className={`w-2 h-2 rounded-full ${
                    activity.type === "success"
                      ? "bg-blue-600"
                      : activity.type === "warning"
                      ? "bg-yellow-500"
                      : "bg-gray-500"
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-600">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
