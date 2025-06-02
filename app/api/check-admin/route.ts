import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient()

    // Vérifier dans Supabase Auth
    const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers()

    if (authError) {
      return NextResponse.json({ error: "Erreur Auth", details: authError.message }, { status: 400 })
    }

    const adminAuthUser = authUsers.users.find((user) => user.email === "admin@ddlm.mg")

    // Vérifier dans la table users
    const { data: dbUser, error: dbError } = await supabase
      .from("users")
      .select("*")
      .eq("email", "admin@ddlm.mg")
      .single()

    return NextResponse.json({
      authUserExists: !!adminAuthUser,
      authUserConfirmed: adminAuthUser?.email_confirmed_at ? true : false,
      authUserId: adminAuthUser?.id,
      dbUserExists: !!dbUser,
      dbUserRole: dbUser?.role,
      dbUserData: dbUser,
      authError: authError?.message,
      dbError: dbError?.message,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
