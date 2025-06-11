// Eliminar esta ruta API ya que ahora usaremos webhooks externos

import { type NextRequest, NextResponse } from "next/server"

// Esta ruta API ya no se utilizará, ya que ahora enviaremos los datos directamente a los webhooks externos.
// Sin embargo, la mantenemos como fallback por si es necesaria para pruebas locales.

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    console.log("Datos recibidos:", body)

    // Simular una respuesta exitosa
    return NextResponse.json({
      success: true,
      message: "Datos procesados correctamente",
    })
  } catch (error) {
    console.error("Error processing data:", error)
    return NextResponse.json({ success: false, message: "Error interno del servidor" }, { status: 500 })
  }
}
