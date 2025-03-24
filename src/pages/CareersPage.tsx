
import { Layout, LayoutContent } from "@/components/ui/layout";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase } from "lucide-react";

const CareersPage = () => {
  const openPositions = [
    {
      id: 1,
      title: "Senior Full Stack Developer",
      department: "Engineering",
      location: "Remote (US/Europe)",
      type: "Full-time",
      description: "We are looking for a Senior Full Stack Developer with experience in React, Node.js, and cloud services to join our engineering team and help build the next generation of our review management platform."
    },
    {
      id: 2,
      title: "UX/UI Designer",
      department: "Product Design",
      location: "San Francisco, CA (Hybrid)",
      type: "Full-time",
      description: "We're seeking a talented UX/UI Designer to create exceptional user experiences for our web application. You'll work closely with product managers and engineers to design intuitive interfaces that delight our users."
    },
    {
      id: 3,
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Remote (US)",
      type: "Full-time",
      description: "Join our customer success team to help e-commerce sellers get the most out of our platform. You'll onboard new clients, provide training, and ensure our customers achieve their review collection goals."
    },
    {
      id: 4,
      title: "Content Marketing Specialist",
      department: "Marketing",
      location: "Remote (US/Europe)",
      type: "Full-time",
      description: "We're looking for a Content Marketing Specialist to create compelling content that educates e-commerce sellers about best practices in review collection and management."
    },
    {
      id: 5,
      title: "Sales Development Representative",
      department: "Sales",
      location: "New York, NY (Hybrid)",
      type: "Full-time",
      description: "As a Sales Development Representative, you'll identify and reach out to potential clients, qualify leads, and set up meetings for our Account Executives."
    },
  ];

  const benefits = [
    "Competitive salary and equity packages",
    "Comprehensive health, dental, and vision insurance",
    "Flexible work arrangements and unlimited PTO",
    "Professional development budget",
    "Home office stipend",
    "Regular team retreats and events",
    "Parental leave",
    "401(k) matching",
    "Mental health resources"
  ];

  return (
    <Layout>
      <Navbar />
      <LayoutContent className="pt-24 md:pt-28">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
              <p className="text-xl text-gray-600">
                Help us revolutionize how Amazon sellers collect and manage reviews
              </p>
            </div>
            
            <div className="mb-16">
              <h2 className="text-2xl font-semibold mb-6">Why Work With Us</h2>
              <p className="mb-8 text-gray-700">
                At ReviewBrothers, we're building technology that helps e-commerce sellers collect authentic reviews and grow their businesses. We're a team of passionate individuals who are committed to creating exceptional products and delivering outstanding service to our customers.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-orange-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2 text-orange-600">Innovation</h3>
                  <p className="text-gray-700">
                    We're constantly pushing the boundaries of what's possible in review management and e-commerce tools.
                  </p>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2 text-blue-600">Growth</h3>
                  <p className="text-gray-700">
                    We're growing rapidly and offer significant opportunities for professional development and advancement.
                  </p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2 text-green-600">Impact</h3>
                  <p className="text-gray-700">
                    Your work will directly help thousands of e-commerce sellers succeed in competitive marketplaces.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mb-16">
              <h2 className="text-2xl font-semibold mb-6">Benefits & Perks</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center p-3 border rounded-md">
                    <div className="h-2 w-2 rounded-full bg-orange-500 mr-3"></div>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-6">Open Positions</h2>
              <div className="space-y-4">
                {openPositions.map((position) => (
                  <Card key={position.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{position.title}</CardTitle>
                          <CardDescription className="mt-1">
                            {position.department} · {position.location} · {position.type}
                          </CardDescription>
                        </div>
                        <Briefcase className="text-orange-500" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">{position.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Button className="bg-[#FF9900] hover:bg-orange-500 text-[#232F3E]">
                        Apply Now
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </LayoutContent>
      <Footer />
    </Layout>
  );
};

export default CareersPage;
