import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, CheckCircle, Clock, AlertTriangle } from "lucide-react";

const Dashboard = () => {
  const stats = [
    { title: "Total Issues", value: "1,234", icon: AlertTriangle, change: "+12%" },
    { title: "Resolved Issues", value: "987", icon: CheckCircle, change: "+8%" },
    { title: "In Progress", value: "156", icon: Clock, change: "-3%" },
    { title: "Active Users", value: "5,678", icon: Users, change: "+15%" },
  ];

  const recentIssues = [
    { id: 1, title: "Pothole on Main Street", status: "reported", category: "road", time: "2 hours ago" },
    { id: 2, title: "Broken Street Light", status: "in-progress", category: "electricity", time: "4 hours ago" },
    { id: 3, title: "Garbage Overflow", status: "acknowledged", category: "waste", time: "6 hours ago" },
    { id: 4, title: "Water Leakage", status: "resolved", category: "water", time: "1 day ago" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "reported": return "text-destructive";
      case "acknowledged": return "text-yellow-600";
      case "in-progress": return "text-primary";
      case "resolved": return "text-secondary";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Track civic issue trends and progress</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className={`text-xs ${stat.change.startsWith('+') ? 'text-secondary' : 'text-destructive'}`}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <Icon className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Charts Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Issues by Category
            </CardTitle>
            <CardDescription>Distribution of issues across different categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { category: "Road & Transportation", count: 456, percentage: 37 },
                { category: "Waste Management", count: 289, percentage: 23 },
                { category: "Water & Drainage", count: 234, percentage: 19 },
                { category: "Electricity", count: 167, percentage: 14 },
                { category: "Others", count: 88, percentage: 7 },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{item.category}</span>
                    <span className="text-muted-foreground">{item.count}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Issues */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Recent Issues
            </CardTitle>
            <CardDescription>Latest reported civic issues</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentIssues.map((issue) => (
                <div key={issue.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{issue.title}</h4>
                    <p className="text-xs text-muted-foreground capitalize">{issue.category}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-xs font-medium capitalize ${getStatusColor(issue.status)}`}>
                      {issue.status.replace("-", " ")}
                    </p>
                    <p className="text-xs text-muted-foreground">{issue.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trends */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Monthly Trends</CardTitle>
          <CardDescription>Issue resolution trends over the past 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/30 rounded-lg h-64 flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Chart visualization will be displayed here</p>
              <p className="text-sm text-muted-foreground mt-2">
                Integration with charting library (Chart.js/Recharts)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;