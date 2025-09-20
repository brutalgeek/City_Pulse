import { AppHeader } from "@/components/app/header";
import { AppFooter } from "@/components/app/footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQPage() {
  const faqs = [
    {
      question: "What is CityPulse?",
      answer: "CityPulse is a civic engagement platform that connects residents with their local government. It allows you to report non-emergency issues in your community, track their resolution, and stay informed about what's happening in your city."
    },
    {
      question: "How do I report an issue?",
      answer: "Simply click the 'Report New Issue' button on the homepage. You'll be asked to provide a title, a description, a photo (optional), and the location of the issue. Once submitted, it will be sent to the appropriate city department."
    },
    {
      question: "What kind of issues can I report?",
      answer: "You can report non-emergency issues such as potholes, broken streetlights, graffiti, overflowing public trash cans, and other infrastructure or maintenance problems. For emergencies, please dial 911."
    },
    {
      question: "How does the reputation score work?",
      answer: "You earn reputation points for being an active and helpful member of the community. Points are awarded for reporting valid issues, receiving upvotes on your reports, and having your reported issues successfully resolved by the city."
    },
    {
      question: "What are badges?",
      answer: "Badges are special awards you can earn for reaching certain milestones, like reporting a specific number of issues or being the top reporter for a month. They are a fun way to showcase your contributions to the community."
    },
    {
      question: "Is CityPulse free to use?",
      answer: "Yes, CityPulse is completely free for all residents to use."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Frequently Asked Questions</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Have questions? We've got answers. If you can't find what you're looking for, feel free to contact our support team.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-lg text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>
      <AppFooter />
    </div>
  );
}
