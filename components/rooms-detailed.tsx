"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Maximize, Bed, Eye, Building, Check } from "lucide-react"

interface Room {
  id: string
  name: string
  description: string
  price_per_night: number
  capacity: number
  image_url: string
  amenities: string[]
  room_type: string
  size_sqm: number
  bed_type: string
  view_type: string
  floor: number
  available_count: number
  features: string[]
}

export function RoomsDetailed({ data }: { data: Room[] }) {
  const [selectedType, setSelectedType] = useState("all")

  const roomTypes = [
    { value: "all", label: "Todas" },
    { value: "sencilla", label: "Sencillas" },
    { value: "doble", label: "Dobles" },
    { value: "triple", label: "Triples" },
    { value: "standard", label: "Estándar" },
    { value: "deluxe", label: "Deluxe" },
    { value: "junior_suite", label: "Junior Suites" },
    { value: "suite", label: "Suites" },
  ]

  const filteredRooms = selectedType === "all" ? data : data.filter((room) => room.room_type === selectedType)

  const roomCount = data.length

  const bookingUrl = "https://crs.univisit.com/OnePageCrs/OnePageUI.aspx?Code=332B4B74416F6C43495A4D3D"

  return (
    <section className="py-20 px-4 md:px-6 bg-cream">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-6xl text-brown mb-6 mt-6">Nuestras Habitaciones</h1>
          <p className="text-lg text-dark-gray max-w-3xl mx-auto leading-relaxed mb-4">
            {roomCount} habitaciones cómodas y funcionales diseñadas para ofrecerte la mejor experiencia de hospedaje
          </p>
          <div className="flex items-center justify-center gap-2 text-brown">
            <Building className="w-5 h-5" />
            <span className="font-medium">{roomCount} habitaciones disponibles</span>
          </div>
        </div>

        {/* Filter Tabs */}
        <Tabs value={selectedType} onValueChange={setSelectedType} className="mb-12">
          <TabsList className="grid w-full grid-cols-4 md:grid-cols-8 gap-2 bg-transparent h-auto p-0">
            {roomTypes.map((type) => (
              <TabsTrigger
                key={type.value}
                value={type.value}
                className="data-[state=active]:bg-burgundy data-[state=active]:text-cream bg-white text-brown border border-brown/20 hover:border-burgundy transition-colors"
              >
                {type.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room) => (
            <Card
              key={room.id}
              className="group overflow-hidden border-brown/10 hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={room.image_url || "/placeholder.svg"}
                  alt={room.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <Badge className="bg-burgundy text-cream border-0">
                    {room.room_type === "sencilla" && "Sencilla"}
                    {room.room_type === "doble" && "Doble"}
                    {room.room_type === "triple" && "Triple"}
                    {room.room_type === "standard" && "Estándar"}
                    {room.room_type === "deluxe" && "Deluxe"}
                    {room.room_type === "junior_suite" && "Junior Suite"}
                    {room.room_type === "suite" && "Suite"}
                  </Badge>
                  {room.available_count <= 3 && (
                    <Badge variant="outline" className="bg-gold/90 text-brown border-0">
                      Solo {room.available_count} disponibles
                    </Badge>
                  )}
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="font-serif text-2xl text-brown mb-2">{room.name}</h3>

                {/* Room Specs */}
                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-dark-gray">
                    <Users className="w-4 h-4 text-burgundy" />
                    <span>{room.capacity} personas</span>
                  </div>
                  <div className="flex items-center gap-2 text-dark-gray">
                    <Maximize className="w-4 h-4 text-burgundy" />
                    <span>{room.size_sqm} m²</span>
                  </div>
                  <div className="flex items-center gap-2 text-dark-gray">
                    <Bed className="w-4 h-4 text-burgundy" />
                    <span>{room.bed_type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-dark-gray">
                    <Eye className="w-4 h-4 text-burgundy" />
                    <span>{room.view_type}</span>
                  </div>
                </div>

                <p className="text-dark-gray mb-4 line-clamp-2 leading-relaxed">{room.description}</p>

                {/* Features */}
                {room.features && room.features.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-brown mb-2 text-sm">Características:</h4>
                    <div className="flex flex-wrap gap-2">
                      {room.features.slice(0, 3).map((feature, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs bg-brown/5 text-brown border-brown/20">
                          {feature}
                        </Badge>
                      ))}
                      {room.features.length > 3 && (
                        <Badge variant="outline" className="text-xs bg-brown/5 text-brown border-brown/20">
                          +{room.features.length - 3} más
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {/* Amenities */}
                <div className="mb-4">
                  <h4 className="font-semibold text-brown mb-2 text-sm">Amenidades:</h4>
                  <ul className="space-y-1">
                    {room.amenities.slice(0, 4).map((amenity, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-dark-gray">
                        <Check className="w-4 h-4 text-burgundy shrink-0 mt-0.5" />
                        <span>{amenity}</span>
                      </li>
                    ))}
                  </ul>
                  {room.amenities.length > 4 && (
                    <p className="text-xs text-brown mt-2">+{room.amenities.length - 4} amenidades adicionales</p>
                  )}
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-brown/10">
                  <div>
                    <div className="text-2xl font-serif text-burgundy">${room.price_per_night.toLocaleString()}</div>
                    <div className="text-xs text-dark-gray">por noche</div>
                  </div>
                  <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
                    <Button className="bg-burgundy hover:bg-burgundy/90 text-cream hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                      Reservar
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRooms.length === 0 && (
          <div className="text-center py-16">
            <p className="text-lg text-dark-gray">No hay habitaciones disponibles en esta categoría.</p>
          </div>
        )}
      </div>
    </section>
  )
}
