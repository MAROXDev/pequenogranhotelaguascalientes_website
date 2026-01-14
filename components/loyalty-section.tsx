"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, Star, Gift, TrendingUp } from "lucide-react"
import * as Icons from "lucide-react"
import Link from "next/link"

interface LoyaltyTier {
  id: string
  tier_name: string
  points_required: number
  benefits: string[]
  discount_percentage: number | null
  icon: string
  color: string
}

export function LoyaltySection({ data }: { data: LoyaltyTier[] }) {
  const getIcon = (iconName: string) => {
    const Icon = Icons[iconName as keyof typeof Icons] as any
    return Icon ? <Icon className="w-8 h-8" /> : <Star className="w-8 h-8" />
  }

  return (
    <section className="py-20 px-4 md:px-6 bg-cream">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gold/20 rounded-full mb-6">
            <Gift className="w-10 h-10 text-burgundy" />
          </div>
          <h1 className="font-serif text-4xl md:text-6xl text-brown mb-6">Programa de Recompensas</h1>
          <p className="text-lg text-dark-gray max-w-3xl mx-auto leading-relaxed">
            Gana puntos con cada estancia y disfruta de beneficios exclusivos. Mientras más nos visites, más recompensas
            obtendrás.
          </p>
        </div>

        {/* How it Works */}
        <div className="bg-white rounded-2xl p-8 md:p-12 mb-16 border border-brown/10">
          <h2 className="font-serif text-3xl text-brown text-center mb-8">¿Cómo Funciona?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-burgundy/10 rounded-full mb-4">
                <Star className="w-8 h-8 text-burgundy" />
              </div>
              <h3 className="font-serif text-xl text-brown mb-2">1. Regístrate</h3>
              <p className="text-dark-gray">
                Inscríbete gratuitamente en el programa y comienza a acumular puntos desde tu primera estancia
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-burgundy/10 rounded-full mb-4">
                <TrendingUp className="w-8 h-8 text-burgundy" />
              </div>
              <h3 className="font-serif text-xl text-brown mb-2">2. Acumula Puntos</h3>
              <p className="text-dark-gray">Gana 100 puntos por cada $100 pesos gastados en el hotel</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-burgundy/10 rounded-full mb-4">
                <Gift className="w-8 h-8 text-burgundy" />
              </div>
              <h3 className="font-serif text-xl text-brown mb-2">3. Disfruta Beneficios</h3>
              <p className="text-dark-gray">Canjea tus puntos por noches gratis, upgrades y servicios exclusivos</p>
            </div>
          </div>
        </div>

        {/* Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {data.map((tier, index) => (
            <Card
              key={tier.id}
              className={`relative overflow-hidden border-2 hover:shadow-2xl transition-all duration-300 ${
                index === data.length - 1 ? "border-burgundy md:col-span-2 lg:col-span-1" : "border-brown/20"
              }`}
            >
              {index === data.length - 1 && (
                <div className="absolute top-0 right-0 bg-burgundy text-cream px-4 py-1 text-xs font-bold">PREMIUM</div>
              )}

              <CardHeader className="text-center pb-4">
                <div
                  className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 mx-auto"
                  style={{ backgroundColor: `${tier.color}20` }}
                >
                  <div style={{ color: tier.color }}>{getIcon(tier.icon)}</div>
                </div>
                <h3 className="font-serif text-3xl text-brown mb-2">{tier.tier_name}</h3>
                <Badge
                  variant="outline"
                  className="mx-auto"
                  style={{
                    borderColor: tier.color,
                    color: tier.color,
                  }}
                >
                  {tier.points_required === 0 ? "Nivel Inicial" : `${tier.points_required.toLocaleString()} puntos`}
                </Badge>
              </CardHeader>

              <CardContent>
                {tier.discount_percentage && (
                  <div className="text-center mb-6 p-4 bg-gold/10 rounded-lg">
                    <div className="text-3xl font-serif text-burgundy">{tier.discount_percentage}%</div>
                    <div className="text-sm text-dark-gray">Descuento en reservas</div>
                  </div>
                )}

                <div className="space-y-3">
                  <p className="font-medium text-brown text-sm mb-3">Beneficios:</p>
                  {tier.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-burgundy shrink-0 mt-0.5" />
                      <span className="text-sm text-dark-gray leading-relaxed">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-burgundy via-brown to-burgundy text-cream rounded-2xl p-12 text-center">
          <h2 className="font-serif text-3xl md:text-4xl mb-4">¿Listo para Comenzar?</h2>
          <p className="text-cream/90 mb-8 text-lg max-w-2xl mx-auto">
            Únete hoy al Programa de Recompensas y comienza a disfrutar de beneficios exclusivos desde tu primera
            reserva
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/reservar">
              <Button size="lg" className="bg-cream text-burgundy hover:bg-cream/90 border-0">
                Hacer una Reserva
              </Button>
            </Link>
            <a href="mailto:info@pequenogranhotel.com">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-cream text-cream hover:bg-cream/10"
              >
                Más Información
              </Button>
            </a>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl text-brown text-center mb-8">Preguntas Frecuentes</h2>
          <div className="space-y-4">
            {[
              {
                q: "¿Cómo me inscribo al programa?",
                a: "Puedes inscribirte de forma gratuita al hacer tu primera reserva o contactándonos directamente por teléfono o email.",
              },
              {
                q: "¿Los puntos expiran?",
                a: "Los puntos permanecen activos mientras realices al menos una estancia cada 12 meses. Después de este período, los puntos pueden expirar.",
              },
              {
                q: "¿Puedo combinar puntos con promociones?",
                a: "Sí, en la mayoría de los casos puedes acumular puntos incluso cuando aprovechas nuestras ofertas especiales.",
              },
              {
                q: "¿Cómo subo de nivel?",
                a: "Subes de nivel automáticamente al acumular los puntos requeridos. Tu nivel se mantiene por 12 meses desde que lo alcanzas.",
              },
            ].map((faq, idx) => (
              <Card key={idx} className="border-brown/10">
                <CardContent className="p-6">
                  <h3 className="font-medium text-brown mb-2">{faq.q}</h3>
                  <p className="text-dark-gray text-sm leading-relaxed">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
