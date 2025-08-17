import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Calendar, MapPin, Users, Star, Clock, Phone, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface TripDetailsProps {
  language: 'ar' | 'en';
  isDark: boolean;
}

interface Trip {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  duration: string;
  groupSize: string;
  category: string;
  images: string[];
  organizer: {
    name: string;
    avatar: string;
    rating: number;
    reviews: number;
    phone: string;
    email: string;
  };
  itinerary: {
    time: string;
    title: string;
    description: string;
  }[];
  availableDates: string[];
  location: string;
  availableSpots: number;
  difficulty: string;
  recommendations: string[];
}

const TripDetails = ({ language, isDark }: TripDetailsProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState<string>("");

  // Mock trip data مع التفاصيل الإضافية بناءً على الموقع
  const trip: Trip = {
    id: Number(id) || 1,
    title: "",
    description: "",
    price: 0,
    rating: 0,
    reviews: 0,
    duration: "",
    groupSize: "",
    category: "",
    images: [],
    organizer: {
      name: "",
      avatar: "",
      rating: 0,
      reviews: 0,
      phone: "",
      email: ""
    },
    itinerary: [],
    availableDates: ["2025-08-18", "2025-08-25"],
    location: "",
    availableSpots: 0,
    difficulty: "",
    recommendations: []
  };

  // تحديد التفاصيل بناءً على الموقع
  switch (Number(id)) {
    case 1:
      trip.title = "رحلة استكشاف وادي بن حماد";
      trip.description = "استمتع بالشلالات المتدفقة، الممرات الصخرية الضيقة، والطبيعة الخضراء مع ينابيع مياه باردة، على بعد 31 كم شمال غرب الكرك.";
      trip.price = 140;
      trip.rating = 4.7;
      trip.reviews = 90;
      trip.duration = "يوم كامل";
      trip.groupSize = "2-12 شخص";
      trip.category = "طبيعي";
      trip.images = ["/nmera.jpg"];
      trip.organizer = {
        name: "أحمد الطبيعي",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ahmad",
        rating: 4.8,
        reviews: 150,
        phone: "+962 7 8888 8888",
        email: "ahmad.nature@mukhtar.jo"
      };
      trip.itinerary = [
        { time: "07:00", title: "الانطلاق من الكرك", description: "التجمع والبدء بالرحلة نحو الوادي." },
        { time: "10:00", title: "زيارة الشلالات", description: "استكشاف الشلالات والمنحدرات الصخرية." },
        { time: "14:00", title: "الغداء", description: "وجبة في الطبيعة بجانب الينابيع." },
        { time: "17:00", title: "العودة", description: "الرجوع إلى الكرك." }
      ];
      trip.location = "وادي بن حماد";
      trip.availableSpots = 8;
      trip.difficulty = "متوسط";
      trip.recommendations = ["ارتداء أحذية مريحة", "حمل زجاجة ماء", "ملابس مناسبة للمشي"];
      break;
    case 2:
      trip.title = "مغامرة في وادي نميره";
      trip.description = "استكشف القطاع الصخري الضيق (السيق) المحفور في الحجر الرملي، مع نهير صغير يلتقي بالبحر الميت، وآثار العصر البرونزي.";
      trip.price = 160;
      trip.rating = 4.6;
      trip.reviews = 75;
      trip.duration = "نصف يوم";
      trip.groupSize = "2-10 شخص";
      trip.category = "مغامرة";
      trip.images = ["/image.jpg"];
      trip.organizer = {
        name: "سارة المغامرة",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sara",
        rating: 4.7,
        reviews: 120,
        phone: "+962 7 7777 7777",
        email: "sara.adventure@mukhtar.jo"
      };
      trip.itinerary = [
        { time: "08:00", title: "الانطلاق من الصافي", description: "التجمع والبدء نحو الوادي." },
        { time: "10:00", title: "استكشاف السيق", description: "جولة في الممر الصخري والنهير." },
        { time: "12:00", title: "العودة", description: "الرجوع إلى نقطة البداية." }
      ];
      trip.location = "وادي نميره";
      trip.availableSpots = 6;
      trip.difficulty = "سهل";
      trip.recommendations = ["حذاء مقاوم للزلق", "كاميرا", "قبعة للشمس"];
      break;
    case 3:
      trip.title = "جولة في وادي الحسا";
      trip.description = "استمتع بالمنحدرات الصخرية والشلالات الخلابة في وادي صحراوي يمتد 40 كم، مع تجربة آمنة مناسبة للعائلات.";
      trip.price = 130;
      trip.rating = 4.8;
      trip.reviews = 110;
      trip.duration = "يوم";
      trip.groupSize = "2-15 شخص";
      trip.category = "طبيعي";
      trip.images = ["/hmad.jpg"];
      trip.organizer = {
        name: "محمد الاستكشاف",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mohammad",
        rating: 4.9,
        reviews: 200,
        phone: "+962 7 6666 6666",
        email: "mohammad.explore@mukhtar.jo"
      };
      trip.itinerary = [
        { time: "06:00", title: "الانطلاق من الطفيلة", description: "التجمع والبدء نحو الوادي." },
        { time: "09:00", title: "زيارة الشلالات", description: "استكشاف المنحدرات والشلالات." },
        { time: "13:00", title: "الغداء", description: "وجبة في الطبيعة." },
        { time: "16:00", title: "العودة", description: "الرجوع إلى الطفيلة." }
      ];
      trip.location = "وادي الحسا";
      trip.availableSpots = 10;
      trip.difficulty = "متوسط";
      trip.recommendations = ["أحذية مريحة", "زجاجة ماء", "ملابس خفيفة"];
      break;
    default:
      trip.title = "رحلة غير موجودة";
      trip.description = "لم يتم العثور على تفاصيل هذه الرحلة.";
      trip.price = 0;
      trip.rating = 0;
      trip.reviews = 0;
      trip.duration = "";
      trip.groupSize = "";
      trip.category = "";
      trip.images = [];
      trip.organizer = {
        name: "",
        avatar: "",
        rating: 0,
        reviews: 0,
        phone: "",
        email: ""
      };
      trip.itinerary = [];
      trip.location = "";
      trip.availableSpots = 0;
      trip.difficulty = "";
      trip.recommendations = [];
  }

  const handleBooking = () => {
    if (!selectedDate) {
      toast({
        title: language === 'ar' ? "اختر تاريخًا أولاً!" : "Please select a date first!",
        variant: "destructive",
      });
      return;
    }
    navigate(`/booking-details/tourist/${trip.id}?date=${selectedDate}`);
  };

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''} bg-background`}>
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-2/3">
              <div className="relative overflow-hidden rounded-lg">
                {trip.images.length > 0 && (
                  <img
                    src={trip.images[currentImageIndex]}
                    alt={trip.title}
                    className="w-full h-64 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder.jpg";
                      target.alt = "Failed to load image";
                    }}
                  />
                )}
                {trip.images.length > 1 && (
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    {trip.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full ${currentImageIndex === index ? 'bg-primary' : 'bg-gray-300'}`}
                      />
                    ))}
                  </div>
                )}
              </div>
              <h1 className="text-3xl font-bold mt-4">{trip.title}</h1>
              <Badge className="mt-2 bg-primary text-primary-foreground">{trip.category}</Badge>
              <p className="text-muted-foreground mt-2">{trip.description}</p>
            </div>
            <div className="w-full md:w-1/3">
              <Card>
                <CardHeader>
                  <CardTitle>{language === 'ar' ? 'تفاصيل الحجز' : 'Booking Details'}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <span>{language === 'ar' ? 'المدة' : 'Duration'}: {trip.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <span>{language === 'ar' ? 'الحجم' : 'Group Size'}: {trip.groupSize}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <span>{language === 'ar' ? 'الموقع' : 'Location'}: {trip.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <span>{language === 'ar' ? 'الأماكن المتاحة' : 'Available Spots'}: {trip.availableSpots}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-muted-foreground" />
                    <span>{language === 'ar' ? 'مستوى الصعوبة' : 'Difficulty Level'}: {trip.difficulty}</span>
                  </div>
                  <div className="text-2xl font-bold text-primary">
                    {trip.price} د.أ
                  </div>
                  <Select onValueChange={setSelectedDate} value={selectedDate}>
                    <SelectTrigger>
                      <SelectValue placeholder={language === 'ar' ? 'اختر التاريخ' : 'Select Date'} />
                    </SelectTrigger>
                    <SelectContent>
                      {trip.availableDates.map(date => (
                        <SelectItem key={date} value={date}>
                          {new Date(date).toLocaleDateString(language === 'ar' ? 'ar-JO' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button className="w-full" onClick={handleBooking}>
                    {language === 'ar' ? 'احجز الآن' : 'Book Now'}
                  </Button>
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span>{trip.rating} ({trip.reviews} {language === 'ar' ? 'تقييمات' : 'reviews'})</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Itinerary */}
          <Card>
            <CardHeader>
              <CardTitle>{language === 'ar' ? 'برنامج الرحلة' : 'Trip Itinerary'}</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {trip.itinerary.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {item.time} - {item.title}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>{item.description}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Organizer Info */}
          <Card>
            <CardHeader>
              <CardTitle>{language === 'ar' ? 'معلومات المنظم' : 'Organizer Info'}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={trip.organizer.avatar} />
                <AvatarFallback>{trip.organizer.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{trip.organizer.name}</p>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{trip.organizer.rating} ({trip.organizer.reviews} {language === 'ar' ? 'تقييمات' : 'reviews'})</span>
                </div>
                <p className="text-muted-foreground mt-1"><Phone className="h-4 w-4 inline mr-1" /> {trip.organizer.phone}</p>
                <p className="text-muted-foreground"><Mail className="h-4 w-4 inline mr-1" /> {trip.organizer.email}</p>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>{language === 'ar' ? 'توصيات' : 'Recommendations'}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                {trip.recommendations.map((rec, index) => (
                  <li key={index} className="text-muted-foreground">{rec}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer language={language} />
    </div>
  );
};

export default TripDetails;