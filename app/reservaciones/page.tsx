import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { BookingSection } from "@/components/reservaciones";
import { createClient } from "@/lib/supabase/server"

export default async function Booking() {
      const supabase = await createClient()
    
      const [contactData] = await Promise.all([
        supabase.from("contact_info").select("*").single(),
      ])
    return (
        <>
        <Header />
        <BookingSection data={[]} />
        <Footer data={contactData.data} />
        </>
    )
}