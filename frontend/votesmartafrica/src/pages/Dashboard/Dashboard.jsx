import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const turnoutData = [
    { region: "Central", turnout: 72 },
    { region: "Northern", turnout: 65 },
    { region: "Eastern", turnout: 68 },
    { region: "Western", turnout: 71 },
    { region: "Southern", turnout: 69 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard Overview</h1>
        <p className="text-muted-foreground">
          Comprehensive election analytics and insights
        </p>
      </div>

      <Tabs defaultValue="turnout" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="turnout">Turnout</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="turnout" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Regional Voter Turnout</CardTitle>
              <CardDescription>Percentage of registered voters who have cast their votes</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={turnoutData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="region" className="text-muted-foreground" />
                  <YAxis className="text-muted-foreground" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="turnout" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="demographics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Voter Demographics</CardTitle>
              <CardDescription>Breakdown of registered voters by age and gender</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { group: "18-25 years", percentage: 24 },
                  { group: "26-35 years", percentage: 32 },
                  { group: "36-50 years", percentage: 28 },
                  { group: "50+ years", percentage: 16 },
                ].map((demo) => (
                  <div key={demo.group} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{demo.group}</span>
                      <span className="text-muted-foreground">{demo.percentage}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${demo.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Election Trends</CardTitle>
              <CardDescription>Historical data and predictions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <p>Trend analysis coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
