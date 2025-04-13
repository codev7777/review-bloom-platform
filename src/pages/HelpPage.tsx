import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import KnowledgeCenterContent from "@/components/help/KnowledgeCenterContent";

const helpArticles = [
  {
    category: "Knowledge Center",
    articles: [
      { 
        id: "how-it-works", 
        title: "How It Works", 
        component: KnowledgeCenterContent 
      }
    ]
  },
  {
    category: "Getting Started",
    articles: [
      { id: "how-it-works", title: "How It Works" },
      { id: "supported-platforms", title: "Supported Platform" },
      { id: "verified-vs-unverified", title: "Verified vs Unverified Reviews" },
      { id: "product-reviews", title: "Product Reviews & Seller Feedback" }
    ]
  },
  {
    category: "Campaigns & Products",
    articles: [
      { id: "create-campaigns", title: "How to Create Campaigns" },
      { id: "add-products", title: "How to Add Products" },
      { id: "create-promotions", title: "How to Create Promotions" },
      { id: "gift-cards", title: "Gift Cards and Promotional Types" },
      { id: "enter-coupon-codes", title: "How to Enter Coupon Codes" },
      { id: "bulk-uploading", title: "Bulk Uploading Coupon Codes" }
    ]
  },
  {
    category: "Promotions & Gift Cards",
    articles: [
      { id: "get-gift-cards", title: "Where to Get Gift Cards or Promo Codes" },
      { id: "amazon-promotion", title: "How to Create an Amazon Promotion" },
      { id: "process-egift-cards", title: "How to Buy and Process eGift Cards" }
    ]
  },
  {
    category: "QR Codes & Review Funnels",
    articles: [
      { id: "download-qr", title: "Downloading & Printing QR Codes" },
      { id: "claims-center", title: "How to Use the Claims Center" },
      { id: "test-campaigns", title: "How to Test Your Campaigns & Funnels" },
      { id: "white-label", title: "How to White Label or Add Personalized Branding" },
      { id: "meta-pixel", title: "How to Add a Meta Pixel to the Smart Funnel" }
    ]
  },
  {
    category: "Insert Cards",
    articles: [
      { id: "insert-cards", title: "Where to Get Insert Cards Made" },
      { id: "existing-cards", title: "How Can I Use My Existing Insert Cards" },
      { id: "amazon-compliant", title: "Amazon Compliant Insert Cards" }
    ]
  },
  {
    category: "Account & Billing",
    articles: [
      { id: "upgrade-plans", title: "Upgrade or Change Subscription Plans" }
    ]
  }
];

const HelpPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredArticles, setFilteredArticles] = useState(helpArticles);
  const [activeArticle, setActiveArticle] = useState<null | { 
    title: string, 
    Component?: React.ComponentType 
  }>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      setFilteredArticles(helpArticles);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const filtered = helpArticles.map(category => ({
      ...category,
      articles: category.articles.filter(article => 
        article.title.toLowerCase().includes(query)
      )
    })).filter(category => category.articles.length > 0);
    
    setFilteredArticles(filtered);
  };

  const openArticle = (article: { 
    id: string, 
    title: string, 
    component?: React.ComponentType 
  }) => {
    setActiveArticle({
      title: article.title,
      Component: article.component
    });
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-24 md:pt-28 animate-fade-in">
        <div className="container mx-auto px-4 pb-16">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-semibold mb-4">Help Center</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                Find answers to common questions and learn how to get the most out of ReviewBrothers
              </p>
              
              <form 
                onSubmit={handleSearch}
                className="flex w-full max-w-lg mx-auto gap-2"
              >
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search for help articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button type="submit">Search</Button>
              </form>
            </div>
            
            {activeArticle?.Component ? (
              <div className="bg-card rounded-lg p-8 shadow-sm border animate-fade-in">
                <Button
                  variant="outline"
                  onClick={() => setActiveArticle(null)}
                  className="mb-4"
                >
                  Back to Help Center
                </Button>
                <h2 className="text-2xl font-semibold mb-4">{activeArticle.title}</h2>
                <div className="prose max-w-none">
                  <activeArticle.Component />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                  <div className="sticky top-28 bg-card rounded-lg p-6 shadow-sm border">
                    <h3 className="text-lg font-medium mb-4">Categories</h3>
                    <ul className="space-y-2">
                      {helpArticles.map((category, index) => (
                        <li key={index}>
                          <Button 
                            variant="ghost" 
                            className="w-full justify-start text-left"
                          >
                            {category.category}
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="lg:col-span-2">
                  {filteredArticles.length > 0 ? (
                    <Accordion type="single" collapsible className="space-y-4">
                      {filteredArticles.map((category, i) => (
                        <AccordionItem 
                          key={i} 
                          value={`category-${i}`}
                          className="bg-card rounded-lg shadow-sm border px-4"
                        >
                          <AccordionTrigger className="text-lg font-medium py-4">
                            {category.category}
                          </AccordionTrigger>
                          <AccordionContent>
                            <ul className="space-y-2 py-2">
                              {category.articles.map((article, j) => (
                                <li key={j}>
                                  <Button 
                                    variant="ghost" 
                                    className="w-full justify-start text-left"
                                    onClick={() => openArticle(article)}
                                  >
                                    {article.title}
                                  </Button>
                                </li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  ) : (
                    <div className="text-center py-12 bg-card rounded-lg shadow-sm border">
                      <p className="text-lg text-muted-foreground">
                        No results found for "{searchQuery}"
                      </p>
                      <Button 
                        variant="outline" 
                        className="mt-4"
                        onClick={() => {
                          setSearchQuery("");
                          setFilteredArticles(helpArticles);
                        }}
                      >
                        Clear search
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HelpPage;
