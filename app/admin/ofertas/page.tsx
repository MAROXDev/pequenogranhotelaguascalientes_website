"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createBrowserClient } from "@/lib/supabase/client"
import { ArrowLeft, Save, Plus, Trash2, Percent } from "lucide-react"
import Link from "next/link"
import { ImageUpload } from "@/components/admin/image-upload"

interface Offer {
  id: string
  title: string
  description: string
  discount_percentage: number
  valid_from: string
  valid_until: string
  terms: string
  image_url: string
  is_active: boolean
}

export default function AdminOffersPage() {
  const router = useRouter()
  const [offers, setOffers] = useState<Offer[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const supabase = createBrowserClient()

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("adminAuthenticated")
    if (!isAuthenticated) {
      router.push("/admin/login")
      return
    }
    loadOffers()
  }, [router])

  const loadOffers = async () => {
    try {
      const { data, error } = await supabase.from("offers").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setOffers(data || [])
    } catch (error) {
      console.error("Error loading offers:", error)
      setMessage({ type: "error", text: "Error al cargar las ofertas" })
    } finally {
      setLoading(false)
    }
  }

  const handleAddOffer = () => {
    const newOffer: Offer = {
      id: `temp-${Date.now()}`,
      title: "",
      description: "",
      discount_percentage: 0,
      valid_from: new Date().toISOString().split("T")[0],
      valid_until: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      terms: "",
      image_url: "/hotel-special-offer-promotion.jpg",
      is_active: true,
    }
    setOffers([newOffer, ...offers])
  }

  const handleUpdateOffer = (id: string, field: keyof Offer, value: any) => {
    setOffers(offers.map((offer) => (offer.id === id ? { ...offer, [field]: value } : offer)))
  }

  const handleDeleteOffer = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar esta oferta?")) return

    if (id.startsWith("temp-")) {
      setOffers(offers.filter((offer) => offer.id !== id))
      return
    }

    try {
      const { error } = await supabase.from("offers").delete().eq("id", id)

      if (error) throw error

      setOffers(offers.filter((offer) => offer.id !== id))
      setMessage({ type: "success", text: "Oferta eliminada exitosamente" })
      setTimeout(() => setMessage(null), 3000)
    } catch (error) {
      console.error("Error deleting offer:", error)
      setMessage({ type: "error", text: "Error al eliminar la oferta" })
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage(null)

    try {
      for (const offer of offers) {
        if (offer.id.startsWith("temp-")) {
          const { id, ...offerData } = offer
          const { error } = await supabase.from("offers").insert(offerData)
          if (error) throw error
        } else {
          const { error } = await supabase.from("offers").update(offer).eq("id", offer.id)
          if (error) throw error
        }
      }

      setMessage({ type: "success", text: "Ofertas guardadas exitosamente" })
      await loadOffers()
      setTimeout(() => setMessage(null), 3000)
    } catch (error) {
      console.error("Error saving offers:", error)
      setMessage({ type: "error", text: "Error al guardar las ofertas" })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-burgundy mb-4"></div>
          <p className="text-dark-gray">Cargando ofertas...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="icon">
              <Link href="/admin/dashboard">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-4xl font-serif text-brown mb-2">Gestión de Ofertas</h1>
              <p className="text-dark-gray">Administra las ofertas y promociones del hotel</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button onClick={handleAddOffer} className="bg-gold hover:bg-gold/90 text-brown">
              <Plus className="w-4 h-4 mr-2" />
              Nueva Oferta
            </Button>
            <Button onClick={handleSave} disabled={saving} className="bg-burgundy hover:bg-burgundy/90 text-cream">
              <Save className="w-4 h-4 mr-2" />
              {saving ? "Guardando..." : "Guardar Cambios"}
            </Button>
          </div>
        </div>

        {message && (
          <div
            className={`mb-6 p-4 rounded-lg ${message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
          >
            {message.text}
          </div>
        )}

        <div className="space-y-6">
          {offers.map((offer) => (
            <Card key={offer.id} className="border-brown/20">
              <CardHeader className="bg-brown/5">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-brown">
                    <Percent className="w-5 h-5" />
                    Oferta: {offer.title || "Sin título"}
                  </CardTitle>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteOffer(offer.id)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Eliminar
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor={`title-${offer.id}`}>Título de la Oferta</Label>
                      <Input
                        id={`title-${offer.id}`}
                        value={offer.title}
                        onChange={(e) => handleUpdateOffer(offer.id, "title", e.target.value)}
                        placeholder="Ej: Descuento de Verano"
                      />
                    </div>

                    <div>
                      <Label htmlFor={`description-${offer.id}`}>Descripción</Label>
                      <Textarea
                        id={`description-${offer.id}`}
                        value={offer.description}
                        onChange={(e) => handleUpdateOffer(offer.id, "description", e.target.value)}
                        placeholder="Describe la oferta en detalle..."
                        rows={4}
                      />
                    </div>

                    <div>
                      <Label htmlFor={`discount-${offer.id}`}>Porcentaje de Descuento</Label>
                      <Input
                        id={`discount-${offer.id}`}
                        type="number"
                        min="0"
                        max="100"
                        value={offer.discount_percentage}
                        onChange={(e) =>
                          handleUpdateOffer(offer.id, "discount_percentage", Number.parseInt(e.target.value) || 0)
                        }
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`valid-from-${offer.id}`}>Válida Desde</Label>
                        <Input
                          id={`valid-from-${offer.id}`}
                          type="date"
                          value={offer.valid_from}
                          onChange={(e) => handleUpdateOffer(offer.id, "valid_from", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`valid-until-${offer.id}`}>Válida Hasta</Label>
                        <Input
                          id={`valid-until-${offer.id}`}
                          type="date"
                          value={offer.valid_until}
                          onChange={(e) => handleUpdateOffer(offer.id, "valid_until", e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor={`terms-${offer.id}`}>Términos y Condiciones</Label>
                      <Textarea
                        id={`terms-${offer.id}`}
                        value={offer.terms}
                        onChange={(e) => handleUpdateOffer(offer.id, "terms", e.target.value)}
                        placeholder="Términos y condiciones de la oferta..."
                        rows={3}
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`active-${offer.id}`}
                        checked={offer.is_active}
                        onChange={(e) => handleUpdateOffer(offer.id, "is_active", e.target.checked)}
                        className="w-4 h-4"
                      />
                      <Label htmlFor={`active-${offer.id}`}>Oferta Activa</Label>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <ImageUpload
                      currentImage={offer.image_url}
                      onImageUploaded={(url) => handleUpdateOffer(offer.id, "image_url", url)}
                      label="Imagen de la Oferta"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {offers.length === 0 && (
          <Card className="border-dashed border-2 border-brown/20">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Percent className="w-12 h-12 text-brown/50 mb-4" />
              <p className="text-dark-gray text-lg mb-4">No hay ofertas creadas</p>
              <Button onClick={handleAddOffer} className="bg-burgundy hover:bg-burgundy/90 text-cream">
                <Plus className="w-4 h-4 mr-2" />
                Crear Primera Oferta
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
