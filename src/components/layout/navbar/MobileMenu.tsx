import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
  isAuthenticated,
}: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 top-[8px] relative z-40  animate-in fade-in-0 duration-200">
      <div className="container px-4 py-6 overflow-y-auto max-h-[calc(100vh-72px)]">
        <nav className="flex flex-col space-y-4">
          {/* Features */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="features" className="border-none">
              <AccordionTrigger className="text-base font-medium text-white hover:text-[#FF9900] transition-colors py-0">
                Features
              </AccordionTrigger>
              <AccordionContent>
                <div className="ml-4 mt-2 flex flex-col space-y-3">
                  <Link
                    to="/review/demo-campaign"
                    className="text-sm text-gray-300 hover:text-[#FF9900] transition-colors"
                    onClick={toggleMenu}
                  >
                    Review Funnel
                  </Link>
                  <Link
                    to="/vendor-dashboard/analytics"
                    className="text-sm text-gray-300 hover:text-[#FF9900] transition-colors"
                    onClick={toggleMenu}
                  >
                    Analytics Dashboard
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* How It Works */}
          <Link
            to="/#how-it-works"
            className="text-base font-medium text-white hover:text-[#FF9900] transition-colors"
            onClick={toggleMenu}
          >
            How It Works
          </Link>

          {/* Demo */}
          <Link
            to="/#demo"
            className="text-base font-medium text-white hover:text-[#FF9900] transition-colors"
            onClick={toggleMenu}
          >
            Demo
          </Link>

          {/* Pricing */}
          <Link
            to="/#pricing"
            className="text-base font-medium text-white hover:text-[#FF9900] transition-colors"
            onClick={toggleMenu}
          >
            Pricing
          </Link>

          {/* User Actions */}
          <div className="pt-4 flex flex-col space-y-3">
            {isAuthenticated ? (
              <>
                <Button
                  variant="outline"
                  asChild
                  className="w-full border-white/20 text-white"
                >
                  <Link to="/profile" onClick={toggleMenu}>
                    Profile
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="w-full border-white/20 text-white"
                >
                  <Link
                    to={isAdmin() ? "/admin-dashboard" : "/vendor-dashboard"}
                    onClick={toggleMenu}
                  >
                    Dashboard
                  </Link>
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
                <Button
                  variant="default"
                  asChild
                  className="w-full bg-[#FF9900] hover:bg-orange-500 text-[#232F3E] rounded-full"
                >
                  <Link to="/auth/login" onClick={toggleMenu}>
                    Login
                  </Link>
                </Button>
                <Button
                  variant="default"
                  asChild
                  className="w-full bg-[#FF9900] hover:bg-orange-500 text-[#232F3E] rounded-full"
                >
                  <Link to="/auth/signup" onClick={toggleMenu}>
                    Sign Up
                  </Link>
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
