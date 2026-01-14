import { redirect } from "next/navigation"

export const metadata = {
  title: "Reservar - Pequeño Gran Hotel",
  description: "Reserva tu habitación de forma fácil y rápida",
}

export default async function ReservarPage() {
  const bookingUrl = "https://crs.univisit.com/OnePageCrs/OnePageUI.aspx?Code=332B4B74416F6C43495A4D3D"

  redirect(bookingUrl)

  // Original code preserved for reference
  // const supabase = await createClient()

  // const [roomsData, contactData] = await Promise.all([
  //   supabase.from("rooms").select("*").order("price_per_night", { ascending: true }),
  //   supabase.from("contact_info").select("*").single(),
  // ])

  // return (
  //   <main className="min-h-screen bg-background">
  //     <Header />
  //     <BookingSection rooms={roomsData.data || []} />
  //     <Footer data={contactData.data} />
  //   </main>
  // )
}
