import { Link } from "react-router-dom";
import { Instagram, Twitter, Facebook, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer
      className="bg-secondary border-t text-white"
      style={{ color: "white !important" }}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <img
              src="/images/logo/logo.png"
              alt="ReviewBrothers Logo"
              style={{ height: "100px" }}
            />
            <p className="text-sm text-gray-400">
              Revolutionizing the way Amazon vendors collect and leverage
              customer reviews.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/profile.php?id=61576801787946&mibextid=LQQJ4d"
                className="text-white hover:text-orange-500 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/reviewbrothers.official?igsh=cmpndXp1c3d4ejR5&utm_source=qr"
                className="text-white hover:text-orange-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4  text-orange-500">
              Products
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/review/demo-campaign"
                  className="text-white hover:text-orange-500 transition-colors text-sm"
                >
                  Review Funnel
                </Link>
              </li>
              {/* <li>
                <Link
                  to="#"
                  className="text-white hover:text-orange-500 transition-colors text-sm"
                >
                  QR Code Generator
                </Link>
              </li> */}
              <li>
                <Link
                  to="/vendor-dashboard"
                  className="text-white hover:text-orange-500 transition-colors text-sm"
                >
                  Analytics Dashboard
                </Link>
              </li>
              {/* <li>
                <Link
                  to="#"
                  className="text-white hover:text-orange-500 transition-colors text-sm"
                >
                  Review Management
                </Link>
              </li> */}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4  text-orange-500">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-white hover:text-orange-500 transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-and-conditions"
                  className="text-white hover:text-orange-500 transition-colors text-sm"
                >
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-white hover:text-orange-500 transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              {/* <li>
                <Link
                  to="/careers"
                  className="text-white hover:text-orange-500 transition-colors text-sm"
                >
                  Careers
                </Link>
              </li> */}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4  text-orange-500">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/help"
                  className="text-white hover:text-orange-500 transition-colors text-sm"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <a
                  href="mailto:info@reviewbrothers.com"
                  className="text-white hover:text-orange-500 transition-colors text-sm"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <Link
                  to="/faqs"
                  className="text-white hover:text-orange-500 transition-colors text-sm"
                >
                  FAQs
                </Link>
              </li>
              {/* <li>
                <Link
                  to="#"
                  className="text-white hover:text-orange-500 transition-colors text-sm"
                >
                  Developer API
                </Link>
              </li> */}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-400 text-center">
            &copy; {new Date().getFullYear()} ReviewBrothers. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
