import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Heart, Brain, Bone, Eye, Baby, Activity, Pill, Stethoscope, Clock, Phone, Calendar, MapPin } from "lucide-react";

const detailedServices = [
  {
    icon: Heart,
    title: "Cardiologie",
    description: "Service de cardiologie complet avec équipe spécialisée dans le diagnostic et traitement des maladies cardiovasculaires.",
    features: [
      "Consultation cardiologique",
      "Échographie cardiaque",
      "Électrocardiogramme (ECG)",
      "Test d'effort",
      "Holter cardiaque",
      "Coronarographie",
      "Angioplastie",
      "Chirurgie cardiaque"
    ],
    availability: "24/7",
    emergencyLevel: "Urgences vitales",
    consultationPrice: "80€",
    waitTime: "15 minutes",
    doctors: ["Dr. Marie Dubois", "Dr. Jean Bertrand"],
    color: "text-red-600",
    bgColor: "bg-red-100"
  },
  {
    icon: Brain,
    title: "Neurologie",
    description: "Prise en charge complète des troubles neurologiques et neuro-dégénératifs par une équipe d'experts.",
    features: [
      "Consultation neurologique",
      "IRM cérébrale",
      "Scanner cérébral",
      "Électroencéphalogramme (EEG)",
      "Ponction lombaire",
      "Biopsie cérébrale",
      "Traitement Parkinson",
      "Traitement Alzheimer"
    ],
    availability: "Lun-Ven 8h-18h",
    emergencyLevel: "Urgences spécialisées",
    consultationPrice: "90€",
    waitTime: "30 minutes",
    doctors: ["Dr. Pierre Martin", "Dr. Claire Rousseau"],
    color: "text-purple-600",
    bgColor: "bg-purple-100"
  },
  {
    icon: Baby,
    title: "Pédiatrie",
    description: "Soins médicaux spécialisés pour enfants et adolescents de 0 à 18 ans avec approche bienveillante.",
    features: [
      "Consultation pédiatrique",
      "Vaccination",
      "Suivi de croissance",
      "Pédiatrie d'urgence",
      "Néonatologie",
      "Maladies infectieuses",
      "Troubles du développement",
      "Chirurgie pédiatrique"
    ],
    availability: "24/7",
    emergencyLevel: "Urgences pédiatriques",
    consultationPrice: "65€",
    waitTime: "20 minutes",
    doctors: ["Dr. Sophie Lefebvre", "Dr. Paul Moreau"],
    color: "text-pink-600",
    bgColor: "bg-pink-100"
  },
  {
    icon: Bone,
    title: "Orthopédie",
    description: "Chirurgie et rééducation des traumatismes et pathologies osseuses, articulaires et musculaires.",
    features: [
      "Consultation orthopédique",
      "Chirurgie traumatologique",
      "Prothèses articulaires",
      "Arthroscopie",
      "Chirurgie de la main",
      "Chirurgie du sport",
      "Rééducation fonctionnelle",
      "Médecine physique"
    ],
    availability: "24/7",
    emergencyLevel: "Traumatismes",
    consultationPrice: "85€",
    waitTime: "25 minutes",
    doctors: ["Dr. Michel Leroy", "Dr. Anne Dupont"],
    color: "text-orange-600",
    bgColor: "bg-orange-100"
  }
];

const emergencyServices = [
  {
    title: "Urgences Vitales",
    phone: "15",
    description: "Arrêt cardiaque, détresse respiratoire, coma",
    waitTime: "Immédiat"
  },
  {
    title: "Urgences Générales",
    phone: "01 23 45 67 89",
    description: "Traumatismes, douleurs aigües, malaises",
    waitTime: "15-30 min"
  },
  {
    title: "Urgences Pédiatriques",
    phone: "01 23 45 67 90",
    description: "Urgences enfants 0-18 ans",
    waitTime: "10-20 min"
  }
];

