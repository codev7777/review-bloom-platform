import React from "react";
import ProductReviewsFeature from "./ProductReviewFeature";

const MoreSocialProof: React.FC = () => {
  return (
    <div className="bg-gray-50">
      <div className=" mx-auto p-6 flex flex-row container items-center bg-gray-50">
        <div className="w-[40%]">
          <img
            src="images/landing/with_rsg.png"
            alt="Social Proof"
            className="w-full"
          />
        </div>
        <div className="w-[60%]">
          <ProductReviewsFeature />
        </div>
      </div>
    </div>
  );
};

export default MoreSocialProof;
