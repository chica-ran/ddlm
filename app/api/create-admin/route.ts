import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient()

    // Créer l'utilisateur dans Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: "admin@ddlm.mg",
      password: "DDLM-admin-2024",
      email_confirm: true, // Confirmer automatiquement l'email
    })

    if (authError) {
      console.error("Erreur création Auth:", authError)
      return NextResponse.json({ error: authError.message }, { status: 400 })
    }

    console.log("✅ Utilisateur admin créé dans Auth:", authData.user?.email)

    // Vérifier/mettre à jour dans la table users
    const { data: userData, error: userError } = await supabase.from("users").upsert({
      email: "admin@ddlm.mg",
      full_name: "Administrateur DDLM",
      nif_stat: "123456789012",
      phone: "+261 38 08 514 38",
      address: "Lot IBF 5Bis Résidence Les Rosiers Antsahavola, 101 Antananarivo",
      role: "admin",
    })

    if (userError) {
      console.error("Erreur table users:", userError)
      return NextResponse.json({ error: userError.message }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      message: "Administrateur créé avec succès",
      email: "admin@ddlm.mg",
      password: "DDLM-admin-2024",
    })
  } catch (error: any) {
    console.error("Erreur:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
