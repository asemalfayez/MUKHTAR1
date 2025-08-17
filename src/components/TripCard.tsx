import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Clock, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TripCardProps {
  id: string;
  image: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  rating: number;
  reviewCount: number;
  duration: string;
  groupSize: string;
  location: string;
  category: string;
  isRTL?: boolean;
  onViewDetails?: (id: string) => void;
}

export function TripCard({
  id,
  image,
  title,
  description,
  price,
  currency,
  rating,
  reviewCount,
  duration,
  groupSize,
  location,
  category,
  isRTL = false,
  onViewDetails
}: TripCardProps) {
  
  const getCategoryColor = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'adventure': case 'مغامرة': return 'bg-adventure text-adventure-foreground';
      case 'culture': case 'ثقافة': return 'bg-culture text-culture-foreground';
      case 'premium': case 'مميز': return 'bg-premium text-premium-foreground';
      default: return 'bg-primary text-primary-foreground';
    }
  };

  return (
    <div className={cn(
      "group relative overflow-hidden rounded-2xl bg-card border shadow-card",
      "transition-all duration-300 hover:shadow-xl hover:scale-[1.02]",
      "animate-in fade-in-50 slide-in-from-bottom-4"
    )}>
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Category Badge */}
        <Badge className={cn(
          "absolute top-3 z-10",
          getCategoryColor(category),
          isRTL ? "right-3" : "left-3"
        )}>
          {category}
        </Badge>
        
        {/* Rating Badge */}
        <div className={cn(
          "absolute top-3 z-10 flex items-center space-x-1 bg-black/60 text-white px-2 py-1 rounded-full text-sm",
          isRTL ? "left-3 space-x-reverse" : "right-3"
        )}>
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span className="font-medium">{rating}</span>
          <span className="text-white/80">({reviewCount})</span>
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      {/* Content */}
      <div className="p-5">
        {/* Title and Description */}
        <div className={cn(
          "mb-4",
          isRTL && "text-right"
        )}>
          <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-1">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>
        
        {/* Trip Details */}
        <div className={cn(
          "grid grid-cols-2 gap-3 mb-4 text-sm",
          isRTL && "text-right"
        )}>
          <div className={cn(
            "flex items-center space-x-2",
            isRTL && "space-x-reverse flex-row-reverse"
          )}>
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">{location}</span>
          </div>
          
          <div className={cn(
            "flex items-center space-x-2",
            isRTL && "space-x-reverse flex-row-reverse"
          )}>
            <Clock className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">{duration}</span>
          </div>
          
          <div className={cn(
            "flex items-center space-x-2 col-span-2",
            isRTL && "space-x-reverse flex-row-reverse"
          )}>
            <Users className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">{groupSize}</span>
          </div>
        </div>
        
        {/* Price and Action */}
        <div className={cn(
          "flex items-center justify-between",
          isRTL && "flex-row-reverse"
        )}>
          <div className={cn(
            "flex flex-col",
            isRTL && "items-end"
          )}>
            <div className={cn(
              "flex items-center space-x-1",
              isRTL && "space-x-reverse"
            )}>
              <span className="text-2xl font-bold text-primary">{price}</span>
              <span className="text-sm text-muted-foreground">{currency}</span>
            </div>
            <span className="text-xs text-muted-foreground">
              {isRTL ? 'للشخص الواحد' : 'per person'}
            </span>
          </div>
          
          <Button 
            onClick={() => onViewDetails?.(id)}
            className={cn(
              "bg-gradient-hero hover:opacity-90 font-medium",
              "transform transition-all duration-200 hover:scale-105"
            )}
          >
            {isRTL ? 'عرض التفاصيل' : 'View Details'}
          </Button>
        </div>
      </div>
    </div>
  );
}