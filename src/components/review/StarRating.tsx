
import { useState } from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  initialRating?: number;
  onChange: (rating: number) => void;
  size?: number;
  interactive?: boolean;
}

const StarRating = ({
  initialRating = 0,
  onChange,
  size = 32,
  interactive = true,
}: StarRatingProps) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (index: number) => {
    if (!interactive) return;
    const newRating = index + 1;
    setRating(newRating);
    onChange(newRating);
  };

  const handleMouseEnter = (index: number) => {
    if (!interactive) return;
    setHoverRating(index + 1);
  };

  const handleMouseLeave = () => {
    if (!interactive) return;
    setHoverRating(0);
  };

  const getStarColor = (index: number) => {
    const currentRating = hoverRating || rating;
    if (index < currentRating) {
      return "text-yellow-400 fill-yellow-400";
    }
    return "text-gray-300";
  };

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          size={size}
          className={`cursor-pointer transition-colors duration-150 ${getStarColor(
            index
          )}`}
          onClick={() => handleClick(index)}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        />
      ))}
    </div>
  );
};

export default StarRating;
