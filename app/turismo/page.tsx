import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Turism } from "@/components/turism";
import { createClient } from "@/lib/supabase/server"

export default async function TurismPage() {
      const supabase = await createClient()
    
      const [contactData] = await Promise.all([
        supabase.from("contact_info").select("*").single(),
      ])
    return (
        <>
        <Header />
        <Turism />
        <Footer data={contactData.data} />
        </>
    )
}