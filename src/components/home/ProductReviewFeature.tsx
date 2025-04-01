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
    <div className="flex items-start gap-6 mb-8">
      <div className="flex-shrink-0">
        <div className="w-16 h-16 rounded-full border-2 border-gray-300 flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <div className="bg-teal-50 p-4 rounded-md">
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
};

const ProductReviewsFeature: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* <h1 className="text-4xl font-bold text-teal-500 mb-4"> */}
      <h1 className="text-4xl font-bold text-secondary mb-4">
        Without <span className="font-[900]">ReviewBrothers</span> <br />
        With <span className="font-[900]">ReviewBrothers</span> <br /> Boost
        Your Sales with Better Product Reviews
      </h1>

      <p className="text-gray-600 text-lg mb-12">
        Increase Customer Engagement by making it easy for your shoppers to
        connect with your brand, redeem gifts, and leave you valuable feedback
        and product reviews
      </p>

      <div className="space-y-4">
        <FeatureItem
          icon={<Star className="w-8 h-8 text-gray-700" />}
          title="Boost Reviews and Ratings"
          description="Get more customer feedback and increase your product ratings with seamless review requests"
        />

        <FeatureItem
          icon={<Mail className="w-8 h-8 text-gray-700" />}
          title="Build Your Email List"
          description="Collect customer details and email addresses for future marketing campaigns and product launches"
        />

        <FeatureItem
          icon={<Rocket className="w-8 h-8 text-gray-700" />}
          title="Easy 5-Step Integration"
          description="Simple to set up and integrate into your existing product packaging and sales process"
        />
      </div>
    </div>
  );
};

export default ProductReviewsFeature;
