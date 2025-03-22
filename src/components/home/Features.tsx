
import { QrCode, BarChart4, Mail, Repeat } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <QrCode className="w-10 h-10 text-secondary" />,
      title: "QR Code Integration",
      description:
        "Generate QR codes for your products that direct customers to a customized review funnel, making feedback collection seamless and efficient.",
    },
    {
      icon: <Repeat className="w-10 h-10 text-secondary" />,
      title: "Smart Review Funnel",
      description:
        "Automatically route positive reviews to Amazon while capturing constructive feedback internally for product improvement.",
    },
    {
      icon: <BarChart4 className="w-10 h-10 text-secondary" />,
      title: "Comprehensive Analytics",
      description:
        "Track review trends, sentiment analysis, and performance metrics to gain actionable insights for your Amazon business.",
    },
    {
      icon: <Mail className="w-10 h-10 text-secondary" />,
      title: "Email Automation",
      description:
        "Trigger personalized follow-up emails to customers, encouraging reviews and building lasting relationships.",
    },
  ];

  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="mb-4 font-semibold text-foreground">
            Powerful Features for Amazon Vendors
          </h2>
          <p className="text-lg text-muted-foreground">
            Our platform provides all the tools you need to collect, manage, and
            leverage Amazon product reviews effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative group p-8 bg-white rounded-xl shadow-sm border border-border hover:shadow-hover transition-all duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            </div>
          ))}
        </div>

        <div className="mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="space-y-6">
                <div className="inline-block">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-medium">
                    Review Funnel
                  </span>
                </div>
                <h2 className="font-semibold text-foreground">
                  Guide Customers Through a Seamless Review Process
                </h2>
                <p className="text-muted-foreground text-lg">
                  Our intelligent review funnel uses conditional logic to route feedback appropriately: positive reviews go to Amazon while constructive feedback is captured for your team.
                </p>
                <ul className="space-y-3">
                  {[
                    "Customizable review forms with your branding",
                    "Intelligent routing based on star ratings",
                    "Region-specific Amazon redirection",
                    "Incentive management for reviewers",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-secondary/20 flex items-center justify-center mt-1">
                        <div className="w-2 h-2 rounded-full bg-secondary"></div>
                      </div>
                      <span className="ml-3 text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="glass-card overflow-hidden">
                <div className="p-2">
                  <img
                    src="https://placehold.co/800x600/EEE/31304D?text=Review+Funnel"
                    alt="Review Funnel Example"
                    className="w-full h-auto rounded-lg shadow-sm"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 -z-10 w-full h-full bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur-xl opacity-40"></div>
            </div>
          </div>

          <div className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="glass-card overflow-hidden">
                <div className="p-2">
                  <img
                    src="https://placehold.co/800x600/EEE/31304D?text=Analytics+Dashboard"
                    alt="Analytics Dashboard Example"
                    className="w-full h-auto rounded-lg shadow-sm"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 -z-10 w-full h-full bg-gradient-to-r from-secondary/20 to-primary/20 rounded-xl blur-xl opacity-40"></div>
            </div>
            <div>
              <div className="space-y-6">
                <div className="inline-block">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-medium">
                    Analytics
                  </span>
                </div>
                <h2 className="font-semibold text-foreground">
                  Gain Actionable Insights from Customer Feedback
                </h2>
                <p className="text-muted-foreground text-lg">
                  Our comprehensive analytics dashboard transforms raw feedback into valuable business intelligence, helping you identify trends and improvement opportunities.
                </p>
                <ul className="space-y-3">
                  {[
                    "Review volume and sentiment tracking",
                    "Product performance comparisons",
                    "Campaign effectiveness metrics",
                    "Detailed feedback categorization",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-secondary/20 flex items-center justify-center mt-1">
                        <div className="w-2 h-2 rounded-full bg-secondary"></div>
                      </div>
                      <span className="ml-3 text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
