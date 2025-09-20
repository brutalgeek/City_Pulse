import { AppHeader } from "@/components/app/header";
import { AppFooter } from "@/components/app/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell } from "lucide-react";

export default function UpdatesPage() {
    const updates = [
        {
            version: "v1.2.0",
            date: "June 1, 2024",
            title: "Gamification and Profile Pages",
            description: "Introducing user profiles, reputation scores, badges, and a community leaderboard to make civic engagement more rewarding!",
            tags: ["New Feature", "Enhancement"],
        },
        {
            version: "v1.1.0",
            date: "May 25, 2024",
            title: "AI-Powered Issue Sorting",
            description: "Administrators can now use AI to automatically prioritize issues based on urgency, community impact, and safety concerns.",
            tags: ["AI", "New Feature"],
        },
        {
            version: "v1.0.0",
            date: "May 15, 2024",
            title: "CityPulse Launch!",
            description: "Welcome to CityPulse! Our initial launch includes core features for reporting, viewing, and managing civic issues.",
            tags: ["Launch"],
        },
    ];

  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <Bell className="mx-auto h-16 w-16 text-primary mb-4" />
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Product Updates</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            See what's new in CityPulse. We're always working to improve your experience.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-8">
            {updates.map((update, index) => (
                <Card key={index}>
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle>{update.title}</CardTitle>
                                <CardDescription className="mt-1">{update.date}</CardDescription>
                            </div>
                            <Badge variant="secondary">{update.version}</Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">{update.description}</p>
                        <div className="flex flex-wrap gap-2">
                            {update.tags.map(tag => (
                                <Badge key={tag} variant="outline">{tag}</Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>

      </main>
      <AppFooter />
    </div>
  );
}
