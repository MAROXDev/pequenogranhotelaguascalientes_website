"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import * as Icons from "lucide-react"

interface Policy {
  id: string
  category: string
  title: string
  content: string
  icon: string
}

export function PoliciesSection({ data }: { data: Policy[] }) {
  const getIcon = (iconName: string) => {
    const Icon = Icons[iconName as keyof typeof Icons] as any
    return Icon ? <Icon className="w-6 h-6" /> : null
  }

  return (
    <section className="py-20 px-4 md:px-6 bg-cream">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-6xl text-brown mb-6 mt-6">Políticas del Hotel</h1>
          <p className="text-lg text-dark-gray max-w-3xl mx-auto leading-relaxed">
            Información importante sobre nuestras políticas y procedimientos para garantizar una estancia placentera
          </p>
        </div>

        {/* Policies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {data.map((policy) => (
            <Card key={policy.id} className="border-brown/10 hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-burgundy/10 rounded-lg text-burgundy shrink-0">{getIcon(policy.icon)}</div>
                  <div>
                    <h3 className="font-serif text-2xl text-brown mb-2">{policy.title}</h3>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-dark-gray leading-relaxed">{policy.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Important Notice */}
        <Card className="bg-gradient-to-r from-gold/20 to-gold/10 border-gold/30">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-burgundy rounded-lg text-cream shrink-0">
                <Icons.AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-2xl text-brown mb-3">Información Importante</h3>
                <p className="text-dark-gray leading-relaxed mb-4">
                  Todas nuestras políticas están diseñadas para garantizar la mejor experiencia para todos nuestros
                  huéspedes. Si tienes alguna pregunta o necesitas hacer una excepción, por favor contáctanos
                  directamente.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <a
                    href="tel:+524491234567"
                    className="inline-flex items-center justify-center px-6 py-3 bg-burgundy text-cream rounded-lg hover:bg-burgundy/90 transition-colors font-medium"
                  >
                    <Icons.Phone className="w-4 h-4 mr-2" />
                    Llamar al Hotel
                  </a>
                  <a
                    href="mailto:info@pequenogranhotel.com"
                    className="inline-flex items-center justify-center px-6 py-3 bg-brown text-cream rounded-lg hover:bg-brown/90 transition-colors font-medium"
                  >
                    <Icons.Mail className="w-4 h-4 mr-2" />
                    Enviar Email
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center border-brown/10">
            <CardContent className="pt-8 pb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-burgundy/10 rounded-full mb-4">
                <Icons.Shield className="w-8 h-8 text-burgundy" />
              </div>
              <h3 className="font-serif text-xl text-brown mb-2">Reserva Segura</h3>
              <p className="text-dark-gray text-sm leading-relaxed">
                Tus datos están protegidos con los más altos estándares de seguridad
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-brown/10">
            <CardContent className="pt-8 pb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-burgundy/10 rounded-full mb-4">
                <Icons.Headphones className="w-8 h-8 text-burgundy" />
              </div>
              <h3 className="font-serif text-xl text-brown mb-2">Atención 24/7</h3>
              <p className="text-dark-gray text-sm leading-relaxed">
                Nuestro equipo está disponible en todo momento para asistirte
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-brown/10">
            <CardContent className="pt-8 pb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-burgundy/10 rounded-full mb-4">
                <Icons.ThumbsUp className="w-8 h-8 text-burgundy" />
              </div>
              <h3 className="font-serif text-xl text-brown mb-2">Flexibilidad</h3>
              <p className="text-dark-gray text-sm leading-relaxed">
                Ofrecemos opciones flexibles para adaptarnos a tus necesidades
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
