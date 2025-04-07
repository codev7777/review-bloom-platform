import React from "react";
import { motion } from "framer-motion";
import ProductReviewsFeature from "./ProductReviewFeature";

const MoreSocialProof: React.FC = () => {
  return (
    <div className="bg-gray-50 max-w-screen overflow-x-hidden">
      <div className="container mx-auto flex lg:flex-row flex-col items-center bg-gray-50 px-4">
        {/* Image - Appears from Left */}
        <motion.div
          className="w-full lg:w-[37%] mb-6 lg:mb-0 max-w-[500px]   "
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
          className="w-full lg:w-[55%]"
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
