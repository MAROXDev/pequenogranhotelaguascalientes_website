"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createBrowserClient } from "@/lib/supabase/client"
import { ArrowLeft, Save, Plus, Trash2, Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Service {
  id: string
  name: string
  description: string
  icon: string
  image_url: string
  is_featured: boolean
  category: string
  is_included: boolean
  additional_cost: number | null
}

export default function AdminServicesPage() {
  const router = useRouter()
  const [services, setServices] = useState<Service[]>([])
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
    loadServices()
  }, [router])

  const loadServices = async () => {
    try {
      const { data, error } = await supabase
        .from("hotel_services")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error
      setServices(data || [])
    } catch (error) {
      console.error("Error loading services:", error)
      setMessage({ type: "error", text: "Error al cargar los servicios" })
    } finally {
      setLoading(false)
    }
  }

  const handleAddService = () => {
    const newService: Service = {
      id: `temp-${Date.now()}`,
      name: "",
      description: "",
      icon: "Sparkles",
      image_url: "/hotel-service-luxury-amenity.jpg",
      is_featured: false,
      category: "general",
      is_included: true,
      additional_cost: null,
    }
    setServices([newService, ...services])
  }

  const handleUpdateService = (id: string, field: keyof Service, value: any) => {
    setServices(services.map((service) => (service.id === id ? { ...service, [field]: value } : service)))
  }

  const handleDeleteService = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este servicio?")) return

    if (id.startsWith("temp-")) {
      setServices(services.filter((service) => service.id !== id))
      return
    }

    try {
      const { error } = await supabase.from("hotel_services").delete().eq("id", id)

      if (error) throw error

      setServices(services.filter((service) => service.id !== id))
      setMessage({ type: "success", text: "Servicio eliminado exitosamente" })
      setTimeout(() => setMessage(null), 3000)
    } catch (error) {
      console.error("Error deleting service:", error)
      setMessage({ type: "error", text: "Error al eliminar el servicio" })
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage(null)

    try {
      for (const service of services) {
        if (service.id.startsWith("temp-")) {
          const { id, ...serviceData } = service
          const { error } = await supabase.from("hotel_services").insert(serviceData)
          if (error) throw error
        } else {
          const { error } = await supabase.from("hotel_services").update(service).eq("id", service.id)
          if (error) throw error
        }
      }

      setMessage({ type: "success", text: "Servicios guardados exitosamente" })
      await loadServices()
      setTimeout(() => setMessage(null), 3000)
    } catch (error) {
      console.error("Error saving services:", error)
      setMessage({ type: "error", text: "Error al guardar los servicios" })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-burgundy mb-4"></div>
          <p className="text-dark-gray">Cargando servicios...</p>
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
              <h1 className="text-4xl font-serif text-brown mb-2">Gestión de Servicios</h1>
              <p className="text-dark-gray">Administra los servicios y amenidades del hotel</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button onClick={handleAddService} className="bg-gold hover:bg-gold/90 text-brown">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Servicio
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

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service) => (
            <Card key={service.id} className="border-brown/20">
              <CardHeader className="bg-brown/5">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-brown">
                    <Sparkles className="w-5 h-5" />
                    {service.name || "Sin nombre"}
                  </CardTitle>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteService(service.id)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <Label htmlFor={`name-${service.id}`}>Nombre del Servicio</Label>
                  <Input
                    id={`name-${service.id}`}
                    value={service.name}
                    onChange={(e) => handleUpdateService(service.id, "name", e.target.value)}
                    placeholder="Ej: Wi-Fi Gratuito"
                  />
                </div>

                <div>
                  <Label htmlFor={`description-${service.id}`}>Descripción</Label>
                  <Textarea
                    id={`description-${service.id}`}
                    value={service.description}
                    onChange={(e) => handleUpdateService(service.id, "description", e.target.value)}
                    placeholder="Describe el servicio..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor={`category-${service.id}`}>Categoría</Label>
                  <Input
                    id={`category-${service.id}`}
                    value={service.category}
                    onChange={(e) => handleUpdateService(service.id, "category", e.target.value)}
                    placeholder="Ej: general, bienestar, tecnología"
                  />
                </div>

                <div>
                  <Label htmlFor={`icon-${service.id}`}>Nombre del Icono (Lucide)</Label>
                  <Input
                    id={`icon-${service.id}`}
                    value={service.icon}
                    onChange={(e) => handleUpdateService(service.id, "icon", e.target.value)}
                    placeholder="Ej: Wifi, Coffee, Dumbbell"
                  />
                </div>

                <div>
                  <Label htmlFor={`image-${service.id}`}>URL de la Imagen</Label>
                  <Input
                    id={`image-${service.id}`}
                    value={service.image_url}
                    onChange={(e) => handleUpdateService(service.id, "image_url", e.target.value)}
                    placeholder="https://ejemplo.com/imagen.jpg"
                  />
                </div>

                <div className="relative h-48 bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={service.image_url || "/placeholder.svg"}
                    alt={service.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`featured-${service.id}`}
                    checked={service.is_featured}
                    onChange={(e) => handleUpdateService(service.id, "is_featured", e.target.checked)}
                    className="w-4 h-4"
                  />
                  <Label htmlFor={`featured-${service.id}`}>Servicio Destacado</Label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`included-${service.id}`}
                    checked={service.is_included}
                    onChange={(e) => handleUpdateService(service.id, "is_included", e.target.checked)}
                    className="w-4 h-4"
                  />
                  <Label htmlFor={`included-${service.id}`}>Servicio Incluido</Label>
                </div>

                {!service.is_included && (
                  <div>
                    <Label htmlFor={`cost-${service.id}`}>Costo Adicional ($)</Label>
                    <Input
                      id={`cost-${service.id}`}
                      type="number"
                      min="0"
                      step="0.01"
                      value={service.additional_cost || ""}
                      onChange={(e) =>
                        handleUpdateService(
                          service.id,
                          "additional_cost",
                          e.target.value ? Number.parseFloat(e.target.value) : null,
                        )
                      }
                      placeholder="0.00"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {services.length === 0 && (
          <Card className="border-dashed border-2 border-brown/20">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Sparkles className="w-12 h-12 text-brown/50 mb-4" />
              <p className="text-dark-gray text-lg mb-4">No hay servicios creados</p>
              <Button onClick={handleAddService} className="bg-burgundy hover:bg-burgundy/90 text-cream">
                <Plus className="w-4 h-4 mr-2" />
                Crear Primer Servicio
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
