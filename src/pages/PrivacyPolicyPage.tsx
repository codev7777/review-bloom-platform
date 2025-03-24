
import { Layout, LayoutContent } from "@/components/ui/layout";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const PrivacyPolicyPage = () => {
  return (
    <Layout>
      <Navbar />
      <LayoutContent className="pt-24 md:pt-28">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
            <p className="text-sm text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            
            <div className="prose max-w-none">
              <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
              <p className="mb-6">
                At ReviewBrothers, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
              </p>
              
              <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
              <p className="mb-4">We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
                <li><strong>Contact Data</strong> includes billing address, delivery address, email address, and telephone numbers.</li>
                <li><strong>Financial Data</strong> includes payment card details.</li>
                <li><strong>Transaction Data</strong> includes details about payments to and from you and other details of products and services you have purchased from us.</li>
                <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
                <li><strong>Profile Data</strong> includes your username and password, purchases or orders made by you, your interests, preferences, feedback, and survey responses.</li>
                <li><strong>Usage Data</strong> includes information about how you use our website, products, and services.</li>
                <li><strong>Marketing and Communications Data</strong> includes your preferences in receiving marketing from us and our third parties and your communication preferences.</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mb-4">How We Use Your Data</h2>
              <p className="mb-4">We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                <li>Where we need to comply with a legal obligation.</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
              <p className="mb-6">
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know. They will only process your personal data on our instructions, and they are subject to a duty of confidentiality.
              </p>
              
              <h2 className="text-2xl font-semibold mb-4">Data Retention</h2>
              <p className="mb-6">
                We will only retain your personal data for as long as reasonably necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, regulatory, tax, accounting, or reporting requirements.
              </p>
              
              <h2 className="text-2xl font-semibold mb-4">Your Legal Rights</h2>
              <p className="mb-4">Under certain circumstances, you have rights under data protection laws in relation to your personal data:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Request access</strong> to your personal data.</li>
                <li><strong>Request correction</strong> of your personal data.</li>
                <li><strong>Request erasure</strong> of your personal data.</li>
                <li><strong>Object to processing</strong> of your personal data.</li>
                <li><strong>Request restriction of processing</strong> your personal data.</li>
                <li><strong>Request transfer</strong> of your personal data.</li>
                <li><strong>Right to withdraw consent</strong>.</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mb-4">Changes to This Privacy Policy</h2>
              <p className="mb-6">
                We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last updated" date at the top of this privacy policy.
              </p>
              
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p className="mb-6">
                If you have any questions about this privacy policy or our privacy practices, please contact us at:
                <br /><br />
                Email: privacy@reviewbrothers.com<br />
                Phone: +1 (555) 123-4567<br />
                Address: 123 Review Street, San Francisco, CA 94103, USA
              </p>
            </div>
          </div>
        </div>
      </LayoutContent>
      <Footer />
    </Layout>
  );
};

export default PrivacyPolicyPage;
