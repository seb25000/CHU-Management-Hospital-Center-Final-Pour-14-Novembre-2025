import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Heart, Brain, Bone, Baby, Activity, Sparkles, Ambulance, TestTube } from "lucide-react";
import { useState, useEffect } from "react";
import { CHUApiService } from "../../services/chuApiService";

interface MedicalServicesProps {
  onNavigate: (page: string) => void;
}

const iconMap: { [key: string]: any } = {
  Heart,
  Brain,
  Bone,
  Baby,
  Sparkles,
  Ambulance,
  TestTube,
  Activity
};

export function MedicalServices({ onNavigate }: MedicalServicesProps) {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await CHUApiService.getServices();
        if (response.success) {
          setServices(response.data.slice(0, 8)); // Afficher 8 services sur la page d'accueil
        }
      } catch (error) {
        console.error('Erreur lors du chargement des services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-blue-600 tracking-wide uppercase">Services Médicaux</h2>
          <p className="mt-2 text-3xl leading-8 tracking-tight text-gray-900 sm:text-4xl">
            Excellence médicale dans toutes les spécialités
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Notre centre hospitalier offre une gamme complète de services médicaux avec des équipes spécialisées et des équipements de dernière génération.
          </p>
        </div>

        <div className="mt-16">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Activity className="h-8 w-8 animate-spin text-blue-600" />
              <span className="ml-3 text-gray-600">Chargement des services...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((service, index) => {
                const IconComponent = iconMap[service.icon] || Activity;
                const isAvailable247 = service.isAvailable247;
                
                return (
                  <Card key={service.id || index} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-transparent hover:border-l-blue-500 cursor-pointer group" onClick={() => onNavigate('services')}>
                    <CardHeader>
                      <div className={`flex items-center justify-center w-12 h-12 ${service.isEmergency ? 'bg-red-100' : 'bg-blue-100'} rounded-lg group-hover:scale-110 transition-transform`}>
                        <IconComponent className={`h-6 w-6 ${service.isEmergency ? 'text-red-600' : 'text-blue-600'}`} />
                      </div>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">{service.name}</CardTitle>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          isAvailable247
                            ? "bg-green-100 text-green-800" 
                            : "bg-blue-100 text-blue-800"
                        }`}>
                          {isAvailable247 ? '24/7' : service.available || 'Sur RDV'}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600 text-sm line-clamp-3">
                        {service.description}
                      </CardDescription>
                      {service.averageWaitTime && (
                        <div className="mt-2 text-xs text-gray-500">
                          ⏱️ Attente moyenne: {service.averageWaitTime} min
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">
            Besoin d'une consultation ? Nos équipes sont à votre disposition
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-blue-600 text-white px-6 py-3 hover:bg-blue-700"
              onClick={() => onNavigate('appointments')}
            >
              Prendre rendez-vous en ligne
            </Button>
            <Button 
              variant="outline" 
              className="border border-blue-600 text-blue-600 px-6 py-3 hover:bg-blue-50"
              onClick={() => window.open('tel:0123456789', '_self')}
            >
              Appeler le standard : 01 23 45 67 89
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}