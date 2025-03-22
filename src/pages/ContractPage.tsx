
import { useState } from "react";
import { Check, Clipboard, FileText, Download, ChevronDown, ChevronUp, Clock } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

const ContractPage = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`
ReviewBloom Service Agreement

This Service Agreement ("Agreement") is entered into between ReviewBloom ("Provider") and the user ("Client") as of the date of acceptance.

1. Services
Provider agrees to provide the Client with review management services, including but not limited to review collection tools, analytics dashboards, and reporting, as described on the Provider's website and documentation.

2. Term
This Agreement shall commence on the date of acceptance and continue until terminated by either party with 30 days written notice.

3. Payment Terms
Client agrees to pay the Provider the fees as outlined in the selected subscription plan. All payments are due in advance of the service period.

4. Responsibilities
Provider shall:
- Provide access to the review management platform
- Maintain system uptime of at least 99.5%
- Provide customer support during business hours

Client shall:
- Abide by all terms of service
- Not use the service for any illegal or unethical purposes
- Maintain the confidentiality of their account credentials

5. Data Privacy
Provider will handle all Client data in accordance with our Privacy Policy and applicable data protection laws.

6. Limitation of Liability
Provider's liability shall be limited to the amount paid by Client for services in the 12 months preceding any claim.

7. Governing Law
This Agreement shall be governed by the laws of the State of California.
    `);
    setCopied(true);
    toast({
      title: "Text copied",
      description: "Contract text has been copied to your clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    toast({
      title: "Contract downloaded",
      description: "The contract PDF has been downloaded",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-28 pb-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12 text-center">
              <h1 className="text-3xl sm:text-4xl font-semibold mb-4">
                ReviewBloom Contract & Terms
              </h1>
              <p className="text-lg text-muted-foreground">
                Our commitment to transparency and fair business practices
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              <Card className="bg-orange-50 border-orange-100 animate-in fade-in-50 duration-300 delay-100">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Simple Terms</CardTitle>
                  <CardDescription>Clear, understandable language</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    We've written our contract in plain language so you understand exactly what you're agreeing to.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-orange-50 border-orange-100 animate-in fade-in-50 duration-300 delay-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Fair Pricing</CardTitle>
                  <CardDescription>No hidden fees or charges</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    What you see is what you pay. We're transparent about our pricing with no surprises.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-orange-50 border-orange-100 animate-in fade-in-50 duration-300 delay-300">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Easy Cancellation</CardTitle>
                  <CardDescription>Cancel anytime with no penalty</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    You're not locked in. You can cancel your subscription at any time with 30 days notice.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-white rounded-xl border p-8 shadow-sm animate-in fade-in-50 duration-300 delay-400">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <FileText className="h-6 w-6 text-orange-500 mr-3" />
                  <h2 className="text-xl font-semibold">Service Agreement</h2>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center border-orange-200 text-orange-600 hover:bg-orange-50 transition-colors duration-300"
                    onClick={handleCopy}
                  >
                    {copied ? <Check className="h-4 w-4 mr-2" /> : <Clipboard className="h-4 w-4 mr-2" />}
                    {copied ? "Copied" : "Copy"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center border-orange-200 text-orange-600 hover:bg-orange-50 transition-colors duration-300"
                    onClick={handleDownload}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </div>

              <div className="prose prose-sm max-w-none text-gray-700">
                <p className="text-sm font-medium uppercase text-muted-foreground mb-4">
                  Last updated: June 1, 2023
                </p>
                <h3>ReviewBloom Service Agreement</h3>
                <p>
                  This Service Agreement ("Agreement") is entered into between ReviewBloom ("Provider") and the user ("Client") as of the date of acceptance.
                </p>
                <h4 className="font-medium text-base mt-4">1. Services</h4>
                <p>
                  Provider agrees to provide the Client with review management services, including but not limited to review collection tools, analytics dashboards, and reporting, as described on the Provider's website and documentation.
                </p>
                <h4 className="font-medium text-base mt-4">2. Term</h4>
                <p>
                  This Agreement shall commence on the date of acceptance and continue until terminated by either party with 30 days written notice.
                </p>
                <h4 className="font-medium text-base mt-4">3. Payment Terms</h4>
                <p>
                  Client agrees to pay the Provider the fees as outlined in the selected subscription plan. All payments are due in advance of the service period.
                </p>
                <h4 className="font-medium text-base mt-4">4. Responsibilities</h4>
                <p className="mb-2">Provider shall:</p>
                <ul className="list-disc pl-5 mb-2">
                  <li>Provide access to the review management platform</li>
                  <li>Maintain system uptime of at least 99.5%</li>
                  <li>Provide customer support during business hours</li>
                </ul>
                <p className="mb-2">Client shall:</p>
                <ul className="list-disc pl-5">
                  <li>Abide by all terms of service</li>
                  <li>Not use the service for any illegal or unethical purposes</li>
                  <li>Maintain the confidentiality of their account credentials</li>
                </ul>
                <h4 className="font-medium text-base mt-4">5. Data Privacy</h4>
                <p>
                  Provider will handle all Client data in accordance with our Privacy Policy and applicable data protection laws.
                </p>
                <h4 className="font-medium text-base mt-4">6. Limitation of Liability</h4>
                <p>
                  Provider's liability shall be limited to the amount paid by Client for services in the 12 months preceding any claim.
                </p>
                <h4 className="font-medium text-base mt-4">7. Governing Law</h4>
                <p>
                  This Agreement shall be governed by the laws of the State of California.
                </p>
              </div>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-b border-border py-2">
                  <AccordionTrigger className="hover:text-orange-500 transition-colors">
                    Can I cancel my subscription at any time?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Yes, you can cancel your subscription at any time. We require a 30-day notice period for cancellations, and you'll continue to have access to the service during this time.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="border-b border-border py-2">
                  <AccordionTrigger className="hover:text-orange-500 transition-colors">
                    How is my data protected?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    We take data security seriously. All of your data is encrypted both in transit and at rest. We use industry-standard security practices and regularly undergo security audits to ensure your data is protected.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="border-b border-border py-2">
                  <AccordionTrigger className="hover:text-orange-500 transition-colors">
                    What happens if I need to change my plan?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    You can upgrade or downgrade your plan at any time through your account dashboard. Upgrades take effect immediately, while downgrades will take effect at the end of your current billing cycle.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="border-b border-border py-2">
                  <AccordionTrigger className="hover:text-orange-500 transition-colors">
                    How do refunds work?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    We don't offer automatic refunds, but if you're experiencing issues with our service, please contact our support team and we'll work with you to resolve the situation. In some cases, we may offer partial or full refunds at our discretion.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5" className="border-b border-border py-2">
                  <AccordionTrigger className="hover:text-orange-500 transition-colors">
                    Can I transfer my account to someone else?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Yes, you can transfer your account to another person or business. Please contact our support team to initiate the transfer process. We'll need confirmation from both parties to complete the transfer.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div className="mt-12 text-center">
              <h3 className="text-lg font-medium mb-4">Need more information?</h3>
              <p className="text-muted-foreground mb-6">
                Our team is here to help with any questions you might have about our terms or services.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="outline" className="border-orange-200 text-orange-600 hover:bg-orange-50 transition-colors duration-300 w-full sm:w-auto">
                  Contact Support
                </Button>
                <Button className="bg-orange-500 hover:bg-orange-600 transition-colors duration-300 w-full sm:w-auto">
                  Request Custom Contract
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContractPage;
