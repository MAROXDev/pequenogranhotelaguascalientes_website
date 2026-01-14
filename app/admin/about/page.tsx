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
import { ImageUpload } from "@/components/admin/image-upload"

export default function AdminAboutPage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [aboutId, setAboutId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const router = useRouter()

  useEffect(() => {
    loadAboutData()
  }, [])

  const loadAboutData = async () => {
    const supabase = createClient()
    const { data } = await supabase.from("about_section").select("*").single()

    if (data) {
      setAboutId(data.id)
      setTitle(data.title || "")
      setContent(data.content || "")
      setImageUrl(data.image_url || "")
    }

    setIsLoading(false)
  }

  const handleSave = async () => {
    setIsSaving(true)
    setMessage(null)
    const supabase = createClient()

    try {
      const dataToSave = {
        title,
        content,
        image_url: imageUrl,
        updated_at: new Date().toISOString(),
      }

      if (aboutId) {
        const { error } = await supabase.from("about_section").update(dataToSave).eq("id", aboutId)
        if (error) throw error
      } else {
        const { data, error } = await supabase.from("about_section").insert([dataToSave]).select().single()
        if (error) throw error
        if (data) setAboutId(data.id)
      }

      setMessage({ type: "success", text: "Cambios guardados exitosamente" })
      router.refresh()
    } catch (error) {
      setMessage({ type: "error", text: "Error al guardar los cambios" })
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
            <CardTitle className="font-serif text-3xl text-primary">Editar Sección Sobre Nosotros</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Título *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Bienvenidos a Pequeño Gran Hotel"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Contenido *</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Escribe el contenido de la sección..."
                rows={10}
                required
              />
              <p className="text-sm text-muted-foreground">Usa dos saltos de línea para separar párrafos</p>
            </div>

            <ImageUpload
              currentImage={imageUrl}
              onImageUploaded={(url) => setImageUrl(url)}
              label="Imagen de la Sección"
            />

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
