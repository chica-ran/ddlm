"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function Products() {
  const products = [
    {
      category: "Nos produits",
      items: [
        {
          name: "Céramique Feldspathique",
          description: "Céramique traditionnelle pour couronnes esthétiques",
          image:
            "https://digitaldentallabmg.com/images/COURONNE_EN_ZIRCONE.jpg",
          features: ["Esthétique excellente", "Biocompatible", "Durable"],
          price: "Sur devis",
        },
        {
          name: "Zircone Translucide",
          description: "Zircone haute translucidité pour esthétique maximale",
          image:
            "https://digitaldentallabmg.com/images/ALIGNEUR_DENTAIRE.jpg",
          features: ["Ultra résistant", "Translucidité naturelle", "Sans métal"],
          price: "Sur devis",
        },
        {
          name: "Bridge en zircone",
          description: "Zircone haute translucidité pour esthétique maximale",
          image:
            "https://digitaldentallabmg.com/images/BRIDGE_EN_ZIRCONE.jpg",
          features: ["Ultra résistant", "Translucidité naturelle", "Sans métal"],
          price: "Sur devis",
        },
        {
          name: "Amovible flexible (TCS Karadent)",
          description: "Zircone haute translucidité pour esthétique maximale",
          image:
            "https://digitaldentallabmg.com/images/part2/Amovible%20flexible%20(TCS%20Karadent).jpg",
          features: ["Ultra résistant", "Translucidité naturelle", "Sans métal"],
          price: "Sur devis",
        }
      ],
    },
    {
      category: "Équipements & Machines",
      items: [
        {
          name: "Scanner Intra-oral Medit 500i",
          description: "Permet une numérisation efficace en bouche et sur modèle en plâtre de la bouche de tous les patients, ses images de haute précision nous permettent de reproduire virtuellement tous les types de travaux dentaires grâce à nos logiciels de modélisation.",
          image:
            "	https://digitaldentallabmg.com/images/scanner_intra_orale.jpg",
          features: ["MEDIT 500i"],
          price: "",
        },
        {
          name: "Fraiseuse CAD/CAM",
          description: "Usinage de précision pour prothèses",
          image:
            "	https://digitaldentallabmg.com/images/xtecera.png",
          features: ["XTCERA Xmill 500", "DEMETDENT JD-GT4"],
          price: "Service inclus",
        },
        {
          name: "Radiographie panoramique CCBT",
          description: "Notre appareil de radiographie panoramique nous permet d'offrir à nos patients les services de radiographie 2D mais aussi, la radiographie en 3D de la mâchoire afin d'offrir aux dentistes la planification complète d'implant dentaire et l'élaboration de nos guide churirgicaux implantaires.",
          image:
            "		https://digitaldentallabmg.com/images/Machine5.jpg",
          features: ["Carestream CS9000 3D Panorex+Cone Beam"],
          price: "Service inclus",
        },
        {
          name: "Nos ordinateurs de modélisation",
          description: "Nos 4 postes d'ordinateur de haute performance nous permettent de travailler sous plusieurs logiciels de modélisation les plus complets du moment. Nous avons une expertise des logiciels Exocad, 3Shape, Maestro et Onyx Ceph. Nous offrons les services de sous traitance à l'international de modélisation de couronnes et bridge dentaire, d'aligneur dentaire et de guide chirurgicale implantaire",
          image:
            "	https://digitaldentallabmg.com/images/nos_ordi.jpg",
          features: ["Exocad", "3Shape", "Maestro et Onyx Ceph"],
          price: "Service inclus",
        }
      ],
    },
    {
      category: "Instruments Spécialisés",
      items: [
        {
          name: "Four de glacage",
          description: "Notre laboratoire possède deux fraiseuses 3D afin d'offrir un service ininterrompu en cas de mise en arrêt d'une de nos machines XTCERA Xmill 500. Fraiseuse 5 axes de haute précision, temps de fabrication d'une couronne en Zircone,8 minutes :DEMETDENT JD- GT4. Fraiseuse 5 axes de haute précision, temps de fabrications d'une couronne en zircone, 15 minutes",
          image:
            "	https://digitaldentallabmg.com/images/machine6.jpeg",
          features: ["Précision clinique", "Ajustements fins", "Robuste"],
          price: "",
        },
        {
          name: "Four de cuisson",
          description: "Permet à nos couronnes en zircone venant d'être utilisées de bénéficier d'une cuisson à haute température et d'offrir au zircone sa solidité comparable au métal.",
          image:
            "https://digitaldentallabmg.com/images/Machine1.png",
          features: ["Contrôle température", "Programmes automatiques", "Efficace"],
          price: "",
        },
      ],
    },
  ]

  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Nos Produits & Équipements</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez notre gamme complète de matériaux premium et d'équipements de pointe pour des résultats
            d'exception.
          </p>
        </div>

        {products.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-16">
            <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">{category.category}</h3>

            <div className="grid md:grid-cols-2 gap-8">
              {category.items.map((product, productIndex) => (
                <Card key={productIndex} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full max-h-52 object-contain bg-white"
                    />
                    <Badge className="absolute top-4 left-4 bg-blue-600">{category.category}</Badge>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-800">{product.name}</CardTitle>
                  </CardHeader>

                  <CardContent>
                    <p className="text-gray-600 mb-4">{product.description}</p>

                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Caractéristiques :</h4>
                      <ul className="space-y-1">
                        {product.features.map((feature, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-center">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-lg font-bold text-blue-600">{product.price}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}

        <div className="text-center mt-12 bg-blue-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Besoin d'un Équipement Spécifique ?</h3>
          <p className="text-gray-600 mb-6">
            Nous proposons également la location d'équipements et la formation à l'utilisation des technologies
            dentaires modernes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">


          </div>
        </div>
      </div>
    </section>
  )
}
