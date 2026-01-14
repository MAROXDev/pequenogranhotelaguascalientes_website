"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createBrowserClient } from "@/lib/supabase/client"
import { ArrowLeft, Save, Plus, Trash2, Gift } from "lucide-react"
import Link from "next/link"

interface LoyaltyTier {
  id: string
  tier_name: string
  points_required: number
  benefits: string[]
  discount_percentage: number | null
  icon: string
  color: string
  display_order: number
}

export default function AdminRewardsPage() {
  const router = useRouter()
  const [tiers, setTiers] = useState<LoyaltyTier[]>([])
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
    loadTiers()
  }, [router])

  const loadTiers = async () => {
    try {
      const { data, error } = await supabase
        .from("loyalty_program")
        .select("*")
        .order("display_order", { ascending: true })

      if (error) throw error
      setTiers(data || [])
    } catch (error) {
      console.error("Error loading loyalty tiers:", error)
      setMessage({ type: "error", text: "Error al cargar los niveles de recompensas" })
    } finally {
      setLoading(false)
    }
  }

  const handleAddTier = () => {
    const newTier: LoyaltyTier = {
      id: `temp-${Date.now()}`,
      tier_name: "",
      points_required: 0,
      benefits: [],
      discount_percentage: null,
      icon: "Star",
      color: "#901216",
      display_order: tiers.length,
    }
    setTiers([...tiers, newTier])
  }

  const handleUpdateTier = (id: string, field: keyof LoyaltyTier, value: any) => {
    setTiers(tiers.map((tier) => (tier.id === id ? { ...tier, [field]: value } : tier)))
  }

  const handleUpdateBenefits = (id: string, benefitsText: string) => {
    const benefitsArray = benefitsText.split("\n").filter((b) => b.trim())
    handleUpdateTier(id, "benefits", benefitsArray)
  }

  const handleDeleteTier = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este nivel?")) return

    if (id.startsWith("temp-")) {
      setTiers(tiers.filter((tier) => tier.id !== id))
      return
    }

    try {
      const { error } = await supabase.from("loyalty_program").delete().eq("id", id)

      if (error) throw error

      setTiers(tiers.filter((tier) => tier.id !== id))
      setMessage({ type: "success", text: "Nivel eliminado exitosamente" })
      setTimeout(() => setMessage(null), 3000)
    } catch (error) {
      console.error("Error deleting tier:", error)
      setMessage({ type: "error", text: "Error al eliminar el nivel" })
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage(null)

    try {
      for (const tier of tiers) {
        if (tier.id.startsWith("temp-")) {
          const { id, ...tierData } = tier
          const { error } = await supabase.from("loyalty_program").insert(tierData)
          if (error) throw error
        } else {
          const { error } = await supabase.from("loyalty_program").update(tier).eq("id", tier.id)
          if (error) throw error
        }
      }

      setMessage({ type: "success", text: "Niveles guardados exitosamente" })
      await loadTiers()
      setTimeout(() => setMessage(null), 3000)
    } catch (error) {
      console.error("Error saving tiers:", error)
      setMessage({ type: "error", text: "Error al guardar los niveles" })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-burgundy mb-4"></div>
          <p className="text-dark-gray">Cargando programa de recompensas...</p>
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
              <h1 className="text-4xl font-serif text-brown mb-2">Programa de Recompensas</h1>
              <p className="text-dark-gray">Gestiona los niveles y beneficios del programa de lealtad</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button onClick={handleAddTier} className="bg-gold hover:bg-gold/90 text-brown">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Nivel
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tiers.map((tier) => (
            <Card key={tier.id} className="border-brown/20">
              <CardHeader className="bg-brown/5">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-brown">
                    <Gift className="w-5 h-5" />
                    {tier.tier_name || "Nivel sin nombre"}
                  </CardTitle>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteTier(tier.id)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <Label htmlFor={`tier-name-${tier.id}`}>Nombre del Nivel</Label>
                  <Input
                    id={`tier-name-${tier.id}`}
                    value={tier.tier_name}
                    onChange={(e) => handleUpdateTier(tier.id, "tier_name", e.target.value)}
                    placeholder="Ej: Bronce, Plata, Oro"
                  />
                </div>

                <div>
                  <Label htmlFor={`points-${tier.id}`}>Puntos Requeridos</Label>
                  <Input
                    id={`points-${tier.id}`}
                    type="number"
                    min="0"
                    value={tier.points_required}
                    onChange={(e) => handleUpdateTier(tier.id, "points_required", Number.parseInt(e.target.value) || 0)}
                  />
                </div>

                <div>
                  <Label htmlFor={`discount-${tier.id}`}>Porcentaje de Descuento (%)</Label>
                  <Input
                    id={`discount-${tier.id}`}
                    type="number"
                    min="0"
                    max="100"
                    value={tier.discount_percentage || ""}
                    onChange={(e) =>
                      handleUpdateTier(
                        tier.id,
                        "discount_percentage",
                        e.target.value ? Number.parseInt(e.target.value) : null,
                      )
                    }
                    placeholder="Ej: 10"
                  />
                </div>

                <div>
                  <Label htmlFor={`icon-${tier.id}`}>Icono (Lucide)</Label>
                  <Input
                    id={`icon-${tier.id}`}
                    value={tier.icon}
                    onChange={(e) => handleUpdateTier(tier.id, "icon", e.target.value)}
                    placeholder="Ej: Star, Trophy, Crown"
                  />
                </div>

                <div>
                  <Label htmlFor={`color-${tier.id}`}>Color (Hex)</Label>
                  <div className="flex gap-2">
                    <Input
                      id={`color-${tier.id}`}
                      value={tier.color}
                      onChange={(e) => handleUpdateTier(tier.id, "color", e.target.value)}
                      placeholder="#901216"
                    />
                    <div className="w-12 h-10 rounded border border-brown/20" style={{ backgroundColor: tier.color }} />
                  </div>
                </div>

                <div>
                  <Label htmlFor={`benefits-${tier.id}`}>Beneficios (uno por línea)</Label>
                  <Textarea
                    id={`benefits-${tier.id}`}
                    value={tier.benefits.join("\n")}
                    onChange={(e) => handleUpdateBenefits(tier.id, e.target.value)}
                    placeholder="Check-in prioritario&#10;Upgrade gratuito&#10;Late check-out"
                    rows={6}
                  />
                </div>

                <div>
                  <Label htmlFor={`order-${tier.id}`}>Orden de Visualización</Label>
                  <Input
                    id={`order-${tier.id}`}
                    type="number"
                    min="0"
                    value={tier.display_order}
                    onChange={(e) => handleUpdateTier(tier.id, "display_order", Number.parseInt(e.target.value) || 0)}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {tiers.length === 0 && (
          <Card className="border-dashed border-2 border-brown/20">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Gift className="w-12 h-12 text-brown/50 mb-4" />
              <p className="text-dark-gray text-lg mb-4">No hay niveles de recompensa creados</p>
              <Button onClick={handleAddTier} className="bg-burgundy hover:bg-burgundy/90 text-cream">
                <Plus className="w-4 h-4 mr-2" />
                Crear Primer Nivel
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
