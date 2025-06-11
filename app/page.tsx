"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import QuizComponent from "@/components/quiz-component"
import ResultsAndForm from "@/components/results-and-form"
import ConfirmationDisplay from "@/components/confirmation-display"
import CalendlyModal from "@/components/calendly-modal"
import BackgroundEffects from "@/components/background-effects"

export default function HomePage() {
  const [currentStep, setCurrentStep] = useState<"quiz" | "results-form" | "confirmation">("quiz")
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({})
  const [quizResults, setQuizResults] = useState<{
    score: number
    reportHTML: string
  } | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleQuizComplete = async (answers: Record<string, string>) => {
    // Guardar respuestas
    setQuizAnswers(answers)

    try {
      // Mantener el código de fetch pero comentarlo para referencia
      /*
      const response = await fetch("https://hook.eu1.make.com/your-webhook-1-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answers }),
      });

      if (!response.ok) {
        throw new Error("Error al procesar las respuestas");
      }

      const data = await response.json();
      */

      // Simular la respuesta del webhook después de un tiempo de espera
      console.log("Enviando respuestas al webhook (simulado):", answers)

      // Esperar 1 segundo para simular el tiempo de respuesta de la red
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Crear una respuesta simulada basada en las respuestas
      const simulatedScore = calculateSimulatedScore(answers)
      const simulatedReportHTML = generateSimulatedReport(answers, simulatedScore)

      // Guardar score y reportHTML simulados
      setQuizResults({
        score: simulatedScore,
        reportHTML: simulatedReportHTML,
      })

      // Avanzar a la pantalla de resultados + formulario
      setCurrentStep("results-form")
    } catch (error) {
      console.error("Error al enviar respuestas:", error)
      // En caso de error, avanzar de todos modos
      setCurrentStep("results-form")
    }
  }

  const handleFormSubmit = async (leadData: any) => {
    try {
      // Mantener el código de fetch pero comentarlo para referencia
      /*
      const response = await fetch("https://hook.eu1.make.com/your-webhook-2-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          },
          body: JSON.stringify({
            leadInfo: leadData,
            score: quizResults?.score || 0,
            reportHTML: quizResults?.reportHTML || "",
          }),
        });

        if (!response.ok) {
          throw new Error("Error al procesar el formulario");
        }
        */

      // Simular el envío al webhook
      console.log("Enviando datos al webhook (simulado):", {
        leadInfo: leadData,
        score: quizResults?.score || 0,
        reportHTML: quizResults?.reportHTML || "",
      })

      // Esperar 1 segundo para simular el tiempo de respuesta de la red
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Avanzar a la pantalla de confirmación
      setCurrentStep("confirmation")
    } catch (error) {
      console.error("Error al enviar formulario:", error)
      // En caso de error, avanzar de todos modos
      setCurrentStep("confirmation")
    }
  }

  // Funciones auxiliares para generar respuestas simuladas
  const calculateSimulatedScore = (answers: Record<string, string>): number => {
    // Algoritmo simple: contar cuántas respuestas contienen palabras clave positivas
    const positiveKeywords = [
      "Avanzado",
      "Experto",
      "Crítica",
      "Data-driven",
      "Automatización",
      "Microservicios",
      "Nube",
      "Testing continuo",
      "Agile",
      "Backups automáticos",
    ]

    let score = 50 // Puntuación base

    // Analizar cada respuesta
    Object.values(answers).forEach((answer) => {
      // Sumar puntos por palabras clave positivas
      positiveKeywords.forEach((keyword) => {
        if (answer.includes(keyword)) {
          score += 2
        }
      })

      // Restar puntos por respuestas que indican menor madurez
      if (
        answer.includes("Principiante") ||
        answer.includes("No tenemos") ||
        answer.includes("Mínima") ||
        answer.includes("Poco importante")
      ) {
        score -= 3
      }
    })

    // Asegurar que el score esté entre 0 y 100
    return Math.min(Math.max(score, 0), 100)
  }

  const generateSimulatedReport = (answers: Record<string, string>, score: number): string => {
    // Generar un informe HTML basado en el score y algunas respuestas clave

    const strengths = []
    const weaknesses = []
    const recommendations = []

    // Analizar respuestas para determinar fortalezas y debilidades
    if (answers.q1?.includes("Automatización")) {
      strengths.push("Enfoque en automatización de procesos")
      recommendations.push("Implementar herramientas de RPA (Robotic Process Automation) para tareas repetitivas")
    } else {
      weaknesses.push("Falta de automatización en procesos clave")
      recommendations.push("Comenzar con la automatización de procesos repetitivos de alto volumen")
    }

    if (answers.q12?.includes("Data-driven")) {
      strengths.push("Cultura data-driven bien establecida")
      recommendations.push("Explorar modelos predictivos avanzados para anticipar tendencias del mercado")
    } else {
      weaknesses.push("Estrategia de datos subdesarrollada")
      recommendations.push("Implementar un data warehouse centralizado y dashboards de KPIs")
    }

    if (answers.q17?.includes("Microservicios")) {
      strengths.push("Arquitectura moderna y escalable")
      recommendations.push("Implementar CI/CD completo para acelerar el despliegue de microservicios")
    } else {
      weaknesses.push("Arquitectura potencialmente rígida o difícil de escalar")
      recommendations.push("Evaluar la migración gradual hacia microservicios para componentes críticos")
    }

    if (answers.q9?.includes("Protección")) {
      strengths.push("Conciencia sobre la importancia de la protección de datos")
      recommendations.push("Implementar encriptación end-to-end para datos sensibles")
    } else {
      weaknesses.push("Posibles vulnerabilidades en seguridad de datos")
      recommendations.push("Realizar un audit de seguridad completo y establecer políticas de protección de datos")
    }

    // Generar HTML basado en el análisis
    const reportHTML = `
      <h4 class="text-xl font-bold mb-4 text-[#FF4D00]">Resumen Ejecutivo</h4>
      <p class="mb-6">Basado en tus respuestas, tu organización muestra un nivel de madurez tecnológica ${
        score < 30 ? "inicial" : score < 60 ? "en desarrollo" : score < 80 ? "avanzado" : "excepcional"
      }. ${
        score < 50
          ? "Hay oportunidades significativas para mejorar y optimizar tu infraestructura tecnológica."
          : "Tu enfoque tecnológico está bien alineado con las mejores prácticas de la industria."
      }</p>
      
      <h4 class="text-lg font-bold mb-3 text-white">Fortalezas Identificadas</h4>
      <ul class="list-disc pl-5 mb-6 space-y-2">
      ${strengths.map((strength) => `<li>${strength}</li>`).join("")}
      ${strengths.length === 0 ? "<li>Disposición para evaluar y mejorar la infraestructura tecnológica</li>" : ""}
      </ul>
      
      <h4 class="text-lg font-bold mb-3 text-white">Áreas de Mejora</h4>
      <ul class="list-disc pl-5 mb-6 space-y-2">
      ${weaknesses.map((weakness) => `<li>${weakness}</li>`).join("")}
      ${weaknesses.length === 0 ? "<li>Mantener el ritmo de innovación frente a nuevas tecnologías emergentes</li>" : ""}
      </ul>
      
      <h4 class="text-lg font-bold mb-3 text-[#FF4D00]">Recomendaciones Estratégicas</h4>
      <ul class="list-disc pl-5 mb-4 space-y-2">
      ${recommendations.map((rec) => `<li>${rec}</li>`).join("")}
      <li>Establecer un roadmap tecnológico claro con objetivos a corto, mediano y largo plazo</li>
      <li>Invertir en capacitación continua del equipo en tecnologías emergentes</li>
      </ul>
      `

    return reportHTML
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <BackgroundEffects />

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {currentStep === "quiz" && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <QuizComponent onComplete={handleQuizComplete} />
            </motion.div>
          )}

          {currentStep === "results-form" && (
            <motion.div
              key="results-form"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <ResultsAndForm
                score={quizResults?.score || 0}
                reportHTML={quizResults?.reportHTML || ""}
                onSubmit={handleFormSubmit}
              />
            </motion.div>
          )}

          {currentStep === "confirmation" && (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <ConfirmationDisplay onOpenModal={() => setIsModalOpen(true)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <CalendlyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
