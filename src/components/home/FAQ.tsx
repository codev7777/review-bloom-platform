import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { HelpCircle, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const faqItems = [
  {
    question: "Is the Smart Funnel really safe to use on Amazon?",
    answer: (
      <>
        Absolutely. Our Smart Funnel is 100% compliant with Amazon’s review
        policies because it avoids the two biggest violations that get sellers
        in trouble:
        <br />
        <br />✅ No rewards in exchange for reviews – Your customers can claim
        their free gift without being required to leave a review. The funnel
        separates the reward from the review process entirely.
        <br />✅ No pressure for only positive reviews – We never ask for a
        "positive" review —{" "}
        <strong>
          we simply guide happy customers toward the review step, and
          respectfully stop the funnel if the feedback is negative.
        </strong>
        <br />
        <br />
        👉 This means: no manipulation, no risk — and fully within Amazon’s
        Terms of Service.
      </>
    ),
  },
  {
    question: "Why is it called a Smart Funnel?",
    answer: (
      <>
        ✅ Only 100% satisfied customers are invited to leave a review
        <br />✅ Feedback from unsatisfied customers is kept private for your
        internal use
        <br />✅ Protects your Amazon listing from negative public reviews
        <br />
        ✅ This smart feature is optional and can be turned off in your campaign
        settings
        <br />
        🎥 Watch our demo to see how it works in action
      </>
    ),
  },
  {
    question: "Which promotions are available for me to provide?",
    answer: (
      <>
        ✅ Offer a free physical gift (e.g. product sample, accessory)
        <br />✅ Send a gift card or discount coupon code
        <br />✅ Provide access to a digital product such as an eBook, manual,
        or warranty
        <br />✅ Prefer not to offer a gift? No problem — you can simply collect
        their feedback and email address
        <br />
        🎁 Learn more about setting up promotions
      </>
    ),
  },
  {
    question: "How are promotional rewards delivered to customers?",
    answer: (
      <>
        The delivery method depends on the type of promotion you offer:
        <br />
        <br />
        <strong>Digital Promotions</strong> – for items like coupon codes or
        downloadable content:
        <br />
        <br />✅ Automatic Delivery – Sent instantly after the customer
        completes the funnel
        <br />✅ Manual Approval – You manually review and approve each
        redemption, then deliver via email through the Claim Center
        <br />
        <br />
        <strong>Physical Promotions</strong> – for free gifts or physical gift
        cards:
        <br />
        <br />
        ✅ The Smart Funnel collects the customer’s shipping address so you can
        send the item directly
        <br />
        <br />
        This flexible setup gives you full control over how and when rewards are
        delivered — based on your strategy and resources.
      </>
    ),
  },
  {
    question: "How can I verify a customer's redemption request?",
    answer: (
      <>
        When customers enter the Smart Funnel, they must provide their Amazon
        Order ID. You can cross-reference this Order ID with your sales records
        in Amazon Seller Central to confirm the validity of their purchase.
        <br />
        <br />
        This ensures that only legitimate customers receive promotions.
      </>
    ),
  },
  {
    question: "Are customers required to leave a product review?",
    answer: (
      <>
        ✅ No, customers are not required to leave a review
        <br />✅ Amazon strictly prohibits incentivized reviews – You cannot
        offer rewards in exchange for a review
        <br />✅ Our Smart Funnel is 100% compliant – Customers can redeem
        promotions without being asked to leave a review
        <br />✅ All feedback is voluntary – Keeping your campaigns fully
        aligned with Amazon’s Terms of Service
      </>
    ),
  },
  {
    question: "How do I offer gift cards, discounts, or promotions?",
    answer: (
      <>
        ✅ eGift cards can be purchased online from popular retailers.
        <br />✅ Physical gift cards are available both online and in-store.
        <br />✅ Amazon sellers can create Percentage Off, Buy One Get One, or
        other promotional offers through Seller Central.
        <br />✅ Discount codes and coupons can be fully customized based on
        your campaign goals.
      </>
    ),
  },
  {
    question: "What information is collected in the Smart Funnel?",
    answer: (
      <>
        Each funnel collects your customer’s contact details and Amazon purchase
        information. This is used to verify their order and ensure your
        promotion is delivered correctly.
        <br />
        <br />
        The customer’s email address is recorded to send digital products and
        help grow your email list. If a physical gift is part of the offer,
        their shipping address will also be collected.
        <br />
        <br />
        Depending on your campaign settings, if a product review is required,
        their feedback will also be recorded for your review.
      </>
    ),
  },
];

const FAQ = () => {
  return (
    <section className="py-20 bg-gray-50  max-w-screen" id="faq">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mt-2 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-primary">
            Find answers to common questions about our Smart Funnel and how it
            can help your business.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger className="text-lg font-medium text-left">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
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
              <a href="mailto:info@reviewbrothers.com">
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
