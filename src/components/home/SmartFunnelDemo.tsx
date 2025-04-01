import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, CheckCircle } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import GetDomain from "@/lib/GetDomain";
import { Link } from "react-router-dom";

const Demo = () => {
  return (
    <div className="flex flex-col items-center bg-gray-50">
      {/* Header */}
      <motion.header
        className="w-full max-w-4xl pt-20 pb-12 px-4 text-center bg-[#faf4f3]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-2">
          Boost Reviews —<br />
          The Amazon-Safe Way
        </h1>
      </motion.header>

      {/* Main Content */}
      <main className="w-full max-w-4xl flex-1 bg-[#faf4f3]">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Image - Slide in from Left */}
          <motion.div
            className="flex justify-end md:justify-end"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative pl-20 pb-0 pt-max">
              <img src="/images/landing/re.png" className="h-90" />
            </div>
          </motion.div>

          {/* Steps - Fade in one by one */}
          <motion.div
            className="flex flex-col justify-center space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            transition={{ staggerChildren: 0.3 }}
          >
            {[
              "Scan the QR code on the insert or inside the packaging",
              "Give feedback and claim your free gift",
              "Satisfied? Leave a review – Optional",
              "Not satisfied? Redirected to customer support",
            ].map((text, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-4"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-400 text-white flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-2xl font-semibold">{text}</h3>
                  {index === 1 && (
                    <p className="text-gray-500 text-sm italic">
                      (Gift is not in exchange for a review)
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Compliance Section - Fade in from Bottom */}
        <motion.div
          className="bg-teal-800 text-white p-6 rounded-lg mt-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex items-center flex-col">
            <div className="space-y-3 text-center">
              {[
                "No incentives for reviews",
                "No review filtering",
                "100% Amazon TOS compliant",
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle
                    className="text-teal-200 flex-shrink-0"
                    size={24}
                  />
                  <span className="text-lg font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Watch Demo Button - Fade in */}
          <motion.div
            className="mt-8 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <Button className="bg-teal-200 hover:bg-teal-300 text-teal-900 font-medium text-lg px-4 py-3 h-auto rounded-full flex items-center gap-2">
              <Play size={24} /> Watch Demo Now
            </Button>
          </motion.div>
        </motion.div>

        {/* QR Code Section - Fade in from Bottom */}
        <motion.div
          className="flex flex-col items-center justify-center space-y-6 py-16 bg-gray-50"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="text-4xl font-bold">
            <h1>Smart Funnel Demo</h1>
          </div>
          <div>
            <QRCodeCanvas
              value={GetDomain() + "/review/demo-campaign"}
              size={360}
              className="border p-2 rounded shadow-sm"
            />
          </div>
          <div>
            Scan the QR Code or&nbsp;
            <Link to="/review/demo-campaign" className="text-primary">
              click here
            </Link>
            &nbsp; to see a demo funnel
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Demo;
