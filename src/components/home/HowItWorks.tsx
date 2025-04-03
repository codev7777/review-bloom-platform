import { useState, useEffect, useRef } from "react";

const steps = [
  {
    icon: "/images/landing/step-1.png",
    title: "Make It Easy for Customers to Leave a Review",
    description: `
      <div class="opacity-0">opacity-0</div>
      <div class="flex items-start">
        <span>Select Your Campaign Strategy</span>
      </div>
      <div class="opacity-0">opacity-0</div>
      <div class="flex items-start">
        <span>When shoppers receive a free gift, discount, or bonus content, they're far more likely to leave a positive review. With our Smart Funnel, you can offer these incentives seamlessly — and boost your reviews in no time:</span>
      </div>
      
      <div class="opacity-0">opacity-0</div>
      <div class="flex items-start">
        <span class="mr-2">🎁</span>
        <span>Free Gift – Delight customers with a surprise item</span>
      </div>
      <div class="flex items-start">
        <span class="mr-2">💳</span>
        <span>Gift Card or Coupon – Reward purchases with instant value</span>
      </div>
      <div class="flex items-start">
        <span class="mr-2">📘</span>
        <span>Downloadables – Offer manuals, eBooks, or warranty info</span>
      </div>
      <div class="flex items-start">
        <span class="mr-2">📧</span>
        <span>Email Capture – Build your list while providing added value</span>
      </div>
    `,
  },
  {
    icon: "/images/landing/step-2.png",
    title: "Place Your QR Code on an Insert or Inside the Packaging",
    description: `
      <div class="opacity-0">opacity-0</div>
      <div class="flex items-start">
        <span>Guide your customers into the Smart Funnel with a simple scan — whether it’s through a printed insert or directly inside your product packaging.</span>
      </div>
      <div class="opacity-0">opacity-0</div>
      <div class="flex items-start">
        <span class="mr-2">📦</span>
        <span>Print the QR code directly inside your packaging</span>
      </div>
      <div class="flex items-start">
        <span class="mr-2">📝</span>
        <span>Or include a custom insert card with each product</span>
      </div>
      <div class="flex items-start">
        <span class="mr-2">🎁</span>
        <span>Let customers unlock a free gift and leave a review</span>
      </div>
      <div class="flex items-start">
        <span class="mr-2">⚡</span>
        <span>Frictionless, user-friendly experience</span>
      </div>
      <div class="flex items-start">
        <span class="mr-2">🔄</span>
        <span>QR codes are auto-generated for every campaign</span>
      </div>
      <div class="flex items-start">
        <span class="mr-2">🖨</span>
        <span>Instantly downloadable and ready to use</span>
      </div>
      <div class="opacity-0">opacity-0</div>
      <div class="flex items-start mt-4">
        <span class="mr-2 whitespace-nowrap">👉 TIP:</span>
        <span>Want to save on printing costs? Instead of using flyers or business cards, ask your supplier to print the QR code on the inside of the packaging — simple, cost-effective, and just as powerful.</span>
      </div>
    `,
  },
  {
    icon: "/images/landing/step-3.png",
    title: "Boost Engagement and Reviews in Seconds!",
    description: `
      <div class="opacity-0">opacity-0</div>
      <div class="flex items-start">
        <span>One Simple Scan Turns Customers Into Reviewers.</span>
      </div>
      <div class="opacity-0">opacity-0</div>
      <div class="flex items-start">
        <span>Let customers easily redeem a gift, engage with your brand, and leave a review — all in seconds through your Smart Funnel.</span>
      </div>
    `,
  },
  {
    icon: "/images/landing/step-4.png",
    title: "Collect Reviews, Feedback & Emails — Automatically",
    description: `
          <div class="opacity-0">opacity-0</div>
      <div class="flex items-start">
        <span>Our Smart Funnel does the work for you. Depending on your setup, customers can:</span>
      </div>
      
      <div class="opacity-0">opacity-0</div>
      <div class="flex items-start">
        <span class="mr-2">📝</span>
        <span>Leave a Product Review with just a few taps</span>
      </div>
      <div class="flex items-start">
        <span class="mr-2">🎁</span>
        <span>Claim a Free Gift in exchange for their review (optional)</span>
      </div>
      <div class="flex items-start">
        <span class="mr-2">📧</span>
        <span>Submit Their Email to grow your mailing list</span>
      </div>
      <div class="flex items-start">
        <span class="mr-2">💬</span>
        <span>Share Valuable Feedback to improve your product</span>
      </div>
      <div class="opacity-0">opacity-0</div>
      <div class="flex items-start">
        <span class="mr-2 opacity-0">⚙️</span>
        <span>No extra tools needed — everything happens in one smooth flow.</span>
      </div>
    `,
  },
  {
    icon: "/images/landing/step-5.png",
    title: "Deliver Your Promotion – Automatically or Manually",
    description: `
      <div class="flex items-start">
        <span class="mr-2">🎉</span>
        <span>Congratulations! Your customer just completed the funnel and left a review on Amazon.</span>
      </div>

      <div class="opacity-0">opacity-0</div>
      <div class="flex items-start">
        <span>Now it’s time to deliver their reward. Choose what works best for you:</span>
      </div>
      
      <div class="opacity-0">opacity-0</div>
      <div class="flex items-start">
        <span class="mr-2">⚡</span>
        <span>Automatic Delivery: Instantly send their digital gift (like a coupon or download) the moment they complete the funnel.</span>
      </div>
      <div class="flex items-start">
        <span class="mr-2">✅</span>
        <span>Manual Delivery: Review their submission first, then approve and send the promotion manually.</span>
      </div>
      <div class="opacity-0">opacity-0</div>
      
      <div class="flex items-start">
        <span class="mr-2 opacity-0">⚙️</span>
        <span>You're in full control — simple, flexible, and effective.</span>
      </div>
    `,
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
    <div
      ref={stepRef}
      id="howitworks"
      className="flex justify-center items-center my-10"
    >
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
          <div
            className="text-gray-600"
            dangerouslySetInnerHTML={{
              __html: step.description.replace(
                /<br\s*\/?>/g,
                "<span class='block'></span>"
              ),
            }}
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
