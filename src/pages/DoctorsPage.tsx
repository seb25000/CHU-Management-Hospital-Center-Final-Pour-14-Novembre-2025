import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Calendar, Phone, Search, Filter, Star, Clock, MapPin, GraduationCap } from "lucide-react";

const doctorsData = [
  {
    id: 'dr_dubois',
    name: 'Dr. Marie Dubois',
    specialty: 'Cardiologie',
    subSpecialty: 'Chirurgie cardiaque interventionnelle',
    experience: '15 ans d\'expérience',
    qualifications: ['Chef de service', 'Chirurgie cardiaque', 'Interventionnelle', 'Recherche clinique'],
    education: ['Université Paris-Sud', 'Fellowship Harvard Medical School', 'Board Certification Cardiologie'],
    languages: ['Français', 'Anglais', 'Espagnol'],
    rating: 4.9,
    reviews: 127,
    consultationFee: '80€',
    availableTimes: ['09:00', '10:30', '14:00', '15:30', '17:00'],
    nextAvailable: '2024-01-15',
    location: 'Bâtiment A - 2ème étage',
    phone: '01 23 45 67 10',
    image: 'https://images.unsplash.com/photo-1659353887019-b142198f2668?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBjYXJkaW9sb2dpc3QlMjBkb2N0b3J8ZW58MXx8fHwxNzYwOTU1ODM1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    bio: 'Spécialiste en cardiologie interventionnelle avec plus de 15 ans d\'expérience. Expert en angioplastie et chirurgie cardiaque mini-invasive.',
    specialization: ['Angioplastie coronaire', 'Pose de stents', 'Valvuloplastie', 'Cardiologie interventionnelle']
  },
  {
    id: 'dr_martin',
    name: 'Dr. Pierre Martin',
    specialty: 'Neurologie',
    subSpecialty: 'Maladies neuro-dégénératives',
    experience: '12 ans d\'expérience',
    qualifications: ['Spécialiste Alzheimer', 'Neurochirurgie', 'Recherche clinique', 'Neuro-oncologie'],
    education: ['Université Sorbonne', 'Spécialisation Johns Hopkins', 'DU Neurologie comportementale'],
    languages: ['Français', 'Anglais', 'Allemand'],
    rating: 4.8,
    reviews: 93,
    consultationFee: '90€',
    availableTimes: ['08:30', '10:00', '11:30', '14:30', '16:00'],
    nextAvailable: '2024-01-16',
    location: 'Bâtiment B - 3ème étage',
    phone: '01 23 45 67 11',
    image: 'https://images.unsplash.com/photo-1659353888352-5dbb14b80eca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwbmV1cm9sb2dpc3QlMjBkb2N0b3J8ZW58MXx8fHwxNzYwOTU1ODM2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    bio: 'Neurologue spécialisé dans les maladies neuro-dégénératives. Reconnu pour son expertise dans le traitement de la maladie d\'Alzheimer et de Parkinson.',
    specialization: ['Maladie d\'Alzheimer', 'Maladie de Parkinson', 'Sclérose en plaques', 'Épilepsie']
  },
  {
    id: 'dr_lefebvre',
    name: 'Dr. Sophie Lefebvre',
    specialty: 'Pédiatrie',
    subSpecialty: 'Néonatologie et urgences pédiatriques',
    experience: '10 ans d\'expérience',
    qualifications: ['Néonatologie', 'Urgences pédiatriques', 'Vaccination', 'Pédiatrie développementale'],
    education: ['Université Lyon 1', 'Formation Boston Children\'s Hospital', 'DIU Néonatologie'],
    languages: ['Français', 'Anglais', 'Italien'],
    rating: 4.9,
    reviews: 156,
    consultationFee: '65€',
    availableTimes: ['09:00', '10:30', '13:30', '15:00', '16:30'],
    nextAvailable: '2024-01-14',
    location: 'Bâtiment C - 1er étage',
    phone: '01 23 45 67 12',
    image: 'https://images.unsplash.com/photo-1576089235406-0612d7bb033e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBwZWRpYXRyaWNpYW4lMjBkb2N0b3J8ZW58MXx8fHwxNzYwOTU1ODM2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    bio: 'Pédiatre experte en néonatologie et urgences pédiatriques. Spécialisée dans le suivi des nouveau-nés et le développement infantile.',
    specialization: ['Néonatologie', 'Urgences pédiatriques', 'Développement infantile', 'Vaccination']
  },
  {
    id: 'dr_moreau',
    name: 'Dr. Paul Moreau',
    specialty: 'Orthopédie',
    subSpecialty: 'Chirurgie traumatologique',
    experience: '18 ans d\'expérience',
    qualifications: ['Chirurgie traumatologique', 'Prothèses articulaires', 'Chirurgie du sport', 'Arthroscopie'],
    education: ['Université Bordeaux', 'Fellowship Mayo Clinic', 'Spécialisation chirurgie du sport'],
    languages: ['Français', 'Anglais'],
    rating: 4.7,
    reviews: 89,
    consultationFee: '85€',
    availableTimes: ['08:00', '09:30', '11:00', '14:00', '15:30'],
    nextAvailable: '2024-01-17',
    location: 'Bâtiment A - 4ème étage',
    phone: '01 23 45 67 13',
    image: 'https://images.unsplash.com/photo-1703809047411-30b80e5e8592?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwb3J0aG9wZWRpYyUyMHN1cmdlb258ZW58MXx8fHwxNzYwOTU1ODM2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    bio: 'Chirurgien orthopédiste spécialisé en traumatologie et chirurgie du sport. Expert en prothèses articulaires et arthroscopie.',
    specialization: ['Chirurgie traumatologique', 'Prothèses hanche/genou', 'Arthroscopie', 'Médecine du sport']
  }
];

