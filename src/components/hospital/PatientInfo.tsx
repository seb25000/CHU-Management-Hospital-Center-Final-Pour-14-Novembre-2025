import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Clock, MapPin, Phone, Calendar, FileText, CreditCard, AlertCircle } from "lucide-react";

interface PatientInfoProps {
  onNavigate: (page: string) => void;
}

const quickActions = [
  {
    icon: Calendar,
    title: "Prendre RDV",
    description: "Réservation en ligne 24h/24",
    action: "Planifier",
    color: "bg-blue-500"
  },
  {
    icon: FileText,
    title: "Résultats d'examens",
    description: "Accès sécurisé à vos analyses",
    action: "Consulter",
    color: "bg-green-500"
  },
  {
    icon: CreditCard,
    title: "Paiement en ligne",
    description: "Régler vos consultations",
    action: "Payer",
    color: "bg-purple-500"
  },
  {
    icon: Phone,
    title: "Téléconsultation",
    description: "Consultation à distance",
    action: "Démarrer",
    color: "bg-orange-500"
  }
];

const hospitalInfo = [
  {
    icon: MapPin,
    title: "Adresse",
    content: "123 Avenue de la Santé, 75015 Paris"
  },
  {
    icon: Phone,
    title: "Standard",
    content: "01 23 45 67 89"
  },
  {
    icon: Clock,
    title: "Horaires",
    content: "Urgences 24h/24 - Consultations 8h-18h"
  },
  {
    icon: AlertCircle,
    title: "Urgences",
    content: "Service d'urgences : Tél. 15 ou 112"
  }
];

export function PatientInfo({ onNavigate }: PatientInfoProps) {
  const handleQuickAction = (actionTitle: string) => {
    switch (actionTitle) {
      case "Prendre RDV":
        onNavigate('appointments');
        break;
      case "Résultats d'examens":
        onNavigate('patients');
        break;
      case "Paiement en ligne":
        onNavigate('patients');
        break;
      case "Téléconsultation":
        onNavigate('appointments');
        break;
      default:
        onNavigate('home');
    }
  };
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-base text-blue-600 tracking-wide uppercase">Espace Patient</h2>
          <p className="mt-2 text-3xl leading-8 tracking-tight text-gray-900 sm:text-4xl">
            Votre suivi médical simplifié
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Accédez facilement à tous vos services médicaux en ligne et gérez votre parcours de soins.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Actions rapides */}
          <div className="lg:col-span-2">
            <h3 className="text-xl text-gray-900 mb-6">Actions rapides</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {quickActions.map((action, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 cursor-pointer group" onClick={() => handleQuickAction(action.title)}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <action.icon className="h-6 w-6 text-white" />
                      </div>
                      <Button variant="outline" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => {
                        e.stopPropagation();
                        handleQuickAction(action.title);
                      }}>
                        {action.action}
                      </Button>
                    </div>
                    <CardTitle className="text-lg">{action.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{action.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Zone d'urgence */}
            <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="flex items-start">
                <AlertCircle className="h-6 w-6 text-red-600 mr-3 mt-1" />
                <div>
                  <h4 className="text-lg text-red-800 mb-2">En cas d'urgence médicale</h4>
                  <p className="text-red-700 mb-4">
                    Pour toute urgence vitale, contactez immédiatement le 15 (SAMU) ou le 112 (numéro d'urgence européen). 
                    Notre service d'urgences est ouvert 24h/24 et 7j/7.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      className="bg-red-600 hover:bg-red-700"
                      onClick={() => window.open('tel:15', '_self')}
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      Appeler le 15
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-red-600 text-red-600 hover:bg-red-50"
                      onClick={() => onNavigate('contact')}
                    >
                      <MapPin className="mr-2 h-4 w-4" />
                      Localiser les urgences
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Informations pratiques */}
          <div>
            <h3 className="text-xl text-gray-900 mb-6">Informations pratiques</h3>
            <div className="space-y-4">
              {hospitalInfo.map((info, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <info.icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="text-sm text-blue-600 uppercase tracking-wide">{info.title}</h4>
                        <p className="text-gray-900 mt-1">{info.content}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Horaires détaillés */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Horaires des services</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Urgences</span>
                  <span className="text-green-600">24h/24 - 7j/7</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Consultations</span>
                  <span className="text-gray-900">8h-18h (Lun-Ven)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pharmacie</span>
                  <span className="text-gray-900">8h-20h (7j/7)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Laboratoire</span>
                  <span className="text-gray-900">7h-19h (Lun-Sam)</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}