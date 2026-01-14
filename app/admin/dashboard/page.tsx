"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Building2, Mail, Camera, LogOut, Tag, Wrench, FileText, Gift, ImageIcon, Info } from "lucide-react"

export default function AdminDashboardPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const adminAuth = localStorage.getItem("admin_authenticated")
    const sessionTime = localStorage.getItem("admin_session_time")

    console.log("[v0] Checking authentication in dashboard")
    console.log("[v0] Admin auth:", adminAuth)
    console.log("[v0] Session time:", sessionTime)

    if (adminAuth === "true" && sessionTime) {
      // Verificar que la sesión no haya expirado (24 horas)
      const currentTime = Date.now()
      const sessionAge = currentTime - Number.parseInt(sessionTime)
      const twentyFourHours = 24 * 60 * 60 * 1000

      if (sessionAge < twentyFourHours) {
        console.log("[v0] Session valid, user authenticated")
        setIsAuthenticated(true)
      } else {
        console.log("[v0] Session expired, redirecting to login")
        localStorage.clear()
        router.push("/admin/login")
      }
    } else {
      console.log("[v0] No valid session, redirecting to login")
      router.push("/admin/login")
    }

    setIsLoading(false)
  }, [router])

  const handleSignOut = () => {
    console.log("[v0] Signing out, clearing session")
    localStorage.clear()
    router.push("/admin/login")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream via-white to-gold/5">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-burgundy mx-auto mb-4"></div>
          <p className="text-dark-gray">Verificando acceso...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  const sections = [
    {
      title: "Hero / Inicio",
      description: "Editar el banner principal de la página de inicio",
      icon: Home,
      href: "/admin/hero",
      color: "bg-blue-500",
    },
    {
      title: "Sobre Nosotros",
      description: "Actualizar la sección Acerca del hotel",
      icon: Building2,
      href: "/admin/about",
      color: "bg-green-500",
    },
    {
      title: "Habitaciones",
      description: "Gestionar habitaciones y tarifas",
      icon: Building2,
      href: "/admin/rooms",
      color: "bg-purple-500",
    },
    {
      title: "Galería",
      description: "Administrar imágenes de la galería",
      icon: Camera,
      href: "/admin/gallery",
      color: "bg-pink-500",
    },
    {
      title: "Ofertas y Promociones",
      description: "Gestionar ofertas especiales y descuentos",
      icon: Tag,
      href: "/admin/offers",
      color: "bg-red-500",
    },
    {
      title: "Servicios",
      description: "Administrar servicios del hotel",
      icon: Wrench,
      href: "/admin/services",
      color: "bg-teal-500",
    },
    {
      title: "Políticas",
      description: "Actualizar políticas y términos del hotel",
      icon: FileText,
      href: "/admin/policies",
      color: "bg-indigo-500",
    },
    {
      title: "Recompensas",
      description: "Gestionar programa de puntos y beneficios",
      icon: Gift,
      href: "/admin/rewards",
      color: "bg-amber-500",
    },
    {
      title: "Información de Contacto",
      description: "Actualizar datos de contacto y redes sociales",
      icon: Mail,
      href: "/admin/contact",
      color: "bg-orange-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-white to-gold/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-6 border-b border-brown/10">
          <div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-brown mb-2">Panel de Administración</h1>
            <p className="text-dark-gray text-lg">Gestiona todo el contenido de tu sitio web</p>
          </div>
          <div className="flex gap-3">
            <Button asChild variant="outline" className="border-brown/30 text-brown hover:bg-brown/5 bg-transparent">
              <Link href="/" target="_blank">
                Ver Sitio
              </Link>
            </Button>
            <Button
              variant="outline"
              onClick={handleSignOut}
              className="gap-2 border-burgundy/30 text-burgundy hover:bg-burgundy/5 bg-transparent"
            >
              <LogOut size={18} />
              Cerrar Sesión
            </Button>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <Link key={section.href} href={section.href}>
                <Card className="hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer h-full border-brown/10 hover:border-burgundy/30 group">
                  <CardHeader className="pb-4">
                    <div
                      className={`w-14 h-14 rounded-xl ${section.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <CardTitle className="text-xl text-brown group-hover:text-burgundy transition-colors">
                      {section.title}
                    </CardTitle>
                    <CardDescription className="text-dark-gray">{section.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            )
          })}
        </div>

        {/* Quick Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-brown/10 bg-gradient-to-br from-blue-50 to-blue-100/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-dark-gray mb-1">Total Secciones</p>
                  <p className="text-3xl font-serif font-bold text-brown">{sections.length}</p>
                </div>
                <ImageIcon className="w-12 h-12 text-blue-500/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-brown/10 bg-gradient-to-br from-green-50 to-green-100/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-dark-gray mb-1">Gestión Completa</p>
                  <p className="text-3xl font-serif font-bold text-brown">100%</p>
                </div>
                <Info className="w-12 h-12 text-green-500/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-brown/10 bg-gradient-to-br from-purple-50 to-purple-100/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-dark-gray mb-1">Acceso Seguro</p>
                  <p className="text-lg font-medium text-brown">Variables ENV</p>
                </div>
                <svg className="w-12 h-12 text-purple-500/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
            </CardContent>
          </Card>

          <Card className="border-brown/10 bg-gradient-to-br from-amber-50 to-amber-100/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-dark-gray mb-1">Interfaz</p>
                  <p className="text-lg font-medium text-brown">Intuitiva</p>
                </div>
                <svg className="w-12 h-12 text-amber-500/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
