import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { MapPin, Camera, Upload } from "lucide-react";

const ReportIssue = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    images: []
  });

  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          handleChange("location", `${latitude},${longitude}`);
          setIsGettingLocation(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsGettingLocation(false);
        }
      );
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    handleChange("images", [...formData.images, ...files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Build FormData
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("location", formData.location);

      formData.images.forEach((file, index) => {
        data.append("images", file); // multiple files with same key
      });

      const response = await axios.post("http://localhost:5000/report-issue", data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      console.log("Issue submitted:", response.data);
      setSuccess("Issue reported successfully!");
      setFormData({
        title: "",
        description: "",
        category: "",
        location: "",
        images: []
      });

    } catch (err) {
      console.error("Error submitting issue:", err.response?.data || err);
      setError(err.response?.data?.message || "Failed to submit issue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Camera className="h-6 w-6" />
            Report a Civic Issue
          </CardTitle>
          <CardDescription>
            Help improve your community by reporting civic issues with detailed information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Issue Title</Label>
              <Input
                id="title"
                placeholder="Brief description of the issue"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                required
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={formData.category}
                onChange={(e) => handleChange("category", e.target.value)}
                required
              >
                <option value="">Select a category</option>
                <option value="road">Road & Transportation</option>
                <option value="waste">Waste Management</option>
                <option value="water">Water & Drainage</option>
                <option value="electricity">Electricity</option>
                <option value="parks">Parks & Recreation</option>
                <option value="safety">Public Safety</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Detailed Description</Label>
              <Textarea
                id="description"
                placeholder="Provide detailed information about the issue..."
                rows={4}
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                required
              />
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <div className="flex gap-2">
                <Input
                  id="location"
                  placeholder="Enter location or use current location"
                  value={formData.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={getCurrentLocation}
                  disabled={isGettingLocation}
                  className="shrink-0"
                >
                  <MapPin className="h-4 w-4" />
                  {isGettingLocation ? "Getting..." : "Current"}
                </Button>
              </div>
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <Label htmlFor="images">Upload Images/Videos</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">
                  Upload photos or videos as evidence
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <Button type="button" variant="outline" className="pointer-events-none">
                    Choose Files
                  </Button>
                </Label>
                {formData.images.length > 0 && (
                  <p className="text-sm text-muted-foreground mt-2">
                    {formData.images.length} file(s) selected
                  </p>
                )}
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? "Submitting..." : "Submit Issue Report"}
            </Button>

            {success && <p className="text-green-500 mt-2">{success}</p>}
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportIssue;