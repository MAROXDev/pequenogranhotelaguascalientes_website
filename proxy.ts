import { type NextRequest, NextResponse } from "next/server"

export async function proxy(request: NextRequest) {
  // Permitir acceso a la página de login
  if (request.nextUrl.pathname === "/admin/login") {
    return NextResponse.next()
  }

  // El verdadero chequeo de autenticación se hace en cada página de admin
  if (request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
