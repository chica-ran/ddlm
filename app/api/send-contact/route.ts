import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend("re_WqXhf3oj_8UQRxigjU5P2MLwvmPStozL1")

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, subject, message } = await request.json()

    // Envoyer l'email de contact à votre adresse (mode test Resend)
    const { data, error } = await resend.emails.send({
      from: "DDLM Contact <onboarding@resend.dev>",
      to: ["mirindrachica@gmail.com"], // Votre adresse email pour le mode test
      subject: `Message de contact DDLM - ${subject || "Sans sujet"}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <div style="background-color: #1e40af; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">DDLM</h1>
            <p style="margin: 5px 0 0 0; font-size: 16px;">Digital Dental Lab Madagascar</p>
            <h2 style="margin: 20px 0 0 0; font-size: 24px; color: #dbeafe;">Nouveau Message de Contact</h2>
          </div>
          
          <div style="padding: 30px; background-color: #f8fafc;">
            <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #ffc107;">
              <p style="margin: 0; color: #856404; font-weight: bold;">📧 Email de destination final : prandrianalison.vit@gmail.com</p>
              <p style="margin: 5px 0 0 0; color: #856404; font-size: 14px;">
                (Cet email vous est envoyé car Resend est en mode test. Configurez un domaine pour envoyer à d'autres adresses)
              </p>
            </div>

            <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #1e40af;">
              <h3 style="color: #1e40af; margin-top: 0; font-size: 20px;">👤 Informations du contact</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">Nom :</td>
                  <td style="padding: 8px 0; color: #1e40af;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">Email :</td>
                  <td style="padding: 8px 0; color: #1e40af;">${email}</td>
                </tr>
                ${phone
          ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">Téléphone :</td>
                  <td style="padding: 8px 0; color: #374151;">${phone}</td>
                </tr>
                `
          : ""
        }
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">Sujet :</td>
                  <td style="padding: 8px 0; color: #374151;">${subject || "Non spécifié"}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">Date :</td>
                  <td style="padding: 8px 0; color: #374151;">${new Date().toLocaleDateString("fr-FR", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}</td>
                </tr>
              </table>
            </div>
            
            <div style="background-color: white; padding: 20px; border-radius: 8px;">
              <h4 style="color: #1e40af; margin-top: 0; font-size: 18px;">💬 Message :</h4>
              <div style="background-color: #f1f5f9; padding: 15px; border-radius: 6px; line-height: 1.6; color: #374151; white-space: pre-wrap;">${message}</div>
            </div>
          </div>
          
          <div style="background-color: #374151; color: white; padding: 20px; text-align: center; border-radius: 0 0 10px 10px;">
            <p style="margin: 0; font-size: 16px; font-weight: bold;">DDLM - Digital Dental Lab Madagascar</p>
            <p style="margin: 5px 0 0 0; font-size: 14px; color: #d1d5db;">Laboratoire de Prothèse Dentaire</p>
            <p style="margin: 10px 0 0 0; font-size: 12px; color: #9ca3af;">
              📞 +261 38 08 514 38 | ✉️ prandrianalison.vit@gmail.com
            </p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error("Erreur Resend:", error)
      return NextResponse.json({ error: "Erreur lors de l'envoi de l'email", details: error }, { status: 500 })
    }

    console.log("✅ Email de contact envoyé avec succès:", data?.id)
    return NextResponse.json({
      success: true,
      messageId: data?.id,
      method: "resend",
      note: "Email envoyé à votre adresse (mode test Resend)",
    })
  } catch (error) {
    console.error("❌ Erreur API:", error)
    return NextResponse.json({ error: "Erreur serveur", details: error.message }, { status: 500 })
  }
}
