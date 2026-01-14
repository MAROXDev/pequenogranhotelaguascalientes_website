import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { OffersSection } from "@/components/offers-section"

export const metadata = {
  title: "Ofertas y Promociones - Pequeño Gran Hotel",
  description: "Descubre nuestras ofertas especiales y promociones exclusivas",
}

export default async function OfertasPage() {
  const supabase = await createClient()

  const [offersData, contactData] = await Promise.all([
    supabase.from("offers").select("*").eq("is_active", true).order("display_order", { ascending: true }),
    supabase.from("contact_info").select("*").single(),
  ])

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <OffersSection data={offersData.data || []} />
      <Footer data={contactData.data} />
    </main>
  )
}
