import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { answers, lead } = body

    // Aquí puedes procesar los datos como necesites
    // Por ejemplo, guardar en base de datos, enviar emails, etc.

    console.log("Quiz Answers:", answers)
    console.log("Lead Data:", lead)

    // Simular procesamiento con IA
    const summary = generateAISummary(answers, lead)

    return NextResponse.json({
      success: true,
      summary: summary,
      message: "Lead procesado exitosamente",
    })
  } catch (error) {
    console.error("Error processing lead:", error)
    return NextResponse.json({ success: false, message: "Error interno del servidor" }, { status: 500 })
  }
}

function generateAISummary(answers: Record<string, string>, lead: any): string {
  // Esta función simula un resumen generado por IA
  // En producción, aquí integrarías con OpenAI, Claude, etc.

  const challenges = answers.q1 || "No especificado"
  const companySize = answers.q2 || "No especificado"
  const budget = answers.q3 || "No especificado"
  const timeline = answers.q5 || "No especificado"

  return `Hola ${lead.firstName}, basado en tu evaluación, hemos identificado que tu principal desafío es "${challenges}" para una empresa de tamaño "${companySize}". 

Con un presupuesto de "${budget}" y un timeline de "${timeline}", recomendamos una estrategia tecnológica enfocada en:

🚀 **Automatización Inteligente**: Implementación de procesos automatizados que reduzcan costos operativos en un 30-40%.

⚡ **Arquitectura Escalable**: Diseño de sistemas que crezcan con tu empresa sin requerir reestructuración completa.

📊 **Analytics Avanzado**: Dashboards en tiempo real para toma de decisiones basada en datos.

🔒 **Seguridad Enterprise**: Protocolos de seguridad robustos que cumplan con estándares internacionales.

Nuestro equipo ha desarrollado soluciones similares para empresas como la tuya, logrando un ROI promedio del 250% en el primer año. ¿Te gustaría conocer casos de éxito específicos y discutir una propuesta personalizada?`
}
