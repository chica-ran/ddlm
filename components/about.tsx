"use client"

import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Target, Eye, Heart } from "lucide-react"

export default function About() {
  const features = [
    {
      icon: <CheckCircle className="w-6 h-6 text-blue-600" />,
      title: "Qualité Garantie",
      description: "Matériaux premium et contrôle qualité rigoureux",
    },
    {
      icon: <Target className="w-6 h-6 text-blue-600" />,
      title: "Précision",
      description: "Technologies CAD/CAM pour une précision millimétrique",
    },
    {
      icon: <Eye className="w-6 h-6 text-blue-600" />,
      title: "Esthétique",
      description: "Résultats naturels et esthétiquement parfaits",
    },
    {
      icon: <Heart className="w-6 h-6 text-blue-600" />,
      title: "Satisfaction",
      description: "Engagement total envers la satisfaction client",
    },
  ]

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">À Propos de DDLM</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Leader en prothèse dentaire à Madagascar, nous combinons expertise traditionnelle et innovation
            technologique pour offrir des solutions dentaires exceptionnelles.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-3xl font-bold text-gray-800 mb-6">Notre Expertise au Service de Votre Sourire</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Depuis plus de 15 ans, DDLM s'est imposé comme le laboratoire de référence en prothèse dentaire à
              Madagascar. Notre équipe de prothésistes qualifiés maîtrise les techniques les plus avancées.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Nous investissons continuellement dans les dernières technologies pour garantir des résultats
              d'excellence, alliant précision technique et esthétique naturelle.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  {feature.icon}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <img
              src="https://allain-razakatiana-cidro.mg/assets/photeuillRazakatiana%20-%20Copie-BCQ2z9pU.jpg"
              alt="Laboratoire DDLM"
              className="w-full h-auto rounded-lg shadow-xl"
            />
            <div className="absolute -bottom-6 -left-6 w-48 h-48 rounded-lg overflow-hidden shadow-xl hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Équipement DDLM"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
          <Card className="p-6 text-center">
            <CardContent className="p-0">
              <div className="text-3xl font-bold text-[#D2B48C] mb-2">15+</div>
              <div className="text-gray-600">Années d'expérience</div>
            </CardContent>
          </Card>
          <Card className="p-6 text-center">
            <CardContent className="p-0">
              <div className="text-3xl font-bold text-[#D2B48C] mb-2">50+</div>
              <div className="text-gray-600">Prothèses réalisées</div>
            </CardContent>
          </Card>
          <Card className="p-6 text-center">
            <CardContent className="p-0">
              <div className="text-3xl font-bold text-[#D2B48C] mb-2">50+</div>
              <div className="text-gray-600">Dentistes partenaires</div>
            </CardContent>
          </Card>
          <Card className="p-6 text-center">
            <CardContent className="p-0">
              <div className="text-3xl font-bold text-[#D2B48C] mb-2">98%</div>
              <div className="text-gray-600">Satisfaction client</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
