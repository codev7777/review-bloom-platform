import { Layout, LayoutContent } from "@/components/ui/layout";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const AboutUsPage = () => {
  return (
    <Layout>
      <Navbar />
      <LayoutContent className="pt-24 md:pt-28">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">About ReviewBrothers</h1>

            <div className="prose max-w-none">
              <h2 className="text-2xl font-semibold mb-4 text-orange-500">
                Our Mission
              </h2>
              <p className="mb-6">
                At ReviewBrothers, our mission is to revolutionize how Amazon
                vendors collect and leverage customer reviews. We believe that
                authentic customer feedback is the cornerstone of e-commerce
                success, and we're dedicated to helping sellers build their
                reputation through legitimate, TOS-compliant review collection
                strategies.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-orange-500">
                Our Story
              </h2>
              <p className="mb-6">
                ReviewBrothers was founded in 2025 by a team of e-commerce
                experts who experienced firsthand the challenges of collecting
                customer reviews on Amazon. After struggling with low review
                rates despite having quality products, our founders created a
                solution that streamlines the review process for both sellers
                and customers.
              </p>
              <p className="mb-6">
                What began as an internal tool quickly gained attention from
                other sellers in the Amazon community. Realizing the potential
                to help countless other businesses, ReviewBrothers was born as a
                dedicated platform to solve the review collection problem faced
                by sellers worldwide.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-orange-500">
                Our Approach
              </h2>
              <p className="mb-6">
                We take a customer-first approach to review collection. Our
                platform is designed to make the review process as seamless as
                possible for customers, while providing sellers with powerful
                tools to manage their review campaigns. We're committed to
                maintaining the highest standards of compliance with marketplace
                policies, ensuring that all reviews collected through our
                platform are authentic and unbiased.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-orange-500">
                Our Values
              </h2>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>
                  <strong>Integrity:</strong> We believe in ethical business
                  practices and maintaining full compliance with marketplace
                  terms of service.
                </li>
                <li>
                  <strong>Innovation:</strong> We continuously improve our
                  platform to provide cutting-edge solutions for our clients.
                </li>
                <li>
                  <strong>Customer Success:</strong> We measure our success by
                  the success of our clients and are committed to helping them
                  achieve their goals.
                </li>
                <li>
                  <strong>Transparency:</strong> We believe in clear
                  communication and setting realistic expectations with our
                  clients.
                </li>
                <li>
                  <strong>Data Privacy:</strong> We respect the privacy of both
                  our clients and their customers, implementing robust security
                  measures to protect all data.
                </li>
              </ul>

              <h2 className="text-2xl font-semibold mb-4 text-orange-500">
                Our Team
              </h2>
              <p className="mb-6">
                Our team consists of e-commerce experts, developers, and
                customer support specialists who are passionate about helping
                Amazon sellers succeed. With combined experience of over 30
                years in the Amazon marketplace, we understand the challenges
                sellers face and are dedicated to providing solutions that drive
                results.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-orange-500">
                Join Us on Our Mission
              </h2>
              <p className="mb-6">
                Whether you're an established Amazon seller or just starting
                out, ReviewBrothers is here to help you build your review base
                and grow your business. Join thousands of successful sellers who
                have transformed their review collection strategy with
                ReviewBrothers.
              </p>
            </div>
          </div>
        </div>
      </LayoutContent>
      <Footer />
    </Layout>
  );
};

export default AboutUsPage;
