
import { useState, useEffect } from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  onChange: (rating: number) => void;
  initialValue?: number;
}

const StarRating = ({ onChange, initialValue = 0 }: StarRatingProps) => {
  const [rating, setRating] = useState(initialValue);
  const [hover, setHover] = useState(0);

  useEffect(() => {
    setRating(initialValue);
  }, [initialValue]);

  const handleClick = (value: number) => {
    setRating(value);
    onChange(value);
  };

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((value) => (
        <Star
          key={value}
          className={`w-8 h-8 cursor-pointer transition-colors ${
            value <= (hover || rating)
              ? "text-[#FF9900] fill-[#FF9900]"
              : "text-gray-300"
          }`}
          onMouseEnter={() => setHover(value)}
          onMouseLeave={() => setHover(0)}
          onClick={() => handleClick(value)}
        />
      ))}
    </div>
  );
};

export default StarRating;
