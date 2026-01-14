import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PoliciesSection } from "@/components/policies-section"

export const metadata = {
  title: "Políticas del Hotel - Pequeño Gran Hotel",
  description: "Consulta nuestras políticas de check-in, cancelación y más",
}

export default async function PoliticasPage() {
  const supabase = await createClient()

  const [policiesData, contactData] = await Promise.all([
    supabase.from("hotel_policies").select("*").order("display_order", { ascending: true }),
    supabase.from("contact_info").select("*").single(),
  ])

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <PoliciesSection data={policiesData.data || []} />
      <Footer data={contactData.data} />
    </main>
  )
}
