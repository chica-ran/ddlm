import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient()

    // 1. Supprimer l'ancien admin s'il existe
    const { data: existingUsers } = await supabase.auth.admin.listUsers()
    const existingAdmin = existingUsers.users.find((user) => user.email === "admin@ddlm.mg")

    if (existingAdmin) {
      await supabase.auth.admin.deleteUser(existingAdmin.id)
      console.log("🗑️ Ancien admin supprimé")
    }

    // 2. Créer le nouvel admin
    const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
      email: "admin@ddlm.mg",
      password: "DDLM-admin-2024",
      email_confirm: true,
      user_metadata: {
        full_name: "Administrateur DDLM",
      },
    })

    if (createError) {
      return NextResponse.json({ error: createError.message }, { status: 400 })
    }

    // 3. Mettre à jour/créer dans la table users
    const { error: upsertError } = await supabase.from("users").upsert(
      {
        email: "admin@ddlm.mg",
        full_name: "Administrateur DDLM",
        nif_stat: "123456789012",
        phone: "+261 38 08 514 38",
        address: "Lot IBF 5Bis Résidence Les Rosiers Antsahavola, 101 Antananarivo",
        role: "admin",
      },
      {
        onConflict: "email",
      },
    )

    if (upsertError) {
      return NextResponse.json({ error: upsertError.message }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      message: "Admin recréé avec succès",
      email: "admin@ddlm.mg",
      password: "DDLM-admin-2024",
      userId: newUser.user?.id,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
