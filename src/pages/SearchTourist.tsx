import { useState } from "react";

import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Search, MapPin, Clock, Users, Star, Filter } from "lucide-react";

const SearchTourist = () => {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  const [isDark, setIsDark] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([100, 1000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    "المغامرة والاستكشاف",
    "الثقافة والتاريخ", 
    "الطبيعة والاسترخاء",
    "الرياضة والنشاطات",
    "الأسرة والأطفال",
    "الرومانسية",
    "التسوق"
  ];

  const mockTrips = [
    {
      id: 1,
      title: "رحلة البتراء الساحرة",
      description: "استكشف عجائب البتراء الوردية",
      price: 350,
      duration: "3 أيام",
      groupSize: "8-12",
      rating: 4.8,
      reviews: 156,
      image: "/nmera.jpg",
      organizer: "أحمد محمد",
      category: "الثقافة والتاريخ"
    },
    {
      id: 2,
      title: "مغامرة وادي رم",
      description: "ليلة تحت النجوم في الصحراء",
      price: 280,
      duration: "2 أيام",
      groupSize: "6-10",
      rating: 4.9,
      reviews: 203,
      image: "/image.jpg",
      organizer: "سارة أحمد",
      category: "المغامرة والاستكشاف"
    },
    {
      id: 3,
      title: "استرخاء البحر الميت",
      description: "تجربة علاجية فريدة",
      price: 120,
      duration: "يوم واحد",
      groupSize: "10-15",
      rating: 4.7,
      reviews: 89,
      image: "/hmad.jpg",
      organizer: "محمد علي",
      category: "الطبيعة والاسترخاء"
    }
  ];

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    }
  };

  const filteredTrips = mockTrips.filter(trip => {
    const matchesSearch = trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         trip.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = trip.price >= priceRange[0] && trip.price <= priceRange[1];
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(trip.category);
    
    return matchesSearch && matchesPrice && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        {/* شريط البحث */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="ابحث عن الرحلات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
            </div>
            <Select>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="الوجهة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="petra">البتراء</SelectItem>
                <SelectItem value="image">وادي رم</SelectItem>
                <SelectItem value="hmad">البحر الميت</SelectItem>
                <SelectItem value="amman">عمان</SelectItem>
                <SelectItem value="aqaba">العقبة</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              className="md:w-auto"
            >
              <Filter className="w-4 h-4 ml-2" />
              فلاتر
            </Button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* الفلاتر الجانبية */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-1/4 space-y-6`}>
            <Card>
              <CardHeader>
                <CardTitle>الفلاتر</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* نطاق الأسعار */}
                <div>
                  <h3 className="font-medium mb-3">نطاق الأسعار (د.أ)</h3>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={1000}
                    min={50}
                    step={10}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{priceRange[0]} د.أ</span>
                    <span>{priceRange[1]} د.أ</span>
                  </div>
                </div>

                {/* الفئات */}
                <div>
                  <h3 className="font-medium mb-3">فئات الرحلات</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2 space-x-reverse">
                        <Checkbox
                          id={category}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={(checked) => handleCategoryChange(category, !!checked)}
                        />
                        <label htmlFor={category} className="text-sm">{category}</label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* المدة */}
                <div>
                  <h3 className="font-medium mb-3">مدة الرحلة</h3>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر المدة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">يوم واحد</SelectItem>
                      <SelectItem value="2-3">2-3 أيام</SelectItem>
                      <SelectItem value="4-7">4-7 أيام</SelectItem>
                      <SelectItem value="7+">أسبوع أو أكثر</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* التقييم */}
                <div>
                  <h3 className="font-medium mb-3">التقييم</h3>
                  <div className="space-y-2">
                    {[5, 4, 3].map((stars) => (
                      <div key={stars} className="flex items-center space-x-2 space-x-reverse">
                        <Checkbox id={`${stars}-stars`} />
                        <label htmlFor={`${stars}-stars`} className="flex items-center text-sm">
                          {[...Array(stars)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400 ml-1" />
                          ))}
                          <span className="mr-2">فما فوق</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* نتائج البحث */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                نتائج البحث ({filteredTrips.length} رحلة)
              </h2>
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="ترتيب حسب" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-low">السعر: من الأقل للأعلى</SelectItem>
                  <SelectItem value="price-high">السعر: من الأعلى للأقل</SelectItem>
                  <SelectItem value="rating">التقييم</SelectItem>
                  <SelectItem value="duration">المدة</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredTrips.map((trip) => (
                <Card key={trip.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={trip.image} 
                      alt={trip.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 rounded text-sm font-medium">
                      {trip.price} د.أ
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{trip.title}</CardTitle>
                    <p className="text-muted-foreground text-sm">{trip.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-3 text-sm">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 ml-1" />
                        {trip.duration}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 ml-1" />
                        {trip.groupSize}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 ml-1" />
                        <span className="font-medium">{trip.rating}</span>
                        <span className="text-muted-foreground text-sm mr-1">
                          ({trip.reviews} تقييم)
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      منظم بواسطة: {trip.organizer}
                    </p>
                    
                    <Button className="w-full">عرض التفاصيل</Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredTrips.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">لم يتم العثور على رحلات تطابق بحثك</p>
                <Button variant="outline" className="mt-4" onClick={() => {
                  setSearchQuery("");
                  setPriceRange([100, 1000]);
                  setSelectedCategories([]);
                }}>
                  مسح الفلاتر
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer language={language} />
    </div>
  );
};

export default SearchTourist;