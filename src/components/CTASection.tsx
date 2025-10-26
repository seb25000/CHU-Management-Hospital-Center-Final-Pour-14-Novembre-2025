import { Button } from "./ui/button";
import { ArrowRight, Mail } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function CTASection() {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div>
            <h2 className="text-3xl leading-8 tracking-tight text-white sm:text-4xl">
              Prêt à transformer votre vision en réalité ?
            </h2>
            <p className="mt-4 text-lg text-blue-100">
              Discutons de votre projet et découvrons ensemble comment notre expertise peut propulser votre business vers de nouveaux sommets.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Mail className="mr-2 h-4 w-4" />
                Contacter notre équipe
              </Button>
              
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                Voir nos projets
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="mt-10 lg:mt-0">
            <ImageWithFallback
              className="rounded-lg shadow-xl object-cover w-full h-64 lg:h-80"
              src="https://images.unsplash.com/photo-1745847768382-816bfc32e1bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwaW5ub3ZhdGlvbiUyMGxhcHRvcHxlbnwxfHx8fDE3NTg1MzM4MjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Innovation technologique"
            />
          </div>
        </div>
      </div>
    </section>
  );
}