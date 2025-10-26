import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Calendar, Clock, User, Phone, Mail, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { projectId, publicAnonKey } from "../utils/supabase/info";

const doctors = [
  { id: 'dr_dubois', name: 'Dr. Marie Dubois', specialty: 'Cardiologie' },
  { id: 'dr_martin', name: 'Dr. Pierre Martin', specialty: 'Neurologie' },
  { id: 'dr_lefebvre', name: 'Dr. Sophie Lefebvre', specialty: 'Pédiatrie' },
  { id: 'dr_moreau', name: 'Dr. Paul Moreau', specialty: 'Orthopédie' }
];

const services = [
  'Consultation générale',
  'Consultation spécialisée',
  'Contrôle médical',
  'Suivi médical',
  'Urgence programmée',
  'Bilan de santé',
  'Vaccination',
  'Téléconsultation'
];

const timeSlots = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '13:30', '14:00', '14:30', '15:00',
  '15:30', '16:00', '16:30', '17:00', '17:30'
];

interface AppointmentsPageProps {
  onNavigate: (page: string) => void;
}

export function AppointmentsPage({ onNavigate }: AppointmentsPageProps) {
  const [formData, setFormData] = useState({
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    doctorId: '',
    serviceType: '',
    preferredDate: '',
    preferredTime: '',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [appointmentId, setAppointmentId] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-d31784ab/api/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setAppointmentId(result.appointmentId);
        console.log('Rendez-vous créé avec succès:', result);
        
        // Reset form
        setFormData({
          patientName: '',
          patientEmail: '',
          patientPhone: '',
          doctorId: '',
          serviceType: '',
          preferredDate: '',
          preferredTime: '',
          notes: ''
        });
      } else {
        setSubmitStatus('error');
        console.error('Erreur lors de la création du rendez-vous:', result.error);
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Erreur réseau:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculer la date minimale (aujourd'hui)
  const today = new Date();
  const minDate = today.toISOString().split('T')[0];

  // Calculer la date maximale (3 mois à partir d'aujourd'hui)
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  const maxDateString = maxDate.toISOString().split('T')[0];

  if (submitStatus === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <Card className="max-w-2xl w-full">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-800">Rendez-vous confirmé !</CardTitle>
            <CardDescription className="text-lg">
              Votre demande de rendez-vous a été enregistrée avec succès.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Numéro de confirmation</p>
              <p className="text-lg font-mono text-gray-900">{appointmentId}</p>
            </div>
            
            <div className="text-left space-y-2 bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800">Prochaines étapes :</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Vous recevrez un email de confirmation sous 24h</li>
                <li>• Notre équipe vous contactera pour confirmer le créneau</li>
                <li>• Un rappel vous sera envoyé 24h avant le rendez-vous</li>
                <li>• Préparez vos documents médicaux et carte vitale</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                onClick={() => onNavigate('home')}
                className="flex-1"
              >
                Retour à l'accueil
              </Button>
              <Button 
                variant="outline"
                onClick={() => {
                  setSubmitStatus('idle');
                  setAppointmentId('');
                }}
                className="flex-1"
              >
                Nouveau rendez-vous
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl text-gray-900">Prendre rendez-vous</h1>
            <p className="mt-4 text-xl text-gray-600">
              Réservez facilement votre consultation avec nos médecins spécialisés
            </p>
          </div>
        </div>
      </div>

      {/* Formulaire de rendez-vous */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Informations pratiques */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Informations pratiques</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Horaires</h4>
                    <p className="text-sm text-gray-600">Lun-Ven : 8h-18h<br />Sam : 8h-12h</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Disponibilités</h4>
                    <p className="text-sm text-gray-600">Créneaux disponibles jusqu'à 3 mois à l'avance</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Contact</h4>
                    <p className="text-sm text-gray-600">01 23 45 67 89<br />Pour toute urgence : 15</p>
                  </div>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Documents à apporter</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Carte vitale</li>
                    <li>• Pièce d'identité</li>
                    <li>• Ordonnances en cours</li>
                    <li>• Résultats d'examens récents</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Formulaire */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Formulaire de rendez-vous</CardTitle>
                <CardDescription>
                  Remplissez ce formulaire pour demander un rendez-vous. Notre équipe vous contactera pour confirmer.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Informations patient */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 flex items-center">
                      <User className="h-5 w-5 mr-2" />
                      Informations patient
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="patientName">Nom et prénom *</Label>
                        <Input
                          id="patientName"
                          required
                          value={formData.patientName}
                          onChange={(e) => handleInputChange('patientName', e.target.value)}
                          placeholder="Votre nom complet"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="patientPhone">Téléphone *</Label>
                        <Input
                          id="patientPhone"
                          type="tel"
                          required
                          value={formData.patientPhone}
                          onChange={(e) => handleInputChange('patientPhone', e.target.value)}
                          placeholder="06 12 34 56 78"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="patientEmail">Email *</Label>
                      <Input
                        id="patientEmail"
                        type="email"
                        required
                        value={formData.patientEmail}
                        onChange={(e) => handleInputChange('patientEmail', e.target.value)}
                        placeholder="votre.email@exemple.com"
                      />
                    </div>
                  </div>

                  {/* Détails du rendez-vous */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 flex items-center">
                      <Calendar className="h-5 w-5 mr-2" />
                      Détails du rendez-vous
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="doctorId">Médecin souhaité</Label>
                        <Select value={formData.doctorId} onValueChange={(value) => handleInputChange('doctorId', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choisir un médecin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">Pas de préférence</SelectItem>
                            {doctors.map((doctor) => (
                              <SelectItem key={doctor.id} value={doctor.id}>
                                {doctor.name} - {doctor.specialty}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="serviceType">Type de consultation *</Label>
                        <Select value={formData.serviceType} onValueChange={(value) => handleInputChange('serviceType', value)} required>
                          <SelectTrigger>
                            <SelectValue placeholder="Choisir le type" />
                          </SelectTrigger>
                          <SelectContent>
                            {services.map((service) => (
                              <SelectItem key={service} value={service}>
                                {service}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="preferredDate">Date souhaitée *</Label>
                        <Input
                          id="preferredDate"
                          type="date"
                          required
                          min={minDate}
                          max={maxDateString}
                          value={formData.preferredDate}
                          onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="preferredTime">Heure souhaitée</Label>
                        <Select value={formData.preferredTime} onValueChange={(value) => handleInputChange('preferredTime', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choisir l'heure" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="no-preference">Pas de préférence</SelectItem>
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Notes complémentaires */}
                  <div>
                    <Label htmlFor="notes">
                      <FileText className="h-4 w-4 inline mr-2" />
                      Informations complémentaires
                    </Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      placeholder="Motif de consultation, symptômes, informations importantes..."
                      rows={4}
                    />
                  </div>

                  {/* Message d'erreur */}
                  {submitStatus === 'error' && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
                      <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-red-800">Erreur lors de l'envoi</h4>
                        <p className="text-sm text-red-700">
                          Une erreur est survenue. Veuillez vérifier vos informations et réessayer.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Boutons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          <Calendar className="h-4 w-4 mr-2" />
                          Demander le rendez-vous
                        </>
                      )}
                    </Button>
                    
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => onNavigate('contact')}
                      className="flex-1"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Appeler directement
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}