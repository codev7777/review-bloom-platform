
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "How does ReviewBloom help increase my Amazon reviews?",
    answer:
      "ReviewBloom creates a streamlined process for collecting customer feedback through QR codes and review funnels. When customers leave positive reviews (4-5 stars), they're automatically redirected to leave that review on Amazon. This increases your review count while filtering out negative reviews to help you improve your products.",
  },
  {
    question: "Is ReviewBloom compliant with Amazon's Terms of Service?",
    answer:
      "Yes! ReviewBloom is designed to comply with Amazon's TOS. We never incentivize specific ratings or reviews, and we don't manipulate reviews in any way. We simply create an easier path for genuine customers to share their authentic experiences with your products.",
  },
  {
    question: "How do I add review QR codes to my products?",
    answer:
      "After setting up a campaign in your dashboard, you can download high-resolution QR codes to include in your product packaging, instruction manuals, or thank you cards. You can also email QR codes to customers after purchase confirmation.",
  },
  {
    question: "Can I customize the review funnel experience?",
    answer:
      "Absolutely! You can customize the colors, logos, and messaging in the review funnel to match your brand. This creates a seamless experience for your customers and increases the likelihood they'll complete the review process.",
  },
  {
    question: "How much does ReviewBloom cost?",
    answer:
      "ReviewBloom offers tiered pricing plans based on your business size and needs. Our Basic plan starts at $29/month, while our Premium plan with advanced features is $79/month. We also offer a free 14-day trial so you can see the results before committing.",
  },
  {
    question: "Can I integrate ReviewBloom with my e-commerce platform?",
    answer:
      "Yes! ReviewBloom offers integrations with major e-commerce platforms including Shopify, WooCommerce, and Magento. This allows you to automate the review collection process based on order data from your store.",
  },
  {
    question: "How do I track the performance of my review campaigns?",
    answer:
      "Your ReviewBloom dashboard provides comprehensive analytics about your campaigns, including QR code scans, funnel completion rates, review sentiment analysis, and conversion metrics. This helps you optimize your review collection strategy over time.",
  },
];

const FAQ = () => {
  const [openItem, setOpenItem] = useState<string | undefined>("item-0");

  return (
    <section className="py-20 bg-white" id="faq">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-[#FF9900] font-medium">Support</span>
          <h2 className="text-3xl font-semibold mt-2 mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get answers to the most common questions about ReviewBloom and how it can help your Amazon business.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion
            type="single"
            collapsible
            value={openItem}
            onValueChange={setOpenItem}
            className="space-y-4"
          >
            {faqItems.map((item, index) => (
              <AccordionItem
                key={`item-${index}`}
                value={`item-${index}`}
                className="border rounded-lg p-1 shadow-sm animate-fade-in"
              >
                <AccordionTrigger className="px-4 py-2 hover:bg-gray-50 rounded-md data-[state=open]:text-[#FF9900] transition-all duration-200">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-4 pt-0 pb-3 text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-12 pt-10 border-t text-center">
          <p className="mb-4">Still have questions? We're here to help!</p>
          <div className="flex justify-center space-x-4">
            <a
              href="mailto:support@reviewbloom.com"
              className="text-[#FF9900] hover:text-orange-600 font-medium transition-colors"
            >
              support@reviewbloom.com
            </a>
            <span className="text-gray-300">|</span>
            <a
              href="tel:+18005551234"
              className="text-[#FF9900] hover:text-orange-600 font-medium transition-colors"
            >
              1-800-555-1234
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
