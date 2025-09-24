import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Star, Zap, Shield } from "lucide-react";

const Updates = () => {
  const updates = [
    {
      id: 1,
      title: "Enhanced Map Features",
      date: "2024-01-20",
      type: "feature",
      description: "We've improved our interactive map with better filtering options and real-time updates. You can now filter issues by category, status, and date range.",
      tags: ["Maps", "UI/UX", "Filtering"]
    },
    {
      id: 2,
      title: "Mobile App Performance Update",
      date: "2024-01-18",
      type: "improvement",
      description: "Significant performance improvements for mobile devices. Faster loading times and smoother navigation throughout the app.",
      tags: ["Mobile", "Performance", "Speed"]
    },
    {
      id: 3,
      title: "New Issue Categories Added",
      date: "2024-01-15",
      type: "feature",
      description: "Added new categories for Parks & Recreation and Public Safety to better organize civic issues. Updated the reporting form accordingly.",
      tags: ["Categories", "Reporting", "Organization"]
    },
    {
      id: 4,
      title: "Security Enhancement",
      date: "2024-01-12",
      type: "security",
      description: "Implemented additional security measures including two-factor authentication and enhanced data encryption for user protection.",
      tags: ["Security", "Authentication", "Privacy"]
    },
    {
      id: 5,
      title: "Community Validation System",
      date: "2024-01-10",
      type: "feature",
      description: "Launched the community validation system allowing citizens to upvote and comment on issues, increasing transparency and community engagement.",
      tags: ["Community", "Validation", "Engagement"]
    },
    {
      id: 6,
      title: "Dashboard Analytics Upgrade",
      date: "2024-01-08",
      type: "improvement",
      description: "Enhanced the analytics dashboard with new charts, trend analysis, and export capabilities for better insights into civic issues.",
      tags: ["Analytics", "Dashboard", "Insights"]
    }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case "feature": return <Star className="h-4 w-4" />;
      case "improvement": return <Zap className="h-4 w-4" />;
      case "security": return <Shield className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "feature": return "default";
      case "improvement": return "secondary";
      case "security": return "destructive";
      default: return "outline";
    }
  };

  const getTypeText = (type) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Platform Updates</h1>
        <p className="text-muted-foreground">
          Stay informed about the latest features, improvements, and security updates to City Pulse
        </p>
      </div>

      {/* Recent Highlights */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Recent Highlights</CardTitle>
          <CardDescription>Major updates and improvements from the past month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <Star className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold mb-1">3 New Features</h3>
              <p className="text-sm text-muted-foreground">Enhanced user experience</p>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <Zap className="h-8 w-8 mx-auto mb-2 text-secondary" />
              <h3 className="font-semibold mb-1">Performance Boost</h3>
              <p className="text-sm text-muted-foreground">40% faster loading times</p>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <Shield className="h-8 w-8 mx-auto mb-2 text-destructive" />
              <h3 className="font-semibold mb-1">Security Enhanced</h3>
              <p className="text-sm text-muted-foreground">Advanced protection measures</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Updates Timeline */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Recent Updates</h2>
        {updates.map((update) => (
          <Card key={update.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge variant={getTypeColor(update.type)} className="flex items-center gap-1">
                      {getTypeIcon(update.type)}
                      {getTypeText(update.type)}
                    </Badge>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {update.date}
                    </span>
                  </div>
                  <CardTitle className="text-xl">{update.title}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{update.description}</p>
              <div className="flex flex-wrap gap-2">
                {update.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upcoming Features */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>Features we're working on for future releases</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm">Push notifications for issue updates</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm">Advanced search and filtering options</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm">Integration with social media platforms</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm">Multi-language support</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Updates;