import { AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const InActive = () => {
  return (
    <div className="min-h-screen bg-[#212631] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/5 backdrop-blur-sm rounded-lg p-8 text-center space-y-6">
        <div className="flex justify-center">
          <AlertCircle className="w-16 h-16 text-red-500" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-white">
            Access Currently Unavailable
          </h1>
          <p className="text-gray-300">
            We're unable to provide access at this moment. This could be due to an expired subscription or an inactive campaign. Please contact our support team for assistance or check your subscription status.
          </p>
        </div>

        <div className="pt-4">
          <Link to="/">
            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
              Go to the Home Page
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InActive;
