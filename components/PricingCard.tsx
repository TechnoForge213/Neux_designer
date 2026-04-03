import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { PaymentModal } from "./PaymentModal";

interface PricingCardProps {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  ctaText?: string;
}

export const PricingCard = ({ 
  name, 
  price, 
  period, 
  description, 
  features, 
  highlighted = false,
  ctaText = "Get Started"
}: PricingCardProps) => {
  const [paymentOpen, setPaymentOpen] = useState(false);
  const isTrial = ctaText.includes("Free Trial");
  
  return (
    <>
      <PaymentModal 
        open={paymentOpen}
        onOpenChange={setPaymentOpen}
        planName={name}
        price={price}
        isTrial={isTrial}
      />
    <Card 
      className={cn(
        "relative overflow-hidden transition-all duration-300 hover:scale-105",
        highlighted 
          ? "border-primary glow-primary scale-105" 
          : "border-border hover:border-primary/50"
      )}
    >
      {highlighted && (
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent px-4 py-1 rounded-b-lg">
          <span className="text-xs font-mono font-bold text-primary-foreground">RECOMMENDED</span>
        </div>
      )}
      
      <CardHeader className="pb-8 pt-8">
        <CardTitle className="text-2xl font-bold">{name}</CardTitle>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="flex items-baseline gap-2">
          <span className={cn(
            "text-5xl font-bold",
            highlighted && "text-glow-primary"
          )}>
            {price}
          </span>
          <span className="text-muted-foreground font-mono text-sm">/ {period}</span>
        </div>
        
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check className={cn(
                "h-5 w-5 flex-shrink-0 mt-0.5",
                highlighted ? "text-primary" : "text-muted-foreground"
              )} />
              <span className="text-sm leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      
      <CardFooter>
        <Button 
          className={cn(
            "w-full font-semibold",
            highlighted 
              ? "bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/50 transition-all" 
              : "bg-secondary hover:bg-secondary/90"
          )}
          size="lg"
          onClick={() => setPaymentOpen(true)}
        >
          {ctaText}
        </Button>
      </CardFooter>
    </Card>
    </>
  );
};
