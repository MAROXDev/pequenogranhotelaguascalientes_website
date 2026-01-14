"use client"

import Image from "next/image"
import { useState } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface GalleryImage {
  id: string
  title: string | null
  image_url: string
  description: string | null
  category: string | null
}

interface GalleryProps {
  data: GalleryImage[]
}

export function Gallery({ data }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number>(0)

  if (!data || data.length === 0) return null

  const handlePrevious = () => {
    const newIndex = selectedIndex > 0 ? selectedIndex - 1 : data.length - 1
    setSelectedIndex(newIndex)
    setSelectedImage(data[newIndex])
  }

  const handleNext = () => {
    const newIndex = selectedIndex < data.length - 1 ? selectedIndex + 1 : 0
    setSelectedIndex(newIndex)
    setSelectedImage(data[newIndex])
  }

  const openLightbox = (image: GalleryImage, index: number) => {
    setSelectedImage(image)
    setSelectedIndex(index)
  }

  return (
    <>
      <section id="galeria" className="py-24 md:py-40 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="w-24 h-1 bg-accent mx-auto mb-6" />
            <h2 className="font-serif md:text-6xl lg:text-7xl font-bold text-primary mb-6 text-balance text-4xl">
              Galería
            </h2>
            <p className="text-2xl text-muted-foreground max-w-3xl mx-auto text-balance leading-relaxed">
              Descubra nuestras instalaciones y la experiencia que le espera
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((image, index) => (
              <button
                key={image.id}
                onClick={() => openLightbox(image, index)}
                className={`relative overflow-hidden rounded-sm group cursor-pointer ${
                  index === 0
                    ? "md:col-span-2 md:row-span-2 h-[600px]"
                    : index % 5 === 0
                      ? "lg:col-span-2 h-[400px]"
                      : "h-[300px]"
                }`}
              >
                <Image
                  src={
                    image.image_url ||
                    `/placeholder.svg?height=600&width=800&query=luxury+hotel+${image.category || "interior"}+elegant+modern+design`
                  }
                  alt={image.title || "Gallery image"}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    {image.title && <p className="text-white font-serif text-2xl font-semibold mb-2">{image.title}</p>}
                    {image.description && <p className="text-white/90 text-sm">{image.description}</p>}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/98 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white hover:text-accent transition-colors z-50"
            aria-label="Close"
          >
            <X size={40} strokeWidth={2} />
          </button>

          {/* Navigation buttons */}
          <Button
            onClick={(e) => {
              e.stopPropagation()
              handlePrevious()
            }}
            className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm z-50"
            size="icon"
            variant="ghost"
          >
            <ChevronLeft size={32} className="text-white" />
          </Button>

          <Button
            onClick={(e) => {
              e.stopPropagation()
              handleNext()
            }}
            className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm z-50"
            size="icon"
            variant="ghost"
          >
            <ChevronRight size={32} className="text-white" />
          </Button>

          <div className="relative max-w-7xl max-h-[85vh] w-full h-full" onClick={(e) => e.stopPropagation()}>
            <Image
              src={selectedImage.image_url || "/placeholder.svg"}
              alt={selectedImage.title || "Gallery image"}
              fill
              className="object-contain"
            />
            {/* Image info overlay */}
            {(selectedImage.title || selectedImage.description) && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                {selectedImage.title && (
                  <h3 className="text-white font-serif text-3xl font-bold mb-2">{selectedImage.title}</h3>
                )}
                {selectedImage.description && <p className="text-white/90 text-lg">{selectedImage.description}</p>}
              </div>
            )}
          </div>

          {/* Image counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-lg">
            {selectedIndex + 1} / {data.length}
          </div>
        </div>
      )}
    </>
  )
}
