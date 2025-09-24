import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, Heart, Award } from "lucide-react";

const AboutUs = () => {
  const team = [
    { name: "Sarah Johnson", role: "Project Director", description: "Leading civic technology initiatives" },
    { name: "Mike Chen", role: "Technical Lead", description: "Building scalable solutions for cities" },
    { name: "Emily Rodriguez", role: "Community Manager", description: "Connecting citizens with local government" },
    { name: "David Kumar", role: "Data Analyst", description: "Analyzing civic trends and patterns" },
  ];

  const achievements = [
    { icon: Users, title: "50,000+", description: "Active Citizens" },
    { icon: Target, title: "15,000+", description: "Issues Resolved" },
    { icon: Heart, title: "200+", description: "Communities Served" },
    { icon: Award, title: "5", description: "Awards Won" },
  ];

  return (
    <div className="container mx-auto p-4">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About City Pulse</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          We're revolutionizing how citizens interact with local government through technology, 
          transparency, and community collaboration.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              To bridge the gap between citizens and local government by providing a transparent, 
              efficient platform for reporting and resolving civic issues. We believe every voice 
              matters in building better communities.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Our Vision</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              A world where every citizen has the power to contribute to their community's 
              improvement, where local governments are responsive and transparent, and where 
              technology serves as a catalyst for positive civic change.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8">Our Impact</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <Icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-2xl font-bold mb-2">{achievement.title}</h3>
                  <p className="text-muted-foreground text-sm">{achievement.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Team */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8">Meet Our Team</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <Card key={index}>
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold mb-1">{member.name}</h3>
                <p className="text-primary text-sm mb-2">{member.role}</p>
                <p className="text-muted-foreground text-xs">{member.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Values */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Our Values</CardTitle>
          <CardDescription className="text-center">
            The principles that guide everything we do
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="font-semibold mb-2">Transparency</h3>
              <p className="text-muted-foreground text-sm">
                Open communication and clear processes build trust between citizens and government.
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold mb-2">Community First</h3>
              <p className="text-muted-foreground text-sm">
                Every decision we make prioritizes the needs and voices of the communities we serve.
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold mb-2">Innovation</h3>
              <p className="text-muted-foreground text-sm">
                We continuously improve our platform to better serve citizens and local governments.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutUs;