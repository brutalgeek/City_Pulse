import { AppHeader } from "@/components/app/header";
import { AppFooter } from "@/components/app/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, Building } from "lucide-react";

export default function AboutUsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">About CityPulse</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Connecting communities and city officials to build better, smarter cities together.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-center mb-16">
            <Card>
                <CardHeader>
                    <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
                        <Building className="h-8 w-8 text-primary" />
                    </div>
                </CardHeader>
                <CardContent>
                    <CardTitle className="mb-2 text-xl">Our Vision</CardTitle>
                    <p className="text-muted-foreground">
                        To empower every citizen to become an active participant in the improvement of their urban environment.
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
                        <Target className="h-8 w-8 text-primary" />
                    </div>
                </CardHeader>
                <CardContent>
                    <CardTitle className="mb-2 text-xl">Our Mission</CardTitle>
                    <p className="text-muted-foreground">
                        To provide a simple, intuitive platform that streamlines the reporting and resolution of civic issues.
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
                        <Users className="h-8 w-8 text-primary" />
                    </div>
                </CardHeader>
                <CardContent>
                    <CardTitle className="mb-2 text-xl">Our Team</CardTitle>
                    <p className="text-muted-foreground">
                        A dedicated group of developers, designers, and urban planners passionate about civic technology.
                    </p>
                </CardContent>
            </Card>
        </div>

        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-6">How It Works</h2>
            <ol className="relative border-l border-border">
                <li className="mb-10 ml-6">
                    <span className="absolute flex items-center justify-center w-6 h-6 bg-primary rounded-full -left-3 ring-8 ring-background">1</span>
                    <h3 className="font-semibold text-lg">Report an Issue</h3>
                    <p className="text-muted-foreground">See a pothole, broken streetlight, or overflowing trash can? Snap a photo and submit a report in seconds through our app.</p>
                </li>
                <li className="mb-10 ml-6">
                    <span className="absolute flex items-center justify-center w-6 h-6 bg-primary rounded-full -left-3 ring-8 ring-background">2</span>
                    <h3 className="font-semibold text-lg">City Acknowledges</h3>
                    <p className="text-muted-foreground">The relevant city department is notified. They acknowledge the report and can provide updates on their plan.</p>
                </li>
                <li className="mb-10 ml-6">
                    <span className="absolute flex items-center justify-center w-6 h-6 bg-primary rounded-full -left-3 ring-8 ring-background">3</span>
                    <h3 className="font-semibold text-lg">Track Progress</h3>
                    <p className="text-muted-foreground">Follow the issue's journey from "Reported" to "Resolved" in real-time. Upvote existing issues to show their importance.</p>
                </li>
                 <li className="ml-6">
                    <span className="absolute flex items-center justify-center w-6 h-6 bg-primary rounded-full -left-3 ring-8 ring-background">4</span>
                    <h3 className="font-semibold text-lg">Celebrate Resolution</h3>
                    <p className="text-muted-foreground">Get notified when the issue is fixed, contributing to a better neighborhood for everyone.</p>
                </li>
            </ol>
        </div>

      </main>
      <AppFooter />
    </div>
  );
}
