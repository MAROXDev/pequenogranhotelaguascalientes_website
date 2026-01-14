"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, DollarSign } from "lucide-react"

interface Service {
  id: string
  name: string
  description: string
  icon: string
  image_url: string
  category: string
  is_included: boolean
  additional_cost: number | null
}

export function ServicesSection({ data }: { data: Service[] }) {
  const includedServices = data.filter((s) => s.is_included)
  const additionalServices = data.filter((s) => !s.is_included)

  const ServiceCard = ({ service }: { service: Service }) => (
    <Card className="group overflow-hidden border-brown/10 hover:shadow-xl transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={service.image_url || "/placeholder.svg"}
          alt={service.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brown/80 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="font-serif text-2xl text-cream">{service.name}</h3>
        </div>
        <div className="absolute top-4 right-4">
          {service.is_included ? (
            <Badge className="bg-gold text-brown border-0">
              <Check className="w-3 h-3 mr-1" />
              Incluido
            </Badge>
          ) : (
            <Badge className="bg-burgundy text-cream border-0">
              <DollarSign className="w-3 h-3 mr-1" />
              Adicional
            </Badge>
          )}
        </div>
      </div>

      <CardContent className="p-6">
        <p className="text-dark-gray leading-relaxed mb-4">{service.description}</p>

        {service.additional_cost && service.additional_cost > 0 && (
          <div className="flex items-center justify-between pt-4 border-t border-brown/10">
            <span className="text-sm text-dark-gray">Costo adicional:</span>
            <span className="text-xl font-serif text-burgundy">${service.additional_cost.toLocaleString()}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )

  return (
    <section className="py-20 px-4 md:px-6 bg-cream">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-6xl text-brown mb-6 mt-6">Nuestros Servicios</h1>
          <p className="text-lg text-dark-gray max-w-3xl mx-auto leading-relaxed">
            Disfruta de una amplia gama de servicios diseñados para hacer tu estancia inolvidable
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="included" className="mb-12">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 gap-2 bg-transparent h-auto p-0">
            <TabsTrigger
              value="included"
              className="data-[state=active]:bg-burgundy data-[state=active]:text-cream bg-white text-brown border border-brown/20"
            >
              Servicios Incluidos ({includedServices.length})
            </TabsTrigger>
            <TabsTrigger
              value="additional"
              className="data-[state=active]:bg-burgundy data-[state=active]:text-cream bg-white text-brown border border-brown/20"
            >
              Servicios Adicionales ({additionalServices.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="included" className="mt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {includedServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="additional" className="mt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {additionalServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Info Banner */}
        <div className="bg-gradient-to-r from-brown to-burgundy text-cream rounded-2xl p-8 md:p-12 text-center mt-16">
          <h2 className="font-serif text-3xl md:text-4xl mb-4">¿Necesitas un servicio especial?</h2>
          <p className="text-cream/90 text-lg mb-6 max-w-2xl mx-auto">
            Nuestro equipo está disponible 24/7 para atender cualquier solicitud especial que puedas tener durante tu
            estancia
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+524491234567"
              className="inline-flex items-center justify-center px-6 py-3 bg-cream text-burgundy rounded-lg hover:bg-cream/90 transition-colors font-medium"
            >
              Llamar al Hotel
            </a>
            <a
              href="https://wa.me/525491234567"
              className="inline-flex items-center justify-center px-6 py-3 bg-transparent border-2 border-cream text-cream rounded-lg hover:bg-cream/10 transition-colors font-medium"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
