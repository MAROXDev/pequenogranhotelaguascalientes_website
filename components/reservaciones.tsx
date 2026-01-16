"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {  Info, LucideClock, LucideCheck, Users } from "lucide-react"

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

export function BookingSection({ data }: { data: Offer[] }) {
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
          <h1 className="font-serif text-4xl md:text-6xl text-brown mb-6 mt-6">Reservaciones</h1>
          <p className="text-lg text-dark-gray max-w-3xl mx-auto leading-relaxed">
            Reserva con nosotros y descubre el encanto de nuestras instalaciones y servicios
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <Card
              key={"personal"}
              className="overflow-hidden border-brown/10 hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={"./booking.jpg"}
                  alt={"personal_booking"}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brown/90 via-brown/40 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 ">
                  <h3 className="font-serif text-3xl text-white flex gap-2 items-center"> <LucideClock className="mt-1" />
                    Reserve con tiempo</h3>
                    <h3 className="font-serif text-3xl text-white mb-4 flex gap-2 items-center">
                     y ahorre</h3>
                </div>
              </div>

              <CardHeader className="pb-3">
                <p className="text-dark-gray leading-relaxed">Cuando hace una reservación con 14 días de anticipación o más puede pagar mucho menos que si lo hace de último momento.</p>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Validity Period */}
                <div className="flex items-center gap-3 text-sm px-4">
                    <LucideCheck />
                  <div>
                    <p className="font-medium text-brown">*Sin cargo de cancelación 24 horas antes de la estadía</p>
                  </div>
                </div>

                {/* Terms */}
                <div className="flex items-start gap-3 text-sm bg-gold/10 p-4 rounded-lg">
                  <Info className="w-5 h-5 text-burgundy shrink-0 mt-0.5" />
                  <div>
                    <p className="text-dark-gray text-sm leading-relaxed">*Solo aplica en reservaciones vía telefónica.</p>
                    <p className="text-dark-gray text-sm leading-relaxed">No aplica para Feria Nacional de San Marcos.</p>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="pt-0">
                <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="w-full">
                  <Button className="w-full bg-burgundy hover:bg-burgundy/90 text-cream">
                    Reservar
                  </Button>
                </a>
              </CardFooter>
            </Card>


            <Card
              key={"grupos"}
              className="overflow-hidden border-brown/10 hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={"./friends-trip.jpg"}
                  alt={"personal_booking"}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brown/90 via-brown/40 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 ">
                  <h3 className="font-serif text-3xl text-white mb-2 flex gap-2 items-center"> <Users className="mt-1" />
                    Reservaciones para grupos</h3>
                </div>
              </div>

              <CardHeader className="pb-3">
                <p className="text-dark-gray leading-relaxed">Experimente un sencillo proceso de reservaciones. Nuestro atento personal está listo para atenderle y satisfacer los requerimientos de su grupo.</p>
                <p className="text-dark-gray leading-relaxed">
                    Hacer las reservaciones para su grupo es rápido y sencillo, simplemente complete el formulario de solicitud de reservaciones dando clic 
                    <a href="https://wa.me/52?text=Hola%20Ana,%20vengo%20desde%20el%20sitio%20de%20Pequeño%20Gran%20Hotel"
                    target="_blank"
                    rel="noopener"
                    aria-label="WhatsApp"
                    className="text-primary"> aquí </a>, o llame a un especialista en reservaciones para grupos al 
                    <a href="tel:+01 800 830 8044" className="hover:text-primary transition-colors"> 01 800 830 8044 </a>
                    para comenzar.
                </p>
              
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Validity Period */}
                <p className="text-dark-gray leading-relaxed">Su grupo puede esperar aún más, incluyendo:</p>
                <div className="flex items-center gap-2 text-sm px-4">
                    <LucideCheck />
                  <div>
                    <p className="font-medium text-brown">Se ofrecen precios especiales para grupos y descuentos en los precios habituales</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm px-4">
                    <LucideCheck />
                  <div>
                    <p className="font-medium text-brown">Check-in rápido con registro por anticipado</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm px-4">
                    <LucideCheck />
                  <div>
                    <p className="font-medium text-brown">1 habitación gratis con 10 habitaciones pagadas por noche</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm px-4">
                    <LucideCheck />
                  <div>
                    <p className="font-medium text-brown">Desayuno americano y llamadas locales, gratis</p>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="pt-0">
                <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="w-full">
                  <Button className="w-full bg-burgundy hover:bg-burgundy/90 text-cream">
                    Reservar
                  </Button>
                </a>
              </CardFooter>
            </Card>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-burgundy to-brown text-cream rounded-2xl p-12 text-center">
          <h2 className="font-serif text-3xl md:text-4xl mb-4">No te quedes sin un lugar para ti</h2>
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
