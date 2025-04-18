import React, { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";
import api from "@/lib/api/axiosConfig";

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("Verifying...");
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const navigate = useNavigate();
  const verificationAttempted = useRef(false);

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setMessage("No verification token provided.");
      setStatus("error");
      return;
    }

    // Prevent double verification
    if (verificationAttempted.current) {
      return;
    }
    verificationAttempted.current = true;

    api
      .post(`/auth/verify-email?token=${token}`)
      .then((response) => {
        if (response.status === 200) {
          setMessage("Email verified successfully!");
          setStatus("success");
          // Redirect after 3 seconds
          setTimeout(() => {
            navigate("/auth/login");
          }, 3000);
        } else {
          setMessage("Verification failed. Invalid or expired token.");
          setStatus("error");
        }
      })
      .catch((error) => {
        console.error("Verification error:", error);
        setMessage("An error occurred during verification.");
        setStatus("error");
      });
  }, [searchParams, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center flex items-center justify-center flex-col">
        {status === "loading" && (
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        )}
        {status === "success" && (
          <CheckCircleIcon className="h-16 w-16 text-green-500 mb-4" />
        )}
        {status === "error" && (
          <ExclamationCircleIcon className="h-16 w-16 text-red-500 mb-4" />
        )}
        <h1 className="text-2xl font-bold mb-4">Email Verification</h1>
        <p className="text-gray-700">{message}</p>
        {status === "success" && (
          <p className="text-sm text-gray-500 mt-2">
            Redirecting to login page in 3 seconds...
          </p>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
