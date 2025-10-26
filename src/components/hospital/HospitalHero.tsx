import { Button } from "../ui/button";
import { Calendar, MapPin, Shield, Heart, Activity } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useState, useEffect } from "react";
import { CHUApiService } from "../../services/chuApiService";

interface HospitalHeroProps {
  onNavigate: (page: string) => void;
}

export function HospitalHero({ onNavigate }: HospitalHeroProps) {
  const [stats, setStats] = useState({
    totalDoctors: 150,
    specialties: 30,
    patientsPerYear: 50000,
    emergencyWaitTime: 15
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await CHUApiService.getStats();
        if (response.success) {
          setStats(response.data);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des statistiques:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="tracking-tight text-gray-900">
                <span className="block xl:inline">Votre santé,</span>{' '}
                <span className="block text-blue-600 xl:inline">notre priorité</span>
              </h1>
              
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:max-w-xl sm:mx-auto md:mt-5 lg:mx-0">
                Le CHU Management Center offre des soins médicaux d'excellence avec une équipe de professionnels dédiés. Technologie de pointe, soins personnalisés et suivi médical complet pour votre bien-être.
              </p>

              {/* Statistiques rapides - Données dynamiques de la base */}
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                <div className="text-center bg-white/60 backdrop-blur rounded-lg p-2">
                  <div className="text-2xl text-blue-600 mb-1 flex items-center justify-center">
                    {loading ? <Activity className="h-5 w-5 animate-spin" /> : '24/7'}
                  </div>
                  <div className="text-sm text-gray-600">Urgences</div>
                </div>
                <div className="text-center bg-white/60 backdrop-blur rounded-lg p-2">
                  <div className="text-2xl text-green-600 mb-1">
                    {loading ? '...' : `${stats.totalDoctors}+`}
                  </div>
                  <div className="text-sm text-gray-600">Médecins</div>
                </div>
                <div className="text-center bg-white/60 backdrop-blur rounded-lg p-2">
                  <div className="text-2xl text-purple-600 mb-1">
                    {loading ? '...' : stats.specialties}
                  </div>
                  <div className="text-sm text-gray-600">Spécialités</div>
                </div>
                <div className="text-center bg-white/60 backdrop-blur rounded-lg p-2">
                  <div className="text-2xl text-orange-600 mb-1">
                    {loading ? '...' : `${(stats.patientsPerYear / 1000).toFixed(0)}k+`}
                  </div>
                  <div className="text-sm text-gray-600">Patients/an</div>
                </div>
              </div>
              
              <div className="mt-8 sm:mt-10 sm:flex sm:justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-4">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto flex items-center justify-center px-8 py-3 bg-blue-600 hover:bg-blue-700"
                  onClick={() => onNavigate('appointments')}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Prendre rendez-vous
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto flex items-center justify-center px-8 py-3"
                  onClick={() => onNavigate('contact')}
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  Nous localiser
                </Button>
              </div>

              {/* Services d'urgence */}
              <div className="mt-8 flex flex-wrap gap-4 sm:justify-center lg:justify-start">
                <div className="flex items-center bg-red-50 px-3 py-2 rounded-lg">
                  <Heart className="h-4 w-4 text-red-600 mr-2" />
                  <span className="text-sm text-red-700">Urgences Cardiologie</span>
                </div>
                <div className="flex items-center bg-green-50 px-3 py-2 rounded-lg">
                  <Shield className="h-4 w-4 text-green-600 mr-2" />
                  <span className="text-sm text-green-700">COVID-19 Safe</span>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <ImageWithFallback
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="https://images.unsplash.com/photo-1719934398679-d764c1410770?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3NwaXRhbCUyMGJ1aWxkaW5nfGVufDF8fHx8MTc1ODU2NzIxMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Centre hospitalier moderne"
        />
      </div>
    </div>
  );
}