
import React from 'react';
import { ExternalLink } from 'lucide-react';

const KnowledgeCenterContent: React.FC = () => {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-semibold mb-4">100% Amazon, eBay, Walmart, Etsy & Shopify Compliant Smart Funnel - How It Works</h2>
        <p>Our smart funnel system is designed to help you engage with your customers and build your email list through a series of interactive steps. The process begins with you creating a campaign promotion in your dashboard, where your customers can redeem a free gift with their product purchase.</p>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-3">Campaign Setup</h3>
        <p>With your campaign set up, you can download the unique QR Code and print it on your product insert card. When customers purchase your products, they can scan the unique QR code on the product insert card to enter your smart funnel to redeem their free gift.</p>
        <p>You can optionally create campaigns without a promotion. These promotions are optimized to collect reviews only and a free gift is not offered.</p>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-3">Smart Funnel Process</h3>
        <p>Once in the smart funnel, your customers are prompted to enter their contact information to redeem their free gift. The key to the smart funnel system is based on the product feedback rating your customers can leave.</p>
        
        <div className="bg-card p-4 rounded-lg border">
          <h4 className="font-semibold mb-2">How Reviews Are Handled:</h4>
          <ul className="list-disc pl-5 space-y-2">
            <li>Depending on their feedback rating, the smart funnel will direct them to leave a review on your Amazon, eBay, Walmart, Etsy, Shopify, Wordpress or your own webstore's product detail page if their feedback rating is high (Very Satisfied).</li>
            <li>If their feedback rating is not very satisfied, the smart funnel will not direct your customers to leave their feedback on your product detail page, their feedback will only be recorded for your internal use.</li>
            <li>The Smart option can also be disabled in the campaign settings.</li>
          </ul>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-3">Compliance</h3>
        <div className="bg-card p-4 rounded-lg border">
          <h4 className="font-semibold mb-2">Our Smart Funnel is 100% Compliant Because:</h4>
          <ul className="list-disc pl-5 space-y-2">
            <li>The smart funnel never incentives reviews</li>
            <li>The smart funnel doesn't explicitly request only positive reviews</li>
            <li>Your customers will always receive their free gift, regardless of their feedback rating</li>
            <li>The smart funnel does not circumvent Amazon, eBay, Walmart, Etsy and Shopify's product purchasing workflow</li>
          </ul>
        </div>
        <p className="mt-4">This 100% Amazon, eBay, Walmart, Etsy and Shopify compliant smart funnel collects your customers' contact information, allowing you to build your own email list for future marketing campaigns and increase your product review ratings, ultimately leading to more sales.</p>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-3">Platform Support</h3>
        <p>Our funnel also works with Wordpress or your own branded webstore.</p>
        
        <div className="bg-card p-4 rounded-lg border mt-4">
          <h4 className="font-semibold mb-2">Supported Platforms</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {['Amazon', 'eBay', 'Walmart', 'Etsy', 'Shopify', 'Wordpress', 'Custom Webstore'].map(platform => (
              <div key={platform} className="flex items-center gap-2 bg-muted p-2 rounded">
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
                {platform}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="text-center mt-8">
        <a 
          href="https://youtu.be/E83YdYXj_VI" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
          Watch Video Tutorial
        </a>
      </section>
    </div>
  );
};

export default KnowledgeCenterContent;
