"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import QuizComponent from "@/components/quiz-component"
import LeadForm from "@/components/lead-form"
import ResultsDisplay from "@/components/results-display"
import CalendlyModal from "@/components/calendly-modal"
import BackgroundEffects from "@/components/background-effects"

export default function HomePage() {
  const [currentStep, setCurrentStep] = useState<"quiz" | "form" | "results">("quiz")
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({})
  const [apiResponse, setApiResponse] = useState<string>("")
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleQuizComplete = (answers: Record<string, string>) => {
    setQuizAnswers(answers)
    setCurrentStep("form")
  }

  const handleFormSubmit = async (leadData: any) => {
    setCurrentStep("results")

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          answers: quizAnswers,
          lead: leadData,
        }),
      })

      const data = await response.json()

      // Simular loader de 2 segundos
      setTimeout(() => {
        setApiResponse(
          data.summary || "Análisis completado. Nuestro equipo revisará tus respuestas y te contactará pronto.",
        )
      }, 2000)
    } catch (error) {
      setTimeout(() => {
        setApiResponse("Error al procesar la información. Por favor, intenta nuevamente.")
      }, 2000)
    }
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

          {currentStep === "form" && (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <LeadForm onSubmit={handleFormSubmit} />
            </motion.div>
          )}

          {currentStep === "results" && (
            <motion.div
              key="results"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <ResultsDisplay response={apiResponse} onOpenModal={() => setIsModalOpen(true)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <CalendlyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
