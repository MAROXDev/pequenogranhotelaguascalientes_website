"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Plus, Edit2, Trash2, Loader2, Save, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ImageUpload } from "@/components/admin/image-upload"

interface Room {
  id: string
  name: string
  description: string
  price_per_night: number
  capacity: number
  image_url: string
  amenities: string[]
  available: boolean
  display_order: number
}

export default function AdminRoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingRoom, setEditingRoom] = useState<Room | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const router = useRouter()

  // Form states
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [pricePerNight, setPricePerNight] = useState("")
  const [capacity, setCapacity] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [amenitiesText, setAmenitiesText] = useState("")
  const [available, setAvailable] = useState(true)
  const [displayOrder, setDisplayOrder] = useState("")

  useEffect(() => {
    loadRooms()
  }, [])

  const loadRooms = async () => {
    const supabase = createClient()
    const { data } = await supabase.from("rooms").select("*").order("display_order", { ascending: true })
    if (data) setRooms(data)
    setIsLoading(false)
  }

  const startEdit = (room: Room) => {
    setEditingRoom(room)
    setIsCreating(false)
    setName(room.name)
    setDescription(room.description)
    setPricePerNight(room.price_per_night.toString())
    setCapacity(room.capacity.toString())
    setImageUrl(room.image_url)
    setAmenitiesText(room.amenities.join(", "))
    setAvailable(room.available)
    setDisplayOrder(room.display_order.toString())
    setMessage(null)
  }

  const startCreate = () => {
    setIsCreating(true)
    setEditingRoom(null)
    setName("")
    setDescription("")
    setPricePerNight("")
    setCapacity("")
    setImageUrl("")
    setAmenitiesText("")
    setAvailable(true)
    setDisplayOrder((rooms.length + 1).toString())
    setMessage(null)
  }

  const cancelEdit = () => {
    setIsCreating(false)
    setEditingRoom(null)
    setMessage(null)
  }

  const handleSave = async () => {
    setIsSaving(true)
    setMessage(null)
    const supabase = createClient()

    try {
      const amenitiesArray = amenitiesText
        .split(",")
        .map((a) => a.trim())
        .filter((a) => a.length > 0)

      const roomData = {
        name,
        description,
        price_per_night: Number.parseFloat(pricePerNight),
        capacity: Number.parseInt(capacity),
        image_url: imageUrl,
        amenities: amenitiesArray,
        available,
        display_order: Number.parseInt(displayOrder),
        updated_at: new Date().toISOString(),
      }

      if (isCreating) {
        const { error } = await supabase.from("rooms").insert([roomData])
        if (error) throw error
      } else if (editingRoom) {
        const { error } = await supabase.from("rooms").update(roomData).eq("id", editingRoom.id)
        if (error) throw error
      }

      setMessage({ type: "success", text: "Habitación guardada exitosamente" })
      await loadRooms()
      setIsCreating(false)
      setEditingRoom(null)
      router.refresh()
    } catch (error) {
      setMessage({ type: "error", text: "Error al guardar la habitación" })
      console.error(error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (roomId: string) => {
    if (!confirm("¿Estás seguro de eliminar esta habitación?")) return

    const supabase = createClient()
    const { error } = await supabase.from("rooms").delete().eq("id", roomId)

    if (error) {
      setMessage({ type: "error", text: "Error al eliminar la habitación" })
    } else {
      setMessage({ type: "success", text: "Habitación eliminada exitosamente" })
      await loadRooms()
      router.refresh()
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
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <Button asChild variant="ghost" className="gap-2">
            <Link href="/admin/dashboard">
              <ArrowLeft size={18} />
              Volver al Dashboard
            </Link>
          </Button>
          {!isCreating && !editingRoom && (
            <Button onClick={startCreate} className="gap-2 bg-primary hover:bg-primary/90">
              <Plus size={18} />
              Nueva Habitación
            </Button>
          )}
        </div>

        {message && (
          <div
            className={`mb-6 p-4 rounded-md ${
              message.type === "success"
                ? "bg-green-50 border border-green-200 text-green-800"
                : "bg-red-50 border border-red-200 text-red-800"
            }`}
          >
            {message.text}
          </div>
        )}

        {(isCreating || editingRoom) && (
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-serif text-2xl text-primary">
                  {isCreating ? "Nueva Habitación" : "Editar Habitación"}
                </CardTitle>
                <Button onClick={cancelEdit} variant="ghost" size="sm" className="gap-2">
                  <X size={18} />
                  Cancelar
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre *</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Precio por Noche *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={pricePerNight}
                    onChange={(e) => setPricePerNight(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción *</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacidad *</Label>
                  <Input
                    id="capacity"
                    type="number"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="displayOrder">Orden de Visualización</Label>
                  <Input
                    id="displayOrder"
                    type="number"
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(e.target.value)}
                  />
                </div>
              </div>

              <ImageUpload
                currentImage={imageUrl}
                onImageUploaded={(url) => setImageUrl(url)}
                label="Imagen de la Habitación"
              />

              <div className="space-y-2">
                <Label htmlFor="amenities">Amenidades (separadas por coma)</Label>
                <Textarea
                  id="amenities"
                  value={amenitiesText}
                  onChange={(e) => setAmenitiesText(e.target.value)}
                  placeholder="Wi-Fi, TV, Aire acondicionado, Minibar"
                  rows={2}
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="available"
                  checked={available}
                  onChange={(e) => setAvailable(e.target.checked)}
                  className="w-4 h-4"
                />
                <Label htmlFor="available" className="cursor-pointer">
                  Habitación disponible
                </Label>
              </div>

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
                    Guardar Habitación
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          {rooms.map((room) => (
            <Card key={room.id}>
              <CardContent className="p-6">
                {/* Layout flex-col en móvil (por defecto), flex-row en md y superior */}
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="relative w-full md:w-48 h-48 md:h-32 flex-shrink-0 rounded-lg overflow-hidden">
                    <img
                      src={room.image_url || "/placeholder.svg"}
                      alt={room.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-2">
                      <div>
                        <h3 className="font-serif text-xl font-bold text-primary">{room.name}</h3>
                        <p className="text-muted-foreground text-sm">Capacidad: {room.capacity} personas</p>
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={() => startEdit(room)} variant="outline" size="sm" className="gap-2">
                          <Edit2 size={16} />
                          Editar
                        </Button>
                        <Button
                          onClick={() => handleDelete(room.id)}
                          variant="outline"
                          size="sm"
                          className="gap-2 text-red-600 hover:text-red-700"
                        >
                          <Trash2 size={16} />
                          Eliminar
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{room.description}</p>
                    <p className="text-2xl font-serif font-bold text-primary">
                      ${room.price_per_night.toLocaleString("es-MX")}
                      <span className="text-sm font-normal text-muted-foreground"> / noche</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
