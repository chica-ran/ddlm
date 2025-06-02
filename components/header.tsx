"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone, Mail } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-lg">
      {/* Top bar */}

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-12 h-12  rounded-lg flex items-center justify-center p-2">
              <span className="text-white font-bold text-xl"></span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800"></h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-[#D2B48C] transition-colors">
              Accueil
            </Link>
            <Link href="#about" className="text-gray-700 hover:text-[#D2B48C] transition-colors">
              À propos
            </Link>
            <Link href="#services" className="text-gray-700 hover:text-[#D2B48C] transition-colors">
              Services
            </Link>
            <Link href="#products" className="text-gray-700 hover:text-[#D2B48C] transition-colors">
              Produits
            </Link>
            <Link href="#contact" className="text-gray-700 hover:text-[#D2B48C] transition-colors">
              Contact
            </Link>
            <Link href="/auth">
              <Button className="bg-blue-500 hover:text-[#D2B48C]">Connexion</Button>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                Accueil
              </Link>
              <Link href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">
                À propos
              </Link>
              <Link href="#services" className="text-gray-700 hover:text-blue-600 transition-colors">
                Services
              </Link>
              <Link href="#products" className="text-gray-700 hover:text-blue-600 transition-colors">
                Produits
              </Link>
              <Link href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">
                Contact
              </Link>
              <Link href="/auth">
                <Button className="bg-blue-600 hover:bg-blue-700 w-full">Connexion</Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
