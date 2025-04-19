import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const VerificationEmailSent: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const [message, setMessage] = useState("");

  const handleResendEmail = async () => {
    try {
      const response = await fetch("/api/resend-verification-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage("Verification email resent successfully.");
      } else {
        setMessage("Failed to resend verification email.");
      }
    } catch (error) {
      console.error("Error resending verification email:", error);
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="verification-email-sent flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <div className="flex items-center justify-center">
          <img
            src="https://media.giphy.com/media/1Pq5Qi6CuWTprafYLT/giphy.gif?cid=ecf05e4774xyeza36qg6v8y13o4pluv23a6kinpyo2t4e5fn&ep=v1_gifs_search&rid=giphy.gif&ct=g"
            alt="Funny GIF"
            width="100"
            loading="lazy"
          />
        </div>
        <h1 className="text-2xl font-bold text-orange-600 mb-4">
          Verification Email Sent
        </h1>
        <p className="text-gray-700 mb-4">
          A verification email has been sent to <strong>{email}</strong>.
        </p>
        <p className="text-gray-600 mb-6">
          If you did not receive the email, please check your spam folder or
          click the button below to resend the verification email.
        </p>
        <button
          onClick={handleResendEmail}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors duration-300"
        >
          Resend Verification Email
        </button>
        {message && <p className="mt-4 text-sm text-gray-500">{message}</p>}
      </div>
    </div>
  );
};

export default VerificationEmailSent;
