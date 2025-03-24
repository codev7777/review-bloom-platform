
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

interface MobileMenuProps {
  isOpen: boolean;
  toggleMenu: () => void;
  isAdmin: () => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const MobileMenu = ({ 
  isOpen, 
  toggleMenu, 
  isAdmin, 
  logout, 
  isAuthenticated 
}: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 top-[72px] z-40 bg-[#232F3E]/95 dark:bg-[#232F3E]/95 backdrop-blur-lg animate-in fade-in-0 duration-200">
      <div className="container px-4 py-6">
        <nav className="flex flex-col space-y-4">
          <Link
            to="/"
            className="text-base font-medium text-white hover:text-[#FF9900] transition-colors"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <div className="text-base font-medium text-white">
            Features
            <div className="ml-4 mt-2 flex flex-col space-y-2">
              <Link
                to="/#review-funnel"
                className="text-sm text-gray-300 hover:text-[#FF9900] transition-colors"
                onClick={toggleMenu}
              >
                Review Funnel
              </Link>
              <Link
                to="/#qr-code"
                className="text-sm text-gray-300 hover:text-[#FF9900] transition-colors"
                onClick={toggleMenu}
              >
                QR Code Integration
              </Link>
              <Link
                to="/#analytics"
                className="text-sm text-gray-300 hover:text-[#FF9900] transition-colors"
                onClick={toggleMenu}
              >
                Analytics Dashboard
              </Link>
            </div>
          </div>
          <Link
            to="/#pricing"
            className="text-base font-medium text-white hover:text-[#FF9900] transition-colors"
            onClick={toggleMenu}
          >
            Pricing
          </Link>
          <Link
            to="/help"
            className="text-base font-medium text-white hover:text-[#FF9900] transition-colors"
            onClick={toggleMenu}
          >
            Help
          </Link>
          <Link
            to="/#contact"
            className="text-base font-medium text-white hover:text-[#FF9900] transition-colors"
            onClick={toggleMenu}
          >
            Contact
          </Link>
          <div className="pt-2 flex flex-col space-y-3">
            {isAuthenticated ? (
              <>
                <Button variant="outline" asChild className="w-full border-white/20 text-white">
                  <Link to="/profile" onClick={toggleMenu}>Profile</Link>
                </Button>
                <Button variant="outline" asChild className="w-full border-white/20 text-white">
                  <Link to={isAdmin() ? "/admin-dashboard" : "/vendor-dashboard"} onClick={toggleMenu}>Dashboard</Link>
                </Button>
                <Button 
                  variant="default" 
                  className="w-full bg-[#FF9900] hover:bg-orange-500 text-[#232F3E]" 
                  onClick={() => {
                    logout();
                    toggleMenu();
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" asChild className="w-full border-white/20 text-white">
                  <Link to="/auth/login" onClick={toggleMenu}>Login</Link>
                </Button>
                <Button variant="default" asChild className="w-full bg-[#FF9900] hover:bg-orange-500 text-[#232F3E]">
                  <Link to="/auth/signup" onClick={toggleMenu}>Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;
