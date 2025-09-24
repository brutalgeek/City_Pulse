import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Filter, Search, Eye, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import InteractiveMap from "@/components/InteractiveMap";
import IssueDetailsModal from "@/components/IssueDetailsModal";
import { useNavigate } from "react-router-dom";

const MapView = () => {
  const navigate = useNavigate();
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock data for testing
  const mockIssues = [
    {
      id: 1,
      title: "Pothole on Main Street",
      description: "Large pothole causing traffic issues near the downtown intersection. Multiple vehicles have reported damage.",
      category: "Infrastructure",
      status: 1, // 1 = Open
      priority: "High",
      latitude: 22.5726,
      longitude: 88.3639,
      reportedBy: "John Doe",
      reporterEmail: "john.doe@example.com",
      reportedDate: "2024-01-15",
      location: "Main Street, Downtown",
      image: "https://via.placeholder.com/400x300/ff6b6b/ffffff?text=Pothole"
    },
    {
      id: 2,
      title: "Street Light Not Working",
      description: "Street light has been out for 3 days, creating safety concerns for pedestrians during evening hours.",
      category: "Utilities",
      status: 2, // 2 = In Progress
      priority: "Medium",
      latitude: 22.5676,
      longitude: 88.3695,
      reportedBy: "Jane Smith",
      reporterEmail: "jane.smith@example.com",
      reportedDate: "2024-01-14",
      location: "Park Avenue, Sector 5",
      image: "https://via.placeholder.com/400x300/4ecdc4/ffffff?text=Street+Light"
    },
    {
      id: 3,
      title: "Garbage Collection Issue",
      description: "Trash not collected for over a week, causing hygiene issues and attracting pests in the residential area.",
      category: "Sanitation",
      status: 4, // 4 = Resolved
      priority: "Low",
      latitude: 22.5812,
      longitude: 88.3452,
      reportedBy: "Mike Johnson",
      reporterEmail: "mike.johnson@example.com",
      reportedDate: "2024-01-10",
      location: "Residential Complex, Block A",
      image: "https://via.placeholder.com/400x300/45b7d1/ffffff?text=Garbage+Issue"
    },
    {
      id: 4,
      title: "Broken Water Pipe",
      description: "Major water leak from underground pipe causing road damage and water wastage.",
      category: "Utilities",
      status: 3, // 3 = Under Review
      priority: "High",
      latitude: 22.5800,
      longitude: 88.3600,
      reportedBy: "Sarah Wilson",
      reporterEmail: "sarah.wilson@example.com",
      reportedDate: "2024-01-12",
      location: "Central Road, Near Market",
      image: "https://via.placeholder.com/400x300/f39c12/ffffff?text=Water+Leak"
    }
  ];

  // Filter issues based on search and filters
  useEffect(() => {
    let filtered = mockIssues;

    if (searchTerm) {
      filtered = filtered.filter(issue =>
        issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(issue => issue.status === parseInt(statusFilter));
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter(issue => issue.category === categoryFilter);
    }

    setFilteredIssues(filtered);
  }, [searchTerm, statusFilter, categoryFilter]);

  const statusOptions = {
    1: { label: 'Open', color: 'bg-blue-100 text-blue-800' },
    2: { label: 'In Progress', color: 'bg-yellow-100 text-yellow-800' },
    3: { label: 'Under Review', color: 'bg-orange-100 text-orange-800' },
    4: { label: 'Resolved', color: 'bg-green-100 text-green-800' }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    return statusOptions[status]?.color || 'bg-gray-100 text-gray-800';
  };

  const getStatusLabel = (status) => {
    return statusOptions[status]?.label || 'Unknown';
  };

  const handleIssueClick = (issue) => {
    setSelectedIssue(issue);
    setIsModalOpen(true);
  };

  const handleStatusChange = (issueId, newStatus, reason) => {
    // Here you would typically make an API call to update the issue
    console.log(`Changing status of issue ${issueId} to ${newStatus} with reason: ${reason}`);
    
    // Update local state (in a real app, this would come from the server)
    const updatedIssues = mockIssues.map(issue =>
      issue.id === issueId ? { ...issue, status: parseInt(newStatus) } : issue
    );
    
    // Simulate email notification
    console.log(`Email sent to ${selectedIssue?.reporterEmail} about status change`);
    
    alert(`Issue status updated successfully! Notification sent to reporter.`);
  };

  const handleDeleteIssue = (issueId, reason) => {
    // Here you would typically make an API call to delete the issue
    console.log(`Deleting issue ${issueId} with reason: ${reason}`);
    
    // Simulate email notification
    console.log(`Email sent to ${selectedIssue?.reporterEmail} about issue deletion`);
    
    alert(`Issue deleted successfully! Notification sent to reporter.`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Civic Issues Map</h1>
          <p className="text-gray-600">View and explore reported civic issues in your area</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Search Issues</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search by title, description..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Status</label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="1">Open</SelectItem>
                      <SelectItem value="2">In Progress</SelectItem>
                      <SelectItem value="3">Under Review</SelectItem>
                      <SelectItem value="4">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                      <SelectItem value="Utilities">Utilities</SelectItem>
                      <SelectItem value="Sanitation">Sanitation</SelectItem>
                      <SelectItem value="Safety">Safety</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                    setCategoryFilter("all");
                  }}
                  className="w-full"
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Issues ({filteredIssues.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {filteredIssues.map((issue) => (
                    <div
                      key={issue.id}
                      className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => handleIssueClick(issue)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-sm">{issue.title}</h4>
                        <Eye className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      </div>
                      <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                        {issue.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        <Badge className={`text-xs ${getStatusColor(issue.status)}`}>
                          {getStatusLabel(issue.status)}
                        </Badge>
                        <Badge className={`text-xs ${getPriorityColor(issue.priority)}`}>
                          {issue.priority}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                        <MapPin className="w-3 h-3" />
                        {issue.reportedDate}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Interactive Map
                </CardTitle>
                <CardDescription>
                  Click on markers to view issue details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[600px] rounded-lg overflow-hidden">
                  <InteractiveMap issues={filteredIssues} onIssueClick={handleIssueClick} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Issue Details Modal */}
        <IssueDetailsModal
          issue={selectedIssue}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onStatusChange={handleStatusChange}
          onDelete={handleDeleteIssue}
        />
      </div>
    </div>
  );
};

export default MapView;