
import { useEffect, useState } from "react";
import { generateQRCode } from "@/utils/qrCodeGenerator";

interface QRCodeProps {
  value: string;
  size?: number;
  bgColor?: string;
  fgColor?: string;
  level?: "L" | "M" | "Q" | "H";
  includeMargin?: boolean;
  imageSettings?: {
    src: string;
    height: number;
    width: number;
    excavate: boolean;
  };
}

const QRCode = ({
  value,
  size = 128,
  bgColor = "#FFFFFF",
  fgColor = "#000000",
  level = "L",
  includeMargin = false,
  imageSettings,
}: QRCodeProps) => {
  const [qrCodeSrc, setQrCodeSrc] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generateCode = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const dataUrl = await generateQRCode({
          value,
          size,
          bgColor,
          fgColor,
          level,
          includeMargin,
          imageSettings,
        });
        
        setQrCodeSrc(dataUrl);
      } catch (err) {
        console.error("Error generating QR code:", err);
        setError("Failed to generate QR code");
      } finally {
        setIsLoading(false);
      }
    };

    generateCode();
  }, [value, size, bgColor, fgColor, level, includeMargin, imageSettings]);

  if (isLoading) {
    return (
      <div 
        className="flex items-center justify-center bg-gray-100 rounded" 
        style={{ width: size, height: size }}
      >
        <div className="shimmer w-3/4 h-3/4"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div 
        className="flex items-center justify-center bg-red-50 text-red-500 rounded border border-red-200" 
        style={{ width: size, height: size }}
      >
        <p className="text-xs text-center p-2">{error}</p>
      </div>
    );
  }

  return (
    <img
      src={qrCodeSrc}
      alt="QR Code"
      width={size}
      height={size}
      className="rounded"
    />
  );
};

export default QRCode;
