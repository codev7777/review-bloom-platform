import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { forgotPassword } from "../../lib/api/users/users.api";
import { ArrowLeft, CheckCircle, Mail } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call to reset password
      await forgotPassword(email);

      // Show success
      setIsSubmitted(true);

      // In a real app, this would call an API endpoint
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send reset link. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* <Navbar /> */}
      <main className="flex-grow pt-24 md:pt-28 flex items-center justify-center px-4 py-12 animate-fade-in">
        <div className="w-full max-w-md">
          {!isSubmitted ? (
            <Card className="animate-fade-in">
              <CardHeader>
                <div className=" flex justify-center items-center">
                  <div className="w-40 h-40">
                    {" "}
                    <DotLottieReact
                      src="https://lottie.host/53b14e17-c62f-416e-bd75-e309652e3dd0/edKUh5qCAQ.lottie"
                      loop
                      autoplay
                    />
                  </div>
                </div>
                <CardTitle className="text-xl text-center text-[#f97316]">
                  Reset your password
                </CardTitle>
                <CardDescription>
                  <p className="my-4 text-left">
                    Enter your email address and we'll send you a link to reset
                    your password
                  </p>
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      placeholder="name@example.com"
                      type="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button
                    type="submit"
                    className="w-full bg-[#FF9900] hover:bg-orange-500 text-[#232F3E]"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Mail className="mr-2 h-4 w-4" />
                        Send Reset Link
                      </div>
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    type="button"
                    className="w-full"
                    onClick={() => navigate("/auth/login")}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Login
                  </Button>
                </CardFooter>
              </form>
            </Card>
          ) : (
            <Card className="animate-fade-in">
              <CardHeader className="text-center pb-6">
                <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-xl">Check your email</CardTitle>
                <CardDescription className="pt-2">
                  We've sent a password reset link to <strong>{email}</strong>
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center text-sm text-muted-foreground pb-6">
                <p>
                  If you don't see the email in your inbox, please check your
                  spam folder.
                </p>
                <p className="mt-2">The link will expire in 24 hours.</p>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setIsSubmitted(false)}
                >
                  Try a different email
                </Button>
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => navigate("/auth/login")}
                >
                  Back to login
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default ForgotPasswordPage;
