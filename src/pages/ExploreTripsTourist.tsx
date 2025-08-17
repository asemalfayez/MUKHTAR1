import { useState } from "react";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Star, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface ExploreTripsTouristProps {
  language: 'ar' | 'en';
  isDark: boolean;
}

const ExploreTripsTourist = ({ language, isDark }: ExploreTripsTouristProps) => {
  const { toast } = useToast();
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const tripsPerPage = 6; // عدد الرحلات لكل صفحة

  const categories = ["ثقافي", "مغامرة", "استجمام", "تاريخي", "طبيعي"];
  const locations = ["وادي بن حماد", "وادي نميره", "وادي الحسا"];

  const mockTrips = [
    { 
      id: 1, 
      title: "رحلة استكشاف وادي بن حماد", 
      description: "استمتع بالشلالات المتدفقة، الممرات الصخرية الضيقة، والطبيعة الخضراء مع ينابيع مياه باردة، على بعد 31 كم شمال غرب الكرك.", 
      price: 140, 
      rating: 4.7, 
      reviews: 90, 
      duration: "يوم كامل", 
      image: "/nmera.jpg", 
      organizer: "أحمد الطبيعي", 
      category: "طبيعي", 
      location: "وادي بن حماد" 
    },
    { 
      id: 2, 
      title: "مغامرة في وادي نميره", 
      description: "استكشف القطاع الصخري الضيق (السيق) المحفور في الحجر الرملي، مع نهير صغير يلتقي بالبحر الميت، وآثار العصر البرونزي.", 
      price: 160, 
      rating: 4.6, 
      reviews: 75, 
      duration: "نصف يوم", 
      image: "/image.jpg", 
      organizer: "سارة المغامرة", 
      category: "مغامرة", 
      location: "وادي نميره" 
    },
    { 
      id: 3, 
      title: "جولة في وادي الحسا", 
      description: "استمتع بالمنحدرات الصخرية والشلالات الخلابة في وادي صحراوي يمتد 40 كم، مع تجربة آمنة مناسبة للعائلات.", 
      price: 130, 
      rating: 4.8, 
      reviews: 110, 
      duration: "يوم", 
      image: "/hmad.jpg", 
      organizer: "محمد الاستكشاف", 
      category: "طبيعي", 
      location: "وادي الحسا" 
    },
  ];

  // تطبيق الفلاتر على الرحلات
  const filteredTrips = mockTrips.filter((trip) => {
    const matchesPrice = trip.price >= priceRange[0] && trip.price <= priceRange[1];
    const matchesCategories = selectedCategories.length === 0 || selectedCategories.includes(trip.category);
    const matchesLocation = !selectedLocation || trip.location === selectedLocation;
    const matchesSearch = !searchQuery || trip.title.toLowerCase().includes(searchQuery.toLowerCase()) || trip.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDate = !selectedDate || trip.duration.toLowerCase().includes(selectedDate.toLowerCase());
    return matchesPrice && matchesCategories && matchesLocation && matchesSearch && matchesDate;
  });

  // حساب الرحلات في الصفحة الحالية
  const indexOfLastTrip = currentPage * tripsPerPage;
  const indexOfFirstTrip = indexOfLastTrip - tripsPerPage;
  const currentTrips = filteredTrips.slice(indexOfFirstTrip, indexOfLastTrip);
  const totalPages = Math.ceil(filteredTrips.length / tripsPerPage);

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    }
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''} bg-background`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <div className="lg:hidden mb-4">
              <Button 
                variant="outline" 
                onClick={() => setShowFilters(!showFilters)}
                className="w-full flex items-center justify-center gap-2"
              >
                <Filter className="h-4 w-4" />
                {language === 'ar' ? 'الفلاتر' : 'Filters'}
              </Button>
            </div>

            <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <Card>
                <CardHeader>
                  <h3 className="font-semibold">{language === 'ar' ? 'البحث والفلاتر' : 'Search & Filters'}</h3>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="search">{language === 'ar' ? 'البحث في الرحلات' : 'Search Trips'}</Label>
                    <Input 
                      id="search" 
                      placeholder={language === 'ar' ? 'ابحث عن رحلة...' : 'Search for a trip...'} 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label>{language === 'ar' ? 'الوجهة' : 'Destination'}</Label>
                    <Select 
                      onValueChange={setSelectedLocation}
                      value={selectedLocation}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={language === 'ar' ? 'اختر الوجهة' : 'Select Destination'} />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map((loc) => (
                          <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>{language === 'ar' ? 'نوع الرحلة' : 'Trip Type'}</Label>
                    <div className="space-y-2 mt-2">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center space-x-2 space-x-reverse">
                          <Checkbox
                            id={category}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                          />
                          <Label htmlFor={category} className="text-sm">{category}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>{language === 'ar' ? `النطاق السعري: ${priceRange[0]} - ${priceRange[1]} د.أ` : `Price Range: ${priceRange[0]} - ${priceRange[1]} JD`}</Label>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={500}
                      step={10}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label>{language === 'ar' ? 'تاريخ الرحلة' : 'Trip Date'}</Label>
                    <Input 
                      type="date" 
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <Button 
                    className="w-full" 
                    onClick={() => toast({ title: language === 'ar' ? 'تم تطبيق الفلاتر!' : 'Filters Applied!' })}
                  >
                    {language === 'ar' ? 'تطبيق الفلاتر' : 'Apply Filters'}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Trips Grid */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">{language === 'ar' ? 'الرحلات المتاحة' : 'Available Trips'}</h1>
              <p className="text-muted-foreground">{language === 'ar' ? `${filteredTrips.length} رحلة متاحة` : `${filteredTrips.length} trips available`}</p>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {currentTrips.map((trip) => (
                <Card key={trip.id} className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <CardHeader className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img 
                        src={trip.image} 
                        alt={trip.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder.jpg";
                          target.alt = "Failed to load image";
                        }}
                      />
                      <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
                        {trip.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-2">{trip.title}</h3>
                    <p className="text-muted-foreground text-sm mb-3">{trip.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {trip.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {trip.organizer}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {trip.location}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{trip.rating}</span>
                        <span className="text-muted-foreground text-sm">({trip.reviews})</span>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">{trip.price} د.أ</p>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="p-4 pt-0">
                    <Link to={`/trip/${trip.id}`}>
                      <Button className="w-full" variant="hero">
                        {language === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  {language === 'ar' ? 'السابق' : 'Previous'}
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "hero" : "outline"}
                    onClick={() => paginate(page)}
                  >
                    {page}
                  </Button>
                ))}
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  {language === 'ar' ? 'التالي' : 'Next'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer language={language} />
    </div>
  );
};

export default ExploreTripsTourist;