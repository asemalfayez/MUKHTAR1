import React, { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Header } from "@/components/Header";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import TripDetails from "./pages/TripDetails";
import OrganizerDashboard from "./pages/OrganizerDashboard";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import EditTrip from "./pages/EditTrip"; // Added
import Privacy from "./pages/Privacy"; // Added
import TermsAndConditions from "./pages/TermsAndConditions"; // Added

// Tourist pages
import ExploreTripsTourist from "./pages/ExploreTripsTourist";
import MyBookingsTourist from "./pages/MyBookingsTourist";
import BookingDetailsTourist from "./pages/BookingDetailsTourist";
import RateTripTourist from "./pages/RateTripTourist";
import ProfileTourist from "./pages/ProfileTourist";
import SearchTourist from "./pages/SearchTourist";
import BookingHistoryTourist from "./pages/BookingHistoryTourist";
import FavoritesTourist from "./pages/FavoritesTourist";

// Organizer pages
import OrganizerTrips from "./pages/OrganizerTrips";
import CreateTripOrganizer from "./pages/CreateTripOrganizer";
import OrganizerBookings from "./pages/OrganizerBookings";
import OrganizerPortfolios from "./pages/OrganizerPortfolios";
import OrganizerReviews from "./pages/OrganizerReviews";
import OrganizerProfile from "./pages/OrganizerProfile";
import OrganizerReports from "./pages/OrganizerReports";

// Static pages
import About from "./pages/About";
import Contact from "./pages/Contact";

const queryClient = new QueryClient();

const App = () => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  const [language, setLanguage] = useState<'ar' | 'en'>(
    (localStorage.getItem('language') as 'ar' | 'en') || 'ar' // Updated default to 'ar' based on your preference
  );

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('language', language);
  }, [language]);

  const handleThemeToggle = () => {
    setIsDark((prev) => !prev);
  };

  const handleLanguageChange = (lang: 'ar' | 'en') => {
    setLanguage(lang);
  };

  const renderWithProps = (Component: React.ComponentType<any>, props: any = {}) => (
    <Component language={language} isDark={isDark} {...props} />
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Header
              language={language}
              onLanguageChange={handleLanguageChange}
              isDark={isDark}
              onThemeToggle={handleThemeToggle}
            />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={renderWithProps(Index)} />
              <Route path="/signin" element={renderWithProps(SignIn)} />
              <Route path="/signup" element={renderWithProps(SignUp)} />
              <Route path="/forgot-password" element={renderWithProps(ForgotPassword)} />
              <Route path="/trips" element={renderWithProps(ExploreTripsTourist)} />
              <Route path="/explore-trips" element={renderWithProps(ExploreTripsTourist)} />
              <Route path="/contact" element={renderWithProps(Contact)} />
              <Route path="/about" element={renderWithProps(About)} />
              <Route path="/privacy" element={renderWithProps(Privacy)} /> {/* Added */}
              <Route path="/terms" element={renderWithProps(TermsAndConditions)} /> {/* Added */}
              <Route 
                path="/trip/:id" 
                element={
                  <ProtectedRoute requireAuth={true}>
                    {renderWithProps(TripDetails)}
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/organizer-profile/:organizerId" 
                element={renderWithProps(OrganizerProfile)} 
              />

              {/* Tourist Routes */}
              <Route 
                path="/my-bookings" 
                element={
                  <ProtectedRoute requireAuth={true} requiredUserType="tourist">
                    {renderWithProps(MyBookingsTourist)}
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/booking-details/tourist/:id" 
                element={
                  <ProtectedRoute requireAuth={true} requiredUserType="tourist">
                    {renderWithProps(BookingDetailsTourist)}
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/rate-trip/:id" 
                element={
                  <ProtectedRoute requireAuth={true} requiredUserType="tourist">
                    {renderWithProps(RateTripTourist)}
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute requireAuth={true} requiredUserType="tourist">
                    {renderWithProps(ProfileTourist)}
                  </ProtectedRoute>
                } 
              />
              <Route path="/search" element={renderWithProps(SearchTourist)} />
              <Route 
                path="/booking-history" 
                element={
                  <ProtectedRoute requireAuth={true} requiredUserType="tourist">
                    {renderWithProps(BookingHistoryTourist)}
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/favorites" 
                element={
                  <ProtectedRoute requireAuth={true} requiredUserType="tourist">
                    {renderWithProps(FavoritesTourist)}
                  </ProtectedRoute>
                } 
              />

              {/* Organizer Routes */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute requireAuth={true} requiredUserType="organizer">
                    {renderWithProps(OrganizerDashboard)}
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/my-trips" 
                element={
                  <ProtectedRoute requireAuth={true} requiredUserType="organizer">
                    {renderWithProps(OrganizerTrips)}
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/create-trip" 
                element={
                  <ProtectedRoute requireAuth={true} requiredUserType="organizer">
                    {renderWithProps(CreateTripOrganizer)}
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/edit-trip/:id" 
                element={
                  <ProtectedRoute requireAuth={true} requiredUserType="organizer">
                    {renderWithProps(EditTrip)}
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/trip-portfolios" 
                element={
                  <ProtectedRoute requireAuth={true} requiredUserType="organizer">
                    {renderWithProps(OrganizerPortfolios)}
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/organizer-bookings" 
                element={
                  <ProtectedRoute requireAuth={true} requiredUserType="organizer">
                    {renderWithProps(OrganizerBookings)}
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/trip-reviews" 
                element={
                  <ProtectedRoute requireAuth={true} requiredUserType="organizer">
                    {renderWithProps(OrganizerReviews)}
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/organizer-profile/:organizerId/edit" 
                element={
                  <ProtectedRoute requireAuth={true} requiredUserType="organizer">
                    {renderWithProps(OrganizerProfile)}
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/reports" 
                element={
                  <ProtectedRoute requireAuth={true} requiredUserType="organizer">
                    {renderWithProps(OrganizerReports)}
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/booking-details/organizer/:id" 
                element={
                  <ProtectedRoute requireAuth={true} requiredUserType="organizer">
                    {renderWithProps(BookingDetailsTourist)} {/* يمكن استبدالها بمكون OrganizerBookingDetails إذا موجود */}
                  </ProtectedRoute>
                } 
              />

              {/* Settings Route */}
              <Route 
                path="/settings" 
                element={
                  <ProtectedRoute requireAuth={true}>
                    {renderWithProps(Settings)}
                  </ProtectedRoute>
                } 
              />

              {/* Catch all */}
              <Route path="*" element={renderWithProps(NotFound)} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;