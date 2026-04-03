import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreditCard, Smartphone } from "lucide-react";
import { useState } from "react";

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planName: string;
  price: string;
  isTrial?: boolean;
}

export const PaymentModal = ({ open, onOpenChange, planName, price, isTrial }: PaymentModalProps) => {
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'upi' | null>(null);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isTrial ? "Start Your 30-Day Free Trial" : `Subscribe to ${planName}`}
          </DialogTitle>
          <DialogDescription>
            {isTrial 
              ? "No payment required now. You'll be charged after 30 days."
              : `${price}/month - Choose your payment method`
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <Button
            variant={selectedMethod === 'card' ? 'default' : 'outline'}
            className="w-full h-20 text-left justify-start gap-4"
            onClick={() => setSelectedMethod('card')}
          >
            <CreditCard className="h-8 w-8" />
            <div>
              <div className="font-semibold">Credit / Debit Card</div>
              <div className="text-sm text-muted-foreground">Visa, Mastercard, Amex</div>
            </div>
          </Button>

          <Button
            variant={selectedMethod === 'upi' ? 'default' : 'outline'}
            className="w-full h-20 text-left justify-start gap-4"
            onClick={() => setSelectedMethod('upi')}
          >
            <Smartphone className="h-8 w-8" />
            <div>
              <div className="font-semibold">UPI</div>
              <div className="text-sm text-muted-foreground">Google Pay, PhonePe, Paytm</div>
            </div>
          </Button>

          <Button 
            className="w-full mt-6" 
            size="lg"
            disabled={!selectedMethod}
          >
            {isTrial ? "Start Free Trial" : "Continue to Payment"}
          </Button>

          {isTrial && (
            <p className="text-xs text-center text-muted-foreground">
              Cancel anytime during trial. No charges until trial ends.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
