import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center ml-2 space-x-2 3xl:ml-20">
      {/* <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#FF9900] to-orange-400">
        ReviewBrothers
      </span> */}
      <img
        src="/images/logo/logo.png"
        alt="ReviewBrothers Logo"
        style={{ height: "85px" }}
      />
    </Link>
  );
};

export default Logo;
