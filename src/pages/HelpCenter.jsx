import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MessageCircle, Book, Users, Settings } from "lucide-react";

const HelpCenter = () => {
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Help Center</h1>
        <p className="text-muted-foreground">Get support and learn how to make the most of City Pulse</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="text-center">
          <CardContent className="p-6">
            <Book className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="font-semibold mb-2">User Guides</h3>
            <p className="text-muted-foreground text-sm mb-4">Step-by-step tutorials</p>
            <Button variant="outline" size="sm">View Guides</Button>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-6">
            <MessageCircle className="h-12 w-12 mx-auto mb-4 text-secondary" />
            <h3 className="font-semibold mb-2">FAQ</h3>
            <p className="text-muted-foreground text-sm mb-4">Common questions answered</p>
            <Button variant="outline" size="sm">Browse FAQ</Button>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-6">
            <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="font-semibold mb-2">Community</h3>
            <p className="text-muted-foreground text-sm mb-4">Connect with other users</p>
            <Button variant="outline" size="sm">Join Community</Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contact Support</CardTitle>
          <CardDescription>Need direct assistance? Get in touch with our team</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Input placeholder="Your Name" />
              <Input placeholder="Your Email" type="email" />
            </div>
            <Input placeholder="Subject" />
            <Textarea placeholder="Describe your issue..." rows={4} />
            <Button>Send Message</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default HelpCenter;