"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ChevronRight, ChevronLeft, Loader2, RotateCcw } from "lucide-react"

interface QuizComponentProps {
  onComplete: (answers: Record<string, string>) => void
  savedAnswers?: Record<string, string>
  onReset?: () => void
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
  {
    id: "q8",
    question: "¿Qué nivel de madurez digital tiene tu empresa?",
    options: [
      "Principiante - Apenas comenzando la transformación digital",
      "Intermedio - Algunos procesos digitalizados",
      "Avanzado - Mayoría de procesos digitalizados",
      "Experto - Completamente digital y data-driven",
    ],
  },
  {
    id: "q9",
    question: "¿Cuál es tu principal preocupación en ciberseguridad?",
    options: [
      "Protección de datos sensibles",
      "Prevención de ataques externos",
      "Cumplimiento normativo",
      "Seguridad en la nube",
    ],
  },
  {
    id: "q10",
    question: "¿Qué tan importante es la escalabilidad para tu negocio?",
    options: [
      "Crítica - Esperamos crecimiento exponencial",
      "Muy importante - Crecimiento constante",
      "Importante - Crecimiento moderado",
      "Poco importante - Tamaño estable",
    ],
  },
  {
    id: "q11",
    question: "¿Qué enfoque prefieres para el desarrollo de software?",
    options: ["Desarrollo interno con equipo propio", "Outsourcing completo", "Modelo híbrido", "No-code/Low-code"],
  },
  {
    id: "q12",
    question: "¿Cuál es tu estrategia de datos actual?",
    options: [
      "No tenemos una estrategia definida",
      "Recopilamos datos pero no los analizamos sistemáticamente",
      "Análisis de datos básico para decisiones",
      "Data-driven con analítica avanzada/IA",
    ],
  },
  {
    id: "q13",
    question: "¿Qué tan importante es la experiencia de usuario (UX) para tu producto?",
    options: [
      "Crítica - Es nuestra ventaja competitiva",
      "Muy importante - Invertimos significativamente en UX",
      "Importante - Seguimos buenas prácticas",
      "Secundaria - Priorizamos funcionalidad",
    ],
  },
  {
    id: "q14",
    question: "¿Qué enfoque tienes hacia la innovación tecnológica?",
    options: [
      "Early adopter - Siempre buscamos lo último",
      "Seguidor temprano - Adoptamos tecnología probada pero reciente",
      "Mayoría - Esperamos que la tecnología madure",
      "Conservador - Solo tecnologías establecidas",
    ],
  },
  {
    id: "q15",
    question: "¿Cuál es tu principal desafío en la gestión de proyectos tecnológicos?",
    options: [
      "Cumplir plazos y presupuestos",
      "Gestionar cambios de alcance",
      "Comunicación entre equipos técnicos y no técnicos",
      "Asegurar calidad y testing",
    ],
  },
  {
    id: "q16",
    question: "¿Qué tan importante es la movilidad en tu estrategia digital?",
    options: [
      "Crítica - Mobile-first en todo",
      "Muy importante - Aplicaciones móviles son clave",
      "Importante - Necesitamos responsive design",
      "Secundaria - Principalmente desktop",
    ],
  },
  {
    id: "q17",
    question: "¿Qué enfoque tienes hacia la arquitectura de sistemas?",
    options: [
      "Monolítica - Sistema único integrado",
      "Microservicios - Componentes independientes",
      "Híbrida - Combinación según necesidades",
      "Serverless - Enfoque en funciones",
    ],
  },
  {
    id: "q18",
    question: "¿Cuál es tu estrategia de nube?",
    options: ["Todo en la nube pública", "Nube privada", "Híbrida (pública y privada)", "On-premise principalmente"],
  },
  {
    id: "q19",
    question: "¿Qué tan importante es la automatización para tu negocio?",
    options: [
      "Crítica - Buscamos automatizar todo lo posible",
      "Muy importante - Automatizamos procesos clave",
      "Importante - Automatizamos selectivamente",
      "Limitada - Preferimos control manual",
    ],
  },
  {
    id: "q20",
    question: "¿Cuál es tu enfoque hacia la integración de sistemas?",
    options: [
      "Ecosistema único de un proveedor",
      "Best-of-breed con integraciones",
      "Desarrollo personalizado con APIs",
      "Sistemas independientes",
    ],
  },
  {
    id: "q21",
    question: "¿Qué tan importante es el time-to-market para tu negocio?",
    options: [
      "Crítico - Velocidad ante todo",
      "Muy importante - Balanceamos velocidad y calidad",
      "Importante - Preferimos calidad sobre velocidad",
      "Secundario - Nos enfocamos en perfección",
    ],
  },
  {
    id: "q22",
    question: "¿Cuál es tu enfoque hacia el testing y QA?",
    options: [
      "Testing continuo automatizado",
      "Testing manual exhaustivo",
      "Testing básico de funcionalidades clave",
      "Testing mínimo",
    ],
  },
  {
    id: "q23",
    question: "¿Qué metodología de desarrollo prefieres?",
    options: ["Agile/Scrum", "Kanban", "Waterfall", "Híbrido según proyecto"],
  },
  {
    id: "q24",
    question: "¿Cuál es tu estrategia de backup y recuperación?",
    options: [
      "Backups automáticos con recuperación inmediata",
      "Backups regulares con plan de recuperación",
      "Backups ocasionales",
      "No tenemos estrategia formal",
    ],
  },
  {
    id: "q25",
    question: "¿Qué tan importante es la accesibilidad en tus productos digitales?",
    options: [
      "Crítica - Cumplimos estándares WCAG AAA",
      "Muy importante - Cumplimos WCAG AA",
      "Importante - Consideraciones básicas",
      "No es prioridad actualmente",
    ],
  },
  {
    id: "q26",
    question: "¿Cuál es tu enfoque hacia la documentación técnica?",
    options: [
      "Documentación exhaustiva y actualizada",
      "Documentación de componentes clave",
      "Documentación básica",
      "Mínima o inexistente",
    ],
  },
  {
    id: "q27",
    question: "¿Qué tan importante es la sostenibilidad en tu estrategia tecnológica?",
    options: [
      "Crítica - Optimizamos para eficiencia energética",
      "Importante - Consideramos el impacto ambiental",
      "En desarrollo - Comenzando a implementar prácticas",
      "No es prioridad actualmente",
    ],
  },
  {
    id: "q28",
    question: "¿Cuál es tu visión tecnológica a largo plazo?",
    options: [
      "Liderazgo innovador en el sector",
      "Adopción estratégica de tecnologías probadas",
      "Optimización continua de sistemas existentes",
      "Estabilidad y confiabilidad ante todo",
    ],
  },
]

