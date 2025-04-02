import { useState, useEffect, useRef } from "react";
import {
  ShoppingBag,
  QrCode,
  Smartphone,
  Star,
  BarChart3,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    icon: "/images/landing/step-1.png",
    title: "Make It Easy for Customers to Leave a Review",
    description:
      "Select Your Campaign Strategy<br />When shoppers receive a free gift, discount, or bonus content, they're far more likely <br />to leave a positive review. With our Smart Funnel, you can offer these incentives <br />seamlessly — and boost your reviews in no time:<br /><br />🎁 Free Gift – Delight customers with a surprise item<br />💳 Gift Card or Coupon – Reward purchases with instant value <br />📘 Downloadables – Offer manuals, eBooks, or warranty info <br />📧 Email Capture – Build your list while providing added value<br />",
  },
  {
    icon: "/images/landing/step-2.png",
    title: "Place Your QR Code on an Insert or Inside the Packaging",
    description:
      "Guide your customers into the Smart Funnel with a simple scan — whether <br />it’s through a printed insert or directly inside your product packaging.<br /><br />📦 Print the QR code directly inside your packaging<br />📝 Or include a custom insert card with each product <br />🎁 Let customers unlock a free gift and leave a review <br />⚡ Frictionless, user-friendly experience<br />🔄 QR codes are auto-generated for every campaign<br />🖨 Instantly downloadable and ready to use<br /><br /><br />👉 TIP: Want to save on printing costs? Instead of using flyers<br />or business cards, ask your supplier to print the QR code on<br />the inside of the packaging — simple, cost-effective, and just<br />as powerful",
  },
  {
    icon: "/images/landing/step-3.png",
    title: "Boost Engagement and Reviews in Seconds!",
    description:
      "One Simple Scan Turns Customers Into Reviewers.<br />Let customers easily redeem a gift, engage with your brand, <br />and leave a review — all in seconds through your Smart<br />Funnel.",
  },
  {
    icon: "/images/landing/step-4.png",
    title: "Collect Reviews, Feedback & Emails — Automatically",
    description:
      "Our Smart Funnel does the work for you. Depending on your <br />setup, customers can:<br />📝 Leave a Product Review with just a few taps<br />🎁 Claim a Free Gift in exchange for their review (optional) <br />📧 Submit Their Email to grow your mailing list<br />💬 Share Valuable Feedback to improve your product<br />No extra tools needed — everything happens in one smooth <br />flow.",
  },
  {
    icon: "/images/landing/step-5.png",
    title: "Deliver Your Promotion – Automatically or Manually",
    description:
      "🎉 Congratulations! Your customer just completed the <br />funnel and left a review on Amazon.<br />Now it’s time to deliver their reward. Choose what works best for you:<br /><br />⚡ Automatic Delivery: Instantly send their digital gift <br />(like a coupon or download) the moment they complete <br />the funnel.<br />✅ Manual Delivery: Review their submission first, then <br />approve and send the promotion manually.<br />You're in full control — simple, flexible, and effective.",
  },
];

const AnimatedStep = ({ step, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const stepRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.5 }
    );

    if (stepRef.current) {
      observer.observe(stepRef.current);
    }

    return () => {
      if (stepRef.current) {
        observer.unobserve(stepRef.current);
      }
    };
  }, []);

  return (
    <div ref={stepRef} className="flex justify-center items-center my-10">
      <div
        className={`flex items-center w-full max-w-6xl transition-all duration-700 ${
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"
        }`}
      >
        <img
          src={step.icon}
          alt={step.title}
          className={`w-[500px] object-contain transition-transform duration-700 ${
            isVisible ? "translate-x-0" : "-translate-x-10"
          }`}
        />
        <div
          className={`ml-10 transition-transform duration-700 ${
            isVisible ? "translate-x-0" : "translate-x-10"
          }`}
        >
          <h2 className="text-2xl font-bold mb-2 bg-[#FF9900] inline-block rounded-full px-3">
            Step {index + 1}
          </h2>
          <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
          <p
            className="text-gray-600"
            dangerouslySetInnerHTML={{ __html: step.description }}
          />
        </div>
      </div>
    </div>
  );
};

const HowItWorks = () => {
  return (
    <section className="py-20 bg-gray-50" id="how-it-works">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-[700] my-8">
            Need More Product Reviews?
          </h2>
          <p className="text-2xl text-gray-700 font-[700]">
            Boost Reviews Fast with the Smart Funnel – Just 5 Simple Steps
          </p>
        </div>
        <div>
          {steps.map((step, index) => (
            <AnimatedStep key={index} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
