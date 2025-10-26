import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Calendar, FileText, CreditCard, Phone, Video, Clock, Download, Eye, Search, Filter, User, Heart, Shield, AlertCircle } from "lucide-react";

const patientServices = [
  {
    icon: Calendar,
    title: "Gestion des rendez-vous",
    description: "Prenez, modifiez ou annulez vos rendez-vous en ligne",
    actions: ["Nouveau RDV", "Mes RDV", "Historique"],
    color: "bg-blue-500"
  },
  {
    icon: FileText,
    title: "Dossier médical",
    description: "Consultez vos résultats d'examens et comptes-rendus",
    actions: ["Résultats", "Ordonnances", "Vaccinations"],
    color: "bg-green-500"
  },
  {
    icon: CreditCard,
    title: "Facturation",
    description: "Gérez vos paiements et remboursements",
    actions: ["Factures", "Paiements", "Remboursements"],
    color: "bg-purple-500"
  },
  {
    icon: Video,
    title: "Téléconsultation",
    description: "Consultations à distance avec vos médecins",
    actions: ["Planifier", "Rejoindre", "Historique"],
    color: "bg-orange-500"
  }
];

const hospitalGuide = [
  {
    title: "Première visite",
    items: [
      "Amenez votre carte vitale et pièce d'identité",
      "Arrivez 15 minutes avant votre rendez-vous",
      "Préparez la liste de vos médicaments actuels",
      "Apportez vos résultats d'examens récents"
    ]
  },
  {
    title: "Hospitalisation",
    items: [
      "Préparez votre kit d'admission (vêtements, produits d'hygiène)",
      "Informez-vous sur les horaires de visite",
      "Contactez votre assurance pour la prise en charge",
      "Désignez une personne de confiance si nécessaire"
    ]
  },
  {
    title: "Après votre visite",
    items: [
      "Suivez les prescriptions médicales",
      "Planifiez les rendez-vous de suivi",
      "Contactez-nous en cas de questions",
      "Évaluez votre expérience patient"
    ]
  }
];

const patientRights = [
  {
    icon: Shield,
    title: "Confidentialité",
    description: "Vos données médicales sont protégées et confidentielles"
  },
  {
    icon: User,
    title: "Information",
    description: "Droit à l'information claire sur votre état de santé"
  },
  {
    icon: Heart,
    title: "Consentement",
    description: "Consentement libre et ��clairé pour tous les soins"
  },
  {
    icon: FileText,
    title: "Accès au dossier",
    description: "Accès à votre dossier médical sur simple demande"
  }
];

const emergencyContacts = [
  {
    service: "SAMU",
    number: "15",
    description: "Urgences vitales, détresse respiratoire"
  },
  {
    service: "Police Secours",
    number: "17",
    description: "Urgences de sécurité"
  },
  {
    service: "Pompiers",
    number: "18",
    description: "Incendies, accidents, secours"
  },
  {
    service: "Urgences Européennes",
    number: "112",
    description: "Numéro d'urgence unique européen"
  }
];

interface PatientsPageProps {
  onNavigate: (page: string) => void;
}

