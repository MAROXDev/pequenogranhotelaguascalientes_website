"use client"

import type React from "react"

import { MapPin, Phone, Mail, Instagram, Facebook, MessageCircle, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface ContactData {
  address: string
  phone: string
  email: string
  whatsapp: string | null
  instagram: string | null
  facebook: string | null
}

interface ContactProps {
  data: ContactData | null
}

export function Contact({ data }: ContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  if (!data) return null

  const contactItems = [
    {
      icon: MapPin,
      label: "Dirección",
      value: data.address,
      href: `https://maps.google.com/?q=${encodeURIComponent(data.address)}`,
    },
    {
      icon: Phone,
      label: "Teléfono",
      value: data.phone,
      href: `tel:${data.phone}`,
    },
    {
      icon: Mail,
      label: "Email",
      value: data.email,
      href: `mailto:${data.email}`,
    },
    {
      icon: Clock,
      label: "Horario",
      value: "Recepción 24/7",
      href: "#",
    },
  ]

  const socialLinks = [
    data.whatsapp && {
      icon: MessageCircle,
      label: "WhatsApp",
      href: `https://wa.me/${data.whatsapp.replace(/\D/g, "")}`,
      color: "bg-green-600 hover:bg-green-700",
    },
    data.instagram && {
      icon: Instagram,
      label: "Instagram",
      href: `https://instagram.com/${data.instagram.replace("@", "")}`,
      color: "bg-pink-600 hover:bg-pink-700",
    },
    data.facebook && {
      icon: Facebook,
      label: "Facebook",
      href: `https://facebook.com/${data.facebook}`,
      color: "bg-blue-600 hover:bg-blue-700",
    },
  ].filter(Boolean)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  return (
    <section id="contacto" className="py-24 md:py-40 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-secondary/5 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <div className="w-24 h-1 bg-accent mx-auto mb-6" />
          <h2 className="font-serif md:text-6xl lg:text-7xl font-bold text-primary mb-6 text-balance text-4xl">
            Contáctanos
          </h2>
          <p className="text-2xl text-muted-foreground max-w-3xl mx-auto text-balance leading-relaxed">
            Estamos aquí para hacer de tu estancia una experiencia inolvidable
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="order-2 lg:order-1">
              <Card className="border-0 shadow-2xl">
                <CardContent className="p-8 md:p-12">
                  <h3 className="font-serif text-3xl font-bold text-primary mb-8">Envíanos un mensaje</h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Nombre completo
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-sm border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Correo electrónico
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-sm border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-sm border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                        Mensaje
                      </label>
                      <textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={5}
                        className="w-full px-4 py-3 rounded-sm border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                        required
                      />
                    </div>
                    <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90 text-lg py-6">
                      Enviar Mensaje
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="order-1 lg:order-2 space-y-8">
              <div className="grid gap-6">
                {contactItems.map((item, index) => (
                  <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow mx-0 px-0">
                    <CardContent className="p-6">
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="flex items-center gap-6 group"
                      >
                        <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:scale-110 transition-all flex-shrink-0">
                          <item.icon className="w-6 h-6 text-accent group-hover:text-white transition-colors" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-foreground mb-1">{item.label}</p>
                          <p className="text-muted-foreground leading-relaxed">{item.value}</p>
                        </div>
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Social Links */}
              {socialLinks.length > 0 && (
                <Card className="border-0 shadow-lg bg-card">
                  <CardContent className="p-8">
                    <h3 className="font-serif text-2xl font-bold text-primary mb-6">Síguenos en redes sociales</h3>
                    <div className="flex flex-col sm:flex-row gap-4">
                      {socialLinks.map((social, index) => {
                        if (!social) return null
                        const Icon = social.icon
                        return (
                          <a
                            key={index}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex-1 h-14 rounded-sm ${social.color} flex items-center justify-center transition-all hover:scale-105 shadow-md group`}
                            aria-label={social.label}
                          >
                            <Icon className="w-6 h-6 text-white" />
                          </a>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Map placeholder */}
              <Card className="border-0 shadow-lg overflow-hidden">
                <div className="relative h-80 bg-muted">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7405.004504906817!2d-102.311977!3d21.876727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8429ee84d29d523f%3A0x905e018193e38bb9!2sPeque%C3%B1o%20Gran%20Hotel!5e0!3m2!1ses-419!2sus!4v1768509552141!5m2!1ses-419!2sus" 
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    className="grayscale"
                  />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* 
<iframe 
src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3702.4632249165297!2d-102.28343352494343!3d21.8782310799922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8429cc1cab1121e1%3A0x6044fc8a3fc17cad!2sPlaza%20Kristal!5e0!3m2!1ses-419!2smx!4v1741233195130!5m2!1ses-419!2smx" 

width="100%" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

*/
