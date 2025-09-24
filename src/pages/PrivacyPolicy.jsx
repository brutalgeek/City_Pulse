import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-muted-foreground">Last updated: January 2024</p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader><CardTitle>Information We Collect</CardTitle></CardHeader>
          <CardContent>
            <p className="text-muted-foreground">We collect information you provide directly, such as account details, issue reports, and location data when you choose to share it.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>How We Use Your Information</CardTitle></CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Your information is used to provide services, communicate with civic authorities, and improve the platform experience.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Information Sharing</CardTitle></CardHeader>
          <CardContent>
            <p className="text-muted-foreground">We share relevant issue information with appropriate civic authorities to facilitate resolution. Personal contact details are never shared publicly.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Data Security</CardTitle></CardHeader>
          <CardContent>
            <p className="text-muted-foreground">We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicy;