"use client"

import Link from "next/link"
import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">DDLM</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">DDLM</h3>
                <p className="text-sm text-gray-400">Digital Dental Lab</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Votre partenaire de confiance pour des solutions de prothèse dentaire d'excellence à Madagascar.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Nos Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Couronnes & Bridges
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Prothèses Complètes
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Prothèses sur Implants
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Gouttières
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Service Express
                </Link>
              </li>
            </ul>
          </div>

          {/* Liens utiles */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Liens Utiles</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-white transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#products" className="hover:text-white transition-colors">
                  Produits
                </Link>
              </li>
              <li>
                <Link href="/auth" className="hover:text-white transition-colors">
                  Connexion
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 mt-1 text-blue-400" />
                <div>
                  <p>Lot IBF 5Bis Résidence "Les Rosiers" Antsahavola</p>
                  <p>101 Antananarivo, Madagascar</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <p>+261 38 08 514 38</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <p>ddlm-madagascar@outlook.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 DDLM - Digital Dental Lab Madagascar. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
