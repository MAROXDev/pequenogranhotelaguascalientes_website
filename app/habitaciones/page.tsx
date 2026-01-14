import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RoomsDetailed } from "@/components/rooms-detailed"

export const metadata = {
  title: "Habitaciones - Pequeño Gran Hotel",
  description: "36 habitaciones elegantes y confortables para tu estancia perfecta",
}

export default async function HabitacionesPage() {
  const supabase = await createClient()

  const [roomsData, contactData] = await Promise.all([
    supabase.from("rooms").select("*").order("display_order", { ascending: true }),
    supabase.from("contact_info").select("*").single(),
  ])

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <RoomsDetailed data={roomsData.data || []} />
      <Footer data={contactData.data} />
    </main>
  )
}
