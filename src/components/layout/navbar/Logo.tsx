import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center ml-2 space-x-2">
      <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#FF9900] to-orange-400">
        ReviewBrothers
      </span>
    </Link>
  );
};

export default Logo;
