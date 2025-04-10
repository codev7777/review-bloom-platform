import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/hooks/use-auth";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import Logo from "./navbar/Logo";
import DesktopNav from "./navbar/DesktopNav";
import UserMenu from "./navbar/UserMenu";
import MobileMenu from "./navbar/MobileMenu";

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
      className={` w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-[#232F3E]/95 dark:bg-[#232F3E]/95 backdrop-blur-lg shadow-sm"
          : "py-5 bg-[#232F3E] dark:bg-[#232F3E]"
      }`}
    >
      <div className="container px-4 mx-auto flex items-center justify-between max-w-[1920px] 2xl:max-w-[2560px] 3xl:max-w-[3200px] 3xl:h-[100px]">
        {/* Logo */}
        <Logo />
        <div className="flex-grow hidden lg:block">
          <DesktopNav />
        </div>
        {/* Desktop Navigation */}
        <div className="flex items-center space-x-8">
          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4 display-inline">
            <UserMenu
              isAuthenticated={isAuthenticated}
              isAdmin={isAdmin}
              logout={logout}
            />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-2 z-10 md:hidden">
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
      {isMobile && (
        <div
          className={`
        ${
          isScrolled
            ? "py-3 bg-[#232F3E]/95 dark:bg-[#232F3E]/95 backdrop-blur-lg shadow-sm"
            : "py-5 bg-[#white] dark:bg-[#232F3E]"
        }`}
        >
          <MobileMenu
            isOpen={isMenuOpen}
            toggleMenu={toggleMenu}
            isAdmin={isAdmin}
            logout={logout}
            isAuthenticated={isAuthenticated}
          />
        </div>
      )}
    </header>
  );
};

export default Navbar;
