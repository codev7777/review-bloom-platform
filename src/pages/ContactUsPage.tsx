
import { useState } from "react";
import { Layout, LayoutContent } from "@/components/ui/layout";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ContactUsPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, subject: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }, 1500);
  };

  return (
    <Layout>
      <Navbar />
      <LayoutContent className="pt-24 md:pt-28">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Have questions about our services? Get in touch with our team and we'll be happy to help.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-orange-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Call Us</h3>
                <p className="text-gray-600 mb-2">Mon-Fri, 9am-5pm (PST)</p>
                <a href="tel:+15551234567" className="text-orange-500 hover:underline">
                  +1 (555) 123-4567
                </a>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-orange-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Email Us</h3>
                <p className="text-gray-600 mb-2">We'll respond within 24hrs</p>
                <a href="mailto:support@reviewbrothers.com" className="text-orange-500 hover:underline">
                  support@reviewbrothers.com
                </a>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-orange-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Visit Us</h3>
                <p className="text-gray-600 mb-2">Our headquarters</p>
                <address className="not-italic text-orange-500">
                  123 Review Street<br />
                  San Francisco, CA 94103
                </address>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        placeholder="John Smith" 
                        required 
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          name="email" 
                          type="email" 
                          value={formData.email} 
                          onChange={handleChange} 
                          placeholder="john@example.com" 
                          required 
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone (Optional)</Label>
                        <Input 
                          id="phone" 
                          name="phone" 
                          type="tel" 
                          value={formData.phone} 
                          onChange={handleChange} 
                          placeholder="+1 (555) 123-4567" 
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Select onValueChange={handleSelectChange} value={formData.subject}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="support">Technical Support</SelectItem>
                          <SelectItem value="billing">Billing Question</SelectItem>
                          <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea 
                        id="message" 
                        name="message" 
                        value={formData.message} 
                        onChange={handleChange} 
                        placeholder="How can we help you?" 
                        rows={5} 
                        required 
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-[#FF9900] hover:bg-orange-500 text-[#232F3E]"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">What is ReviewBrothers?</h3>
                    <p className="text-gray-700">
                      ReviewBrothers is a platform that helps Amazon sellers collect and manage customer reviews through
                      compliant methods that follow marketplace terms of service.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-2">How does your pricing work?</h3>
                    <p className="text-gray-700">
                      We offer different subscription plans based on your business needs. You can view our pricing
                      on our <a href="/#pricing" className="text-orange-500 hover:underline">pricing page</a>.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Is ReviewBrothers compliant with Amazon's TOS?</h3>
                    <p className="text-gray-700">
                      Yes, ReviewBrothers is fully compliant with Amazon's Terms of Service. We do not incentivize
                      reviews or use any practices that violate marketplace policies.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-2">How can I get started?</h3>
                    <p className="text-gray-700">
                      You can sign up for an account on our website and follow our step-by-step onboarding process.
                      If you need help, our support team is available to assist you.
                    </p>
                  </div>
                  
                  <div className="pt-4">
                    <Button asChild variant="outline" className="w-full">
                      <a href="/help">View All FAQs</a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutContent>
      <Footer />
    </Layout>
  );
};

export default ContactUsPage;
