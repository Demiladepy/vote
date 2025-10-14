import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, AlertTriangle, CheckCircle, Info } from "lucide-react";

const ElectionInsights = () => {
  const insights = [
    {
      title: "High Voter Registration in Urban Areas",
      description: "Urban centers show 15% increase in voter registration compared to last election",
      impact: "high",
      icon: TrendingUp,
      category: "Positive Trend",
    },
    {
      title: "Low Youth Engagement Detected",
      description: "18-25 age group showing lower registration rates than previous years",
      impact: "medium",
      icon: AlertTriangle,
      category: "Action Needed",
    },
    {
      title: "Polling Station Infrastructure Complete",
      description: "All planned polling stations are ready and equipped for election day",
      impact: "positive",
      icon: CheckCircle,
      category: "On Track",
    },
    {
      title: "Peak Registration Hours Identified",
      description: "Data shows highest registration activity between 10 AM - 2 PM",
      impact: "info",
      icon: Info,
      category: "Information",
    },
  ];

  const getImpactColor = (impact) => {
    switch (impact) {
      case "high":
        return "border-l-4 border-blue-600 bg-blue-50";
      case "medium":
        return "border-l-4 border-yellow-500 bg-yellow-50";
      case "positive":
        return "border-l-4 border-green-500 bg-green-50";
      case "info":
        return "border-l-4 border-gray-400 bg-gray-50";
      default:
        return "border-l-4 border-gray-300 bg-white";
    }
  };

  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Election Insights</h1>
        <p className="text-gray-600">
          AI-powered analytics and actionable intelligence
        </p>
      </div>

      <div className="grid gap-6">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <Card key={index} className={`hover:shadow-lg transition-all ${getImpactColor(insight.impact)}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-gray-700" />
                    <div>
                      <CardTitle className="text-lg font-semibold">{insight.title}</CardTitle>
                      <CardDescription className="mt-1 text-gray-700">{insight.description}</CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline">{insight.category}</Badge>
                </div>
              </CardHeader>
            </Card>
          );
        })}
      </div>

      {/* AI Analysis */}
      <Card className="bg-gradient-to-br from-blue-50 to-green-50 border border-blue-100">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2 text-blue-700">
            <TrendingUp className="h-6 w-6" />
            AI Prediction: Voter Turnout
          </CardTitle>
          <CardDescription>Based on historical data and current trends</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium">Predicted Turnout</span>
              <span className="text-3xl font-bold text-blue-600">72.4%</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-green-400 rounded-full transition-all"
                style={{ width: "72.4%" }}
              />
            </div>
            <p className="text-sm text-gray-500">
              Confidence level: 87% • Updated 2 hours ago
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ElectionInsights;
