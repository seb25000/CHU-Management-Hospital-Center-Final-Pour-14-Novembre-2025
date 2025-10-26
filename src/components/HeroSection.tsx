import { Button } from "./ui/button";
import { ArrowRight, Play } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function HeroSection() {
  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="tracking-tight text-gray-900">
                <span className="block xl:inline">Transformez vos idées en</span>{' '}
                <span className="block text-blue-600 xl:inline">réalité digitale</span>
              </h1>
              
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:max-w-xl sm:mx-auto md:mt-5 lg:mx-0">
                De la conception à la réalisation, nous créons des solutions web innovantes qui propulsent votre business vers le succès. Une architecture full-stack moderne pour des résultats exceptionnels.
              </p>
              
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Button size="lg" className="w-full flex items-center justify-center px-8 py-3">
                    Commencer maintenant
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Button variant="outline" size="lg" className="w-full flex items-center justify-center px-8 py-3">
                    <Play className="mr-2 h-4 w-4" />
                    Voir la démo
                  </Button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <ImageWithFallback
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBidXNpbmVzcyUyMG9mZmljZSUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NTg1Njc5NjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Espace de travail moderne"
        />
      </div>
    </div>
  );
}