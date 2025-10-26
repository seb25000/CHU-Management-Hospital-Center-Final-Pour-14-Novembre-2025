import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const navigation = {
  services: [
    { name: 'Urgences', page: 'services' },
    { name: 'Consultations', page: 'services' },
    { name: 'Hospitalisations', page: 'services' },
    { name: 'Chirurgie', page: 'services' },
  ],
  specialties: [
    { name: 'Cardiologie', page: 'services' },
    { name: 'Neurologie', page: 'services' },
    { name: 'Pédiatrie', page: 'services' },
    { name: 'Orthopédie', page: 'services' },
  ],
  patient: [
    { name: 'Prendre RDV', page: 'appointments' },
    { name: 'Résultats examens', page: 'patients' },
    { name: 'Paiement en ligne', page: 'patients' },
    { name: 'Téléconsultation', page: 'patients' },
  ],
  about: [
    { name: 'Présentation', page: 'home' },
    { name: 'Équipe médicale', page: 'doctors' },
    { name: 'Actualités', page: 'home' },
    { name: 'Recrutement', page: 'contact' },
  ],
};

const social = [
  {
    name: 'Facebook',
    href: '#',
    icon: Facebook,
  },
  {
    name: 'Twitter',
    href: '#',
    icon: Twitter,
  },
  {
    name: 'LinkedIn',
    href: '#',
    icon: Linkedin,
  },
  {
    name: 'Instagram',
    href: '#',
    icon: Instagram,
  },
];

interface HospitalFooterProps {
  onNavigate: (page: string) => void;
}

export function HospitalFooter({ onNavigate }: HospitalFooterProps) {
  return (
    <footer className="bg-gray-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Informations principales */}
          <div className="space-y-8 xl:col-span-1">
            <div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white text-xl">+</span>
                </div>
                <div>
                  <h3 className="text-xl text-white tracking-tight">CHU Management</h3>
                  <p className="text-gray-400 text-sm">Centre Hospitalier Universitaire</p>
                </div>
              </div>
              <p className="text-gray-400 mt-4 max-w-xs">
                Excellence médicale et innovation au service de votre santé. Soins de qualité avec une approche humaine et personnalisée.
              </p>
            </div>

            {/* Informations de contact */}
            <div className="space-y-4">
              <div className="flex items-center text-gray-400">
                <MapPin className="h-5 w-5 mr-3" />
                <span className="text-sm">123 Avenue de la Santé, 75015 Paris</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Phone className="h-5 w-5 mr-3" />
                <span className="text-sm">01 23 45 67 89</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Mail className="h-5 w-5 mr-3" />
                <span className="text-sm">contact@chu-management.fr</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Clock className="h-5 w-5 mr-3" />
                <span className="text-sm">Urgences 24h/24 - Consultations 8h-18h</span>
              </div>
            </div>

            {/* Réseaux sociaux */}
            <div className="flex space-x-6">
              {social.map((item) => (
                <a key={item.name} href={item.href} className="text-gray-400 hover:text-gray-300">
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm text-white tracking-wider uppercase">Services</h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.services.map((item) => (
                    <li key={item.name}>
                      <button 
                        onClick={() => onNavigate(item.page)}
                        className="text-base text-gray-400 hover:text-gray-300 text-left"
                      >
                        {item.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm text-white tracking-wider uppercase">Spécialités</h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.specialties.map((item) => (
                    <li key={item.name}>
                      <button 
                        onClick={() => onNavigate(item.page)}
                        className="text-base text-gray-400 hover:text-gray-300 text-left"
                      >
                        {item.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm text-white tracking-wider uppercase">Espace Patient</h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.patient.map((item) => (
                    <li key={item.name}>
                      <button 
                        onClick={() => onNavigate(item.page)}
                        className="text-base text-gray-400 hover:text-gray-300 text-left"
                      >
                        {item.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm text-white tracking-wider uppercase">À propos</h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.about.map((item) => (
                    <li key={item.name}>
                      <button 
                        onClick={() => onNavigate(item.page)}
                        className="text-base text-gray-400 hover:text-gray-300 text-left"
                      >
                        {item.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Certifications et mentions légales */}
        <div className="mt-12 border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4 md:mb-0">
              <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">
                HAS Certifié
              </span>
              <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">
                ISO 9001
              </span>
              <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">
                RGPD Conforme
              </span>
            </div>
            <div className="flex flex-wrap gap-4 text-xs text-gray-400">
              <a href="#" className="hover:text-gray-300">Mentions légales</a>
              <a href="#" className="hover:text-gray-300">Politique de confidentialité</a>
              <a href="#" className="hover:text-gray-300">CGU</a>
              <a href="#" className="hover:text-gray-300">Accessibilité</a>
            </div>
          </div>
          <p className="text-base text-gray-400 text-center mt-4">
            &copy; 2025, Sébastien.D, CHU Management Center. Tous droits réservés. 
            <span className="block sm:inline"> Établissement de santé privé d'intérêt collectif.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}