import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

interface HeroData {
  title: string
  subtitle: string | null
  image_url: string
  cta_text: string | null
  cta_link: string | null
}

interface HeroProps {
  data: HeroData | null
}

export function Hero({ data }: HeroProps) {
  if (!data) return null

  const bookingUrl = "https://crs.univisit.com/OnePageCrs/OnePageUI.aspx?Code=332B4B74416F6C43495A4D3D"

  return (
    <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        
        {/* Image Inicio link en frontend fijo */}
        <Image
          src="https://i.postimg.cc/Gpc405RK/Inicio.jpg"
         fill
          className="object-cover brightness-[0.65]"
         priority
         alt={data.title}
        />
{               /* Imagen Incio con variables */}

        {/* <Image
          src= data.image_url ||
            "/placeholder.svg?height=1080&width=1920&query=luxury+boutique+hotel+exterior+sunset+warm+lighting" ||
            "/placeholder.svg"
            } 
          
          alt={data.title}
         fill
          className="object-cover brightness-[0.65]"
         priority
        /> */}

        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70 text-secondary" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h1 className="font-serif md:text-8xl font-bold mb-8 text-balance tracking-tight drop-shadow-2xl lg:text-7xl text-4xl mt-9">
          {data.title}
        </h1>
        {data.subtitle && (
          <p className="md:text-3xl lg:text-4xl text-balance max-w-4xl mx-auto font-light leading-relaxed drop-shadow-lg text-base mt-0 mb-0">
            {data.subtitle}
          </p>
        )}
        {data.cta_text && (
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
            <Button
              asChild
              size="lg"
              className="bg-burgundy hover:bg-burgundy/90 text-cream px-10 py-7 h-auto shadow-2xl hover:scale-105 transition-transform text-sm"
            >
              <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
                {data.cta_text}
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 hover:bg-white hover:text-brown px-10 py-7 h-auto shadow-2xl hover:scale-105 transition-transform bg-transparent text-sm border-secondary text-secondary"
            >
              <Link href="/habitaciones">Ver Habitaciones</Link>
            </Button>
          </div>
        )}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 rounded-full flex items-start justify-center p-2 text-secondary border-secondary">
          <div className="w-1 h-3 rounded-full text-secondary border-secondary bg-secondary" />
        </div>
      </div>
    </section>
  )
}
