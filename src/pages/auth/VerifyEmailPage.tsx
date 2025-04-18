import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";
import api from "@/lib/api/axiosConfig";

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("Verifying...");
  const [status, setStatus] = useState("loading");
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      // Use axios to send API call to verify email
      console.log(token);
      api
        .post(`/auth/verify-email?token=${token}`)
        // .get(`/api/verify-email?token=${token}`)
        .then((response) => {
          if (response.status === 200) {
            setMessage("Email verified successfully!");
            setStatus("success");
            // Redirect after 5 seconds
            setTimeout(() => {
              navigate("/login");
            }, 350000);
          } else {
            setMessage("Verification failed. Invalid or expired token.");
            setStatus("error");
          }
        })
        .catch(() => {
          setMessage("An error occurred during verification.");
          setStatus("error");
        });
    } else {
      setMessage("No verification token provided.");
      setStatus("error");
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center flex items-center justify-center flex-col">
        {status === "loading" && <div className="loader mb-4"></div>}
        {status === "success" && (
          <CheckCircleIcon className="h-16 w-16 text-green-500 mb-4" />
        )}
        {status === "error" && (
          <ExclamationCircleIcon className="h-16 w-16 text-red-500 mb-4" />
        )}
        <h1 className="text-2xl font-bold mb-4">Email Verification</h1>
        <p className="text-gray-700">{message}</p>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
