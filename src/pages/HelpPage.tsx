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

const HelpPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
  const helpSections = [
    {
      id: "how-it-works",
      title: "How It Works",
      content: (
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">100% Amazon Compliant Smart Funnel - How It Works</h2>
            <p className="mb-3">Our smart funnel system is designed to help you engage with your customers and build your email list through a series of interactive steps. The process begins with you creating a campaign promotion in your dashboard, where your customers can redeem a free gift with their product purchase.</p>
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
            <h3 className="text-xl font-semibold mb-3">Video Tutorial: How It Works</h3>
            <div className="aspect-video bg-muted rounded-md mb-3 overflow-hidden">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/E83YdYXj_VI"
                title="How It Works"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </section>
        </div>
      )
    },
    {
      id: "verified-vs-unverified",
      title: "Verified vs Unverified Reviews",
      content: (
        <div className="space-y-6">
          <section>
            <p className="mb-3">Our smart funnel system directs your customers directly to your Amazon product review page. When your customers leave a review on your product review page, their review will always be displayed on Amazon as a Verfied review since they purchased the product - a requirement by Amazon for Verified reviews.</p>
            <p className="mb-3">Reviews left on Amazon are only shown as Unverified if the reviewer did not purchased the product or the product was purchased at a deep discount. We've found that on purchases where the discount is around 40% or more, it may lead to the review being displayed as Unverified.</p>
          </section>
        </div>
      )
    },
    {
      id: "product-reviews",
      title: "Product Reviews & Seller Feedback",
      content: (
        <div className="space-y-6">
          <section>
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
        </div>
      )
    },
    {
      id: "campaigns",
      title: "Creating Campaigns",
      content: (
        <div className="space-y-6">
          <section>
            <p className="mb-3">Each campaign has it's own unique smart funnel. For each campaign, you have the option to link one promotion or collect reviews only. You can also link different groups of your products to different campaigns to offer different promotions for your differnt marketing strategies.</p>
            
            <h4 className="font-semibold mt-6 mb-3">You can choose between two campaign strategies:</h4>
            
            <div className="bg-card p-4 rounded-lg border mb-4">
              <h5 className="font-semibold mb-2">Option 1: Promotions Strategy</h5>
              <p>These campaigns are associated to one promotion and you can include multiple products to each campaign. Customers can redeem your free gift and our smart funnel will collect their information and product review.</p>
              <p className="mt-2">Before creating a Promotions campaign, the following is required:</p>
              <ul className="list-disc pl-5 mt-2">
                <li>You must have added at least one product. Refer to the Adding Products section for details.</li>
                <li>You must have created at least one promotion. Refer to the Creating Promotions section for details.</li>
              </ul>
            </div>
            
            <div className="bg-card p-4 rounded-lg border mb-4">
              <h5 className="font-semibold mb-2">Option 2: Reviews Strategy</h5>
              <p>These campaigns are optimized to gather reviews from your customers, a promotion is not required.</p>
            </div>
            
            <p className="text-sm italic mb-4">* Campaign strategies can not be changed</p>
            
            <p className="mb-4">Note: It's not necessary to create separate campaigns for each plaform. Regardless if you're selling products on Amazon or any combination of platforms, you can include your product(s) in a single campaign and print the same barcode on your product insert cards.</p>
            
            <h4 className="font-semibold mt-6 mb-3">Creating a Campaign</h4>
            <p className="mb-2"><strong>Step 1:</strong> From the main menu and select Campaigns.</p>
            <p className="mb-2"><strong>Step 2:</strong> Click on the +Campaign button. Fill in the campaign details in the form:</p>
            
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li><strong>Is Active:</strong> Check this box to make the campaign active. Active campaigns are live and the funnel is available for your shoppers to fill in. Inactive campaigns are only viewable in Preview Mode and the funnel is not available to the public.</li>
              <li><strong>Campaign Name:</strong> Enter a name for the campaign. Only you will see this.</li>
              <li><strong>Campaign Strategy:</strong> Choose the strategy for this campaign. The strategy can not be changed.</li>
              <li><strong>Promotion:</strong> Select the promotion you want to associate with this campaign from the dropdown menu.</li>
              <li><strong>Marketplaces:</strong> Select the marketplaces available in the campaign. Your customers will select the marketplace from where they purchased your product.</li>
              <li><strong>Product:</strong> Select the product(s) you want to promote in this campaign from the dropdown menu.</li>
              <li><strong>Brand Logo:</strong> Add your Brand Logo to be displayed on your smart funnels. This will remove the ReviewScanGo branding.</li>
              <li><strong>Brand Name:</strong> Add your Brand name to be displayed on your smart funnels. This will remove the ReviewScanGo branding.</li>
              <li><strong>Brand Website URL:</strong> Your brand website URL. If you provide your brand logo and/or brand name, customers can click on them to visit your website.</li>
              <li><strong>Meta Pixel:</strong> Add your custom Meta Pixel (formally known as Facebook Pixel) code here to track and retarget your customers.</li>
              <li><strong>Customer Must Leave a Review:</strong> Do you require the customer to leave a review. If required, the customer can not complete the funnel without leaving a review.</li>
              <li><strong>Review Type:</strong> When set to Product Review, shoppers will be redirected to the product detail page. When set to Seller Feedback, shoppers will be redirected to the Leave Seller Feedback page. *Amazon Only</li>
              <li><strong>Review Minimum Character Length:</strong> The minimum length of the review your customer must leave</li>
              <li><strong>Enable Smart Reviews:</strong> Enabled by default. Disabling this feature will always request your customer to share their review on your Amazon product detail page regardless of their feedback rating.</li>
              <li><strong>Default Language:</strong> The default language used in the funnel and emails sent to your customers.</li>
              <li><strong>Archive this campaign:</strong> Check this box to archive the campaign and hide it in the main list of campaigns.</li>
            </ul>
            
            <p className="mb-3">Once all the required fields are complete, click Submit to save the campaign.</p>
            
            <h4 className="font-semibold mt-6 mb-3">Step 3: Download QR Code</h4>
            <p className="mb-3">Once you've saved the campaign, a unique QR code is automatically generated for the campaign funnel. Download and print this campaign on your product insert cards.</p>
            <p className="text-sm italic mb-4">*Note: Each QR Code is unique to the specific campaign and will never change</p>
            <p className="mb-4">You can preview the funnel by clicking on the Preview link or you can test the campaign funnel by scanning the auto generated QR code</p>
            
            <div className="bg-card p-4 rounded-lg border mb-4">
              <h5 className="font-semibold mb-2">Additional Notes</h5>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Campaign Status:</strong> Campaigns are Inactive by default. When you're ready for customers to use your smart funnel, change the campaign status to Active.</li>
                <li><strong>Campaign Preview:</strong> By clicking the Preview option, you can see a preview of your campaigns to see what your customers will see when they visit your smart funnel. Preview Mode is visible in Active and Inactive status. Information entered in Preview Mode is not saved.</li>
              </ul>
            </div>
          </section>
        </div>
      )
    },
    {
      id: "products",
      title: "Adding Products",
      content: (
        <div className="space-y-6">
          <section>
            <p className="mb-3">Add products that you sell on Amazon. You can link your products to multiple campaigns for your different marketing strategies.</p>
            
            <h4 className="font-semibold mt-4 mb-3">Step 1: From the main menu and select Products.</h4>
            <h4 className="font-semibold mb-3">Step 2: Click on the +Product button. Fill in the product details in the form:</h4>
            
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li><strong>Product Name:</strong> Enter the name of your product. This will be displayed in the smart funnel.</li>
              <li><strong>Amazon ASIN:</strong> Enter the products ASIN. This is the unique product identifier. The ASIN is 10-digits and starts with B0. This will be used to direct your customer to the correct Amazon product review page.
              <p className="text-sm italic mt-1">Note: If the product you're adding is a variation, you must enter the child ASIN, you can not use the parent ASIN.</p></li>
            </ul>
            <p className="mb-3">Once all the required fields are filled, click Submit to save the product.</p>
            
            <div className="aspect-video bg-muted rounded-md mb-3 overflow-hidden mt-6">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/IrmWmRYVqlU"
                title="Adding Products"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </section>
        </div>
      )
    },
    {
      id: "promotions",
      title: "Creating Promotions",
      content: (
        <div className="space-y-6">
          <section>
            <p className="mb-3">Create promotions for your various marketing strategies. You can link each promotion to multiple campaigns.</p>
            
            <h4 className="font-semibold mt-4 mb-3">Step 1: From the main menu, select Promotions.</h4>
            <h4 className="font-semibold mb-3">Step 2: Click on the +Promotion button. Fill in the promotion details in the form:</h4>
            
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li><strong>Promotion Name:</strong> Enter a name for the promotion. This will be displayed in the smart funnel.</li>
              <li><strong>Promotion Image:</strong> Upload high-quality image that represents your promotion. This will be displayed in the smart funnel.</li>
              <li><strong>Promotion Type:</strong> Choose the type of promotion</li>
              <li><strong>Description:</strong> Provide a description of the promotion. Include details about any terms or conditions, instructions on how to use the gift card or coupon code once your customers receive it, or any other related information.</li>
              <li><strong>Code Type:</strong> Select the type of discount code (ie: Same code for every customer or every customer will get a unique code)</li>
              <li><strong>Coupon Code:</strong> If everyone gets the same code, enter the coupon code.</li>
              <li><strong>Coupon Codes List:</strong> If every customer gets a unique code, enter the list of coupon codes.</li>
              <li><strong>Delivery Method:</strong> Select if the promotion will be digitally delivered such as a coupon code or file download or physically shipped such as a free product.</li>
              <li><strong>Approval Method:</strong> Select if redemptions are manually approved or automatically approved and delivered upon completion of redemption.</li>
            </ul>
            
            <p className="mb-3">Once all the required fields are filled, click Submit to save the promotion.</p>
            
            <div className="aspect-video bg-muted rounded-md mb-3 overflow-hidden mt-6">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/xB7SeizBO9c"
                title="Creating Promotions"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            
            <div className="border rounded-lg overflow-hidden mb-3 mt-6">
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
        </div>
      )
    },
    {
      id: "gift-cards",
      title: "Gift Cards, Promotions and Free Gifts",
      content: (
        <div className="space-y-6">
          <section>
            <h3 className="text-xl font-semibold mb-3">Gift Cards</h3>
            <p className="mb-3">Physical gift cards can be purchased online or from your local retail store. You can mail gift cards to your customers by choosing the Gift Card option when you create a new promotion. You can also hand them out by email by entering the card details (Card Number, PIN and Expiration Date) into the promotion by selecting the Virtual Gift card option.</p>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">eGift Cards</h3>
            <p className="mb-3">eGift cards can be purchased online on a claim by claim basis. When you manually approve a claim, visit an online retailer to purchase an eGift card. Enter the customers email address on the retailers website as the recipient to have the eGift card emailed to your customer.</p>
            <div className="border rounded-lg overflow-hidden mb-3">
              <img 
                src="/images/help/egift-card.png" 
                alt="Amazon eGift Card Example" 
                className="w-full object-contain"
              />
            </div>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">Promo Codes</h3>
            <p className="mb-3">You can offer percentage off discounts or Buy One Get One offers by creating Amazon promotions through your Amazon Seller Central account.</p>
            <div className="border rounded-lg overflow-hidden mb-3">
              <img 
                src="/images/help/percentage-off-promo.png" 
                alt="Percentage Off Promotion" 
                className="w-full object-contain"
              />
            </div>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">Free Gifts</h3>
            <p className="mb-3">If you are offering free gifts such as a free bonus product that you sell on Amazon, you can either ship the item to your customers yourself or if you're selling on Amazon and the product is being fulfilled by FBA (Fulfillment By Amazon), then you can ship a unit directly from your Amazon inventory by creating a fulfillment order.</p>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">Digital Download</h3>
            <p className="mb-3">You can offer an ebook, extended warranty, or other doigitally downloadable content you'd like to offer to your customers. These must be in PDF format and less than 5mb.</p>
          </section>
        </div>
      )
    },
    {
      id: "coupon-codes",
      title: "Bulk Uploading Coupon Codes",
      content: (
        <div className="space-y-6">
          <section>
            <p className="mb-3">To bulk upload coupon codes, you must create a Promotion and save it first. Once you've saved the new Promotion, navigate back to the Promotion settings page and click on the Bulk Upload Coupon Codes link in the Coupon Codes section.</p>
            <div className="border rounded-lg overflow-hidden mb-3">
              <img 
                src="/images/help/bulk-upload.png" 
                alt="Bulk Upload Coupon Codes" 
                className="w-full object-contain"
              />
            </div>
            
            <p className="mb-3">Bulk uploading coupon codes must be saved in a CSV file. The CSV file must be in the following format, one coupon code per line:</p>
            <div className="bg-card p-4 rounded-lg border mb-4 font-mono">
              Coupon Code, Pin, Expiration Date (MM-DD-YYYY)
            </div>
            
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Coupon code is required. Pin and expiration date are optional</li>
              <li>Bulk uploading will delete all unused coupon codes you've already entered into the promotion</li>
            </ul>
            
            <p className="mb-3">Here is an example contents of a CSV file with a list of coupon codes, pin (optional) and expiration date (optional):</p>
            <div className="bg-card p-4 rounded-lg border mb-4 font-mono">
              ABC-123, 1111, 01-01-2035<br/>
              XYZ-999, 9890, 12-31-2030<br/>
              STU-765, ,<br/>
              POP-456, , 10-31-2036<br/>
              JDM-888, 4591,<br/>
              FER-458, 8180, 06-30-2032
            </div>
          </section>
        </div>
      )
    },
    {
      id: "claims-center",
      title: "Claims Center",
      content: (
        <div className="space-y-6">
          <section>
            <p className="mb-3">On your claim center dashboard, you can review all of your customers redemptions. You can view their contact details, product purchase, order number, feedback, as well as if they were redirected to your Amazon product detail page.</p>
            <p className="mb-3">You can manually verify their product purchase and process their claims to deliver their free gift.</p>
            <p className="mb-3">You can also see a summary and metrics of your campaigns performance.</p>
            <p className="mb-3">Clicking on the customers name will display their contact details as well as a list of their claims history.</p>
            <p className="mb-3">Click on the edit button to view details of the specific claim. You can view the status of the claim and any actions that are required.</p>
            <p className="mb-3">With digital promotions, you have the option to manually deliver the promotion clicking the Delivery button. This will automatically send your customer the digital product by email.</p>
            <p className="mb-3">With physical promotions, your customers mailing address will be displayed so you can ship the product to them.</p>
            <p className="mb-3">Once the claim has been verified and delivered, you can mark the claim as processed by clicking on the "Mark as Processed" button. You'll be able to see the status of when the claim was processed and what was delivered to your customer.</p>
            <p className="mb-3">Did Redirect - This shows whether or not the customer clicked on the Share button and was redirected to your Amazon product detail page.</p>
            
            <div className="aspect-video bg-muted rounded-md mb-3 overflow-hidden mt-6">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/cqaNWanIOdQ"
                title="Claims Center"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </section>
        </div>
      )
    },
    {
      id: "test-campaigns",
      title: "How to Test Your Campaigns & Funnels",
      content: (
        <div className="space-y-6">
          <section>
            <p className="mb-3">You can preview and test your campaigns and funnels before going live. On your Campaigns list, you can click the Preview option or on your Campaign settings page, you can click on the Funnel Preview link to see a preview of your funnel.</p>
            <p className="mb-3">In Preview mode, you can enter fake customer details to see how your funnel collects your customers information and redirects to your review page according to the campaign options you've set. In Preview mode, the information you enter in the funnel is not saved and no coupons codes will be used.</p>
            <p className="mb-3">If you'd like to see a live preview, set the campaign status to Active. Active campaigns are live and ready to collect your customers information and reviews. With Active campaigns, you can scan the QR code to see how the live version of your campaign and test how the funnel is working.</p>
            <p className="mb-3">If you'd like to see how your coupon codes or downloadable content is delivered, you can enter a fake coupon code into your Promotion.</p>
          </section>
        </div>
      )
    },
    {
      id: "white-label",
      title: "How to White Label or Add Personalized Branding",
      content: (
        <div className="space-y-6">
          <section>
            <p className="mb-3">* This feature is only available on the Business and Enterprise plans.</p>
            <p className="mb-3">You can replace the ReviewBrothers branding in your Smart Funnels and outgoing customer emails with your own branding. In your campaign settings, you can set your business name, upload your logo and include your website URL. When your logo or business name is clicked, it will lead your customers to your website URL.</p>
          </section>
        </div>
      )
    },
    {
      id: "qr-codes",
      title: "Downloading & Printing QR Codes",
      content: (
        <div className="space-y-6">
          <section>
            <p className="mb-3">QR Codes are automatically generated for each campaign that you create. Each QR Code is unique and is tied to each specific campaign. You can edit the campaign settings and change products and promotions without affecting the QR Code.</p>
            <p className="mb-3 font-bold">The QR Code will NEVER change.</p>
            <p className="mb-3">Because the QR Code will never change, feel free to make changes to the campaign settings without having to re-print your insert cards.</p>
            <p className="mb-3">You can downloand the QR Code by clicking on the Download button at the bottom of the Edit Campaign page. Print the QR code on your product insert cards or product packaging. You can even email the QR code or campaign URL directly to your customers.</p>
            <p className="mb-3">It's not necessary to create separate campaigns for each plaform. Regardless if you're selling products on Amazon or any combination of the platforms, you can include your product(s) in a single campaign and print the same barcode on your product insert cards.</p>
          </section>
        </div>
      )
    },
    {
      id: "insert-cards",
      title: "Insert Cards",
      content: (
        <div className="space-y-6">
          <section>
            <h3 className="text-xl font-semibold mb-3">Where to Get Insert Cards Made</h3>
            <p className="mb-3">You can find card printing services online or in your local city. Most businesses that print business cards or marketing material can print custom insert cards.</p>
            <p className="mb-3">You can also contact your manufacturer to see if they can print insert cards for you. If they can, this is the simplest and easiest way method since they'll be able to include the insert cards inside your product packaging right away without you having to send them the insert cards that are made elsewhere.</p>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">Using Existing Insert Cards</h3>
            <p className="mb-3">If you have existing insert cards that already have a QR code printed on them, you can continue to use your existing card by redirecting the traffic to your campaign URL. You can find the campaign URL by clicking Edit Campaign button and at the bottom of the campaign page, click on the Funnel Preview link and copying the URL.</p>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">Amazon Compliant Insert Cards</h3>
            <p className="mb-3">While our Smart Funnels are 100% Amazon compliant, you need to ensure that your product insert cards are also Amazon compliant.</p>
            <p className="mb-3">We've found that the best performing insert cards are ones that do not mention anything to your customers about leaving a product review. Customers are more likely to scan the QR code when the insert card only highlights the special offer or discount.</p>
            <p className="mb-3">If you choose to mention leaving product reviews on the insert card, then in order to ensure your insert card is Amazon compliant, make sure to follow these guidelines:</p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Never mention a product review is required in order to redeem your special offer or discount</li>
              <li>Never mention only positive product reviews are required in order to redeem your special offer or discount</li>
              <li>Never mention contacting you seperately if your customer had a negative experience instead of leaving a product review</li>
              <li>Never mention purchasing your products directly from your website instead of on Amazon</li>
            </ul>
          </section>
        </div>
      )
    },
    {
      id: "amazon-promotion",
      title: "How to Create an Amazon Promotion",
      content: (
        <div className="space-y-6">
          <section>
            <p className="mb-3">Log in to Seller Central and navigate to Avertising > Promotions and on the Percentage Off option, click Create.</p>
            <div className="border rounded-lg overflow-hidden mb-3">
              <img 
                src="/images/help/percentage-off-promo.png" 
                alt="Percentage Off Promotion" 
                className="w-full object-contain"
              />
            </div>
            
            <h4 className="font-semibold mt-6 mb-3">Step 1: Set the Promotion Conditions</h4>
            <div className="border rounded-lg overflow-hidden mb-3">
              <img 
                src="/images/help/promotions-step1.png" 
                alt="Amazon Promotion Setup Step 1" 
                className="w-full object-contain"
              />
            </div>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li><strong>Buyer Purchases:</strong> Set how many items the shopper must purchase in order to claim the promotion. We recommend setting this to 1</li>
              <li><strong>Purchased Items:</strong> Choose which product or products this promotion applies to</li>
              <li><strong>Buyer Gets:</strong> Set the discount the shopper will get. We recommend at least 5% off</li>
              <li><strong>Applies To:</strong> We recommend setting this to Purchased Items</li>
              <li><strong>Set Your Budget:</strong> Set your budget</li>
              <li><strong>Tiers:</strong> Set these to the match the previous values you've set above</li>
            </ul>
            
            <h4 className="font-semibold mt-6 mb-3">Step 2: Set the Promotion Schedule</h4>
            <div className="border rounded-lg overflow-hidden mb-3">
              <img 
                src="/images/help/promotions-step2.png" 
                alt="Amazon Promotion Setup Step 2" 
                className="w-full object-contain"
              />
            </div>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li><strong>Start Date:</strong> Choose the date and time for the promotion to start</li>
              <li><strong>End Date:</strong> Choose the date and time for the promotion to end</li>
            </ul>
            
            <h4 className="font-semibold mt-6 mb-3">Step 3: Set Additional Settings</h4>
            <div className="border rounded-lg overflow-hidden mb-3">
              <img 
                src="/images/help/promotions-step3.png" 
                alt="Amazon Promotion Setup Step 3" 
                className="w-full object-contain"
              />
            </div>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li><strong>Promotion Title:</strong> Give your promotion a name</li>
              <li><strong>Tracking ID:</strong> Leave this as default</li>
              <li><strong>Claim Code:</strong> We recommend setting this to Single-Use or Group. Choose Single-Use if you want each shopper to get their own promo code - you will have to generate a list of codes on the next step. Choose Group if all shoppers will use the same promo code.</li>
              <li><strong>One Redemption per customer:</strong> *IMPORTANT* Make sure this is checkmarked</li>
              <li><strong>Claim Code:</strong> If set to Group, enter the promo code the shoppers will use to claim this promotion</li>
              <li><strong>Stacked Promotions:</strong> Choose if you want to allow shoppers to stack additional discounts with this promotions</li>