interface ServicesPageProps {
  onNavigate: (page: string) => void;
}

export function ServicesPage({ onNavigate }: ServicesPageProps) {
  const getServicePhone = (serviceTitle: string) => {
    switch (serviceTitle) {
      case "Cardiologie":
        return "0123456791";
      case "Neurologie":
        return "0123456792";
      case "Pédiatrie":
        return "0123456793";
      case "Orthopédie":
        return "0123456794";
      default:
        return "0123456789";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header de la page */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl text-gray-900">Services Médicaux</h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Le CHU Management Center vous propose une gamme complète de services médicaux avec des équipes spécialisées et des équipements de dernière génération.
            </p>
          </div>
        </div>
      </div>

      {/* Services d'urgence */}
      <section className="py-12 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl text-red-800">Services d'Urgence</h2>
            <p className="mt-2 text-red-600">Disponibles 24h/24 - 7j/7</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {emergencyServices.map((service, index) => (
              <Card key={index} className="border-red-200 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => window.open(`tel:${service.phone.replace(/\s/g, '')}`, '_self')}>
                <CardHeader>
                  <CardTitle className="text-red-800 flex items-center">
                    <Phone className="h-5 w-5 mr-2" />
                    {service.title}
                  </CardTitle>
                  <div className="text-2xl text-red-600">{service.phone}</div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-2">{service.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Attente: {service.waitTime}</span>
                    </div>
                    <Button size="sm" className="bg-red-600 hover:bg-red-700" onClick={(e) => {
                      e.stopPropagation();
                      window.open(`tel:${service.phone.replace(/\s/g, '')}`, '_self');
                    }}>
                      Appeler
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services détaillés */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-gray-900">Nos Spécialités Médicales</h2>
            <p className="mt-4 text-gray-600">Services de soins spécialisés avec prise en charge complète</p>
          </div>

          <div className="space-y-12">
            {detailedServices.map((service, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="md:flex">
                  <div className="md:w-1/3 bg-gradient-to-br from-gray-50 to-gray-100 p-8 flex flex-col justify-center">
                    <div className={`w-16 h-16 ${service.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                      <service.icon className={`h-8 w-8 ${service.color}`} />
                    </div>
                    <h3 className="text-2xl text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-2 text-gray-500" />
                        <span>Disponible: {service.availability}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                        <span>Consultation: {service.consultationPrice}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Activity className="h-4 w-4 mr-2 text-gray-500" />
                        <span>Attente moyenne: {service.waitTime}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button 
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        onClick={() => onNavigate('appointments')}
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Prendre rendez-vous
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => window.open(`tel:${getServicePhone(service.title)}`, '_self')}
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Appeler directement
                      </Button>
                    </div>
                  </div>
                  
                  <div className="md:w-2/3 p-8">
                    <div className="mb-6">
                      <h4 className="text-lg text-gray-900 mb-3">Prestations incluses</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                            <span className="text-sm text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h4 className="text-lg text-gray-900 mb-3">Équipe médicale</h4>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {service.doctors.map((doctor, doctorIndex) => (
                          <Badge key={doctorIndex} variant="secondary">
                            {doctor}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Badge 
                          variant={service.availability === "24/7" ? "default" : "secondary"}
                          className={service.availability === "24/7" ? "bg-green-600" : ""}
                        >
                          {service.emergencyLevel}
                        </Badge>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => onNavigate('doctors')}
                        >
                          Voir l'équipe →
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl text-white mb-4">Besoin d'une consultation ?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Nos équipes médicales sont disponibles pour vous accompagner dans votre parcours de soins.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100"
              onClick={() => onNavigate('appointments')}
            >
              <Calendar className="mr-2 h-5 w-5" />
              Prendre rendez-vous en ligne
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-blue-700"
              onClick={() => onNavigate('contact')}
            >
              <Phone className="mr-2 h-5 w-5" />
              Contacter le standard
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}