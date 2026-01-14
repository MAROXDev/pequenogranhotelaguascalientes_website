import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Check, Star, ArrowRight } from "lucide-react"

interface Room {
  id: string
  name: string
  description: string
  price_per_night: number
  capacity: number
  image_url: string
  amenities: string[]
  available: boolean
}

interface RoomsProps {
  data: Room[]
}

export function Rooms({ data }: RoomsProps) {
  if (!data || data.length === 0) return null

  const displayRooms = data.slice(0, 3)

  const bookingUrl = "https://crs.univisit.com/OnePageCrs/OnePageUI.aspx?Code=332B4B74416F6C43495A4D3D"

  return (
    <section id="habitaciones" className="py-24 md:py-40 bg-cream relative">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-12 bg-burgundy" />
            <Star className="text-burgundy" size={20} fill="currentColor" />
            <div className="h-px w-12 bg-burgundy" />
          </div>
          <h2 className="font-serif md:text-6xl lg:text-7xl font-bold text-brown mb-6 text-balance text-4xl">
            Nuestras Habitaciones
          </h2>
          <p className="text-2xl text-dark-gray max-w-3xl mx-auto text-balance leading-relaxed">
            36 espacios elegantes diseñados para su máximo confort y descanso
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {displayRooms.map((room, index) => (
            <Card
              key={room.id}
              className="overflow-hidden hover:shadow-2xl transition-all duration-300 group border-0 bg-white"
            >
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={
                    room.image_url ||
                    `/placeholder.svg?height=400&width=600&query=luxury+hotel+room+${index + 1 || "/placeholder.svg"}+elegant+interior+comfortable+bed`
                  }
                  alt={room.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {room.available && (
                  <div className="absolute top-4 right-4 bg-accent text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    Disponible
                  </div>
                )}
              </div>
              <CardHeader className="pb-4">
                <CardTitle className="font-serif text-3xl text-primary mb-2">{room.name}</CardTitle>
                <CardDescription className="flex items-center gap-2 text-base">
                  <Users size={18} />
                  <span>
                    Capacidad: {room.capacity} {room.capacity === 1 ? "persona" : "personas"}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed text-base">{room.description}</p>

                {room.amenities && room.amenities.length > 0 && (
                  <div className="space-y-3">
                    <p className="font-semibold text-foreground">Amenidades incluidas:</p>
                    <ul className="grid grid-cols-1 gap-2">
                      {room.amenities.map((amenity, index) => (
                        <li key={index} className="flex items-center gap-3 text-sm text-muted-foreground">
                          <Check size={18} className="text-accent flex-shrink-0" strokeWidth={3} />
                          <span>{amenity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="pt-6 border-t">
                  <div className="flex items-baseline gap-2">
                    <p className="text-4xl font-serif font-bold text-primary">
                      ${room.price_per_night.toLocaleString("es-MX")}
                    </p>
                    <span className="text-lg font-sans text-muted-foreground">MXN / noche</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Impuestos incluidos</p>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button
                  asChild
                  className="w-full bg-burgundy hover:bg-burgundy/90 text-cream hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  size="lg"
                >
                  <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
                    Reservar Ahora
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-2 border-burgundy text-burgundy hover:bg-burgundy hover:text-cream group bg-transparent"
          >
            <Link href="/habitaciones" className="flex items-center gap-2">
              Ver Todas las Habitaciones ({data.length})
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
