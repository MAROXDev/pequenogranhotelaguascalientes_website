import Link from "next/link"
import { MapPin, Phone, Mail, Heart } from "lucide-react"
import Image from "next/image"

interface FooterData {
  address: string
  phone: string
  email: string
}

interface FooterProps {
  data: FooterData | null
}

export function Footer({ data }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <>
    <div className="flex align-center justify-center gap-10 mx-4 my-4">
    <a
    href="http://www.vivaaguascalientes.com/"
    >
    <Image
    src="./img-logo01.jpg"
    className="object-fit w-full h-full"
    width={"150"}
    height={"100"}
    alt={"img-logo001"}
    />
    </a>
    <a
    href="http://www.visitmexico.com/es"
    >
    <Image
    src="./img-logo02.jpg"
    className="object-fit w-full h-full"
    width={"150"}
    height={"100"}
    alt={"img-logo002"}
    />
    </a>
    <a
    href="http://www.hotelesmexicanos.org/"
    >
    <Image
    src="./img-logo03.jpg"
    className="object-fit w-full h-full"
    width={"150"}
    height={"100"}
    alt={"img-logo003"}
    />
    </a>
    <a
    href="http://www.sectur.gob.mx/"
    >
    <Image
    src="./img-logo04.jpg"
    className="object-fit w-full h-full"
    width={"150"}
    height={"100"}
    alt={"img-logo004"}
    />
    </a>
    </div>
      
      <footer className="bg-primary text-primary-foreground relative overflow-hidden">

      {/* Decorative top border */}
      <div className="h-2 bg-gradient-to-r from-accent via-secondary to-accent" />

      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="font-serif text-4xl font-bold mb-6">Pequeño Gran Hotel</h3>
            <p className="text-primary-foreground/80 leading-relaxed text-lg mb-6 max-w-md">
              Un refugio de elegancia y confort en el corazón de Aguascalientes. Donde cada detalle cuenta una historia
              de hospitalidad.
            </p>
            <div className="flex gap-2 items-center text-primary-foreground/60">
              
              
              
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-xl font-bold mb-6">Enlaces Rápidos</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/#inicio"
                  className="text-primary-foreground/80 hover:text-secondary transition-colors inline-flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-4 h-px bg-secondary transition-all" />
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/#nosotros"
                  className="text-primary-foreground/80 hover:text-secondary transition-colors inline-flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-4 h-px bg-secondary transition-all" />
                  Nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="/#habitaciones"
                  className="text-primary-foreground/80 hover:text-secondary transition-colors inline-flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-4 h-px bg-secondary transition-all" />
                  Habitaciones
                </Link>
              </li>
              <li>
                <Link
                  href="/#galeria"
                  className="text-primary-foreground/80 hover:text-secondary transition-colors inline-flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-4 h-px bg-secondary transition-all" />
                  Galería
                </Link>

              </li>
              <li>
                <Link
                  href="/#turismo"
                  className="text-primary-foreground/80 hover:text-secondary transition-colors inline-flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-4 h-px bg-secondary transition-all" />
                  Turismo
                </Link>
              </li>
              <li>
                <Link
                  href="/#contacto"
                  className="text-primary-foreground/80 hover:text-secondary transition-colors inline-flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-4 h-px bg-secondary transition-all" />
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-xl font-bold mb-6">Contacto</h4>
            {data && (
              <ul className="space-y-4 text-primary-foreground/80">
                <li className="flex items-start gap-3">
                  <Phone size={20} className="text-secondary flex-shrink-0 mt-1" />
                  <a href={`tel:${data.phone}`} className="hover:text-secondary transition-colors">
                    {data.phone}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail size={20} className="text-secondary flex-shrink-0 mt-1" />
                  <a href={`mailto:${data.email}`} className="hover:text-secondary transition-colors break-all">
                    {data.email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={20} className="text-secondary flex-shrink-0 mt-1" />
                  <span className="leading-relaxed">{data.address}</span>
                </li>
              </ul>
            )}
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-primary-foreground/60">
            <p>&copy; {currentYear} Pequeño Gran Hotel. Todos los derechos reservados.</p>
            <div className="flex gap-6 text-sm">
              <Link href="#" className="hover:text-secondary transition-colors">
                Política de Privacidad
              </Link>
              <Link href="#" className="hover:text-secondary transition-colors">
                Términos y Condiciones
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
      </>
    
  )
}
