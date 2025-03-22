
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  period: string;
}

const StatsCard = ({
  title,
  value,
  change,
  changeType,
  period,
}: StatsCardProps) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
      <p className="text-sm text-muted-foreground mb-1">{title}</p>
      <div className="flex items-baseline">
        <h3 className="text-2xl font-semibold">{value}</h3>
        {changeType !== "neutral" && (
          <div
            className={`flex items-center ml-2 text-sm ${
              changeType === "positive"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            <span className="mr-1">
              {changeType === "positive" ? (
                <ArrowUpIcon className="w-3 h-3" />
              ) : (
                <ArrowDownIcon className="w-3 h-3" />
              )}
            </span>
            {change}
          </div>
        )}
      </div>
      <p className="text-xs text-muted-foreground mt-1">{period}</p>
    </div>
  );
};

export default StatsCard;
