import React from "react";
import { Star, Mail, Rocket } from "lucide-react";

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="flex items-start mb-8">
      <div className="flex-shrink-0">
        <div className="rounded-full flex justify-center pt-[3px] px-2">
          {icon}
        </div>
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-extrabold text-gray-800 mb-2">{title}</h3>
        <div className="bg-teal-50 p-4 rounded-md">
          <p className="text-black text-sm font-medium">{description}</p>
        </div>
      </div>
    </div>
  );
};

const ProductReviewsFeature: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 3xl:mx-0 3xl:px-0">
      {/* <h1 className="text-4xl font-bold text-teal-500 mb-4"> */}
      <h1 className="text-3xl font-extrabold text-secondary mb-4">
        Boost Your Sales with Powerful Product Reviews
      </h1>

      <p className="text-black text-sm font-medium mb-12">
        Turn every customer moment into a growth opportunity. Make it effortless for your shoppers to engage with your brand, share their experience, and unlock exclusive gifts — while you collect valuable insights and drive more reviews.
      </p>

      <div className="space-y-4">
        <FeatureItem
          icon={<img src="/images/icons/star.png" className="w-[22px] h-[22px]" />}
          title="Boost Reviews & Ratings"
          description="Get consistent, high-quality feedback and improve your product ratings through automated and easy-to-use review invitations."
        />

        <FeatureItem
          icon={<img src="/images/icons/email.png" className="w-[22px] h-[22px]" />}
          title="Build Your Email List"
          description="Capture customer data and email addresses directly from the review process — ideal for future launches, promotions, and loyalty campaigns"
        />

        <FeatureItem
          icon={<img src="/images/icons/rocket.png" className="w-[22px] h-[22px]" />}
          title="Easy 5-Step Integration"
          description="Set up in minutes. Seamlessly add ReviewBrothers to your existing packaging, checkout flow, or follow-up emails — no coding required."
        />
      </div>
    </div>
  );
};

export default ProductReviewsFeature;
