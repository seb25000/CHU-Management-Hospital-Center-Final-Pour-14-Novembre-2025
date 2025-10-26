import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Code, Database, Smartphone, Cloud, Shield, Zap } from "lucide-react";

const services = [
  {
    icon: Code,
    title: "Développement Frontend",
    description: "Interfaces utilisateur modernes et responsive avec React, Vue.js et les dernières technologies.",
  },
  {
    icon: Database,
    title: "Architecture Backend",
    description: "APIs robustes et scalables avec Node.js, Python ou Java. Intégration PostgreSQL optimisée.",
  },
  {
    icon: Smartphone,
    title: "Applications Mobiles",
    description: "Apps natives et hybrides pour iOS et Android avec React Native ou Flutter.",
  },
  {
    icon: Cloud,
    title: "Solutions Cloud",
    description: "Déploiement et hébergement sur AWS, Azure ou Google Cloud avec architecture microservices.",
  },
  {
    icon: Shield,
    title: "Sécurité",
    description: "Authentification, autorisation et protection des données selon les standards RGPD.",
  },
  {
    icon: Zap,
    title: "Optimisation Performance",
    description: "Analyse et amélioration des performances pour une expérience utilisateur exceptionnelle.",
  },
];

export function ServicesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-blue-600 tracking-wide uppercase">Services</h2>
          <p className="mt-2 text-3xl leading-8 tracking-tight text-gray-900 sm:text-4xl">
            Tout ce dont vous avez besoin pour réussir
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Une gamme complète de services pour transformer vos idées en solutions digitales performantes.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
                    <service.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="mt-4">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}