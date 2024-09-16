import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/common/dialog";
import { Button } from "@/components/common/button";
import { Input } from "@/components/common/input";
import { Copy, Loader2 } from "lucide-react";
import { Product } from "@/lib/products";

interface BlinkDialogProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  isGenerating: boolean;
  generatedLink: string;
  onCopyLink: () => void;
}

export const BlinkDialog: React.FC<BlinkDialogProps> = ({
  product,
  isOpen,
  onClose,
  isGenerating,
  generatedLink,
  onCopyLink,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-800">
        <DialogHeader>
          <DialogTitle className="text-purple-800 dark:text-purple-200">
            Generate Blink for {product?.title}
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-300">
            Here is your unique Solana Blink URL for this product.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {isGenerating ? (
            <div className="flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-purple-600 dark:text-purple-400" />
              <span className="ml-2 text-purple-600 dark:text-purple-400">
                Generating Blink...
              </span>
            </div>
          ) : generatedLink ? (
            <div className="space-y-4">
              <Input
                value={generatedLink}
                readOnly
                className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              />
              <Button
                onClick={onCopyLink}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-500 dark:hover:bg-purple-600"
              >
                <Copy className="mr-2 h-4 w-4" /> Copy Link
              </Button>
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
};
