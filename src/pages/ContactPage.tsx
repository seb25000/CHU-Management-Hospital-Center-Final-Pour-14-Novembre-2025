import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, AlertCircle, CheckCircle } from "lucide-react";
import { EmergencyModal } from "../components/hospital/EmergencyModal";

const contactInfo = [
  {
    icon: MapPin,
    title: "Adresse",
    details: [
      "CHU Management Center",
      "123 Avenue de la Santé",
      "75015 Paris, France"
    ],
    color: "text-blue-600",
    bgColor: "bg-blue-100"
  },
  {
    icon: Phone,
    title: "Téléphone",
    details: [
      "Standard: 01 23 45 67 89",
      "Urgences: 15 ou 112",
      "Rendez-vous: 01 23 45 67 90"
    ],
    color: "text-green-600",
    bgColor: "bg-green-100"
  },
  {
    icon: Mail,
    title: "Email",
    details: [
      "contact@chu-management.fr",
      "urgences@chu-management.fr",
      "rdv@chu-management.fr"
    ],
    color: "text-purple-600",
    bgColor: "bg-purple-100"
  },
  {
    icon: Clock,
    title: "Horaires",
    details: [
      "Urgences: 24h/24 - 7j/7",
      "Standard: 8h-20h (7j/7)",
      "Consultations: 8h-18h (Lun-Ven)"
    ],
    color: "text-orange-600",
    bgColor: "bg-orange-100"
  }
];

const departments = [
  { name: "Urgences", phone: "15", extension: "Service vital" },
  { name: "Cardiologie", phone: "01 23 45 67 91", extension: "Poste 101" },
  { name: "Neurologie", phone: "01 23 45 67 92", extension: "Poste 102" },
  { name: "Pédiatrie", phone: "01 23 45 67 93", extension: "Poste 103" },
  { name: "Orthopédie", phone: "01 23 45 67 94", extension: "Poste 104" },
  { name: "Admission", phone: "01 23 45 67 95", extension: "Poste 105" }
];

interface ContactPageProps {
  onNavigate: (page: string) => void;
}

export function ContactPage({ onNavigate }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    department: '',
    message: '',
    urgent: false
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    
    // Simulation d'envoi
    setTimeout(() => {
      setFormStatus('success');
      setTimeout(() => {
        setFormStatus('idle');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          department: '',
          message: '',
          urgent: false
        });
      }, 3000);
    }, 2000);
  };

  return (
    <>
      <EmergencyModal 
        isOpen={showEmergencyModal}
        onClose={() => setShowEmergencyModal(false)}
      />
      <div className="min-h-screen bg-gray-50">
      {/* Header de la page */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl text-gray-900">Nous Contacter</h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Notre équipe est à votre disposition pour répondre à toutes vos questions et vous accompagner dans vos démarches.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Formulaire de contact */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="h-6 w-6 mr-2 text-blue-600" />
                  Envoyer un message
                </CardTitle>
                <CardDescription>
                  Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Nom complet *</label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Votre nom et prénom"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Email *</label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="votre.email@exemple.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Téléphone</label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="01 23 45 67 89"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Service concerné</label>
                      <select
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Sélectionner un service</option>
                        <option value="general">Renseignements généraux</option>
                        <option value="cardiology">Cardiologie</option>
                        <option value="neurology">Neurologie</option>
                        <option value="pediatrics">Pédiatrie</option>
                        <option value="orthopedics">Orthopédie</option>
                        <option value="appointments">Rendez-vous</option>
                        <option value="billing">Facturation</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Sujet *</label>
                    <Input
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Objet de votre demande"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Message *</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Décrivez votre demande en détail..."
                      rows={5}
                      required
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="urgent"
                      checked={formData.urgent}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <label className="text-sm text-gray-700">
                      <AlertCircle className="h-4 w-4 inline mr-1 text-red-600" />
                      Demande urgente (réponse sous 2h)
                    </label>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      type="submit" 
                      className="bg-blue-600 hover:bg-blue-700"
                      disabled={formStatus === 'sending'}
                    >
                      {formStatus === 'sending' ? (
                        <>Envoi en cours...</>
                      ) : formStatus === 'success' ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Message envoyé !
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Envoyer le message
                        </>
                      )}
                    </Button>
                    
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => onNavigate('appointments')}
                    >
                      Prendre rendez-vous
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Informations de contact */}
          <div className="space-y-6">
            {/* Coordonnées */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-start">
                      <div className={`w-10 h-10 ${info.bgColor} rounded-lg flex items-center justify-center mr-3`}>
                        <info.icon className={`h-5 w-5 ${info.color}`} />
                      </div>
                      <div>
                        <h3 className="text-sm text-gray-600 uppercase tracking-wide">{info.title}</h3>
                        <div className="mt-1 space-y-1">
                          {info.details.map((detail, detailIndex) => (
                            <p key={detailIndex} className="text-gray-900 text-sm">{detail}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Numéros directs des services */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contacts directs</CardTitle>
                <CardDescription>Numéros directs par service</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {departments.map((dept, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <div className="text-sm text-gray-900">{dept.name}</div>
                      <div className="text-xs text-gray-500">{dept.extension}</div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-xs"
                      onClick={() => window.open(`tel:${dept.phone.replace(/\s/g, '')}`, '_self')}
                    >
                      <Phone className="h-3 w-3 mr-1" />
                      {dept.phone}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Urgences */}
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-red-800 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Urgences Médicales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-red-700 text-sm mb-4">
                  En cas d'urgence vitale, n'utilisez pas ce formulaire.
                </p>
                <div className="space-y-2">
                  <Button 
                    className="w-full bg-red-600 hover:bg-red-700"
                    onClick={() => window.open('tel:15', '_self')}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Appeler le 15 (SAMU)
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-red-600 text-red-600 hover:bg-red-50"
                    onClick={() => setShowEmergencyModal(true)}
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Se rendre aux urgences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}