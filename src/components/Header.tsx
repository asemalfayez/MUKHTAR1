import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Moon, Sun, Globe, Menu, X, User, Settings, LogOut, LayoutDashboard, Bookmark, BookOpen, Star, ChartBar, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

interface HeaderProps {
  language: 'ar' | 'en';
  onLanguageChange: (lang: 'ar' | 'en') => void;
  isDark: boolean;
  onThemeToggle: () => void;
}

export function Header({ language, onLanguageChange, isDark, onThemeToggle }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const isRTL = language === 'ar';
  
  const t = {
    ar: {
      logo: 'مختار',
      home: 'الرئيسية',
      trips: 'الرحلات',
      organizers: 'المنظمون',
      about: 'من نحن',
      contact: 'اتصل بنا',
      login: 'تسجيل الدخول',
      register: 'إنشاء حساب',
      profile: 'الملف الشخصي',
      dashboard: 'لوحة التحكم',
      logout: 'تسجيل الخروج',
      settings: 'الإعدادات',
      bookings: 'الحجوزات',
      favorites: 'المفضلة',
      reviews: 'التقييمات',
      myTrips: 'رحلاتي',
      reports: 'التقارير',
      manage: 'إدارة'
    }
  };

  const text = t.ar;

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg",
      isRTL ? "text-right" : "text-left"
    )}>
      <div className="container mx-auto px-4">
        <div className={cn(
          "flex h-16 items-center justify-between",
          isRTL ? "flex-row-reverse" : "flex-row"
        )}>
          {/* Logo with Image only */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src="/MUKHTAR.png" alt={text.logo} className="h-12 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className={cn(
            "hidden md:flex items-center space-x-6",
            isRTL && "space-x-reverse"
          )}>
            {user ? (
              // Navigation for authenticated users
              <>
                <Link
                  to="/"
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-yellow-400",
                    "relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0",
                    "after:bg-yellow-400 after:transition-all after:duration-300 hover:after:w-full"
                  )}
                >
                  {text.home}
                </Link>
                {user.userType === 'tourist' && (
                  <>
                    <Link
                      to="/trips"
                      className={cn(
                        "text-sm font-medium transition-colors hover:text-yellow-400",
                        "relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0",
                        "after:bg-yellow-400 after:transition-all after:duration-300 hover:after:w-full"
                      )}
                    >
                      {text.trips}
                    </Link>
                    <Link
                      to="/my-bookings"
                      className={cn(
                        "text-sm font-medium transition-colors hover:text-yellow-400",
                        "relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0",
                        "after:bg-yellow-400 after:transition-all after:duration-300 hover:after:w-full"
                      )}
                    >
                      {text.bookings}
                    </Link>
                    <Link
                      to="/favorites"
                      className={cn(
                        "text-sm font-medium transition-colors hover:text-yellow-400",
                        "relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0",
                        "after:bg-yellow-400 after:transition-all after:duration-300 hover:after:w-full"
                      )}
                    >
                      {text.favorites}
                    </Link>
                  </>
                )}
                {user.userType === 'organizer' && (
                  <>
                    <Link
                      to="/dashboard"
                      className={cn(
                        "text-sm font-medium transition-colors hover:text-yellow-400",
                        "relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0",
                        "after:bg-yellow-400 after:transition-all after:duration-300 hover:after:w-full"
                      )}
                    >
                      {text.dashboard}
                    </Link>
                    <Link
                      to="/my-trips"
                      className={cn(
                        "text-sm font-medium transition-colors hover:text-yellow-400",
                        "relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0",
                        "after:bg-yellow-400 after:transition-all after:duration-300 hover:after:w-full"
                      )}
                    >
                      {text.myTrips}
                    </Link>
                    <Link
                      to="/organizer-bookings"
                      className={cn(
                        "text-sm font-medium transition-colors hover:text-yellow-400",
                        "relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0",
                        "after:bg-yellow-400 after:transition-all after:duration-300 hover:after:w-full"
                      )}
                    >
                      {text.bookings}
                    </Link>
                    <Link
                      to="/reports"
                      className={cn(
                        "text-sm font-medium transition-colors hover:text-yellow-400",
                        "relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0",
                        "after:bg-yellow-400 after:transition-all after:duration-300 hover:after:w-full"
                      )}
                    >
                      {text.reports}
                    </Link>
                  </>
                )}
              </>
            ) : (
              // Navigation for guests
              [
                { key: 'home', href: '/' },
                { key: 'about', href: '/about' },
                { key: 'contact', href: '/contact' }
              ].map((item) => (
                <Link
                  key={item.key}
                  to={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-yellow-400",
                    "relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0",
                    "after:bg-yellow-400 after:transition-all after:duration-300 hover:after:w-full"
                  )}
                >
                  {text[item.key as keyof typeof text]}
                </Link>
              ))
            )}
          </nav>

          {/* Right Side Controls */}
          <div className={cn(
            "flex items-center space-x-4",
            isRTL && "space-x-reverse"
          )}>
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onThemeToggle}
              className="hover:bg-gray-700 text-white"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            {/* User Menu or Auth Buttons - Desktop */}
            <div className="hidden md:flex items-center space-x-2">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 w-9 rounded-full bg-gray-700 hover:bg-gray-600">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="bg-gray-600 text-white">{user.name?.charAt(0) || 'U'}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-gray-800 text-white border-gray-700" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">{user.name}</p>
                        <p className="w-[200px] truncate text-sm text-gray-400">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <DropdownMenuSeparator className="bg-gray-700" />
                    <DropdownMenuItem onClick={() => navigate(user.userType === 'tourist' ? '/profile' : '/organizer-profile/edit')} className="hover:bg-gray-700">
                      <User className="mr-2 h-4 w-4" />
                      <span>{text.profile}</span>
                    </DropdownMenuItem>
                    {user.userType === 'tourist' && (
                      <>
                        <DropdownMenuItem onClick={() => navigate('/my-bookings')} className="hover:bg-gray-700">
                          <BookOpen className="mr-2 h-4 w-4" />
                          <span>{text.bookings}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate('/favorites')} className="hover:bg-gray-700">
                          <Bookmark className="mr-2 h-4 w-4" />
                          <span>{text.favorites}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate('/rate-trip/1')} className="hover:bg-gray-700">
                          <Star className="mr-2 h-4 w-4" />
                          <span>{text.reviews}</span>
                        </DropdownMenuItem>
                      </>
                    )}
                    {user.userType === 'organizer' && (
                      <>
                        <DropdownMenuItem onClick={() => navigate('/dashboard')} className="hover:bg-gray-700">
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          <span>{text.dashboard}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate('/my-trips')} className="hover:bg-gray-700">
                          <BookOpen className="mr-2 h-4 w-4" />
                          <span>{text.myTrips}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate('/organizer-bookings')} className="hover:bg-gray-700">
                          <BookOpen className="mr-2 h-4 w-4" />
                          <span>{text.bookings}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate('/reports')} className="hover:bg-gray-700">
                          <ChartBar className="mr-2 h-4 w-4" />
                          <span>{text.reports}</span>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuItem onClick={() => navigate('/settings')} className="hover:bg-gray-700">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>{text.settings}</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-700" />
                    <DropdownMenuItem onClick={logout} className="text-red-400 hover:bg-gray-700 focus:text-red-400">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>{text.logout}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Link to="/signin">
                    <Button variant="ghost" size="sm" className="text-white hover:bg-gray-700">
                      {text.login}
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button size="sm" className="bg-yellow-500 text-white hover:bg-yellow-600">
                      {text.register}
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden bg-gray-700 text-white hover:bg-gray-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={cn(
            "md:hidden border-t bg-gray-800 text-white py-4 fixed top-16 left-0 w-full",
            isRTL ? "text-right" : "text-left"
          )}>
            <nav className="flex flex-col space-y-4">
              {user ? (
                // Mobile navigation for authenticated users
                <>
                  <Link
                    to="/"
                    className="text-sm font-medium transition-colors hover:text-yellow-400 px-4 py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {text.home}
                  </Link>
                  <Link
                    to="/trips"
                    className="text-sm font-medium transition-colors hover:text-yellow-400 px-4 py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {text.trips}
                  </Link>
                  {user.userType === 'tourist' && (
                    <>
                      <Link
                        to="/my-bookings"
                        className="text-sm font-medium transition-colors hover:text-yellow-400 px-4 py-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {text.bookings}
                      </Link>
                      <Link
                        to="/favorites"
                        className="text-sm font-medium transition-colors hover:text-yellow-400 px-4 py-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {text.favorites}
                      </Link>
                      <Link
                        to="/rate-trip/1"
                        className="text-sm font-medium transition-colors hover:text-yellow-400 px-4 py-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {text.reviews}
                      </Link>
                    </>
                  )}
                  {user.userType === 'organizer' && (
                    <>
                      <Link
                        to="/dashboard"
                        className="text-sm font-medium transition-colors hover:text-yellow-400 px-4 py-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {text.dashboard}
                      </Link>
                      <Link
                        to="/my-trips"
                        className="text-sm font-medium transition-colors hover:text-yellow-400 px-4 py-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {text.myTrips}
                      </Link>
                      <Link
                        to="/organizer-bookings"
                        className="text-sm font-medium transition-colors hover:text-yellow-400 px-4 py-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {text.bookings}
                      </Link>
                      <Link
                        to="/reports"
                        className="text-sm font-medium transition-colors hover:text-yellow-400 px-4 py-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {text.reports}
                      </Link>
                    </>
                  )}
                  <Link
                    to="/about"
                    className="text-sm font-medium transition-colors hover:text-yellow-400 px-4 py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {text.about}
                  </Link>
                  <Link
                    to="/contact"
                    className="text-sm font-medium transition-colors hover:text-yellow-400 px-4 py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {text.contact}
                  </Link>
                  <Link
                    to={user.userType === 'tourist' ? '/profile' : '/organizer-profile/edit'}
                    className="text-sm font-medium transition-colors hover:text-yellow-400 px-4 py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {text.profile}
                  </Link>
                  <Link
                    to="/settings"
                    className="text-sm font-medium transition-colors hover:text-yellow-400 px-4 py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {text.settings}
                  </Link>
                  <div className="flex flex-col space-y-2 px-4 pt-4 border-t border-gray-700">
                    <div className="flex items-center gap-2 mb-2">
                      <Avatar className="h-8 w-8 bg-gray-600">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="bg-gray-600 text-white">{user.name?.charAt(0) || 'U'}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-gray-600 text-white hover:bg-gray-700"
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      {text.logout}
                    </Button>
                  </div>
                </>
              ) : (
                // Mobile navigation for guests
                <>
                  <Link
                    to="/"
                    className="text-sm font-medium transition-colors hover:text-yellow-400 px-4 py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {text.home}
                  </Link>
                  <Link
                    to="/trips"
                    className="text-sm font-medium transition-colors hover:text-yellow-400 px-4 py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {text.trips}
                  </Link>
                  <Link
                    to="/about"
                    className="text-sm font-medium transition-colors hover:text-yellow-400 px-4 py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {text.about}
                  </Link>
                  <Link
                    to="/contact"
                    className="text-sm font-medium transition-colors hover:text-yellow-400 px-4 py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {text.contact}
                  </Link>
                  <div className="flex flex-col space-y-2 px-4 pt-4 border-t border-gray-700">
                    <Link to="/signin">
                      <Button variant="ghost" size="sm" className="text-white hover:bg-gray-700 justify-start w-full">
                        {text.login}
                      </Button>
                    </Link>
                    <Link to="/signup">
                      <Button size="sm" className="bg-yellow-500 text-white hover:bg-yellow-600 w-full">
                        {text.register}
                      </Button>
                    </Link>
                  </div>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}