const specialties = ['Toutes spécialités', 'Cardiologie', 'Neurologie', 'Pédiatrie', 'Orthopédie'];

interface DoctorsPageProps {
  onNavigate: (page: string) => void;
}

export function DoctorsPage({ onNavigate }: DoctorsPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('Toutes spécialités');
  const [selectedDoctor, setSelectedDoctor] = useState<typeof doctorsData[0] | null>(null);

  const filteredDoctors = doctorsData.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'Toutes spécialités' || 
                            doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl text-gray-900">Nos Médecins</h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Rencontrez notre équipe de médecins experts, reconnus pour leur excellence et leur dévouement aux soins de qualité.
            </p>
          </div>

          {/* Filtres de recherche */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher un médecin ou une spécialité..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                <SelectTrigger className="w-full sm:w-48 pl-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {specialties.map((specialty) => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Liste des médecins */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id} className="hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedDoctor(doctor)}>
              <CardHeader>
                <div className="flex items-start space-x-4">
                  <ImageWithFallback
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <CardTitle className="text-lg">{doctor.name}</CardTitle>
                    <CardDescription className="text-blue-600">{doctor.specialty}</CardDescription>
                    <p className="text-sm text-gray-500">{doctor.subSpecialty}</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-sm">{doctor.rating}</span>
                      <span className="text-sm text-gray-500 ml-1">({doctor.reviews} avis)</span>
                    </div>
                    <Badge variant="secondary">{doctor.experience}</Badge>
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{doctor.location}</span>
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>Prochaine disponibilité: {doctor.nextAvailable}</span>
                  </div>

                  <div className="text-lg font-semibold text-green-600">
                    Consultation: {doctor.consultationFee}
                  </div>

                  <div className="space-y-2">
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate('appointments');
                      }}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Prendre RDV
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(`tel:${doctor.phone}`);
                      }}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      {doctor.phone}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Aucun médecin trouvé avec ces critères.</p>
          </div>
        )}
      </div>

      {/* Modal détaillé du médecin */}
      {selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
             onClick={() => setSelectedDoctor(null)}>
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
               onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-start space-x-6">
                  <ImageWithFallback
                    src={selectedDoctor.image}
                    alt={selectedDoctor.name}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="text-2xl text-gray-900">{selectedDoctor.name}</h2>
                    <p className="text-xl text-blue-600">{selectedDoctor.specialty}</p>
                    <p className="text-gray-600">{selectedDoctor.subSpecialty}</p>
                    <div className="flex items-center mt-2">
                      <Star className="h-5 w-5 text-yellow-400 mr-1" />
                      <span>{selectedDoctor.rating}</span>
                      <span className="text-gray-500 ml-1">({selectedDoctor.reviews} avis)</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" onClick={() => setSelectedDoctor(null)}>
                  ✕
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg text-gray-900 mb-4">Informations pratiques</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{selectedDoctor.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{selectedDoctor.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-500" />
                      <span>Consultation: {selectedDoctor.consultationFee}</span>
                    </div>
                  </div>

                  <h4 className="text-lg text-gray-900 mt-6 mb-3">Spécialisations</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedDoctor.specialization.map((spec, index) => (
                      <Badge key={index} variant="secondary">{spec}</Badge>
                    ))}
                  </div>

                  <h4 className="text-lg text-gray-900 mt-6 mb-3">Langues parlées</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedDoctor.languages.map((lang, index) => (
                      <Badge key={index} variant="outline">{lang}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg text-gray-900 mb-4">Formation et qualifications</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="flex items-center text-gray-700 mb-2">
                        <GraduationCap className="h-4 w-4 mr-2" />
                        Formation
                      </h4>
                      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                        {selectedDoctor.education.map((edu, index) => (
                          <li key={index}>{edu}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-gray-700 mb-2">Qualifications</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedDoctor.qualifications.map((qual, index) => (
                          <Badge key={index} variant="secondary">{qual}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg text-gray-900 mt-6 mb-3">À propos</h3>
                  <p className="text-gray-600">{selectedDoctor.bio}</p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  onClick={() => {
                    setSelectedDoctor(null);
                    onNavigate('appointments');
                  }}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Prendre rendez-vous
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => window.open(`tel:${selectedDoctor.phone}`)}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Appeler directement
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}