import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  delay?: number;
}

export const FeatureCard = ({ icon, title, description, delay = 0 }: FeatureCardProps) => {
  return (
    <Card 
      className="group relative overflow-hidden border-primary/20 hover:border-primary/40 transition-all duration-500 hover:scale-105 bg-card/50 backdrop-blur-xl hover:shadow-2xl hover:shadow-primary/20"
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardContent className="p-6 space-y-4">
        <div className="relative w-20 h-20 mx-auto">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
          <img 
            src={icon} 
            alt={title}
            className="relative w-full h-full object-cover rounded-xl animate-float group-hover:scale-110 transition-transform"
          />
        </div>
        
        <h3 className="text-xl font-bold text-center group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <p className="text-sm text-muted-foreground text-center leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};
