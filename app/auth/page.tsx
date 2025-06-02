"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

export default function AuthPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })

  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    nifStat: "",
    phone: "",
    address: "",
  })

  // Validation NIF STAT Madagascar (format: 12 chiffres)
  const validateNifStat = (nif: string) => {
    const nifRegex = /^\d{12}$/
    return nifRegex.test(nif)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    try {
      console.log("🔐 Tentative de connexion avec:", loginData.email)

      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
      })

      console.log("📊 Résultat auth:", { data, error })

      if (error) {
        console.error("❌ Erreur auth:", error)

        // Gérer spécifiquement l'erreur d'email non confirmé
        if (error.message === "Email not confirmed") {
          setMessage(
            "⚠️ Email non confirmé. Vérifiez votre boîte email ou contactez l'administrateur pour confirmer votre compte.",
          )
          setIsLoading(false)
          return
        }

        throw error
      }

      console.log("✅ Connexion réussie, vérification du rôle...")

      // Vérifier le rôle de l'utilisateur
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("role")
        .eq("email", loginData.email)
        .single()

      console.log("👤 Données utilisateur:", { userData, userError })

      if (userError) {
        console.error("❌ Erreur récupération utilisateur:", userError)
        throw userError
      }

      if (userData.role === "admin") {
        console.log("🔑 Redirection vers admin")
        window.location.href = "/admin"
      } else {
        console.log("👤 Redirection vers dashboard")
        window.location.href = "/dashboard"
      }
    } catch (error: any) {
      console.error("💥 Erreur complète:", error)
      setMessage(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    // Validations
    if (registerData.password !== registerData.confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas")
      setIsLoading(false)
      return
    }

    if (!validateNifStat(registerData.nifStat)) {
      setMessage("Le NIF STAT doit contenir exactement 12 chiffres")
      setIsLoading(false)
      return
    }

    try {
      // Créer l'utilisateur dans Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email: registerData.email,
        password: registerData.password,
      })

      if (error) throw error

      // Ajouter les informations supplémentaires dans la table users
      const { error: insertError } = await supabase.from("users").insert([
        {
          email: registerData.email,
          full_name: registerData.fullName,
          nif_stat: registerData.nifStat,
          phone: registerData.phone,
          address: registerData.address,
          role: "user",
        },
      ])

      if (insertError) throw insertError

      setMessage("Inscription réussie ! Vérifiez votre email pour confirmer votre compte.")
    } catch (error: any) {
      setMessage(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l'accueil
          </Link>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-[#c90c96] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">DDLM</span>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">Espace Client DDLM</CardTitle>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Connexion</TabsTrigger>
                <TabsTrigger value="register">Inscription</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      required
                      value={loginData.email}
                      onChange={(e) => setLoginData((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder="votre@email.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="login-password">Mot de passe</Label>
                    <div className="relative">
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        required
                        value={loginData.password}
                        onChange={(e) => setLoginData((prev) => ({ ...prev, password: e.target.value }))}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                    {isLoading ? "Connexion..." : "Se connecter"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Nom complet *</Label>
                      <Input
                        id="fullName"
                        type="text"
                        required
                        value={registerData.fullName}
                        onChange={(e) => setRegisterData((prev) => ({ ...prev, fullName: e.target.value }))}
                        placeholder="Nom complet"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={registerData.phone}
                        onChange={(e) => setRegisterData((prev) => ({ ...prev, phone: e.target.value }))}
                        placeholder="+261 38 08 514 38"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={registerData.email}
                      onChange={(e) => setRegisterData((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder="votre@email.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="nifStat">NIF STAT Madagascar *</Label>
                    <Input
                      id="nifStat"
                      type="text"
                      required
                      maxLength={12}
                      value={registerData.nifStat}
                      onChange={(e) => setRegisterData((prev) => ({ ...prev, nifStat: e.target.value }))}
                      placeholder="123456789012"
                    />
                    <p className="text-xs text-gray-500 mt-1">12 chiffres requis</p>
                  </div>

                  <div>
                    <Label htmlFor="address">Adresse</Label>
                    <Input
                      id="address"
                      type="text"
                      value={registerData.address}
                      onChange={(e) => setRegisterData((prev) => ({ ...prev, address: e.target.value }))}
                      placeholder="Votre adresse"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="password">Mot de passe *</Label>
                      <Input
                        id="password"
                        type="password"
                        required
                        value={registerData.password}
                        onChange={(e) => setRegisterData((prev) => ({ ...prev, password: e.target.value }))}
                        placeholder="••••••••"
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">Confirmer *</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        required
                        value={registerData.confirmPassword}
                        onChange={(e) => setRegisterData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                    {isLoading ? "Inscription..." : "S'inscrire"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {message && (
              <div
                className={`mt-4 p-3 rounded-md text-sm ${message.includes("réussie") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}
              >
                {message}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
