import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Users, BarChart3, Bell } from "lucide-react";
import cityPulseLogo from "@/assets/city-pulse-logo.png";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 to-secondary/10 py-20">
        <div className="container mx-auto px-4 text-center">
          <img 
            src={cityPulseLogo} 
            alt="City Pulse Logo" 
            className="mx-auto mb-8 h-24 w-24"
          />
          <h1 className="mb-6 text-5xl font-bold text-foreground">
            City <span className="text-primary">Pulse</span>
          </h1>
          <p className="mb-8 text-xl text-muted-foreground max-w-2xl mx-auto">
            Empowering citizens to report and resolve civic issues through crowdsourced validation and real-time tracking
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link to="/report-issue">Report an Issue</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/map">View Issue Map</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-lg bg-card border">
              <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Report Issues</h3>
              <p className="text-muted-foreground">Report civic issues with photos, descriptions, and location</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-card border">
              <Users className="h-12 w-12 text-secondary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Community Validation</h3>
              <p className="text-muted-foreground">Crowdsourced validation through upvotes and comments</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-card border">
              <BarChart3 className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Analytics Dashboard</h3>
              <p className="text-muted-foreground">Track progress with comprehensive analytics and trends</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-card border">
              <Bell className="h-12 w-12 text-secondary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Real-time Updates</h3>
              <p className="text-muted-foreground">Get notified about issue status changes instantly</p>
            </div>
          </div>
        </div>
      </section>

      {/* Resolution Lifecycle */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Resolution Lifecycle</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-destructive rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-destructive-foreground font-bold">1</span>
              </div>
              <h3 className="font-semibold">Reported</h3>
            </div>
            <div className="hidden md:block w-12 h-0.5 bg-border"></div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="font-semibold">Acknowledged</h3>
            </div>
            <div className="hidden md:block w-12 h-0.5 bg-border"></div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-foreground font-bold">3</span>
              </div>
              <h3 className="font-semibold">In Progress</h3>
            </div>
            <div className="hidden md:block w-12 h-0.5 bg-border"></div>
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-secondary-foreground font-bold">4</span>
              </div>
              <h3 className="font-semibold">Resolved</h3>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of citizens working together to improve our city
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90">
              <Link to="/signup">Sign Up Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/login">Already have an account?</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;