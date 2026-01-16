"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X, Phone, SettingsIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/habitaciones", label: "Habitaciones" },
    { href: "/ofertas", label: "Ofertas" },
    { href: "/turismo", label: "Turismo" },
    { href: "/servicios", label: "Servicios" },
    { href: "/reservaciones", label: "Reservaciones" },
    { href: "/recompensas", label: "Recompensas" },
    { href: "/politicas", label: "Políticas" },
  ]

  const bookingUrl = "https://crs.univisit.com/OnePageCrs/OnePageUI.aspx?Code=332B4B74416F6C43495A4D3D"

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 text-secondary-foreground bg-accent`}
    >
      <div className="container mx-auto px-4 bg-accent">
        <nav className="flex items-center justify-between h-24 bg-accent text-card">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/login"
              className={`p-2 rounded-sm transition-colors ${
                isScrolled ? "text-brown hover:bg-brown/10" : "text-white hover:bg-white/10"
              }`}
              title="Administración"
            >
              <SettingsIcon className="w-5 h-5 text-card" />
            </Link>

            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <div className="flex flex-col">
                <h1
                  className={`font-serif font-bold transition-colors text-xl text-card ${
                    isScrolled ? "text-brown" : "text-white"
                  }`}
                >
                  Pequeño Gran Hotel
                </h1>
                <span
                  className={`text-xs tracking-widest uppercase transition-colors text-accent-foreground ${
                    isScrolled ? "text-dark-gray" : "text-white/80"
                  }`}
                >
                  Aguascalientes
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 text-accent-foreground">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative font-medium transition-colors group text-accent-foreground ${
                  isScrolled ? "text-brown hover:text-burgundy" : "text-white hover:text-gold"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all ${
                    isScrolled ? "bg-burgundy" : "bg-gold"
                  }`}
                />
              </Link>
            ))}
            <div className="flex items-center gap-3">
              <Button
                asChild
                variant="outline"
                size="lg"
                className={`${
                  isScrolled
                    ? "border-brown text-brown hover:bg-brown hover:text-cream"
                    : "border-white text-white hover:bg-white hover:text-brown"
                }`}
              >
                <Link href="tel:+524491234567" className="flex items-center gap-2">
                  <Phone className="border-accent text-accent" size={18} />
                  
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-burgundy hover:bg-burgundy/90 text-cream text-accent-foreground">
                <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
                  Reservar
                </a>
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-sm transition-colors ${
              isScrolled ? "text-brown hover:bg-brown/10" : "text-white hover:bg-white/10"
            }`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden pb-6 animate-in slide-in-from-top bg-cream/95 backdrop-blur-md rounded-sm -mx-4 px-4 shadow-xl">
            <div className="flex flex-col gap-4 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-brown hover:text-burgundy transition-colors font-medium py-3 border-b border-brown/10 text-white"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-3 pt-2">
                <Button asChild variant="outline" size="lg" className="border-brown text-brown w-full bg-transparent text-card">
                  <Link href="tel:+524491234567" onClick={() => setIsMobileMenuOpen(false)}>
                    <Phone size={18} className="mr-2" />
                    Llamar Ahora
                  </Link>
                </Button>
                <Button asChild size="lg" className="bg-burgundy hover:bg-burgundy/90 text-cream w-full text-card">
                  <a
                    href={bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Reservar
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
