import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

const MapView = () => {
  const mockIssues = [
    { id: 1, title: "Pothole on Main Street", category: "road", status: "reported", lat: 22.5726, lng: 88.3639 },
    { id: 2, title: "Broken Street Light", category: "electricity", status: "in-progress", lat: 22.5676, lng: 88.3678 },
    { id: 3, title: "Garbage Overflow", category: "waste", status: "acknowledged", lat: 22.5756, lng: 88.3598 },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "reported": return "bg-destructive";
      case "acknowledged": return "bg-yellow-500";
      case "in-progress": return "bg-primary";
      case "resolved": return "bg-secondary";
      default: return "bg-muted";
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Issue Map</h1>
        <p className="text-muted-foreground">View all reported civic issues on the map</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Map Container */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Interactive Map</CardTitle>
                <CardDescription>Click on markers to view issue details</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </CardHeader>
            <CardContent>
              <div className="bg-muted rounded-lg h-96 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Interactive map will be displayed here</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Integration with mapping service (Google Maps/OpenStreetMap)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Issues List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Recent Issues</h2>
          {mockIssues.map((issue) => (
            <Card key={issue.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium">{issue.title}</h3>
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(issue.status)}`}></div>
                </div>
                <p className="text-sm text-muted-foreground capitalize mb-2">{issue.category}</p>
                <p className="text-sm text-muted-foreground capitalize">Status: {issue.status.replace("-", " ")}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Legend */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Status Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-destructive"></div>
              <span className="text-sm">Reported</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
              <span className="text-sm">Acknowledged</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-primary"></div>
              <span className="text-sm">In Progress</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-secondary"></div>
              <span className="text-sm">Resolved</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MapView;