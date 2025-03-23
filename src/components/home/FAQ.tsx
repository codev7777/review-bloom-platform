
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqItems = [
  {
    question: "How does the review funnel work?",
    answer: "Our review funnel guides customers through a simple, step-by-step process to leave authentic reviews for your products. Customers with positive experiences are directed to Amazon to leave a review, while customers with negative experiences provide feedback directly to you."
  },
  {
    question: "Can I customize the QR codes for my products?",
    answer: "Yes, you can fully customize the QR codes with your branding, colors, and even add your logo. Each QR code is tied to a specific product or campaign for accurate tracking."
  },
  {
    question: "Is ReviewBloom compliant with Amazon's TOS?",
    answer: "Absolutely. ReviewBloom is designed to be 100% compliant with Amazon's Terms of Service. We never incentivize or manipulate reviews, only make it easier for genuine customers to share their honest feedback."
  },
  {
    question: "How do I track the performance of my review campaigns?",
    answer: "The analytics dashboard provides comprehensive metrics including review conversion rates, average ratings, sentiment analysis, and campaign performance comparisons. You can filter data by date ranges, products, or campaigns."
  },
  {
    question: "Can I integrate ReviewBloom with my existing tools?",
    answer: "Yes, ReviewBloom offers API access (on Enterprise plans) for integration with your CRM, email marketing tools, and other business systems to streamline your workflow."
  },
  {
    question: "What happens if a customer has a negative experience?",
    answer: "Customers with negative experiences are given the opportunity to provide feedback directly to you, allowing you to address their concerns before they post a public negative review. This helps maintain your positive rating while improving customer satisfaction."
  }
];

const FAQ = () => {
  return (
    <section id="faq" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about ReviewBloom
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg shadow-sm">
                <AccordionTrigger className="text-base sm:text-lg font-medium px-6 py-4">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
