import { Button } from "./ui/button";
import { CheckCircle } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const benefits = [
  "Architecture full-stack moderne et scalable",
  "Intégration PostgreSQL optimisée",
  "Interface utilisateur intuitive et responsive",
  "Déploiement automatisé et monitoring",
  "Support technique dédié 24/7",
];

export function AboutSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div>
            <h2 className="text-base text-blue-600 tracking-wide uppercase">À propos</h2>
            <p className="mt-2 text-3xl leading-8 tracking-tight text-gray-900 sm:text-4xl">
              L'excellence technique au service de vos ambitions
            </p>
            <p className="mt-4 text-lg text-gray-500">
              Nous combinons expertise technique et vision stratégique pour créer des solutions digitales qui transforment votre business. De l'idéation au déploiement, nous vous accompagnons à chaque étape.
            </p>

            <div className="mt-8 space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  </div>
                  <p className="ml-3 text-base text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Button size="lg">
                Découvrir notre approche
              </Button>
            </div>
          </div>

          <div className="mt-10 lg:mt-0">
            <ImageWithFallback
              className="rounded-lg shadow-lg object-cover w-full h-64 lg:h-80"
              src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMG1lZXRpbmd8ZW58MXx8fHwxNzU4NTM5Mzg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Équipe en collaboration"
            />
          </div>
        </div>
      </div>
    </section>
  );
}