"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, FileText, CheckCircle, AlertCircle, LogOut, Video, RefreshCw } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

export default function DashboardPage() {
  const [orders, setOrders] = useState([])
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    checkUser()
    fetchOrders()
  }, [])

  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      window.location.href = "/auth"
      return
    }
    setUser(user)
  }

  const fetchOrders = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_email", user.email)
        .order("created_at", { ascending: false })

      if (error) throw error
      setOrders(data || [])
    } catch (error) {
      console.error("Erreur:", error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchOrders()
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = "/"
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            En attente
          </Badge>
        )
      case "in_progress":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            <AlertCircle className="w-3 h-3 mr-1" />
            En cours
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Terminé
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800">
            Annulé
          </Badge>
        )
      default:
        return <Badge variant="secondary">Inconnu</Badge>
    }
  }

  const getStatusMessage = (status: string) => {
    switch (status) {
      case "pending":
        return "Votre demande est en attente de traitement. Nous l'examinerons sous 24h."
      case "in_progress":
        return "Votre demande est actuellement en cours de traitement par notre équipe."
      case "completed":
        return "Votre demande a été traitée avec succès. Vous devriez recevoir votre devis par email."
      case "cancelled":
        return "Cette demande a été annulée. Contactez-nous pour plus d'informations."
      default:
        return "Statut inconnu"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">DDLM</span>
                </div>
                <span className="text-xl font-bold text-gray-800">Dashboard</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Bonjour, {user?.email}</span>
              <Button variant="outline" onClick={handleRefresh} disabled={refreshing}>
                <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
                Actualiser
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Tableau de Bord</h1>
          <p className="text-gray-600">Suivez l'état de vos demandes et commandes</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">
                {orders.filter((order) => order.status === "pending").length}
              </div>
              <div className="text-gray-600">En attente</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <AlertCircle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">
                {orders.filter((order) => order.status === "in_progress").length}
              </div>
              <div className="text-gray-600">En cours</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">
                {orders.filter((order) => order.status === "completed").length}
              </div>
              <div className="text-gray-600">Terminées</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <FileText className="w-8 h-8 text-gray-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{orders.length}</div>
              <div className="text-gray-600">Total</div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Mes Demandes</h2>
          <Link href="/order">
            <Button className="bg-blue-600 hover:bg-blue-700">Nouvelle Demande</Button>
          </Link>
        </div>

        <div className="space-y-4">
          {orders.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Aucune commande</h3>
                <p className="text-gray-500 mb-6">Vous n'avez pas encore fait de demande. Commencez dès maintenant !</p>
                <Link href="/order">
                  <Button className="bg-blue-600 hover:bg-blue-700">Faire une Demande</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            orders.map((order: any) => (
              <Card key={order.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg font-semibold">{order.service_type}</CardTitle>
                      <p className="text-sm text-gray-500">
                        Commande #{order.id} • {new Date(order.created_at).toLocaleDateString("fr-FR")}
                        {order.updated_at && (
                          <span className="ml-2">
                            • Mis à jour le {new Date(order.updated_at).toLocaleDateString("fr-FR")}
                          </span>
                        )}
                      </p>
                    </div>
                    {getStatusBadge(order.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                      <p className="text-blue-800 text-sm font-medium">Statut de votre demande :</p>
                      <p className="text-blue-700 text-sm mt-1">{getStatusMessage(order.status)}</p>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{order.description}</p>

                  {order.file_name && (
                    <div className="mb-4">
                      <div className="inline-flex items-center text-blue-600">
                        {order.file_type === "application/pdf" ? (
                          <FileText className="w-4 h-4 mr-2" />
                        ) : (
                          <Video className="w-4 h-4 mr-2" />
                        )}
                        Fichier joint: {order.file_name}
                      </div>
                    </div>
                  )}

                  {order.admin_notes && (
                    <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
                      <h4 className="font-semibold text-green-800 mb-1">Message de l'équipe DDLM :</h4>
                      <p className="text-green-700 text-sm">{order.admin_notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  )
}
