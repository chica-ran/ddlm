"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Clock, FileText, CheckCircle, AlertCircle, LogOut, Video, TrendingUp, Edit, Save, X } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

export default function AdminPage() {
  const [orders, setOrders] = useState([])
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editingOrder, setEditingOrder] = useState(null)
  const [editData, setEditData] = useState({ status: "", admin_notes: "" })

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

    // Vérifier si l'utilisateur est admin
    const { data: userData, error } = await supabase.from("users").select("role").eq("email", user.email).single()

    if (error || userData?.role !== "admin") {
      window.location.href = "/"
      return
    }

    setUser(user)
  }

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setOrders(data || [])
    } catch (error) {
      console.error("Erreur:", error)
    } finally {
      setLoading(false)
    }
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
            En attente
          </Badge>
        )
      case "in_progress":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            En cours
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
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

  const startEditing = (order: any) => {
    setEditingOrder(order.id)
    setEditData({
      status: order.status,
      admin_notes: order.admin_notes || "",
    })
  }

  const cancelEditing = () => {
    setEditingOrder(null)
    setEditData({ status: "", admin_notes: "" })
  }

  const saveChanges = async (orderId: number) => {
    try {
      const { error } = await supabase
        .from("orders")
        .update({
          status: editData.status,
          admin_notes: editData.admin_notes,
          updated_at: new Date().toISOString(),
        })
        .eq("id", orderId)

      if (error) throw error

      // Rafraîchir les données
      await fetchOrders()
      setEditingOrder(null)
      setEditData({ status: "", admin_notes: "" })

      // Optionnel : Envoyer un email de notification au client
      // await sendStatusUpdateEmail(orderId)
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error)
      alert("Erreur lors de la mise à jour")
    }
  }

  const getStats = () => {
    const pending = orders.filter((order) => order.status === "pending").length
    const inProgress = orders.filter((order) => order.status === "in_progress").length
    const completed = orders.filter((order) => order.status === "completed").length
    const total = orders.length

    return { pending, inProgress, completed, total }
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

  const stats = getStats()

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
                <span className="text-xl font-bold text-gray-800">Admin Dashboard</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Admin: {user?.email}</span>
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard Administrateur</h1>
          <p className="text-gray-600">Gérez toutes les demandes et commandes DDLM</p>
        </div>

        {/* Statistiques */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{stats.pending}</div>
              <div className="text-gray-600">En attente</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <AlertCircle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{stats.inProgress}</div>
              <div className="text-gray-600">En cours</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{stats.completed}</div>
              <div className="text-gray-600">Terminées</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 text-gray-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
              <div className="text-gray-600">Total</div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Toutes les Demandes</h2>
          <div className="text-sm text-gray-500">
            {orders.length} demande{orders.length > 1 ? "s" : ""} au total
          </div>
        </div>

        <div className="space-y-4">
          {orders.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Aucune demande</h3>
                <p className="text-gray-500">Aucune demande n'a été soumise pour le moment.</p>
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
                        Commande #{order.id} • {new Date(order.created_at).toLocaleDateString("fr-FR")} •{" "}
                        {order.user_email}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(order.status)}
                      {editingOrder === order.id ? (
                        <div className="flex space-x-1">
                          <Button
                            size="sm"
                            onClick={() => saveChanges(order.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Save className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={cancelEditing}>
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <Button size="sm" variant="outline" onClick={() => startEditing(order)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Description de la demande :</h4>
                      <p className="text-gray-600 mb-4">{order.description}</p>

                      {order.file_name && (
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-800 mb-2">Fichier joint :</h4>
                          <div className="inline-flex items-center text-blue-600">
                            {order.file_type === "application/pdf" ? (
                              <FileText className="w-4 h-4 mr-2" />
                            ) : (
                              <Video className="w-4 h-4 mr-2" />
                            )}
                            {order.file_name}
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      {editingOrder === order.id ? (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Statut :</label>
                            <Select
                              value={editData.status}
                              onValueChange={(value) => setEditData((prev) => ({ ...prev, status: value }))}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionner un statut" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">En attente</SelectItem>
                                <SelectItem value="in_progress">En cours</SelectItem>
                                <SelectItem value="completed">Terminé</SelectItem>
                                <SelectItem value="cancelled">Annulé</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Notes administrateur :
                            </label>
                            <Textarea
                              value={editData.admin_notes}
                              onChange={(e) => setEditData((prev) => ({ ...prev, admin_notes: e.target.value }))}
                              placeholder="Ajouter des notes pour le client..."
                              rows={3}
                            />
                          </div>
                        </div>
                      ) : (
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Informations :</h4>
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="font-medium">Statut :</span> {getStatusBadge(order.status)}
                            </div>
                            <div>
                              <span className="font-medium">Dernière mise à jour :</span>{" "}
                              {order.updated_at ? new Date(order.updated_at).toLocaleDateString("fr-FR") : "Jamais"}
                            </div>
                          </div>

                          {order.admin_notes && (
                            <div className="mt-4">
                              <h4 className="font-semibold text-gray-800 mb-2">Notes administrateur :</h4>
                              <div className="bg-blue-50 p-3 rounded-lg">
                                <p className="text-blue-700 text-sm">{order.admin_notes}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  )
}