export function PatientsPage({ onNavigate }: PatientsPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const handleServiceAction = (serviceTitle: string, action: string) => {
    // Navigation en fonction du service et de l'action
    switch (serviceTitle) {
      case "Gestion des rendez-vous":
        if (action === "Nouveau RDV") {
          onNavigate('appointments');
        } else if (action === "Mes RDV" || action === "Historique") {
          onNavigate('login'); // Redirection vers la page de connexion pour accéder aux RDV
        }
        break;
      case "Dossier médical":
        onNavigate('login'); // Nécessite une connexion
        break;
      case "Facturation":
        onNavigate('login'); // Nécessite une connexion
        break;
      case "Téléconsultation":
        if (action === "Planifier") {
          onNavigate('appointments');
        } else {
          onNavigate('login'); // Nécessite une connexion pour rejoindre ou voir l'historique
        }
        break;
      default:
        onNavigate('login');
    }
  };

  const handleRGPDAction = (action: string) => {
    switch (action) {
      case "Consulter la politique RGPD":
        onNavigate('rgpd'); // Navigation vers la page RGPD dédiée
        break;
      case "Exercer mes droits":
        onNavigate('contact'); // Redirection vers contact pour les demandes
        break;
      case "Contact DPO":
        // Ouverture d'email pour contacter le DPO
        window.open('mailto:dpo@chu-management.fr?subject=Demande concernant mes données personnelles', '_self');
        break;
      default:
        onNavigate('contact');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl text-gray-900">Espace Patient</h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Accédez à tous vos services médicaux en ligne et gérez facilement votre parcours de soins au CHU Management Center.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue="services" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="services">Services en ligne</TabsTrigger>
            <TabsTrigger value="guide">Guide patient</TabsTrigger>
            <TabsTrigger value="rights">Vos droits</TabsTrigger>
            <TabsTrigger value="emergency">Urgences</TabsTrigger>
          </TabsList>

          {/* Services en ligne */}
          <TabsContent value="services" className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl text-gray-900">Services numériques</h2>
              <p className="mt-2 text-gray-600">Accédez à vos services médicaux 24h/24</p>
            </div>

            {/* Actions rapides */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {patientServices.map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 cursor-pointer group"
                      onClick={() => setSelectedService(service.title)}>
                  <CardHeader>
                    <div className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <service.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">{service.description}</CardDescription>
                    <div className="space-y-2">
                      {service.actions.map((action, actionIndex) => (
                        <Button 
                          key={actionIndex} 
                          variant="outline" 
                          size="sm" 
                          className="w-full text-left justify-start hover:bg-blue-50 hover:text-blue-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleServiceAction(service.title, action);
                          }}
                        >
                          {action}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Accès rapide */}
            <Card>
              <CardHeader>
                <CardTitle>Accès rapide</CardTitle>
                <CardDescription>Actions fréquemment utilisées</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button 
                    className="h-auto p-4 flex flex-col items-center space-y-2"
                    onClick={() => onNavigate('appointments')}
                  >
                    <Calendar className="h-6 w-6" />
                    <span>Nouveau RDV</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="h-auto p-4 flex flex-col items-center space-y-2"
                    onClick={() => onNavigate('login')}
                  >
                    <FileText className="h-6 w-6" />
                    <span>Mes résultats</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="h-auto p-4 flex flex-col items-center space-y-2"
                    onClick={() => onNavigate('login')}
                  >
                    <CreditCard className="h-6 w-6" />
                    <span>Payer en ligne</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="h-auto p-4 flex flex-col items-center space-y-2"
                    onClick={() => onNavigate('appointments')}
                  >
                    <Video className="h-6 w-6" />
                    <span>Téléconsultation</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Connexion espace patient */}
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800">Connectez-vous à votre espace patient</CardTitle>
                <CardDescription className="text-blue-600">
                  Accédez à votre dossier médical complet et gérez tous vos rendez-vous
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => onNavigate('login')}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Se connecter
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-blue-600 text-blue-600 hover:bg-blue-50"
                    onClick={() => onNavigate('login')}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Créer un compte
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Guide patient */}
          <TabsContent value="guide" className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl text-gray-900">Guide du patient</h2>
              <p className="mt-2 text-gray-600">Informations pratiques pour votre séjour</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {hospitalGuide.map((section, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-xl">{section.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2"></div>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Informations pratiques */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Horaires et contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Horaires d'ouverture</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex justify-between">
                        <span>Lundi - Vendredi</span>
                        <span>8h00 - 18h00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Samedi</span>
                        <span>8h00 - 12h00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Urgences</span>
                        <span className="text-red-600">24h/24 - 7j/7</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Contact</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>Standard : 01 23 45 67 89</div>
                      <div>Email : contact@chu-management.fr</div>
                      <div>Adresse : 123 Avenue de la Santé, 75015 Paris</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Moyens de paiement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Modes acceptés</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">Carte bancaire</Badge>
                        <Badge variant="secondary">Espèces</Badge>
                        <Badge variant="secondary">Chèque</Badge>
                        <Badge variant="secondary">Tiers payant</Badge>
                        <Badge variant="secondary">Paiement en ligne</Badge>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Remboursements</h4>
                      <p className="text-sm text-gray-600">
                        Conventionné Secteur 1 - Remboursement Sécurité Sociale selon tarifs en vigueur
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Vos droits */}
          <TabsContent value="rights" className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl text-gray-900">Vos droits de patient</h2>
              <p className="mt-2 text-gray-600">Connaître et exercer vos droits</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {patientRights.map((right, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <right.icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <CardTitle className="text-lg">{right.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{right.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Médiateur de santé</CardTitle>
                <CardDescription>
                  En cas de litige ou de réclamation concernant vos soins
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Comment nous contacter ?</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div>📧 mediateur@chu-management.fr</div>
                    <div>📞 01 23 45 67 99</div>
                    <div>📍 Bureau du médiateur - Bâtiment administratif</div>
                    <div>🕐 Permanences : Mardi et Jeudi 14h-17h</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>RGPD et protection des données</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez de droits concernant vos données personnelles.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleRGPDAction("Consulter la politique RGPD")}
                  >
                    Consulter la politique RGPD
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleRGPDAction("Exercer mes droits")}
                  >
                    Exercer mes droits
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleRGPDAction("Contact DPO")}
                  >
                    Contact DPO
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Urgences */}
          <TabsContent value="emergency" className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl text-gray-900 text-red-800">Numéros d'urgence</h2>
              <p className="mt-2 text-red-600">En cas d'urgence, contactez immédiatement ces numéros</p>
            </div>

            {/* Numéros d'urgence */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {emergencyContacts.map((contact, index) => (
                <Card key={index} className="border-red-200 hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <CardTitle className="text-red-800">{contact.service}</CardTitle>
                    <div className="text-3xl font-bold text-red-600">{contact.number}</div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 text-center">{contact.description}</p>
                    <Button 
                      className="w-full mt-3 bg-red-600 hover:bg-red-700"
                      onClick={() => window.open(`tel:${contact.number}`)}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Appeler
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Service d'urgences du CHU */}
            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="text-orange-800 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Service d'urgences CHU Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-orange-800 mb-3">Informations pratiques</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-orange-600" />
                        <span>01 23 45 67 89 (standard)</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-orange-600" />
                        <span>Ouvert 24h/24 - 7j/7</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 mr-2 flex items-center justify-center">🚗</div>
                        <span>Parking urgences gratuit</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-orange-800 mb-3">Temps d'attente moyen</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Urgences vitales</span>
                        <Badge className="bg-red-600">Immédiat</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Urgences importantes</span>
                        <Badge className="bg-orange-600">15 min</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Urgences moins graves</span>
                        <Badge className="bg-yellow-600">45 min</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Que faire en cas d'urgence */}
            <Card>
              <CardHeader>
                <CardTitle>Que faire en cas d'urgence ?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3 text-red-800">Urgences vitales (appeler le 15)</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Arrêt cardiaque</li>
                      <li>• Détresse respiratoire</li>
                      <li>• Coma ou perte de connaissance</li>
                      <li>• Hémorragie importante</li>
                      <li>• Douleur thoracique intense</li>
                      <li>• AVC (troubles neurologiques)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3 text-orange-800">Urgences importantes</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Fractures</li>
                      <li>• Brûlures étendues</li>
                      <li>• Intoxication</li>
                      <li>• Fièvre élevée (&gt;39°C)</li>
                      <li>• Vomissements persistants</li>
                      <li>• Douleurs abdominales aigües</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}