"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Save, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function AdminContactPage() {
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [instagram, setInstagram] = useState("")
  const [facebook, setFacebook] = useState("")
  const [contactId, setContactId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const router = useRouter()

  useEffect(() => {
    loadContactData()
  }, [])

  const loadContactData = async () => {
    const supabase = createClient()
    const { data } = await supabase.from("contact_info").select("*").single()

    if (data) {
      setContactId(data.id)
      setAddress(data.address || "")
      setPhone(data.phone || "")
      setEmail(data.email || "")
      setWhatsapp(data.whatsapp || "")
      setInstagram(data.instagram || "")
      setFacebook(data.facebook || "")
    }

    setIsLoading(false)
  }

  const handleSave = async () => {
    setIsSaving(true)
    setMessage(null)
    const supabase = createClient()

    try {
      const dataToSave = {
        address,
        phone,
        email,
        whatsapp: whatsapp || null,
        instagram: instagram || null,
        facebook: facebook || null,
        updated_at: new Date().toISOString(),
      }

      if (contactId) {
        const { error } = await supabase.from("contact_info").update(dataToSave).eq("id", contactId)
        if (error) throw error
      } else {
        const { data, error } = await supabase.from("contact_info").insert([dataToSave]).select().single()
        if (error) throw error
        if (data) setContactId(data.id)
      }

      setMessage({ type: "success", text: "Información guardada exitosamente" })
      router.refresh()
    } catch (error) {
      setMessage({ type: "error", text: "Error al guardar la información" })
      console.error(error)
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-6">
          <Button asChild variant="ghost" className="gap-2">
            <Link href="/admin/dashboard">
              <ArrowLeft size={18} />
              Volver al Dashboard
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-3xl text-primary">Editar Información de Contacto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="address">Dirección *</Label>
              <Textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Calle Principal 123, Centro..."
                rows={2}
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono *</Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+52 449 123 4567"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="info@hotel.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-semibold text-lg">Redes Sociales</h3>

              <div className="space-y-2">
                <Label htmlFor="whatsapp">WhatsApp (número con código de país)</Label>
                <Input
                  id="whatsapp"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="+525491234567"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram (usuario sin @)</Label>
                <Input
                  id="instagram"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  placeholder="pequenogranhotelags"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="facebook">Facebook (nombre de página)</Label>
                <Input
                  id="facebook"
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                  placeholder="pequenogranhotelags"
                />
              </div>
            </div>

            {message && (
              <div
                className={`p-4 rounded-md ${
                  message.type === "success"
                    ? "bg-green-50 border border-green-200 text-green-800"
                    : "bg-red-50 border border-red-200 text-red-800"
                }`}
              >
                {message.text}
              </div>
            )}

            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="w-full bg-primary hover:bg-primary/90"
              size="lg"
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="mr-2 w-4 h-4" />
                  Guardar Cambios
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
