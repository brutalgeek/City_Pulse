import { AppHeader } from "@/components/app/header";
import { AppFooter } from "@/components/app/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LifeBuoy, Book, MessageSquare, Mail } from "lucide-react";
import Link from 'next/link';
import { Button } from "@/components/ui/button";

export default function HelpCenterPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <LifeBuoy className="mx-auto h-16 w-16 text-primary mb-4" />
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Help Center</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            We're here to help you get the most out of CityPulse.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="flex flex-col">
            <CardHeader className="flex-row items-center gap-4">
              <Book className="h-8 w-8 text-primary" />
              <CardTitle>Getting Started Guide</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">
                New to CityPulse? Our guide will walk you through creating an account, reporting your first issue, and understanding the dashboard.
              </p>
            </CardContent>
            <div className="p-6 pt-0">
                <Button variant="outline">Read Guide</Button>
            </div>
          </Card>
          <Card className="flex flex-col">
            <CardHeader className="flex-row items-center gap-4">
              <MessageSquare className="h-8 w-8 text-primary" />
              <CardTitle>FAQs</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">
                Have a common question? Check out our Frequently Asked Questions for quick answers to your most pressing concerns.
              </p>
            </CardContent>
             <div className="p-6 pt-0">
                <Link href="/faq">
                    <Button>View FAQs</Button>
                </Link>
            </div>
          </Card>
           <Card className="flex flex-col">
            <CardHeader className="flex-row items-center gap-4">
              <Mail className="h-8 w-8 text-primary" />
              <CardTitle>Contact Support</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">
                Still can't find what you need? Our support team is ready to assist you with any issue or question.
              </p>
            </CardContent>
             <div className="p-6 pt-0">
                <Button variant="secondary">Email Us</Button>
            </div>
          </Card>
        </div>
      </main>
      <AppFooter />
    </div>
  );
}
