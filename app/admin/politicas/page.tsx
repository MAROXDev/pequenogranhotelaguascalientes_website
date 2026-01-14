"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createBrowserClient } from "@/lib/supabase/client"
import { ArrowLeft, Save, Plus, Trash2, FileText } from "lucide-react"
import Link from "next/link"

interface Policy {
  id: string
  category: string
  title: string
  content: string
  icon: string
  display_order: number
}

export default function AdminPoliciesPage() {
  const router = useRouter()
  const [policies, setPolicies] = useState<Policy[]>([])
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
    loadPolicies()
  }, [router])

  const loadPolicies = async () => {
    try {
      const { data, error } = await supabase
        .from("hotel_policies")
        .select("*")
        .order("display_order", { ascending: true })

      if (error) throw error
      setPolicies(data || [])
    } catch (error) {
      console.error("Error loading policies:", error)
      setMessage({ type: "error", text: "Error al cargar las políticas" })
    } finally {
      setLoading(false)
    }
  }

  const handleAddPolicy = () => {
    const newPolicy: Policy = {
      id: `temp-${Date.now()}`,
      category: "general",
      title: "",
      content: "",
      icon: "FileText",
      display_order: policies.length,
    }
    setPolicies([...policies, newPolicy])
  }

  const handleUpdatePolicy = (id: string, field: keyof Policy, value: any) => {
    setPolicies(policies.map((policy) => (policy.id === id ? { ...policy, [field]: value } : policy)))
  }

  const handleDeletePolicy = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar esta política?")) return

    if (id.startsWith("temp-")) {
      setPolicies(policies.filter((policy) => policy.id !== id))
      return
    }

    try {
      const { error } = await supabase.from("hotel_policies").delete().eq("id", id)

      if (error) throw error

      setPolicies(policies.filter((policy) => policy.id !== id))
      setMessage({ type: "success", text: "Política eliminada exitosamente" })
      setTimeout(() => setMessage(null), 3000)
    } catch (error) {
      console.error("Error deleting policy:", error)
      setMessage({ type: "error", text: "Error al eliminar la política" })
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage(null)

    try {
      for (const policy of policies) {
        if (policy.id.startsWith("temp-")) {
          const { id, ...policyData } = policy
          const { error } = await supabase.from("hotel_policies").insert(policyData)
          if (error) throw error
        } else {
          const { error } = await supabase.from("hotel_policies").update(policy).eq("id", policy.id)
          if (error) throw error
        }
      }

      setMessage({ type: "success", text: "Políticas guardadas exitosamente" })
      await loadPolicies()
      setTimeout(() => setMessage(null), 3000)
    } catch (error) {
      console.error("Error saving policies:", error)
      setMessage({ type: "error", text: "Error al guardar las políticas" })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-burgundy mb-4"></div>
          <p className="text-dark-gray">Cargando políticas...</p>
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
              <h1 className="text-4xl font-serif text-brown mb-2">Políticas del Hotel</h1>
              <p className="text-dark-gray">Gestiona las políticas y reglas del establecimiento</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button onClick={handleAddPolicy} className="bg-gold hover:bg-gold/90 text-brown">
              <Plus className="w-4 h-4 mr-2" />
              Nueva Política
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
          {policies.map((policy) => (
            <Card key={policy.id} className="border-brown/20">
              <CardHeader className="bg-brown/5">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-brown">
                    <FileText className="w-5 h-5" />
                    {policy.title || "Política sin título"}
                  </CardTitle>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeletePolicy(policy.id)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <Label htmlFor={`title-${policy.id}`}>Título de la Política</Label>
                  <Input
                    id={`title-${policy.id}`}
                    value={policy.title}
                    onChange={(e) => handleUpdatePolicy(policy.id, "title", e.target.value)}
                    placeholder="Ej: Política de Check-in"
                  />
                </div>

                <div>
                  <Label htmlFor={`category-${policy.id}`}>Categoría</Label>
                  <Input
                    id={`category-${policy.id}`}
                    value={policy.category}
                    onChange={(e) => handleUpdatePolicy(policy.id, "category", e.target.value)}
                    placeholder="Ej: checkin, cancelacion, pagos"
                  />
                </div>

                <div>
                  <Label htmlFor={`content-${policy.id}`}>Contenido</Label>
                  <Textarea
                    id={`content-${policy.id}`}
                    value={policy.content}
                    onChange={(e) => handleUpdatePolicy(policy.id, "content", e.target.value)}
                    placeholder="Describe la política en detalle..."
                    rows={8}
                  />
                </div>

                <div>
                  <Label htmlFor={`icon-${policy.id}`}>Icono (Lucide)</Label>
                  <Input
                    id={`icon-${policy.id}`}
                    value={policy.icon}
                    onChange={(e) => handleUpdatePolicy(policy.id, "icon", e.target.value)}
                    placeholder="Ej: Clock, XCircle, CreditCard"
                  />
                </div>

                <div>
                  <Label htmlFor={`order-${policy.id}`}>Orden de Visualización</Label>
                  <Input
                    id={`order-${policy.id}`}
                    type="number"
                    min="0"
                    value={policy.display_order}
                    onChange={(e) =>
                      handleUpdatePolicy(policy.id, "display_order", Number.parseInt(e.target.value) || 0)
                    }
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {policies.length === 0 && (
          <Card className="border-dashed border-2 border-brown/20">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FileText className="w-12 h-12 text-brown/50 mb-4" />
              <p className="text-dark-gray text-lg mb-4">No hay políticas creadas</p>
              <Button onClick={handleAddPolicy} className="bg-burgundy hover:bg-burgundy/90 text-cream">
                <Plus className="w-4 h-4 mr-2" />
                Crear Primera Política
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
