import { AppHeader } from "@/components/app/header";
import { AppFooter } from "@/components/app/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench, Lightbulb, Recycle, ShieldCheck } from "lucide-react";

export default function ServicesPage() {
  const services = [
    {
      icon: Wrench,
      title: "Public Works",
      description: "Report issues related to roads, sidewalks, and public infrastructure like potholes and damaged signs."
    },
    {
      icon: Lightbulb,
      title: "Utilities",
      description: "Notify the city about problems with streetlights, water main breaks, and other utility concerns."
    },
    {
      icon: Recycle,
      title: "Sanitation",
      description: "Report overflowing public bins, illegal dumping, or request special pickups for large items."
    },
    {
      icon: ShieldCheck,
      title: "Code Enforcement",
      description: "Report potential code violations such as overgrown lots or unpermitted construction to help keep our city safe and clean."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Our Services</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            CityPulse helps you connect with a wide range of city services. Report issues handled by the following departments.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                    <service.icon className="h-10 w-10 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="mb-2 text-xl">{service.title}</CardTitle>
                <p className="text-muted-foreground">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <AppFooter />
    </div>
  );
}
