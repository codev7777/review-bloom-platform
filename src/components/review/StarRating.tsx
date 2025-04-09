
import { useState, useEffect } from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  onChange?: (rating: number) => void;
  initialValue?: number;
  size?: number;
  readonly?: boolean;
  rating?: number;
}

const StarRating = ({ onChange, initialValue = 0, size = 24, readonly = false, rating }: StarRatingProps) => {
  const [internalRating, setInternalRating] = useState(initialValue);
  const [hover, setHover] = useState(0);

  // Use the rating prop if provided, otherwise use internal state
  const displayRating = rating !== undefined ? rating : internalRating;

  useEffect(() => {
    if (initialValue !== undefined) {
      setInternalRating(initialValue);
    }
  }, [initialValue]);

  const handleClick = (value: number) => {
    if (readonly) return;
    setInternalRating(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((value) => (
        <Star
          key={value}
          className={`cursor-${readonly ? 'default' : 'pointer'} transition-colors ${
            value <= (hover || displayRating)
              ? "text-[#FF9900] fill-[#FF9900]"
              : "text-gray-300"
          }`}
          size={size}
          onMouseEnter={() => !readonly && setHover(value)}
          onMouseLeave={() => !readonly && setHover(0)}
          onClick={() => handleClick(value)}
        />
      ))}
    </div>
  );
};

export default StarRating;