export default function QuizComponent({ onComplete, savedAnswers = {}, onReset }: QuizComponentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>(savedAnswers)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Cargar respuestas guardadas y determinar la pregunta actual
  useEffect(() => {
    if (Object.keys(savedAnswers).length > 0) {
      setAnswers(savedAnswers)

      // Encontrar la primera pregunta sin responder o ir a la última respondida
      const answeredQuestions = Object.keys(savedAnswers).length
      if (answeredQuestions < questions.length) {
        setCurrentQuestion(answeredQuestions)
      } else {
        setCurrentQuestion(questions.length - 1)
      }
    }
  }, [savedAnswers])

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
      // Si es la última pregunta, iniciamos el proceso de envío directamente
      handleSubmit()
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const handleSubmit = async () => {
    // Evitar múltiples envíos
    if (isSubmitting) return

    setIsSubmitting(true)

    // Simular un tiempo de carga de 4 segundos como se solicitó
    await new Promise((resolve) => setTimeout(resolve, 4000))

    // Simular envío al webhook (la lógica real está en page.tsx)
    console.log("Quiz completado, respuestas:", answers)

    // Importante: mantener isSubmitting en true para evitar que se vuelva a mostrar la pregunta
    // No establecer isSubmitting a false aquí

    // Llamar a onComplete para avanzar a la siguiente pantalla
    onComplete(answers)
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

          {/* Botón de reset si hay respuestas guardadas */}
          {Object.keys(savedAnswers).length > 0 && onReset && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-4">
              <Button
                onClick={onReset}
                variant="outline"
                size="sm"
                className="bg-transparent border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Empezar de nuevo
              </Button>
            </motion.div>
          )}
        </motion.div>

        {isSubmitting ? (
          <motion.div className="text-center py-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="inline-block mb-6"
            >
              <Loader2 className="w-16 h-16 text-[#FF4D00]" />
            </motion.div>
            <h3 className="text-2xl font-bold mb-4">Procesando tus respuestas...</h3>
            <p className="text-gray-400 text-lg">Estamos analizando tu perfil tecnológico</p>
            <motion.div
              className="mt-8 flex justify-center space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 bg-[#FF4D00] rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        ) : (
          <>
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
                <h2 className="text-2xl md:text-3xl font-bold mb-8 leading-tight">
                  {questions[currentQuestion].question}
                </h2>

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
                {currentQuestion === questions.length - 1 ? "Ver mi resultado" : "Siguiente"}
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </>
        )}
      </div>
    </div>
  )
}
