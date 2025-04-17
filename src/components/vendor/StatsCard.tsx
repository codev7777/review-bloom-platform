import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { StatsCardProps } from "@/types";

const StatsCard = ({
  title,
  value,
  subtitle,
  change,
  changeType = "neutral",
  period,
  trend,
  percentage,
  icon,
}: StatsCardProps) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
      <div className="flex justify-between items-start mb-2">
        <p className="text-sm text-muted-foreground">{title}</p>
        {icon && <div className="ml-2">{icon}</div>}
      </div>
      <div className="flex items-baseline">
        <h3 className="text-2xl font-semibold">{value}</h3>
        {changeType !== "neutral" && change && (
          <div
            className={`flex items-center ml-2 text-sm ${
              changeType === "positive" ? "text-green-600" : "text-red-600"
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
        {/* {percentage && (
          <span className="ml-2 text-sm text-muted-foreground">{percentage}</span>
        )} */}
      </div>
      {subtitle && (
        <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
      )}
      {period && <p className="text-xs text-muted-foreground mt-1">{period}</p>}
    </div>
  );
};

export default StatsCard;
