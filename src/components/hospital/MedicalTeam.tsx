import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useState, useEffect } from "react";
import { CHUApiService } from "../../services/chuApiService";
import { Activity } from "lucide-react";

interface MedicalTeamProps {
  onNavigate: (page: string) => void;
}

export function MedicalTeam({ onNavigate }: MedicalTeamProps) {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalDoctors: 150,
    totalStaff: 500,
    specialties: 30,
    patientSatisfaction: 98
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Charger les médecins
        const doctorsResponse = await CHUApiService.getDoctors();
        if (doctorsResponse.success) {
          setDoctors(doctorsResponse.data.slice(0, 3)); // Afficher 3 médecins sur la page d'accueil
        }

        // Charger les statistiques
        const statsResponse = await CHUApiService.getStats();
        if (statsResponse.success) {
          setStats(statsResponse.data);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const hospitalStats = [
    {
      number: `${stats.totalDoctors}+`,
      label: "Médecins spécialisés",
      description: "Équipe médicale d'excellence"
    },
    {
      number: `${stats.totalStaff}+`,
      label: "Personnel soignant",
      description: "Infirmiers, aides-soignants"
    },
    {
      number: stats.specialties.toString(),
      label: "Spécialités médicales",
      description: "Couverture complète des soins"
    },
    {
      number: `${stats.patientSatisfaction}%`,
      label: "Satisfaction patients",
      description: "Qualité des soins reconnue"
    }
  ];
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center mb-16">
          <h2 className="text-base text-blue-600 tracking-wide uppercase">Notre Équipe Médicale</h2>
          <p className="mt-2 text-3xl leading-8 tracking-tight text-gray-900 sm:text-4xl">
            Des professionnels dédiés à votre santé
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Nos médecins spécialisés combinent expertise, innovation et bienveillance pour vous offrir les meilleurs soins possibles.
          </p>
        </div>

        {/* Statistiques hospitalières */}
        <div className="mb-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {hospitalStats.map((stat, index) => (
              <div key={index} className="text-center bg-white p-6 rounded-lg shadow-sm">
                <div className="text-3xl text-blue-600 mb-2">{stat.number}</div>
                <div className="text-lg text-gray-900 mb-1">{stat.label}</div>
                <div className="text-sm text-gray-600">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Équipe médicale en vedette */}
        <div className="mb-12">
          <h3 className="text-2xl text-gray-900 text-center mb-8">Médecins en vedette</h3>
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Activity className="h-8 w-8 animate-spin text-blue-600" />
              <span className="ml-3 text-gray-600">Chargement des médecins...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {doctors.map((doctor, index) => (
                <Card key={doctor.id || index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group" onClick={() => onNavigate('doctors')}>
                  <div className="aspect-w-3 aspect-h-2">
                    <ImageWithFallback
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      src={doctor.imageUrl || "https://plus.unsplash.com/premium_photo-1681966907271-1e350ec3bb95?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fG0lQzMlQTlkZWNpbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=400"}
                      alt={`${doctor.firstName} ${doctor.lastName}`}
                    />
                  </div>
                  <CardContent className="p-6">
                    <h4 className="text-xl text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      Dr. {doctor.firstName} {doctor.lastName}
                    </h4>
                    <p className="text-blue-600 mb-2">{doctor.specialty}</p>
                    <p className="text-sm text-gray-600 mb-4">{doctor.yearsExperience} ans d'expérience</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary" className="text-xs">
                        {doctor.specialty}
                      </Badge>
                      {doctor.officeNumber && (
                        <Badge variant="outline" className="text-xs">
                          Bureau {doctor.officeNumber}
                        </Badge>
                      )}
                      {doctor.isAvailable && (
                        <Badge className="text-xs bg-green-100 text-green-800">
                          Disponible
                        </Badge>
                      )}
                    </div>
                    
                    <Button variant="outline" size="sm" className="mt-2 w-full opacity-0 group-hover:opacity-100 transition-opacity">
                      Voir le profil
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Informations pratiques */}
        <div className="bg-blue-600 rounded-lg p-8 text-center text-white">
          <h3 className="text-2xl mb-4">Consultation avec nos spécialistes</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Prenez rendez-vous avec nos médecins spécialisés. Délais d'attente réduits et prise en charge personnalisée garantie.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-white text-blue-600 px-6 py-3 hover:bg-gray-100"
              onClick={() => onNavigate('appointments')}
            >
              Prendre rendez-vous en ligne
            </Button>
            <Button 
              variant="outline" 
              className="border border-white text-white px-6 py-3 hover:bg-blue-700 hover:text-white"
              onClick={() => onNavigate('doctors')}
            >
              Voir tous nos médecins
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}