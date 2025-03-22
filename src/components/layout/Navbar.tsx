
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

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
          ? "py-3 bg-white/80 backdrop-blur-lg shadow-sm"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container px-4 mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            ReviewBloom
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className={`hidden md:flex items-center space-x-8`}>
          <Link
            to="/"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Home
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="cursor-pointer">
              <div className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-colors">
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
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Pricing
          </Link>
          <Link
            to="/#contact"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Contact
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="secondary" asChild>
            <Link to="/vendor-dashboard">Login</Link>
          </Button>
          <Button variant="default" asChild>
            <Link to="/vendor-dashboard">Try Demo</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && isMobile && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-md py-4 px-6 md:hidden animate-fade-in">
          <nav className="flex flex-col space-y-4">
            <Link
              to="/"
              className="text-base font-medium text-foreground hover:text-primary transition-colors"
            >
              Home
            </Link>
            <div className="text-base font-medium text-foreground">
              Features
              <div className="ml-4 mt-2 flex flex-col space-y-2">
                <Link
                  to="/#review-funnel"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Review Funnel
                </Link>
                <Link
                  to="/#qr-code"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  QR Code Integration
                </Link>
                <Link
                  to="/#analytics"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Analytics Dashboard
                </Link>
              </div>
            </div>
            <Link
              to="/#pricing"
              className="text-base font-medium text-foreground hover:text-primary transition-colors"
            >
              Pricing
            </Link>
            <Link
              to="/#contact"
              className="text-base font-medium text-foreground hover:text-primary transition-colors"
            >
              Contact
            </Link>
            <div className="pt-2 flex flex-col space-y-3">
              <Button variant="secondary" asChild className="w-full">
                <Link to="/vendor-dashboard">Login</Link>
              </Button>
              <Button variant="default" asChild className="w-full">
                <Link to="/vendor-dashboard">Try Demo</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
