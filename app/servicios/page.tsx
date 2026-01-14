import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServicesSection } from "@/components/services-section"

export const metadata = {
  title: "Servicios - Pequeño Gran Hotel",
  description: "Descubre todos los servicios y comodidades que ofrecemos",
}

export default async function ServiciosPage() {
  const supabase = await createClient()

  const [servicesData, contactData] = await Promise.all([
    supabase.from("hotel_services").select("*").order("display_order", { ascending: true }),
    supabase.from("contact_info").select("*").single(),
  ])

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <ServicesSection data={servicesData.data || []} />
      <Footer data={contactData.data} />
    </main>
  )
}
