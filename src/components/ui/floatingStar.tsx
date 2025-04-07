import { motion } from "framer-motion";
import { Star } from "lucide-react";

const FloatingStar = ({ delay, size = 20, style }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: [0, 1, 0], y: [0, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity, delay }}
      style={{ position: "absolute", ...style }}
    >
      <Star className="text-yellow-400" size={size} />
    </motion.div>
  );
};

export default FloatingStar;
