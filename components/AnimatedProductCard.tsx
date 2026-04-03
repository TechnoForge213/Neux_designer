import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Star } from "lucide-react";
import { useState } from "react";

interface Product {
  id: string;
  name: string;
  category: string;
  description?: string;
  price: number;
  image_url?: string;
  brand?: string;
  is_premium: boolean;
}

interface AnimatedProductCardProps {
  product: Product;
  onAdd?: (product: Product) => void;
}

export const AnimatedProductCard = ({ product, onAdd }: AnimatedProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className="group relative overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 cursor-pointer border-border/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Background Glow */}
      <div className={`absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
      {/* Premium Badge */}
      {product.is_premium && (
        <Badge 
          className="absolute top-4 right-4 z-10 bg-gradient-to-r from-accent to-primary text-primary-foreground border-none animate-pulse-glow"
        >
          <Star className="w-3 h-3 mr-1" />
          Premium
        </Badge>
      )}

      {/* Product Image */}
      <div className="relative h-48 overflow-hidden bg-muted">
        {product.image_url ? (
          <img 
            src={product.image_url} 
            alt={product.name}
            className={`w-full h-full object-cover transition-transform duration-700 ${
              isHovered ? 'scale-110 rotate-2' : 'scale-100'
            }`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <Plus className="w-16 h-16" />
          </div>
        )}
        
        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4`}>
          <Button 
            size="sm"
            className="bg-gradient-to-r from-primary to-accent hover:shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
            onClick={() => onAdd?.(product)}
          >
            <Plus className="w-4 h-4 mr-1" />
            Add to Room
          </Button>
        </div>
      </div>

      <CardHeader className="relative z-10">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300">
              {product.name}
            </CardTitle>
            <CardDescription className="mt-1">
              <span className="inline-block px-2 py-0.5 bg-primary/10 text-primary rounded text-xs font-mono">
                {product.category}
              </span>
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative z-10">
        {product.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {product.description}
          </p>
        )}
        {product.brand && (
          <p className="text-xs text-muted-foreground font-mono">
            by {product.brand}
          </p>
        )}
      </CardContent>

      <CardFooter className="relative z-10 flex items-center justify-between">
        <div>
          <p className="text-2xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};
