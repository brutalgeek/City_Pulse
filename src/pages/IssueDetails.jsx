import { useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, MessageCircle, MapPin, Calendar, User } from "lucide-react";

const IssueDetails = () => {
  const { id } = useParams();
  
  // Mock issue data
  const issue = {
    id: id,
    title: "Large Pothole on Main Street",
    description: "There is a significant pothole on Main Street near the intersection with Oak Avenue. It's approximately 3 feet wide and 6 inches deep, causing damage to vehicles and creating a safety hazard for pedestrians and cyclists.",
    category: "Road & Transportation",
    status: "in-progress",
    reportedBy: "John Doe",
    reportedDate: "2024-01-15",
    location: "Main Street & Oak Avenue, Downtown",
    upvotes: 23,
    comments: [
      { id: 1, user: "Jane Smith", comment: "I hit this pothole yesterday and damaged my tire!", time: "2 days ago" },
      { id: 2, user: "Mike Johnson", comment: "This has been an issue for weeks. Thank you for reporting it.", time: "1 day ago" },
    ],
    images: ["pothole1.jpg", "pothole2.jpg"],
    assignedTo: "City Roads Department",
    estimatedCompletion: "2024-01-25"
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "reported": return "destructive";
      case "acknowledged": return "secondary";
      case "in-progress": return "default";
      case "resolved": return "secondary";
      default: return "secondary";
    }
  };

  const getStatusText = (status) => {
    return status.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Issue Header */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-2xl mb-2">{issue.title}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {issue.reportedBy}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {issue.reportedDate}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {issue.location}
                    </div>
                  </div>
                </div>
                <Badge variant={getStatusColor(issue.status)}>
                  {getStatusText(issue.status)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{issue.description}</p>
              
              {/* Images */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                {issue.images.map((image, index) => (
                  <div key={index} className="bg-muted rounded-lg h-32 flex items-center justify-center">
                    <span className="text-muted-foreground text-sm">Image {index + 1}</span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <ThumbsUp className="h-4 w-4" />
                  Upvote ({issue.upvotes})
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Comment ({issue.comments.length})
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Comments */}
          <Card>
            <CardHeader>
              <CardTitle>Community Comments</CardTitle>
              <CardDescription>What others are saying about this issue</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {issue.comments.map((comment) => (
                <div key={comment.id} className="border-l-2 border-muted pl-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">{comment.user}</span>
                    <span className="text-xs text-muted-foreground">{comment.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{comment.comment}</p>
                </div>
              ))}
              
              <div className="pt-4 border-t">
                <textarea 
                  placeholder="Add your comment..."
                  className="w-full p-3 border rounded-md text-sm"
                  rows={3}
                />
                <Button size="sm" className="mt-2">Post Comment</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Issue Info */}
          <Card>
            <CardHeader>
              <CardTitle>Issue Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <span className="text-sm font-medium">Category:</span>
                <p className="text-sm text-muted-foreground">{issue.category}</p>
              </div>
              <div>
                <span className="text-sm font-medium">Status:</span>
                <p className="text-sm text-muted-foreground">{getStatusText(issue.status)}</p>
              </div>
              <div>
                <span className="text-sm font-medium">Assigned To:</span>
                <p className="text-sm text-muted-foreground">{issue.assignedTo}</p>
              </div>
              <div>
                <span className="text-sm font-medium">Estimated Completion:</span>
                <p className="text-sm text-muted-foreground">{issue.estimatedCompletion}</p>
              </div>
            </CardContent>
          </Card>

          {/* Progress Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Progress Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-destructive rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">Issue Reported</p>
                    <p className="text-xs text-muted-foreground">Jan 15, 2024</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">Acknowledged</p>
                    <p className="text-xs text-muted-foreground">Jan 16, 2024</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">In Progress</p>
                    <p className="text-xs text-muted-foreground">Jan 18, 2024</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-muted-foreground rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Resolved</p>
                    <p className="text-xs text-muted-foreground">Pending</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default IssueDetails;