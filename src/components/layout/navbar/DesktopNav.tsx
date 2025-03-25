import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const DesktopNav = () => {
  return (
    <nav className="hidden md:flex items-center space-x-8">
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
            <Link to="review/demo-campaign">Review Funnel</Link>
          </DropdownMenuItem>
          {/* <DropdownMenuItem className="cursor-pointer">
            QR Code Integration
          </DropdownMenuItem> */}
          <DropdownMenuItem className="cursor-pointer">
            <Link to="vendor-dashboard/analytics">Analytics Dashboard</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* <Link
        to="/#pricing"
        className="text-sm font-medium text-white hover:text-[#FF9900] transition-colors"
      >
        Pricing
      </Link> */}

      <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <div className="flex items-center space-x-1 text-sm font-medium text-white hover:text-[#FF9900] transition-colors">
            <span>Company</span>
            <ChevronDown size={16} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuGroup>
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link to="/about">About Us</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link to="/careers">Careers</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link to="/contract">Contract & Terms</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link to="/privacy">Privacy Policy</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* <Link
        to="/help"
        className="text-sm font-medium text-white hover:text-[#FF9900] transition-colors"
      >
        Help
      </Link>
      <Link
        to="/faqs"
        className="text-sm font-medium text-white hover:text-[#FF9900] transition-colors"
      >
        FAQs
      </Link>
      <Link
        to="/contact"
        className="text-sm font-medium text-white hover:text-[#FF9900] transition-colors"
      >
        Contact
      </Link> */}
    </nav>
  );
};

export default DesktopNav;
