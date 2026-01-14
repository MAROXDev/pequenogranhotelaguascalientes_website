import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LoyaltySection } from "@/components/loyalty-section"

export const metadata = {
  title: "Programa de Recompensas - Pequeño Gran Hotel",
  description: "Gana puntos y disfruta de beneficios exclusivos",
}

export default async function RecompensasPage() {
  const supabase = await createClient()

  const [loyaltyData, contactData] = await Promise.all([
    supabase.from("loyalty_program").select("*").order("display_order", { ascending: true }),
    supabase.from("contact_info").select("*").single(),
  ])

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <LoyaltySection data={loyaltyData.data || []} />
      <Footer data={contactData.data} />
    </main>
  )
}
