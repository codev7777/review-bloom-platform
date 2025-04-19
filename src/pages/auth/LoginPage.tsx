import { useState, useRef } from "react";
import { Link } from "react-router-dom";
// import ReCAPTCHA from "react-google-recaptcha"; // 👈 Add this line
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { Eye, EyeOff } from "lucide-react";

const SITE_KEY = "6LfCDAorAAAAAPRLQArW4LBb9xO3Tw00J-BIKiLA"; // 👈 Replace with your actual site key

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuth();
  const [loginError, setLoginError] = useState<string | null>(null);

  // const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  // const recaptchaRef = useRef<ReCAPTCHA | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    // if (!recaptchaToken) {
    //   alert("Please verify you're not a robot.");
    //   return;
    // }

    // Optionally verify token on server before login
    try {
      await login(email, password);
    } catch (error) {
      setLoginError("Login failed! Email or Password wrong.");
    }
    // await login(email, password, recaptchaToken);
    // recaptchaRef.current?.reset(); // Reset reCAPTCHA after login attempt
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md animate-fade-in">
        <div className="text-center">
          <Link to="/" className="inline-block">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FF9900] to-orange-400">
              ReviewBrothers
            </h2>
          </Link>
          <h1 className="mt-4 text-2xl font-bold">Welcome back!</h1>
          {/* <p className="mt-2 text-sm text-gray-500">
            Sign in to access your dashboard
          </p> */}
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                placeholder="vendor@example.com"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (loginError) setLoginError(null); // Clear error
                }}
              />
            </div>

            <div>
              <div className="flex items-center justify-start mb-2">
                <Label htmlFor="password">Password</Label>
              </div>
              <div className="relative w-full">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (loginError) setLoginError(null); // Clear error
                  }}
                  placeholder="Password"
                  required
                  className="w-full pr-10 p-2 border border-gray-300 rounded"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {loginError && (
                <p className="text-sm text-red-500 text-left mt-2">
                  {loginError}
                </p>
              )}
            </div>
            <div className="flex items-center justify-start">
              <Button
                type="button"
                variant="link"
                className="px-0 text-sm"
                asChild
              >
                <Link to="/auth/forgot-password" className="underline">
                  Forgot password?
                </Link>
              </Button>
            </div>
            {/* 👇 Add reCAPTCHA here */}
            {/* <div className="flex items-center justify-center">
              <ReCAPTCHA
                sitekey={SITE_KEY}
                ref={recaptchaRef}
                onChange={(token) => setRecaptchaToken(token)}
                onExpired={() => setRecaptchaToken(null)}
              />
            </div> */}
          </div>

          <div>
            <Button
              type="submit"
              className="w-full bg-[#FF9900] hover:bg-orange-500 text-[#232F3E] font-medium"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign in"
              )}
            </Button>
          </div>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/auth/signup"
              className="text-[#FF9900] hover:text-orange-500 font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
