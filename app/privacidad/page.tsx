import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { PrivacySection } from "@/components/privacy";
import { createClient } from "@/lib/supabase/server"

export default async function PrivacyPage() {
      const supabase = await createClient()
    
      const [contactData] = await Promise.all([
        supabase.from("contact_info").select("*").single(),
      ])
    return (
        <>
        <Header />
        <PrivacySection />
        <Footer data={contactData.data} />
        </>
    )
}