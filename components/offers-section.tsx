"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Calendar, Tag, Info } from "lucide-react"

interface Offer {
  id: string
  title: string
  description: string
  discount_percentage: number | null
  discount_amount: number | null
  image_url: string
  valid_from: string
  valid_until: string
  terms: string
  is_active: boolean
}

export function OffersSection({ data }: { data: Offer[] }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-MX", { year: "numeric", month: "long", day: "numeric" })
  }

  const bookingUrl = "https://crs.univisit.com/OnePageCrs/OnePageUI.aspx?Code=332B4B74416F6C43495A4D3D"

  return (
    <section className="py-20 px-4 md:px-6 bg-cream">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-6xl text-brown mb-6 mt-6">Ofertas y Promociones</h1>
          <p className="text-lg text-dark-gray max-w-3xl mx-auto leading-relaxed">
            Aprovecha nuestras promociones especiales y ahorra en tu próxima estancia
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {data.map((offer) => (
            <Card
              key={offer.id}
              className="overflow-hidden border-brown/10 hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={offer.image_url || "/placeholder.svg"}
                  alt={offer.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brown/90 via-brown/40 to-transparent" />

                {/* Discount Badge */}
                {offer.discount_percentage && (
                  <div className="absolute top-6 right-6">
                    <div className="bg-burgundy text-cream rounded-full w-20 h-20 flex flex-col items-center justify-center shadow-lg">
                      <Tag className="w-5 h-5 mb-1" />
                      <span className="text-2xl font-bold">{offer.discount_percentage}%</span>
                      <span className="text-xs">OFF</span>
                    </div>
                  </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-serif text-3xl text-cream mb-2">{offer.title}</h3>
                </div>
              </div>

              <CardHeader className="pb-3">
                <p className="text-dark-gray leading-relaxed">{offer.description}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Validity Period */}
                <div className="flex items-start gap-3 text-sm">
                  <Calendar className="w-5 h-5 text-burgundy shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-brown">Válido del:</p>
                    <p className="text-dark-gray">
                      {formatDate(offer.valid_from)} al {formatDate(offer.valid_until)}
                    </p>
                  </div>
                </div>

                {/* Terms */}
                <div className="flex items-start gap-3 text-sm bg-gold/10 p-4 rounded-lg">
                  <Info className="w-5 h-5 text-burgundy shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-brown mb-1">Términos y condiciones:</p>
                    <p className="text-dark-gray text-sm leading-relaxed">{offer.terms}</p>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="pt-0">
                <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="w-full">
                  <Button className="w-full bg-burgundy hover:bg-burgundy/90 text-cream">
                    Reservar con esta Oferta
                  </Button>
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>

        {data.length === 0 && (
          <div className="text-center py-16">
            <p className="text-lg text-dark-gray">
              No hay ofertas disponibles en este momento. Vuelve pronto para ver nuestras promociones.
            </p>
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-burgundy to-brown text-cream rounded-2xl p-12 text-center">
          <h2 className="font-serif text-3xl md:text-4xl mb-4">¿No encuentras lo que buscas?</h2>
          <p className="text-cream/90 mb-6 text-lg">
            Contáctanos directamente y te ayudaremos a encontrar la mejor opción para tu estancia
          </p>
          <Link href="/contacto">
            <Button size="lg" variant="outline" className="bg-cream text-burgundy hover:bg-cream/90 border-0">
              Contactar
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
