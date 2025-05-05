import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DesktopNav = () => {
  return (
    <div className="flex justify-between pl-8 pr-4">
      <div className="flex items-center space-x-8">
        {/* Features */}
        {/* <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center space-x-1 text-lg font-medium text-white hover:text-[#FF9900] transition-colors">
            <span>Features</span>
            <ChevronDown size={16} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuItem className="cursor-pointer">
            <a href="#demo"> Review Funnel</a>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Link to="/vendor-dashboard/analytics">Analytics Dashboard</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu> */}

        {/* <span className="text-lg font-medium text-white hover:text-[#FF9900] transition-colors">
          <a href="#features">Features</a>
        </span>
        <span className="text-lg font-medium text-white hover:text-[#FF9900] transition-colors">
          <a href="#howitworks">How it works</a>
        </span>

        <span className="text-lg font-medium text-white hover:text-[#FF9900] transition-colors">
          <a href="#demo"> Demo</a>
        </span> */}

        <Link
          to="/#features"
          className="text-lg font-medium text-white hover:text-[#FF9900] transition-colors 3xl:text-2xl"
        >
          Features
        </Link>
        <Link
          to="/#how-it-works"
          className="text-lg font-medium text-white hover:text-[#FF9900] transition-colors 3xl:text-2xl"
        >
          How it works
        </Link>
        <Link
          to="/#demo"
          className="text-lg font-medium text-white hover:text-[#FF9900] transition-colors 3xl:text-2xl"
        >
          Demo
        </Link>
        <Link
          to="/#pricing"
          className="text-lg font-medium text-white hover:text-[#FF9900] transition-colors 3xl:text-2xl"
        >
          Pricing
        </Link>
      </div>
      <div>
        <Link
          to="/help"
          className="text-lg font-medium text-white hover:text-[#FF9900] transition-colors 3xl:text-2xl"
        >
          Help
        </Link>
      </div>
    </div>
  );
};

export default DesktopNav;
