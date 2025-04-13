
import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";

const KnowledgeCenterContent: React.FC = () => {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-semibold mb-4">100% Amazon Compliant Smart Funnel - How It Works</h2>
        <p className="mb-3">Our smart funnel system is designed to help you engage with your customers and build your email list through a series of interactive steps. The process begins with you creating a campaign promotion in your dashboard, where your customers can redeem a free gift with their product purchase.</p>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-3">Campaign Setup</h3>
        <p className="mb-3">With your campaign set up, you can download the unique QR Code and print it on your product insert card. When customers purchase your products, they can scan the unique QR code on the product insert card to enter your smart funnel to redeem their free gift.</p>
        <p className="mb-3">You can optionally create campaigns without a promotion. These promotions are optimized to collect reviews only and a free gift is not offered.</p>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-3">Smart Funnel Process</h3>
        <p className="mb-3">Once in the smart funnel, your customers are prompted to enter their contact information to redeem their free gift. The key to the smart funnel system is based on the product feedback rating your customers can leave.</p>
        
        <div className="bg-card p-4 rounded-lg border mb-4">
          <h4 className="font-semibold mb-2">How Reviews Are Handled:</h4>
          <ul className="list-disc pl-5 space-y-2">
            <li>Depending on their feedback rating, the smart funnel will direct them to leave a review on your Amazon product detail page if their feedback rating is high (Very Satisfied).</li>
            <li>If their feedback rating is not very satisfied, the smart funnel will not direct your customers to leave their feedback on your product detail page, their feedback will only be recorded for your internal use.</li>
            <li>The Smart option can also be disabled in the campaign settings.</li>
          </ul>
        </div>
        
        <p className="mb-3">You can view a Demo Campaign to see this in action.</p>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-3">Compliance</h3>
        <div className="bg-card p-4 rounded-lg border mb-4">
          <h4 className="font-semibold mb-2">Our Smart Funnel is 100% Compliant Because:</h4>
          <ul className="list-disc pl-5 space-y-2">
            <li>The smart funnel never incentives reviews</li>
            <li>The smart funnel doesn't explicitly request only positive reviews</li>
            <li>Your customers will always receive their free gift, regardless of their feedback rating</li>
            <li>The smart funnel does not circumvent Amazon's product purchasing workflow</li>
          </ul>
        </div>
        <p className="mb-4">This 100% Amazon compliant smart funnel collects your customers' contact information, allowing you to build your own email list for future marketing campaigns and increase your product review ratings, ultimately leading to more sales.</p>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-3">Product Reviews & Seller Feedback</h3>
        <p className="mb-3">For products you're selling on Amazon, you have the option to collect product reviews or seller feedback.</p>
        <p className="mb-3">*The Starter plan only has the product review option. The Business and Enterprise plan have the option to collect product reviews and seller feedback.</p>
        
        <div className="space-y-6">
          <div>
            <p className="mb-3">In the campaign settings, campaigns where the Review Type option is set to Product Reviews, shoppers will be redirected to the product detail page as shown below.</p>
            <div className="border rounded-lg overflow-hidden mb-3">
              <img 
                src="/images/help/amazon-product-review.png" 
                alt="Amazon Product Review Page" 
                className="w-full object-contain"
              />
            </div>
          </div>
          
          <div>
            <p className="mb-3">In the campaign settings, campaigns where the Review Type option is set to Seller Feedback, due to how the Amazon platform functions, when your customers are redirected to leave seller feedback, they are taken to their Order History page where they can click on the Leave Seller Feedback button next to the product, as shown below.</p>
            <div className="border rounded-lg overflow-hidden mb-3">
              <img 
                src="/images/help/amazon-feedback.png" 
                alt="Amazon Feedback Page" 
                className="w-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-3">Verified vs Unverified Reviews</h3>
        <p className="mb-3">Our smart funnel system directs your customers directly to your Amazon product review page. When your customers leave a review on your product review page, their review will always be displayed on Amazon as a Verfied review since they purchased the product - a requirement by Amazon for Verified reviews.</p>
        <p className="mb-3">Reviews left on Amazon are only shown as Unverified if the reviewer did not purchased the product or the product was purchased at a deep discount. We've found that on purchases where the discount is around 40% or more, it may lead to the review being displayed as Unverified.</p>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-3">Creating Promotions</h3>
        <p className="mb-3">Create promotions for your various marketing strategies. You can link each promotion to multiple campaigns.</p>
        <div className="border rounded-lg overflow-hidden mb-3">
          <img 
            src="/images/help/promotions-step1.png" 
            alt="Amazon Promotion Setup Step 1" 
            className="w-full object-contain"
          />
        </div>
        
        <div className="border rounded-lg overflow-hidden mb-3">
          <img 
            src="/images/help/promotions-step2.png" 
            alt="Amazon Promotion Setup Step 2" 
            className="w-full object-contain"
          />
        </div>
        
        <div className="border rounded-lg overflow-hidden mb-3">
          <img 
            src="/images/help/promotions-step3.png" 
            alt="Amazon Promotion Setup Step 3" 
            className="w-full object-contain"
          />
        </div>
        
        <div className="border rounded-lg overflow-hidden mb-3">
          <img 
            src="/images/help/promotions-step4.png" 
            alt="Amazon Promotion Setup Step 4" 
            className="w-full object-contain"
          />
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-3">Bulk Upload Coupon Codes</h3>
        <p className="mb-3">To bulk upload coupon codes, you must create a Promotion and save it first. Once you've saved the new Promotion, navigate back to the Promotion settings page and click on the Bulk Upload Coupon Codes link in the Coupon Codes section.</p>
        <div className="border rounded-lg overflow-hidden mb-3">
          <img 
            src="/images/help/bulk-upload.png" 
            alt="Bulk Upload Coupon Codes" 
            className="w-full object-contain"
          />
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-3">How to Buy and Process eGift Cards</h3>
        <p className="mb-3">eGift cards can be purchased online on a claim by claim basis. For example, you can purchase $5 Amazon eGift cards like this.</p>
        <div className="border rounded-lg overflow-hidden mb-3">
          <img 
            src="/images/help/egift-card.png" 
            alt="Amazon eGift Card Example" 
            className="w-full object-contain"
          />
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-3">Video Tutorials</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card rounded-lg border p-4">
            <h4 className="font-medium mb-2">How It Works</h4>
            <div className="aspect-video bg-muted rounded-md mb-3 overflow-hidden">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/E83YdYXj_VI"
                title="How It Works"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <a 
              href="https://youtu.be/E83YdYXj_VI" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-primary hover:underline"
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              Watch on YouTube
            </a>
          </div>
          
          <div className="bg-card rounded-lg border p-4">
            <h4 className="font-medium mb-2">Adding Products</h4>
            <div className="aspect-video bg-muted rounded-md mb-3 overflow-hidden">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/IrmWmRYVqlU"
                title="Adding Products"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <a 
              href="https://youtu.be/IrmWmRYVqlU" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-primary hover:underline"
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              Watch on YouTube
            </a>
          </div>
          
          <div className="bg-card rounded-lg border p-4">
            <h4 className="font-medium mb-2">Creating Promotions</h4>
            <div className="aspect-video bg-muted rounded-md mb-3 overflow-hidden">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/xB7SeizBO9c"
                title="Creating Promotions"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <a 
              href="https://youtu.be/xB7SeizBO9c" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-primary hover:underline"
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              Watch on YouTube
            </a>
          </div>
          
          <div className="bg-card rounded-lg border p-4">
            <h4 className="font-medium mb-2">Claims Center</h4>
            <div className="aspect-video bg-muted rounded-md mb-3 overflow-hidden">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/cqaNWanIOdQ"
                title="Claims Center"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <a 
              href="https://youtu.be/cqaNWanIOdQ" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-primary hover:underline"
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              Watch on YouTube
            </a>
          </div>
        </div>
      </section>

      <section className="text-center mt-8">
        <Button 
          onClick={() => window.location.href = 'mailto:support@reviewscango.com'}
          className="bg-orange-500 hover:bg-orange-600 text-white"
        >
          Contact Support
        </Button>
      </section>
    </div>
  );
};

export default KnowledgeCenterContent;
