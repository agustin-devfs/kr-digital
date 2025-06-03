"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ChevronRight, ChevronLeft } from "lucide-react"

interface QuizComponentProps {
  onComplete: (answers: Record<string, string>) => void
}

const questions = [
  {
    id: "q1",
    question: "¿Cuál es el principal desafío de tu empresa actualmente?",
    options: [
      "Automatización de procesos",
      "Transformación digital",
      "Optimización de costos",
      "Escalabilidad tecnológica",
    ],
  },
  {
    id: "q2",
    question: "¿Qué tamaño tiene tu organización?",
    options: [
      "Startup (1-10 empleados)",
      "Pequeña empresa (11-50 empleados)",
      "Mediana empresa (51-200 empleados)",
      "Gran empresa (200+ empleados)",
    ],
  },
  {
    id: "q3",
    question: "¿Cuál es tu presupuesto aproximado para soluciones tecnológicas?",
    options: ["Menos de $10,000", "$10,000 - $50,000", "$50,000 - $100,000", "Más de $100,000"],
  },
  {
    id: "q4",
    question: "¿Qué tecnologías utilizas actualmente?",
    options: [
      "Sistemas legacy principalmente",
      "Mix de legacy y moderno",
      "Tecnologías modernas",
      "Cutting-edge tech stack",
    ],
  },
  {
    id: "q5",
    question: "¿Cuál es tu timeline para implementar una solución?",
    options: [
      "Inmediato (1-3 meses)",
      "Corto plazo (3-6 meses)",
      "Mediano plazo (6-12 meses)",
      "Largo plazo (12+ meses)",
    ],
  },
  {
    id: "q6",
    question: "¿Qué área necesita más atención?",
    options: ["Desarrollo de software", "Infraestructura y DevOps", "Análisis de datos", "Experiencia de usuario"],
  },
  {
    id: "q7",
    question: "¿Cómo mides el éxito de un proyecto tecnológico?",
    options: [
      "ROI y métricas financieras",
      "Eficiencia operacional",
      "Satisfacción del usuario",
      "Innovación y diferenciación",
    ],
  },
]

export default function QuizComponent({ onComplete }: QuizComponentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const handleAnswer = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestion].id]: value,
    }))
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      onComplete(answers)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">TECH ASSESSMENT</h1>
          <p className="text-xl text-gray-400 font-medium">Descubre la solución perfecta para tu empresa</p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div className="mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>
              Pregunta {currentQuestion + 1} de {questions.length}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-[#FF4D00] to-[#FF6F3C] h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>

        {/* Question Card */}
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="bg-gray-900/50 border-gray-800 rounded-2xl p-8 shadow-xl backdrop-blur-sm">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 leading-tight">{questions[currentQuestion].question}</h2>

            <RadioGroup
              value={answers[questions[currentQuestion].id] || ""}
              onValueChange={handleAnswer}
              className="space-y-4"
            >
              {questions[currentQuestion].options.map((option, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="flex items-center space-x-4 p-4 rounded-xl border border-gray-700 hover:border-[#FF4D00] transition-all duration-300 cursor-pointer hover:bg-gray-800/30">
                    <RadioGroupItem value={option} id={option} className="border-gray-600" />
                    <Label
                      htmlFor={option}
                      className="text-lg font-medium cursor-pointer flex-1 group-hover:text-[#FF4D00] transition-colors"
                    >
                      {option}
                    </Label>
                  </div>
                </motion.div>
              ))}
            </RadioGroup>
          </Card>
        </motion.div>

        {/* Navigation */}
        <motion.div
          className="flex justify-between mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            variant="outline"
            className="bg-transparent border-gray-700 text-white hover:bg-gray-800 disabled:opacity-30"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Anterior
          </Button>

          <Button
            onClick={handleNext}
            disabled={!answers[questions[currentQuestion].id]}
            className="bg-white text-black hover:bg-gray-200 font-bold px-8 disabled:opacity-50"
          >
            {currentQuestion === questions.length - 1 ? "Finalizar" : "Siguiente"}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
