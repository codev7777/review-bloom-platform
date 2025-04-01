import React from "react";
import { Button } from "@/components/ui/button";
import { Play, QrCode, ArrowDown, CheckCircle } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import GetDomain from "@/lib/GetDomain";
import { Link } from "react-router-dom";

const Demo = () => {
  return (
    <div className="flex flex-col items-center bg-gray-50">
      {/* Header */}

      <header className="w-full max-w-4xl pt-20 pb-12 px-4 text-center bg-[#faf4f3]">
        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-2">
          Boost Reviews —<br />
          The Amazon-Safe Way
        </h1>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-4xl flex-1 bg-[#faf4f3]">
        <div className="grid md:grid-cols-2 gap-8 items-center ">
          <div className="flex justify-end md:justify-end">
            <div className="relative pl-20 pb-0 pt-max">
              <img src="/images/landing/re.png" className="h-90" />
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-6">
            <div className="">
              <div className="flex items-start gap-4 relative">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-400 text-white flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-1">
                    Scan the QR code <br /> on the insert or inside <br /> the
                    Packaging
                  </h3>
                </div>
                {/* <div className="absolute left-4 bottom-0 transform translate-y-full">
                  <ArrowDown className="text-teal-500" size={240} />
                </div> */}
              </div>

              <div className="flex items-start gap-4 pt-6">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-400 text-white flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-1">
                    Give feedback and <br />
                    claim your free gift
                  </h3>
                  <p className="text-gray-500 text-sm italic">
                    (Gift is not in exchange for a review)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-6">
                <div className="opacity-0 flex-shrink-0 w-8 h-8 rounded-full bg-orange-400 text-white flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-1">
                    Satisfied? <br />
                    Leave a review – <br /> Optional
                  </h3>
                </div>
              </div>
              <div className="flex items-start gap-4 pt-6">
                <div className="opacity-0 flex-shrink-0 w-8 h-8 rounded-full bg-orange-400 text-white flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-1">
                    Not satisfied? <br />
                    Redirected to <br /> customer support
                  </h3>
                </div>
              </div>
            </div>

            {/* <div className="grid grid-cols-2 gap-4">
              <div className="p-3 border-l-4 border-green-500 bg-white rounded">
                <h3 className="font-bold text-base">Satisfied?</h3>
                <p className="text-sm">Leave a review – Optional</p>
              </div>
              <div className="p-3 border-l-4 border-orange-500 bg-white rounded">
                <h3 className="font-bold text-base">Not satisfied?</h3>
                <p className="text-sm">Redirected to customer support</p>
              </div>
            </div> */}
          </div>
        </div>

        <div className="bg-teal-800 text-white p-6 rounded-lg">
          <div className=" flex items-center flex-col">
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

          <div className="mt-8 flex justify-center">
            <Button className="bg-teal-200 hover:bg-teal-300 text-teal-900 font-medium text-lg px-4 py-3 h-auto rounded-full flex items-center gap-2">
              <Play size={24} /> Watch Demo Now
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center space-y-6 py-16 bg-gray-50">
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
        </div>
      </main>
    </div>
  );
};

export default Demo;
