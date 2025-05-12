
import { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { Download, Printer, Share2 } from "lucide-react";

export interface QRCodeProps {
  url: string;
  status: boolean;
  size?: number;
  logoUrl?: string;
  logoWidth?: number;
  logoHeight?: number;
  bgColor?: string;
  fgColor?: string;
  level?: "L" | "M" | "Q" | "H";
  includeMargin?: boolean;
  title?: string;
  showDialog?: boolean;
  onCloseDialog?: () => void;
}

export function QRCode({
  url,
  status,
  size = 200,
  logoUrl,
  logoWidth = 50,
  logoHeight = 50,
  bgColor = "#FFFFFF",
  fgColor = "#000000",
  level = "M",
  includeMargin = true,
  title = "QR Code",
  showDialog = false,
  onCloseDialog,
}: QRCodeProps) {

  const [qrUrl, setQrUrl] = useState<string>("");
  
  // Generate QR code as data URL when props change
  useEffect(() => {
    const canvas = document.getElementById("qr-canvas") as HTMLCanvasElement;
    if (canvas) {
      setQrUrl(canvas.toDataURL("image/png"));
    }
  }, [url, size, logoUrl, logoWidth, logoHeight, bgColor, fgColor, level, includeMargin]);
  
  const handleDownload = () => {
    const link = document.createElement("a");
    link.download = `${title.replace(/\s+/g, '-').toLowerCase()}.png`;
    link.href = qrUrl;
    link.click();
    
    toast({
      title: "QR Code downloaded",
      description: "The QR code has been saved to your device.",
    });
  };
  
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Print QR Code</title>
            <style>
              body {
                margin: 0;
                padding: 20px;
                text-align: center;
                font-family: Arial, sans-serif;
              }
              h2 {
                margin-bottom: 20px;
              }
              img {
                max-width: 100%;
                height: auto;
              }
              @media print {
                button {
                  display: none;
                }
              }
            </style>
          </head>
          <body>
            <h2>${title}</h2>
            <img src="${qrUrl}" alt="QR Code" />
            <p>Scan to leave a review</p>
            <p>${url}</p>
            <button onclick="window.print()" style="margin-top: 20px; padding: 8px 16px; background-color: #FF9900; color: white; border: none; border-radius: 4px; cursor: pointer;">
              Print
            </button>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
    
    toast({
      title: "Print dialog opened",
      description: "A new window has opened with the printable QR code.",
    });
  };
  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: 'Scan this QR code to leave a review',
          url: url,
        });
        
        toast({
          title: "QR Code shared",
          description: "The QR code URL has been shared successfully.",
        });
      } catch (error) {
        toast({
          title: "Share failed",
          description: "There was an error sharing the QR code.",
          variant: "destructive",
        });
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(url);
      
      toast({
        title: "URL copied to clipboard",
        description: "The QR code URL has been copied to your clipboard.",
      });
    }
  };
  
  return (
    <>
      <div className="qr-code" style={{ width: size, height: size }}>
        <QRCodeCanvas
          id="qr-canvas"
          value={url}
          size={size}
          bgColor={bgColor}
          fgColor={fgColor}
          level={level}
          includeMargin={includeMargin}
          imageSettings={
            logoUrl
              ? {
                  src: logoUrl,
                  x: undefined,
                  y: undefined,
                  height: logoHeight,
                  width: logoWidth,
                  excavate: true,
                }
              : undefined
          }
        />
      </div>
      
      <Dialog open={showDialog} onOpenChange={onCloseDialog}>
        <DialogContent className="sm:max-w-md flex flex-col items-center">
          <DialogHeader>
            <DialogTitle className="text-center">{title}</DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col items-center justify-center w-full p-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <QRCodeCanvas
                id="qr-canvas-dialog"
                value={url}
                size={280}
                bgColor={bgColor}
                fgColor={fgColor}
                level={level}
                includeMargin={includeMargin}
                imageSettings={
                  logoUrl
                    ? {
                        src: logoUrl,
                        x: undefined,
                        y: undefined,
                        height: logoHeight * 1.5,
                        width: logoWidth * 1.5,
                        excavate: true,
                      }
                    : undefined
                }
              />
            </div>
            
            <p className="text-sm text-center mt-4 text-muted-foreground">
              Scan this code to access the review funnel
            </p>
            
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              <Button onClick={handleDownload} variant="outline" className="flex items-center">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button onClick={handlePrint} variant="outline" className="flex items-center">
                <Printer className="mr-2 h-4 w-4" />
                Print
              </Button>
              <Button onClick={handleShare} variant="outline" className="flex items-center">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
