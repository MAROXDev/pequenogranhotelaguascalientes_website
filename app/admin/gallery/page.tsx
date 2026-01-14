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

interface GalleryImage {
  id: string
  title: string | null
  image_url: string
  description: string | null
  category: string | null
  display_order: number
}

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const router = useRouter()

  // Form states
  const [title, setTitle] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [displayOrder, setDisplayOrder] = useState("")

  useEffect(() => {
    loadImages()
  }, [])

  const loadImages = async () => {
    const supabase = createClient()
    const { data } = await supabase.from("gallery").select("*").order("display_order", { ascending: true })
    if (data) setImages(data)
    setIsLoading(false)
  }

  const startEdit = (image: GalleryImage) => {
    setEditingImage(image)
    setIsCreating(false)
    setTitle(image.title || "")
    setImageUrl(image.image_url)
    setDescription(image.description || "")
    setCategory(image.category || "")
    setDisplayOrder(image.display_order.toString())
    setMessage(null)
  }

  const startCreate = () => {
    setIsCreating(true)
    setEditingImage(null)
    setTitle("")
    setImageUrl("")
    setDescription("")
    setCategory("")
    setDisplayOrder((images.length + 1).toString())
    setMessage(null)
  }

  const cancelEdit = () => {
    setIsCreating(false)
    setEditingImage(null)
    setMessage(null)
  }

  const handleSave = async () => {
    setIsSaving(true)
    setMessage(null)
    const supabase = createClient()

    try {
      const imageData = {
        title: title || null,
        image_url: imageUrl,
        description: description || null,
        category: category || null,
        display_order: Number.parseInt(displayOrder),
        updated_at: new Date().toISOString(),
      }

      if (isCreating) {
        const { error } = await supabase.from("gallery").insert([imageData])
        if (error) throw error
      } else if (editingImage) {
        const { error } = await supabase.from("gallery").update(imageData).eq("id", editingImage.id)
        if (error) throw error
      }

      setMessage({ type: "success", text: "Imagen guardada exitosamente" })
      await loadImages()
      setIsCreating(false)
      setEditingImage(null)
      router.refresh()
    } catch (error) {
      setMessage({ type: "error", text: "Error al guardar la imagen" })
      console.error(error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (imageId: string) => {
    if (!confirm("¿Estás seguro de eliminar esta imagen?")) return

    const supabase = createClient()
    const { error } = await supabase.from("gallery").delete().eq("id", imageId)

    if (error) {
      setMessage({ type: "error", text: "Error al eliminar la imagen" })
    } else {
      setMessage({ type: "success", text: "Imagen eliminada exitosamente" })
      await loadImages()
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
          {!isCreating && !editingImage && (
            <Button onClick={startCreate} className="gap-2 bg-primary hover:bg-primary/90">
              <Plus size={18} />
              Nueva Imagen
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

        {(isCreating || editingImage) && (
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-serif text-2xl text-primary">
                  {isCreating ? "Nueva Imagen" : "Editar Imagen"}
                </CardTitle>
                <Button onClick={cancelEdit} variant="ghost" size="sm" className="gap-2">
                  <X size={18} />
                  Cancelar
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="imageUrl">URL de la Imagen *</Label>
                <Input id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
                {imageUrl && (
                  <div className="mt-2 rounded-lg overflow-hidden border">
                    <img src={imageUrl || "/placeholder.svg"} alt="Preview" className="w-full h-64 object-cover" />
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título</Label>
                  <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Categoría</Label>
                  <Input
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="exterior, interiores, habitaciones, servicios"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
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
                    Guardar Imagen
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <Card key={image.id} className="overflow-hidden">
              <div className="relative h-48">
                <img
                  src={image.image_url || "/placeholder.svg"}
                  alt={image.title || "Gallery"}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{image.title || "Sin título"}</h3>
                {image.category && (
                  <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs rounded mb-2">
                    {image.category}
                  </span>
                )}
                <div className="flex gap-2 mt-4">
                  <Button onClick={() => startEdit(image)} variant="outline" size="sm" className="flex-1 gap-2">
                    <Edit2 size={16} />
                    Editar
                  </Button>
                  <Button
                    onClick={() => handleDelete(image.id)}
                    variant="outline"
                    size="sm"
                    className="gap-2 text-red-600 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
