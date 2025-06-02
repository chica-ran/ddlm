"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Award, Users, Clock } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative bg-[#c90c96] text-white py-20">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Digital Dental Lab Madagasikara
            </h1>
            <p className="text-xl mb-8 text-blue-100 leading-relaxed">
              DDLM - vous offre des solutions de prothèse dentaire de haute qualité avec
              les dernières technologies numériques.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="#services">
                <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-4 text-lg">
                  Nos Services
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/order">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg"
                >
                  Faire une Demande
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Award className="w-8 h-8 text-blue-300" />
                </div>
                <div className="text-2xl font-bold">15+</div>
                <div className="text-blue-200 text-sm">Années d'expérience</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="w-8 h-8 text-blue-300" />
                </div>
                <div className="text-2xl font-bold">50+</div>
                <div className="text-blue-200 text-sm">Clients satisfaits</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="w-8 h-8 text-blue-300" />
                </div>
                <div className="text-2xl font-bold">24h</div>
                <div className="text-blue-200 text-sm">Délai express</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <img
                src="https://images.pexels.com/photos/7298633/pexels-photo-7298633.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Laboratoire DDLM"
                className="w-full h-80 object-cover rounded-lg"
              />
              <div className="mt-6 text-center">
                <h3 className="text-xl font-semibold mb-2">Technologie de Pointe</h3>
                <p className="text-blue-100">Équipements numériques dernière génération pour des résultats précis</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
