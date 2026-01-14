"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { AlertCircle } from "lucide-react"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    console.log("[v0] Login attempt started")

    try {
      const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL
      const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD

      console.log("[v0] Admin email from env:", adminEmail ? "Set" : "Not set")
      console.log("[v0] Admin password from env:", adminPassword ? "Set" : "Not set")
      console.log("[v0] Entered email:", email)

      if (!adminEmail || !adminPassword) {
        throw new Error("Variables de entorno no configuradas. Contacte al administrador.")
      }

      if (email === adminEmail && password === adminPassword) {
        console.log("[v0] Credentials match - setting session")
        localStorage.setItem("admin_authenticated", "true")
        localStorage.setItem("admin_email", email)
        localStorage.setItem("admin_session_time", Date.now().toString())

        console.log("[v0] Session set, redirecting to dashboard")

        window.location.href = "/admin/dashboard"
      } else {
        console.log("[v0] Credentials do not match")
        throw new Error("Credenciales incorrectas")
      }
    } catch (error: unknown) {
      console.error("[v0] Login error:", error)
      setError(error instanceof Error ? error.message : "Error al iniciar sesión")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brown/10 via-cream to-gold/10 p-6">
      <div className="w-full max-w-md">
        <Card className="border-brown/20 shadow-xl">
          <CardHeader className="space-y-3 text-center pb-8">
            <div className="mx-auto w-16 h-16 bg-burgundy rounded-full flex items-center justify-center mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-8 h-8 text-cream"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
            </div>
            <CardTitle className="font-serif text-3xl text-brown">Pequeño Gran Hotel</CardTitle>
            <CardDescription className="text-base text-dark-gray">Panel de Administración</CardDescription>
          </CardHeader>
          <CardContent className="pb-8">
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-brown font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@pequenogranhotel.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="border-brown/30 focus:border-burgundy"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-brown font-medium">
                  Contraseña
                </Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="border-brown/30 focus:border-burgundy"
                />
              </div>
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}
              <Button
                type="submit"
                className="w-full bg-burgundy hover:bg-burgundy/90 text-cream"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
