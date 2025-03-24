import { useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { HelpCircle, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const FAQ = () => {
  const faqItems = [
    {
      question: "How does ReviewBrothers help increase my product reviews?",
      answer:
        "ReviewBrothers provides a streamlined funnel that makes it easy for customers to leave reviews. We use QR codes that can be included in your product packaging, automating the review collection process and significantly increasing conversion rates.",
    },
    {
      question: "Is ReviewBrothers compliant with Amazon's Terms of Service?",
      answer:
        "Yes, ReviewBrothers is fully compliant with Amazon's Terms of Service. We follow all marketplace guidelines for review solicitation and never incentivize reviews in ways that violate platform policies.",
    },
    {
      question: "Can I offer promotions to customers through ReviewBrothers?",
      answer:
        "Yes, you can offer post-purchase promotions like discount codes or loyalty rewards through our platform. These are delivered after a customer submits feedback, not in exchange for reviews, keeping you compliant with marketplace policies.",
    },
    {
      question: "What marketplaces does ReviewBrothers support?",
      answer:
        "ReviewBrothers supports Amazon, Etsy, Shopify, eBay, and Walmart. We're continuously expanding our marketplace integrations based on customer demand.",
    },
    {
      question: "How do I track the performance of my review campaigns?",
      answer:
        "Our dashboard provides comprehensive analytics including review conversion rates, sentiment analysis, and detailed reports on campaign performance. You can track all metrics in real-time and export reports as needed.",
    },
    {
      question: "Can I customize the review funnel for my brand?",
      answer:
        "Absolutely! Our white-label feature allows you to customize the review funnel with your brand colors, logo, and messaging. This creates a seamless experience for your customers, building trust and increasing conversion rates.",
    },
  ];

  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`py-20 bg-gray-50 transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      id="faq"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          {/* <span className="text-[#FF9900] font-medium">FAQ</span> */}
          <h2 className="text-3xl font-semibold mt-2 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-primary">
            Find answers to common questions about ReviewBrothers and how it can
            help your business.
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-4">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-medium text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-12 text-center">
          <p className="mb-6 text-lg">
            Still have questions? Check our help center or contact us
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild variant="outline" className="gap-2">
              <Link to="/help">
                <HelpCircle className="h-4 w-4" />
                Browse Help Center
              </Link>
            </Button>
            <Button
              asChild
              className="gap-2 bg-[#FF9900] text-[#232F3E] hover:bg-orange-500"
            >
              <a href="mailto:support@reviewbrothers.com">
                <Mail className="h-4 w-4" />
                Contact Support
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
