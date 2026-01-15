import { createClient } from "@/lib/supabase/server"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Rooms } from "@/components/rooms"
import { Gallery } from "@/components/gallery"
import { Contact } from "@/components/contact"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Turism } from "@/components/turism"

export default async function Home() {
  const supabase = await createClient()

  // Fetch all data in parallel
  const [heroData, aboutData, roomsData, galleryData, contactData] = await Promise.all([
    supabase.from("hero_section").select("*").single(),
    supabase.from("about_section").select("*").single(),
    supabase.from("rooms").select("*").order("display_order", { ascending: true }),
    supabase.from("gallery").select("*").order("display_order", { ascending: true }),
    supabase.from("contact_info").select("*").single(),
  ])

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero data={heroData.data} />
      <About data={aboutData.data} />
      <Rooms data={roomsData.data || []} />
      <Gallery data={galleryData.data || []} />
      <Turism />
      <Contact data={contactData.data} />
      <Footer data={contactData.data} />
    </main>
  )
}
