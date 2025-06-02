"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Crown, Smile, Zap, Shield, Clock, Star } from "lucide-react"

export default function Services() {
  const services = [
    {
      icon: <Crown className="w-12 h-12 text-blue-600" />,
      title: "Couronnes & Bridges",
      description: "Couronnes céramiques, métallo-céramiques et bridges sur implants",
      features: ["Céramique haute qualité", "Ajustement parfait", "Esthétique naturelle"],
      price: "À partir de 150 000 Ar",
      image:
        "https://digitaldentallabmg.com/images/part2/ban1.jpg",
    },
    {
      icon: <Smile className="w-12 h-12 text-blue-600" />,
      title: "Prothèses Complètes",
      description: "Dentiers complets et partiels avec ajustement personnalisé",
      features: ["Confort optimal", "Rétention excellente", "Esthétique soignée"],
      price: "À partir de 200 000 Ar",
      image:
        "https://digitaldentallabmg.com/images/part2/ban2.jpg",
    },
    {
      icon: <Zap className="w-12 h-12 text-blue-600" />,
      title: "Prothèses sur Implants",
      description: "Solutions fixes et amovibles sur implants dentaires",
      features: ["Stabilité maximale", "Durabilité", "Fonction masticatoire"],
      price: "Sur devis",
      image: "https://digitaldentallabmg.com/images/part2/ban3.jpg",
    },
    {
      icon: <Shield className="w-12 h-12 text-blue-600" />,
      title: "Gouttières",
      description: "Gouttières de protection nocturne et orthodontiques",
      features: ["Protection efficace", "Confort nocturne", "Matériaux flexibles"],
      price: "À partir de 80 000 Ar",
      image:
        "https://digitaldentallabmg.com/images/part2/GOUTT-CONTENTION.png",
    },
    {
      icon: <Clock className="w-12 h-12 text-blue-600" />,
      title: "Service Express",
      description: "Réparations et ajustements en urgence sous 24h",
      features: ["Disponibilité 24h", "Réparations rapides", "Service d'urgence"],
      price: "Selon intervention",
      image: "https://allain-razakatiana-cidro.mg/assets/dr_Allain_Razakatiana-DXwKvgfn.jpg",
    },
    {
      icon: <Star className="w-12 h-12 text-blue-600" />,
      title: "Esthétique Dentaire",
      description: "Facettes et solutions esthétiques personnalisées",
      features: ["Design sur mesure", "Couleur naturelle", "Finition parfaite"],
      price: "À partir de 120 000 Ar",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQuWi5TK95-TraRw__R4fTZeCGHLbKeRBf-oVeFy1Qz9lwTBFv_wCXROgkyt_nYVyD8Zo&usqp=CAU",
    },
  ]

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Nos Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Une gamme complète de services de prothèse dentaire adaptés à tous vos besoins, avec la garantie d'un
            savoir-faire d'excellence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="hover:shadow-xl transition-shadow duration-300 border-0 shadow-lg overflow-hidden"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">{service.icon}</div>
                <CardTitle className="text-xl font-bold text-gray-800">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-6">{service.description}</p>

                <div className="mb-6">
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-gray-500 flex items-center justify-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <div className="text-lg font-bold text-blue-600">{service.price}</div>
                </div>

              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Besoin d'un service personnalisé ? Contactez-nous pour un devis sur mesure.
          </p>

        </div>
      </div>
    </section>
  )
}
