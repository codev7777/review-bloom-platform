import { Link } from "react-router-dom";
import Logo from "./navbar/Logo";

const ReviewFunnelNavbar = () => {
  return (
    <header className="w-full fixed top-0 left-0 right-0 z-50 h-[8vh] bg-[#232F3E] dark:bg-[#232F3E]">
      <div className="container px-4 mx-auto flex items-center h-full">
        <Link to="/" className="cursor-pointer">
          <Logo />
        </Link>
      </div>
    </header>
  );
};

export default ReviewFunnelNavbar;
