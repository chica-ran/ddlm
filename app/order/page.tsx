"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, FileText, Video, ArrowLeft, Send, CheckCircle, Info } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

export default function OrderPage() {
  const [formData, setFormData] = useState({
    userEmail: "",
    serviceType: "",
    description: "",
    file: null as File | null,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const serviceTypes = [
    "Couronne céramique",
    "Bridge dentaire",
    "Prothèse complète",
    "Prothèse partielle",
    "Prothèse sur implants",
    "Gouttière",
    "Réparation",
    "Autre",
  ]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Vérifier le type de fichier (PDF ou vidéo)
      const allowedTypes = ["application/pdf", "video/mp4", "video/avi", "video/mov", "video/wmv"]
      if (allowedTypes.includes(file.type)) {
        // Vérifier la taille du fichier (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          alert("Le fichier est trop volumineux. Taille maximale: 5MB")
          return
        }
        setFormData((prev) => ({ ...prev, file }))
      } else {
        alert("Seuls les fichiers PDF et vidéo sont acceptés")
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage("")

    try {
      // Validation
      if (!formData.userEmail || !formData.serviceType || !formData.description) {
        throw new Error("Veuillez remplir tous les champs obligatoires")
      }

      let fileData = null
      let fileType = ""
      let fileName = ""

      // Convertir le fichier en base64 si présent
      if (formData.file) {
        const reader = new FileReader()
        fileData = await new Promise((resolve, reject) => {
          reader.onload = () => resolve(reader.result)
          reader.onerror = () => reject(new Error("Erreur lors de la lecture du fichier"))
          reader.readAsDataURL(formData.file!)
        })
        fileType = formData.file.type
        fileName = formData.file.name
      }

      // Enregistrer la commande dans la base de données
      const { error: insertError } = await supabase.from("orders").insert([
        {
          user_email: formData.userEmail,
          service_type: formData.serviceType,
          description: formData.description,
          file_url: fileData,
          file_type: fileType,
          file_name: fileName,
          status: "pending",
        },
      ])

      if (insertError) throw insertError

      // Envoyer l'email réel via l'API
      const emailResponse = await fetch("/api/send-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: formData.userEmail,
          serviceType: formData.serviceType,
          description: formData.description,
          fileName: fileName,
          fileData: fileData,
          fileType: fileType,
        }),
      })

      const emailResult = await emailResponse.json()

      if (!emailResponse.ok) {
        console.error("Erreur email:", emailResult)
        throw new Error(emailResult.error || "Erreur lors de l'envoi de l'email")
      }

      console.log("✅ Email envoyé avec succès:", emailResult.messageId)
      setSubmitStatus("success")
      setFormData({
        userEmail: "",
        serviceType: "",
        description: "",
        file: null,
      })

      // Reset le input file
      const fileInput = document.getElementById("file") as HTMLInputElement
      if (fileInput) fileInput.value = ""
    } catch (error: any) {
      console.error("Erreur:", error)
      setSubmitStatus("error")
      setErrorMessage(error.message || "Une erreur s'est produite lors de l'envoi de votre demande")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l'accueil
          </Link>
        </div>

        {/* Information sur le mode test */}
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-blue-800 mb-1">Mode Test Activé</h4>
              <p className="text-sm text-blue-700">
                Les emails sont actuellement envoyés à <strong>mirindrachica@gmail.com</strong> (mode test Resend).
                <br />
                Pour envoyer à d'autres adresses, configurez un domaine vérifié sur{" "}
                <a href="https://resend.com/domains" className="underline" target="_blank" rel="noopener noreferrer">
                  resend.com/domains
                </a>
              </p>
            </div>
          </div>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-800">Faire une Demande</CardTitle>
            <p className="text-gray-600 mt-2">
              Envoyez-nous votre demande avec vos fichiers et nous vous répondrons rapidement
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700 mb-2">
                  Votre Email *
                </label>
                <Input
                  id="userEmail"
                  type="email"
                  required
                  value={formData.userEmail}
                  onChange={(e) => setFormData((prev) => ({ ...prev, userEmail: e.target.value }))}
                  placeholder="votre@email.com"
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">Nous vous enverrons la facture PDF à cette adresse</p>
              </div>

              <div>
                <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-2">
                  Type de Service *
                </label>
                <Select
                  value={formData.serviceType}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, serviceType: value }))}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un service" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceTypes.map((service) => (
                      <SelectItem key={service} value={service}>
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description de votre demande *
                </label>
                <Textarea
                  id="description"
                  required
                  rows={5}
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Décrivez en détail votre demande, les spécifications, les délais souhaités, etc."
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-2">
                  Fichier (PDF ou Vidéo)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <input
                    id="file"
                    type="file"
                    accept=".pdf,.mp4,.avi,.mov,.wmv"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="file" className="cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Cliquez pour sélectionner un fichier</p>
                    <p className="text-sm text-gray-500">PDF, MP4, AVI, MOV, WMV (max 5MB)</p>
                  </label>
                </div>

                {formData.file && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg flex items-center space-x-3">
                    {formData.file.type === "application/pdf" ? (
                      <FileText className="w-8 h-8 text-red-600" />
                    ) : (
                      <Video className="w-8 h-8 text-blue-600" />
                    )}
                    <div>
                      <p className="font-medium text-gray-800">{formData.file.name}</p>
                      <p className="text-sm text-gray-600">{(formData.file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Processus de traitement :</h4>
                <ol className="text-sm text-blue-700 space-y-1">
                  <li>1. Votre demande sera envoyée automatiquement par email</li>
                  <li>2. Nous étudierons votre dossier sous 24h</li>
                  <li>3. Vous recevrez un devis détaillé par email</li>
                  <li>4. Après validation, nous procéderons à la réalisation</li>
                  <li>5. La facture PDF vous sera envoyée à votre email</li>
                </ol>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 py-3 text-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Envoi en cours..."
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Envoyer la Demande
                  </>
                )}
              </Button>

              {submitStatus === "success" && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="text-green-800 text-center">
                    <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
                    <h4 className="font-semibold mb-2">Demande envoyée avec succès !</h4>
                    <p>Votre demande a été transmise par email. Nous vous répondrons dans les plus brefs délais.</p>
                    <p className="text-sm mt-2 text-green-700">📧 Email envoyé à : mirindrachica@gmail.com</p>
                    <p className="text-xs mt-1 text-green-600">
                      (L'email contient les instructions pour transférer à prandrianalison.vit@gmail.com)
                    </p>
                  </div>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="text-red-800 text-center">
                    <h4 className="font-semibold mb-2">Erreur lors de l'envoi</h4>
                    <p>
                      {errorMessage || "Une erreur s'est produite. Veuillez réessayer ou nous contacter directement."}
                    </p>
                  </div>
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">Besoin d'aide ? Contactez-nous directement</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+261341234567" className="text-blue-600 hover:text-blue-700">
              📞 +261 38 08 514 38
            </a>
            <a href="mailto:prandrianalison.vit@gmail.com" className="text-blue-600 hover:text-blue-700">
              ✉️ prandrianalison.vit@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
