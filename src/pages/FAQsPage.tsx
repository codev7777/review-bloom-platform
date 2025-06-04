
import { useState } from "react";
import { Layout, LayoutContent } from "@/components/ui/layout";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";

const FAQsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const faqCategories = [
    { 
      id: "general", 
      name: "General Questions",
      faqs: [
        {
          question: "What is ReviewBrothers?",
          answer: "ReviewBrothers is a platform that helps Amazon and e-commerce sellers collect and manage product reviews through compliant methods. We provide tools like QR codes, email templates, and analytics to streamline the review collection process and help sellers improve their product ratings."
        },
        {
          question: "Is ReviewBrothers compliant with Amazon's Terms of Service?",
          answer: "Yes, ReviewBrothers is fully compliant with Amazon's Terms of Service. We follow all marketplace guidelines for review solicitation and never incentivize reviews in ways that violate platform policies. Our system is designed to help you collect reviews in an ethical and policy-compliant manner."
        },
        {
          question: "How does ReviewBrothers help increase my product reviews?",
          answer: "ReviewBrothers provides a streamlined funnel that makes it easy for customers to leave reviews. We use QR codes that can be included in your product packaging, automating the review collection process and significantly increasing conversion rates. Our system also helps you follow up with customers at the optimal time to maximize response rates."
        },
        {
          question: "What marketplaces does ReviewBrothers support?",
          answer: "ReviewBrothers currently supports Amazon, Etsy, Shopify, eBay, and Walmart. We're continuously expanding our marketplace integrations based on customer demand."
        },
        {
          question: "How much does ReviewBrothers cost?",
          answer: "We offer several pricing tiers to accommodate businesses of different sizes and needs. You can view our current pricing on our pricing page. We offer monthly and annual billing options, with discounts for annual commitments."
        }
      ]
    },
    { 
      id: "features", 
      name: "Features & Functionality",
      faqs: [
        {
          question: "How do I track the performance of my review campaigns?",
          answer: "Our dashboard provides comprehensive analytics including review conversion rates, sentiment analysis, and detailed reports on campaign performance. You can track all metrics in real-time and export reports as needed."
        },
        {
          question: "Can I customize the review funnel for my brand?",
          answer: "Absolutely! Our white-label feature allows you to customize the review funnel with your brand colors, logo, and messaging. This creates a seamless experience for your customers, building trust and increasing conversion rates."
        },
        {
          question: "How does the QR code integration work?",
          answer: "We generate unique QR codes for your products that you can include in your packaging or inserts. When customers scan the QR code, they're directed to your custom review funnel where they can easily leave feedback. The QR codes can be customized with your branding and are trackable in your dashboard."
        },
        {
          question: "Can I offer promotions to customers through ReviewBrothers?",
          answer: "Yes, you can offer post-purchase promotions like discount codes or loyalty rewards through our platform. These are delivered after a customer submits feedback, not in exchange for reviews, keeping you compliant with marketplace policies."
        },
        {
          question: "Does ReviewBrothers integrate with email marketing platforms?",
          answer: "Yes, ReviewBrothers integrates with popular email marketing platforms like Mailchimp, Klaviyo, and ConvertKit. This allows you to add customers who provide their email to your marketing lists (with their consent) and create targeted campaigns."
        }
      ]
    },
    { 
      id: "technical", 
      name: "Technical Support",
      faqs: [
        {
          question: "How do I set up my first campaign?",
          answer: "Setting up your first campaign is simple. After signing up, you'll be guided through our onboarding process. You'll need to connect your marketplace account, set up your brand profile, and create your first review funnel. Our step-by-step wizard makes the process straightforward, even for non-technical users."
        },
        {
          question: "What technical support does ReviewBrothers offer?",
          answer: "We offer email support for all plans, with priority support and phone/video call assistance for our higher-tier plans. Our help center also contains comprehensive documentation, tutorials, and FAQs to help you resolve common issues."
        },
        {
          question: "Can I migrate data from another review management platform?",
          answer: "Yes, we offer data migration services for customers switching from other platforms. Our team can help you migrate your existing reviews, customer data, and campaigns to ensure a smooth transition to ReviewBrothers."
        },
        {
          question: "Is there an API available for custom integrations?",
          answer: "Yes, we offer a robust API for customers on our Professional and Enterprise plans. The API allows you to integrate ReviewBrothers with your existing systems, such as inventory management software, CRMs, or custom dashboards."
        },
        {
          question: "What security measures does ReviewBrothers implement?",
          answer: "We take security seriously at ReviewBrothers. We use industry-standard encryption, regular security audits, and strict access controls to protect your data. We're also compliant with GDPR and other relevant privacy regulations to ensure your customer data is handled properly."
        }
      ]
    },
    { 
      id: "billing", 
      name: "Billing & Accounts",
      faqs: [
        {
          question: "How does billing work?",
          answer: "ReviewBrothers offers both monthly and annual billing options. You can choose your preferred payment method (credit card or PayPal) and billing cycle during signup. Invoices are sent via email, and you can access your billing history in your account settings."
        },
        {
          question: "Can I change my plan later?",
          answer: "Yes, you can upgrade or downgrade your plan at any time from your account settings. Upgrades take effect immediately, with prorated charges for the remainder of your billing cycle. Downgrades take effect at the end of your current billing cycle."
        },
        {
          question: "Is there a free trial available?",
          answer: "Yes, we offer a 14-day free trial for all our plans. No credit card is required to start your trial, and you'll be notified before the trial ends so you can decide whether to continue with a paid subscription."
        },
        {
          question: "What happens if I exceed my plan limits?",
          answer: "If you approach your plan limits (such as the number of reviews or campaigns), we'll notify you so you can upgrade to a more suitable plan. We don't automatically charge you for overages but may limit certain features until you upgrade."
        },
        {
          question: "How do I cancel my subscription?",
          answer: "You can cancel your subscription at any time from your account settings. When you cancel, your account will remain active until the end of your current billing cycle, after which it will be downgraded to a limited free account."
        }
      ]
    }
  ];
  
  const allFaqs = faqCategories.flatMap(category => category.faqs);
  
  const filteredFaqs = searchQuery 
    ? allFaqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <Layout>
      <Navbar />
      <LayoutContent className="pt-24 md:pt-28">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Find answers to common questions about ReviewBrothers
              </p>
            </div>
            
            {/* Search box */}
            <div className="relative max-w-2xl mx-auto mb-12">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Search for answers..."
                className="pl-10 py-6 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={() => setSearchQuery("")}
                >
                  Clear
                </Button>
              )}
            </div>
            
            {/* Search results */}
            {searchQuery && (
              <div className="mb-12">
                <h2 className="text-xl font-semibold mb-4">
                  {filteredFaqs.length} {filteredFaqs.length === 1 ? 'result' : 'results'} for "{searchQuery}"
                </h2>
                {filteredFaqs.length > 0 ? (
                  <Accordion type="single" collapsible className="w-full">
                    {filteredFaqs.map((faq, index) => (
                      <AccordionItem key={index} value={`search-${index}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="text-gray-700">{faq.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <div className="text-center p-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 mb-4">No results found. Try different keywords or browse the categories below.</p>
                    <Button 
                      variant="outline" 
                      onClick={() => setSearchQuery("")}
                      className="bg-[#FF9900] text-[#232F3E] hover:bg-orange-500 border-none"
                    >
                      Browse All FAQs
                    </Button>
                  </div>
                )}
              </div>
            )}
            
            {/* FAQ categories */}
            {!searchQuery && (
              <Tabs defaultValue="general" className="w-full">
                <TabsList className="w-full mb-8 flex flex-wrap h-auto">
                  {faqCategories.map(category => (
                    <TabsTrigger 
                      key={category.id} 
                      value={category.id}
                      className="flex-grow"
                    >
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {faqCategories.map(category => (
                  <TabsContent key={category.id} value={category.id}>
                    <Accordion type="single" collapsible className="w-full">
                      {category.faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`${category.id}-${index}`}>
                          <AccordionTrigger className="text-left">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent>
                            <p className="text-gray-700">{faq.answer}</p>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </TabsContent>
                ))}
              </Tabs>
            )}
            
            <div className="mt-16 text-center p-8 bg-gray-50 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Still have questions?</h2>
              <p className="text-gray-600 mb-6">
                If you couldn't find the answer to your question, please contact our support team.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild variant="outline">
                  <a href="/help" className="min-w-[160px]">
                    Browse Help Center
                  </a>
                </Button>
                <Button asChild className="bg-[#FF9900] hover:bg-orange-500 text-[#232F3E]">
                  <a href="/contact-us" className="min-w-[160px]">
                    Contact Support
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </LayoutContent>
      <Footer />
    </Layout>
  );
};

export default FAQsPage;
