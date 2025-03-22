
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-white to-gray-50 z-[-1]"></div>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-medium">
              Streamline Your Amazon Product Reviews
            </span>
          </div>
          <h1 className="mb-6 font-semibold text-foreground leading-tight">
            Transform Customer Feedback into
            <span className="text-secondary"> Business Growth</span>
          </h1>
          <p className="mb-10 text-xl text-muted-foreground max-w-2xl mx-auto">
            The all-in-one platform that helps Amazon vendors collect, manage, and
            leverage product reviews to boost sales and improve products.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild className="w-full sm:w-auto">
              <Link to="/vendor-dashboard" className="px-8">
                Start Free Trial
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="w-full sm:w-auto group">
              <Link to="/#features" className="px-8 flex items-center">
                Explore Features
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="mt-16 relative max-w-5xl mx-auto">
          <div className="glass-card overflow-hidden">
            <div className="p-2">
              <img
                src="https://placehold.co/1200x675/EEE/31304D?text=ReviewBloom+Dashboard"
                alt="ReviewBloom Dashboard Preview"
                className="w-full h-auto rounded-lg shadow-sm"
                loading="lazy"
              />
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 -z-10 w-full h-full bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur-xl opacity-40"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
