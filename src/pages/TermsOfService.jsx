import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TermsOfService = () => {
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
        <p className="text-muted-foreground">Last updated: January 2024</p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader><CardTitle>1. Acceptance of Terms</CardTitle></CardHeader>
          <CardContent>
            <p className="text-muted-foreground">By accessing and using City Pulse, you accept and agree to be bound by the terms and provision of this agreement.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>2. Use License</CardTitle></CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Permission is granted to temporarily use City Pulse for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>3. User Responsibilities</CardTitle></CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Users are responsible for providing accurate information, maintaining account security, and using the platform in accordance with local laws and regulations.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>4. Prohibited Uses</CardTitle></CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Users may not submit false reports, spam, harassment, or any content that violates community standards or local laws.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsOfService;