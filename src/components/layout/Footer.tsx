import { Link } from "react-router-dom";
import { Instagram, Twitter, Facebook, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-orange-500">
              ReviewBrothers
            </h3>
            <p className="text-sm text-muted-foreground">
              Revolutionizing the way Amazon vendors collect and leverage
              customer reviews.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-orange-500 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-orange-500 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-orange-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-orange-500 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Products
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/review/demo-campaign"
                  className="text-muted-foreground hover:text-orange-500 transition-colors text-sm"
                >
                  Review Funnel
                </Link>
              </li>
              {/* <li>
                <Link
                  to="#"
                  className="text-muted-foreground hover:text-orange-500 transition-colors text-sm"
                >
                  QR Code Generator
                </Link>
              </li> */}
              <li>
                <Link
                  to="/vendor-dashboard/analytics"
                  className="text-muted-foreground hover:text-orange-500 transition-colors text-sm"
                >
                  Analytics Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-muted-foreground hover:text-orange-500 transition-colors text-sm"
                >
                  Review Management
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-muted-foreground hover:text-orange-500 transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contract"
                  className="text-muted-foreground hover:text-orange-500 transition-colors text-sm"
                >
                  Contract & Terms
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-muted-foreground hover:text-orange-500 transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="text-muted-foreground hover:text-orange-500 transition-colors text-sm"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/help"
                  className="text-muted-foreground hover:text-orange-500 transition-colors text-sm"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-muted-foreground hover:text-orange-500 transition-colors text-sm"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/faqs"
                  className="text-muted-foreground hover:text-orange-500 transition-colors text-sm"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-muted-foreground hover:text-orange-500 transition-colors text-sm"
                >
                  Developer API
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-muted-foreground text-center">
            &copy; {new Date().getFullYear()} ReviewBrothers. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
