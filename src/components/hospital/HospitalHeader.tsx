import { useState } from "react";
import { Button } from "../ui/button";
import { Menu, User, Bell, Phone, Clock } from "lucide-react";
import { PageType } from "../../hooks/useNavigation";
import { NotificationCenter } from "./NotificationCenter";

interface HospitalHeaderProps {
  currentPage: PageType;
  onNavigate: (page: string) => void;
}

export function HospitalHeader({ currentPage, onNavigate }: HospitalHeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <>
      <NotificationCenter 
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        onNavigate={onNavigate}
      />
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      {/* Barre d'urgence */}
      <div className="bg-red-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span>Urgences: 15 (24h/24)</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>Consultations: 8h-18h</span>
              </div>
            </div>
            <div className="hidden md:block">
              <span>Centre Hospitalier Universitaire - Excellence en soins</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation principale */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo et navigation */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <button 
                className="flex items-center"
                onClick={() => onNavigate('home')}
              >
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white text-xl">+</span>
                </div>
                <div>
                  <h1 className="text-xl text-blue-600 tracking-tight">CHU Management</h1>
                  <p className="text-xs text-gray-500">Centre Hospitalier Universitaire</p>
                </div>
              </button>
            </div>
            
            <nav className="hidden lg:flex space-x-8">
              <button 
                onClick={() => onNavigate('home')}
                className={`transition-colors ${currentPage === 'home' ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}`}
              >
                Accueil
              </button>
              <button 
                onClick={() => onNavigate('services')}
                className={`transition-colors ${currentPage === 'services' ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}`}
              >
                Services
              </button>
              <button 
                onClick={() => onNavigate('doctors')}
                className={`transition-colors ${currentPage === 'doctors' ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}`}
              >
                Médecins
              </button>
              <button 
                onClick={() => onNavigate('patients')}
                className={`transition-colors ${currentPage === 'patients' ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}`}
              >
                Patients
              </button>
              <button 
                onClick={() => onNavigate('appointments')}
                className={`transition-colors ${currentPage === 'appointments' ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}`}
              >
                Rendez-vous
              </button>
              <button 
                onClick={() => onNavigate('contact')}
                className={`transition-colors ${currentPage === 'contact' ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}`}
              >
                Contact
              </button>
            </nav>
          </div>

          {/* Actions utilisateur */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="hidden md:flex relative" onClick={() => setShowNotifications(!showNotifications)}>
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>
            
            <Button variant="outline" size="sm" onClick={() => onNavigate('login')}>
              <User className="h-4 w-4" />
              <span className="ml-2 hidden sm:inline">Connexion</span>
            </Button>
            
            <Button 
              size="sm" 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => onNavigate('appointments')}
            >
              Prendre RDV
            </Button>
            
            <Button variant="outline" size="sm" className="lg:hidden" onClick={() => alert('Menu mobile à implémenter')}>
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
    </>
  );
}