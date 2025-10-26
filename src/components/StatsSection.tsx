const stats = [
  {
    number: "500+",
    label: "Projets réalisés",
    description: "Solutions développées avec succès"
  },
  {
    number: "98%",
    label: "Satisfaction client",
    description: "Taux de recommandation élevé"
  },
  {
    number: "24/7",
    label: "Support technique",
    description: "Assistance continue disponible"
  },
  {
    number: "10+",
    label: "Années d'expérience",
    description: "Expertise confirmée en développement"
  }
];

export function StatsSection() {
  return (
    <section className="py-16 bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl leading-8 tracking-tight text-white sm:text-4xl">
            Des résultats qui parlent
          </h2>
          <p className="mt-4 text-xl text-blue-100">
            Notre expertise technique au service de votre réussite
          </p>
        </div>

        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl text-white mb-2">{stat.number}</div>
                <div className="text-xl text-blue-100 mb-1">{stat.label}</div>
                <div className="text-sm text-blue-200">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}