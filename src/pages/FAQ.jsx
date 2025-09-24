import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Search, HelpCircle } from "lucide-react";

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openItems, setOpenItems] = useState({});

  const faqCategories = [
    {
      category: "Getting Started",
      color: "default",
      items: [
        {
          q: "How do I create an account on City Pulse?",
          a: "Click the 'Sign Up' button in the top right corner, fill in your details including name, email, password, and select whether you're a citizen or civic authority. Verify your email to activate your account."
        },
        {
          q: "What's the difference between Citizen and Civic Authority accounts?",
          a: "Citizen accounts can report issues, view the map, upvote/comment on issues, and track resolution progress. Civic Authority accounts have additional permissions to manage issues, assign them to departments, and update resolution status."
        },
        {
          q: "Is City Pulse free to use?",
          a: "Yes, City Pulse is completely free for all citizens to report and track civic issues. Our mission is to improve communities through accessible technology."
        }
      ]
    },
    {
      category: "Reporting Issues",
      color: "secondary",
      items: [
        {
          q: "How do I report a civic issue?",
          a: "Go to the 'Report Issue' page, fill in the title, select a category, provide a detailed description, add your location (or use current location), and optionally upload photos or videos as evidence."
        },
        {
          q: "What types of issues can I report?",
          a: "You can report various civic issues including road problems, waste management, water/drainage issues, electricity problems, parks & recreation concerns, public safety matters, and more."
        },
        {
          q: "Can I upload multiple photos for one issue?",
          a: "Yes, you can upload multiple photos and videos to provide comprehensive evidence of the issue. This helps civic authorities better understand and prioritize the problem."
        },
        {
          q: "How accurate does my location need to be?",
          a: "Provide the most accurate location possible. You can use the 'Current Location' button for GPS coordinates or manually enter the address. Accurate locations help authorities respond more efficiently."
        }
      ]
    },
    {
      category: "Issue Tracking",
      color: "destructive",
      items: [
        {
          q: "How can I track the status of my reported issue?",
          a: "After reporting an issue, you'll receive a unique issue ID. You can view the issue details, track progress through the resolution lifecycle, and receive notifications about status updates."
        },
        {
          q: "What do the different status colors mean?",
          a: "Red = Reported (newly submitted), Yellow = Acknowledged (reviewed by authorities), Blue = In Progress (work has started), Green = Resolved (issue has been fixed)."
        },
        {
          q: "How long does it typically take to resolve an issue?",
          a: "Resolution times vary based on issue complexity, category, and local authority resources. You can see estimated completion dates for issues that are in progress."
        },
        {
          q: "Will I be notified when my issue is resolved?",
          a: "Yes, you'll receive notifications at each stage of the resolution process: when acknowledged, when work begins, and when the issue is marked as resolved."
        }
      ]
    },
    {
      category: "Community Features",
      color: "outline",
      items: [
        {
          q: "How does the upvoting system work?",
          a: "Citizens can upvote issues to show community support and help prioritize which problems need immediate attention. Issues with more upvotes may receive higher priority from local authorities."
        },
        {
          q: "Can I comment on issues reported by others?",
          a: "Yes, you can add comments to provide additional information, show support, or share similar experiences. This creates a collaborative community approach to problem-solving."
        },
        {
          q: "How do I view issues in my area?",
          a: "Use the Map View to see all reported issues in your neighborhood. You can filter by category, status, and date to find specific types of problems in your area."
        }
      ]
    },
    {
      category: "Privacy & Security",
      color: "secondary",
      items: [
        {
          q: "Is my personal information safe?",
          a: "Yes, we take privacy seriously. Your personal data is encrypted and stored securely. We only share necessary information with relevant civic authorities to resolve issues."
        },
        {
          q: "Can I report issues anonymously?",
          a: "Currently, you need an account to report issues to prevent spam and ensure accountability. However, your personal details are only visible to authorized civic authorities, not other citizens."
        },
        {
          q: "Who can see the issues I report?",
          a: "Reported issues are visible to all users on the platform to promote transparency. Your name as the reporter is visible, but your contact information remains private and is only accessible to relevant authorities."
        }
      ]
    }
  ];

  const toggleItem = (categoryIndex, itemIndex) => {
    const key = `${categoryIndex}-${itemIndex}`;
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    items: category.items.filter(item =>
      item.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.a.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-muted-foreground">
          Find answers to common questions about using City Pulse
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search FAQ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* FAQ Categories */}
      <div className="space-y-6">
        {filteredCategories.map((category, categoryIndex) => (
          <Card key={categoryIndex}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <HelpCircle className="h-5 w-5 text-primary" />
                <CardTitle className="text-xl">{category.category}</CardTitle>
                <Badge variant={category.color}>{category.items.length} questions</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {category.items.map((item, itemIndex) => {
                  const key = `${categoryIndex}-${itemIndex}`;
                  const isOpen = openItems[key];
                  
                  return (
                    <Collapsible key={itemIndex} open={isOpen} onOpenChange={() => toggleItem(categoryIndex, itemIndex)}>
                      <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                        <span className="font-medium">{item.q}</span>
                        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="px-4 pb-4">
                        <p className="text-muted-foreground mt-2">{item.a}</p>
                      </CollapsibleContent>
                    </Collapsible>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {searchTerm && filteredCategories.length === 0 && (
        <Card className="text-center p-8">
          <CardContent>
            <HelpCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No results found</h3>
            <p className="text-muted-foreground">
              Try searching with different keywords or browse our categories above.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Contact */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Still have questions?</CardTitle>
          <CardDescription>
            Can't find what you're looking for? We're here to help!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Visit our <a href="/help" className="text-primary hover:underline">Help Center</a> for 
            more detailed guides or contact our support team directly.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FAQ;