import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { Users, UserCheck, MapPin, AlertCircle, Shield, Eye } from "lucide-react";

const AdminDemo = () => {
  const { user, isAdmin } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">City Pulse - Admin Features Demo</h1>
          <p className="text-gray-600">Demonstrating the difference between Admin and User access</p>
        </div>

        {/* User Info Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {isAdmin() ? <Shield className="w-5 h-5 text-red-600" /> : <Users className="w-5 h-5 text-blue-600" />}
              Current User Status
            </CardTitle>
            <CardDescription>
              Your current role and permissions in the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Name:</span>
                <span>{user?.name || 'Not logged in'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Email:</span>
                <span>{user?.email || 'N/A'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Role:</span>
                <Badge variant={isAdmin() ? "destructive" : "default"} className="ml-2">
                  {isAdmin() ? "Admin (Civic Authority)" : "User (Citizen)"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Admin Features */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <Shield className="w-5 h-5" />
                Admin Features
              </CardTitle>
              <CardDescription>
                What admins (Civic Authorities) can do
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Eye className="w-4 h-4 mt-1 text-green-600" />
                  <div>
                    <p className="text-sm font-medium">View All Issue Details</p>
                    <p className="text-xs text-gray-600">See reporter email, full information</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <UserCheck className="w-4 h-4 mt-1 text-green-600" />
                  <div>
                    <p className="text-sm font-medium">Change Issue Status</p>
                    <p className="text-xs text-gray-600">Update to Open(1), In Progress(2), Under Review(3), Resolved(4)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 mt-1 text-green-600" />
                  <div>
                    <p className="text-sm font-medium">Delete Issues</p>
                    <p className="text-xs text-gray-600">Remove inappropriate or resolved issues</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-1 text-green-600" />
                  <div>
                    <p className="text-sm font-medium">No "Report Issue" Menu</p>
                    <p className="text-xs text-gray-600">Admins manage existing issues, not create them</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <UserCheck className="w-4 h-4 mt-1 text-green-600" />
                  <div>
                    <p className="text-sm font-medium">Reason Required</p>
                    <p className="text-xs text-gray-600">Must provide reason for any action - sent to reporter via email</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Features */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-600">
                <Users className="w-5 h-5" />
                User Features
              </CardTitle>
              <CardDescription>
                What users (Citizens) can do
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Eye className="w-4 h-4 mt-1 text-green-600" />
                  <div>
                    <p className="text-sm font-medium">View Issue Details</p>
                    <p className="text-xs text-gray-600">See basic information in modal</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-1 text-green-600" />
                  <div>
                    <p className="text-sm font-medium">Report New Issues</p>
                    <p className="text-xs text-gray-600">"Report Issue" menu available to report problems</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 mt-1 text-red-400" />
                  <div>
                    <p className="text-sm font-medium">No Status Changes</p>
                    <p className="text-xs text-gray-600">Cannot change issue status</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 mt-1 text-red-400" />
                  <div>
                    <p className="text-sm font-medium">No Delete Permission</p>
                    <p className="text-xs text-gray-600">Cannot delete issues</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Eye className="w-4 h-4 mt-1 text-blue-400" />
                  <div>
                    <p className="text-sm font-medium">View Only Mode</p>
                    <p className="text-xs text-gray-600">Modal shows information without admin controls</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* How to Test */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>How to Test the Admin Features</CardTitle>
            <CardDescription>Follow these steps to test the different user roles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Testing as Admin:</h4>
                <ol className="text-sm space-y-1 text-blue-800 ml-4">
                  <li>1. Go to Sign In page</li>
                  <li>2. Choose "Civic Authority" in the login form</li>
                  <li>3. Notice "Report Issue" is hidden from navigation</li>
                  <li>4. Go to Map View</li>
                  <li>5. Click on any issue marker or card</li>
                  <li>6. See admin actions: Status change buttons + Delete button</li>
                  <li>7. Try changing status - modal asks for reason</li>
                </ol>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">Testing as User:</h4>
                <ol className="text-sm space-y-1 text-green-800 ml-4">
                  <li>1. Go to Sign In page</li>
                  <li>2. Choose "Citizen" in the login form</li>
                  <li>3. Notice "Report Issue" appears in navigation</li>
                  <li>4. Go to Map View</li>
                  <li>5. Click on any issue marker or card</li>
                  <li>6. See view-only modal with no admin controls</li>
                  <li>7. Only "Close" button available</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDemo;