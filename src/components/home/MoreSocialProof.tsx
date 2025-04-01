import React from "react";
import { motion } from "framer-motion";
import ProductReviewsFeature from "./ProductReviewFeature";

const MoreSocialProof: React.FC = () => {
  return (
    <div className="bg-gray-50">
      <div className="container mx-auto p-6 flex flex-row items-center bg-gray-50">
        {/* Image - Appears from Left */}
        <motion.div
          className="w-[40%]"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img
            src="images/landing/with_rsg.png"
            alt="Social Proof"
            className="w-full"
          />
        </motion.div>

        {/* Product Review Feature - Appears from Right */}
        <motion.div
          className="w-[60%]"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <ProductReviewsFeature />
        </motion.div>
      </div>
    </div>
  );
};

export default MoreSocialProof;
