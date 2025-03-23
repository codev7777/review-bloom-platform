
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/hooks/use-auth";
import { ThemeToggle } from "@/components/theme/theme-toggle";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  const { isAuthenticated, logout, isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-[#232F3E]/95 dark:bg-[#232F3E]/95 backdrop-blur-lg shadow-sm"
          : "py-5 bg-[#232F3E] dark:bg-[#232F3E]"
      }`}
    >
      <div className="container px-4 mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#FF9900] to-orange-400">
            ReviewBrothers
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className={`hidden md:flex items-center space-x-8`}>
          <Link
            to="/"
            className="text-sm font-medium text-white hover:text-[#FF9900] transition-colors"
          >
            Home
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="cursor-pointer">
              <div className="flex items-center space-x-1 text-sm font-medium text-white hover:text-[#FF9900] transition-colors">
                <span>Features</span>
                <ChevronDown size={16} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuItem className="cursor-pointer">
                Review Funnel
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                QR Code Integration
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Analytics Dashboard
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link
            to="/#pricing"
            className="text-sm font-medium text-white hover:text-[#FF9900] transition-colors"
          >
            Pricing
          </Link>
          <Link
            to="/#contact"
            className="text-sm font-medium text-white hover:text-[#FF9900] transition-colors"
          >
            Contact
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full w-10 h-10 p-0 text-[#FF9900]">
                  <User size={20} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to={isAdmin() ? "/admin-dashboard/settings" : "/vendor-dashboard/settings"}>Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to={isAdmin() ? "/admin-dashboard" : "/vendor-dashboard"}>Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" asChild className="text-[#FF9900] hover:text-orange-400 hover:bg-[#232F3E]/50">
                <Link to="/auth/login">Login</Link>
              </Button>
              <Button variant="default" asChild className="bg-[#FF9900] hover:bg-orange-500 text-[#232F3E] font-medium">
                <Link to="/auth/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-2 md:hidden">
          <ThemeToggle />
          <button
            className="text-white"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && isMobile && (
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
      )}
    </header>
  );
};

export default Navbar;
