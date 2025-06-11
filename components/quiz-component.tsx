"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ChevronRight, ChevronLeft, Loader2, RotateCcw } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface QuizComponentProps {
  onComplete: (answers: Record<string, string>) => void
  savedAnswers?: Record<string, string>
  onReset?: () => void
}

const questions = [
  {
    id: "q1",
    question: {
      es: "¿Cuál es el principal desafío de tu empresa actualmente?",
      en: "What is the main challenge of your company currently?",
    },
    options: {
      es: [
        "Automatización de procesos",
        "Transformación digital",
        "Optimización de costos",
        "Escalabilidad tecnológica",
      ],
      en: ["Process automation", "Digital transformation", "Cost optimization", "Technological scalability"],
    },
  },
  {
    id: "q2",
    question: {
      es: "¿Qué tamaño tiene tu organización?",
      en: "What size is your organization?",
    },
    options: {
      es: [
        "Startup (1-10 empleados)",
        "Pequeña empresa (11-50 empleados)",
        "Mediana empresa (51-200 empleados)",
        "Gran empresa (200+ empleados)",
      ],
      en: [
        "Startup (1-10 employees)",
        "Small business (11-50 employees)",
        "Medium business (51-200 employees)",
        "Large enterprise (200+ employees)",
      ],
    },
  },
  {
    id: "q3",
    question: {
      es: "¿Cuál es tu presupuesto aproximado para soluciones tecnológicas?",
      en: "What is your approximate budget for technology solutions?",
    },
    options: {
      es: ["Menos de $10,000", "$10,000 - $50,000", "$50,000 - $100,000", "Más de $100,000"],
      en: ["Less than $10,000", "$10,000 - $50,000", "$50,000 - $100,000", "More than $100,000"],
    },
  },
  {
    id: "q4",
    question: {
      es: "¿Qué tecnologías utilizas actualmente?",
      en: "What technologies are you currently using?",
    },
    options: {
      es: [
        "Sistemas legacy principalmente",
        "Mix de legacy y moderno",
        "Tecnologías modernas",
        "Cutting-edge tech stack",
      ],
      en: ["Mainly legacy systems", "Mix of legacy and modern", "Modern technologies", "Cutting-edge tech stack"],
    },
  },
  {
    id: "q5",
    question: {
      es: "¿Cuál es tu timeline para implementar una solución?",
      en: "What is your timeline for implementing a solution?",
    },
    options: {
      es: ["Inmediato (1-3 meses)", "Corto plazo (3-6 meses)", "Mediano plazo (6-12 meses)", "Largo plazo (12+ meses)"],
      en: ["Immediate (1-3 months)", "Short term (3-6 months)", "Medium term (6-12 months)", "Long term (12+ months)"],
    },
  },
  {
    id: "q6",
    question: {
      es: "¿Qué área necesita más atención?",
      en: "Which area needs more attention?",
    },
    options: {
      es: ["Desarrollo de software", "Infraestructura y DevOps", "Análisis de datos", "Experiencia de usuario"],
      en: ["Software development", "Infrastructure and DevOps", "Data analysis", "User experience"],
    },
  },
  {
    id: "q7",
    question: {
      es: "¿Cómo mides el éxito de un proyecto tecnológico?",
      en: "How do you measure the success of a technology project?",
    },
    options: {
      es: [
        "ROI y métricas financieras",
        "Eficiencia operacional",
        "Satisfacción del usuario",
        "Innovación y diferenciación",
      ],
      en: [
        "ROI and financial metrics",
        "Operational efficiency",
        "User satisfaction",
        "Innovation and differentiation",
      ],
    },
  },
  {
    id: "q8",
    question: {
      es: "¿Qué nivel de madurez digital tiene tu empresa?",
      en: "What level of digital maturity does your company have?",
    },
    options: {
      es: [
        "Principiante - Apenas comenzando la transformación digital",
        "Intermedio - Algunos procesos digitalizados",
        "Avanzado - Mayoría de procesos digitalizados",
        "Experto - Completamente digital y data-driven",
      ],
      en: [
        "Beginner - Just starting digital transformation",
        "Intermediate - Some digitized processes",
        "Advanced - Most processes digitized",
        "Expert - Completely digital and data-driven",
      ],
    },
  },
  {
    id: "q9",
    question: {
      es: "¿Cuál es tu principal preocupación en ciberseguridad?",
      en: "What is your main cybersecurity concern?",
    },
    options: {
      es: [
        "Protección de datos sensibles",
        "Prevención de ataques externos",
        "Cumplimiento normativo",
        "Seguridad en la nube",
      ],
      en: ["Protection of sensitive data", "Prevention of external attacks", "Regulatory compliance", "Cloud security"],
    },
  },
  {
    id: "q10",
    question: {
      es: "¿Qué tan importante es la escalabilidad para tu negocio?",
      en: "How important is scalability for your business?",
    },
    options: {
      es: [
        "Crítica - Esperamos crecimiento exponencial",
        "Muy importante - Crecimiento constante",
        "Importante - Crecimiento moderado",
        "Poco importante - Tamaño estable",
      ],
      en: [
        "Critical - We expect exponential growth",
        "Very important - Constant growth",
        "Important - Moderate growth",
        "Not very important - Stable size",
      ],
    },
  },
  {
    id: "q11",
    question: {
      es: "¿Qué enfoque prefieres para el desarrollo de software?",
      en: "What approach do you prefer for software development?",
    },
    options: {
      es: ["Desarrollo interno con equipo propio", "Outsourcing completo", "Modelo híbrido", "No-code/Low-code"],
      en: ["Internal development with own team", "Complete outsourcing", "Hybrid model", "No-code/Low-code"],
    },
  },
  {
    id: "q12",
    question: {
      es: "¿Cuál es tu estrategia de datos actual?",
      en: "What is your current data strategy?",
    },
    options: {
      es: [
        "No tenemos una estrategia definida",
        "Recopilamos datos pero no los analizamos sistemáticamente",
        "Análisis de datos básico para decisiones",
        "Data-driven con analítica avanzada/IA",
      ],
      en: [
        "We don't have a defined strategy",
        "We collect data but don't analyze it systematically",
        "Basic data analysis for decisions",
        "Data-driven with advanced analytics/AI",
      ],
    },
  },
  {
    id: "q13",
    question: {
      es: "¿Qué tan importante es la experiencia de usuario (UX) para tu producto?",
      en: "How important is user experience (UX) for your product?",
    },
    options: {
      es: [
        "Crítica - Es nuestra ventaja competitiva",
        "Muy importante - Invertimos significativamente en UX",
        "Importante - Seguimos buenas prácticas",
        "Secundaria - Priorizamos funcionalidad",
      ],
      en: [
        "Critical - It's our competitive advantage",
        "Very important - We invest significantly in UX",
        "Important - We follow best practices",
        "Secondary - We prioritize functionality",
      ],
    },
  },
  {
    id: "q14",
    question: {
      es: "¿Qué enfoque tienes hacia la innovación tecnológica?",
      en: "What approach do you have towards technological innovation?",
    },
    options: {
      es: [
        "Early adopter - Siempre buscamos lo último",
        "Seguidor temprano - Adoptamos tecnología probada pero reciente",
        "Mayoría - Esperamos que la tecnología madure",
        "Conservador - Solo tecnologías establecidas",
      ],
      en: [
        "Early adopter - Always looking for the latest",
        "Early follower - We adopt proven but recent technology",
        "Majority - We wait for technology to mature",
        "Conservative - Only established technologies",
      ],
    },
  },
  {
    id: "q15",
    question: {
      es: "¿Cuál es tu principal desafío en la gestión de proyectos tecnológicos?",
      en: "What is your main challenge in managing technology projects?",
    },
    options: {
      es: [
        "Cumplir plazos y presupuestos",
        "Gestionar cambios de alcance",
        "Comunicación entre equipos técnicos y no técnicos",
        "Asegurar calidad y testing",
      ],
      en: [
        "Meeting deadlines and budgets",
        "Managing scope changes",
        "Communication between technical and non-technical teams",
        "Ensuring quality and testing",
      ],
    },
  },
  {
    id: "q16",
    question: {
      es: "¿Qué tan importante es la movilidad en tu estrategia digital?",
      en: "How important is mobility in your digital strategy?",
    },
    options: {
      es: [
        "Crítica - Mobile-first en todo",
        "Muy importante - Aplicaciones móviles son clave",
        "Importante - Necesitamos responsive design",
        "Secundaria - Principalmente desktop",
      ],
      en: [
        "Critical - Mobile-first in everything",
        "Very important - Mobile apps are key",
        "Important - We need responsive design",
        "Secondary - Mainly desktop",
      ],
    },
  },
  {
    id: "q17",
    question: {
      es: "¿Qué enfoque tienes hacia la arquitectura de sistemas?",
      en: "What approach do you have towards system architecture?",
    },
    options: {
      es: [
        "Monolítica - Sistema único integrado",
        "Microservicios - Componentes independientes",
        "Híbrida - Combinación según necesidades",
        "Serverless - Enfoque en funciones",
      ],
      en: [
        "Monolithic - Single integrated system",
        "Microservices - Independent components",
        "Hybrid - Combination according to needs",
        "Serverless - Focus on functions",
      ],
    },
  },
  {
    id: "q18",
    question: {
      es: "¿Cuál es tu estrategia de nube?",
      en: "What is your cloud strategy?",
    },
    options: {
      es: ["Todo en la nube pública", "Nube privada", "Híbrida (pública y privada)", "On-premise principalmente"],
      en: ["Everything in the public cloud", "Private cloud", "Hybrid (public and private)", "Mainly on-premise"],
    },
  },
  {
    id: "q19",
    question: {
      es: "¿Qué tan importante es la automatización para tu negocio?",
      en: "How important is automation for your business?",
    },
    options: {
      es: [
        "Crítica - Buscamos automatizar todo lo posible",
        "Muy importante - Automatizamos procesos clave",
        "Importante - Automatizamos selectivamente",
        "Limitada - Preferimos control manual",
      ],
      en: [
        "Critical - We seek to automate everything possible",
        "Very important - We automate key processes",
        "Important - We automate selectively",
        "Limited - We prefer manual control",
      ],
    },
  },
  {
    id: "q20",
    question: {
      es: "¿Cuál es tu enfoque hacia la integración de sistemas?",
      en: "What is your approach to system integration?",
    },
    options: {
      es: [
        "Ecosistema único de un proveedor",
        "Best-of-breed con integraciones",
        "Desarrollo personalizado con APIs",
        "Sistemas independientes",
      ],
      en: [
        "Single vendor ecosystem",
        "Best-of-breed with integrations",
        "Custom development with APIs",
        "Independent systems",
      ],
    },
  },
  {
    id: "q21",
    question: {
      es: "¿Qué tan importante es el time-to-market para tu negocio?",
      en: "How important is time-to-market for your business?",
    },
    options: {
      es: [
        "Crítico - Velocidad ante todo",
        "Muy importante - Balanceamos velocidad y calidad",
        "Importante - Preferimos calidad sobre velocidad",
        "Secundario - Nos enfocamos en perfección",
      ],
      en: [
        "Critical - Speed above all",
        "Very important - We balance speed and quality",
        "Important - We prefer quality over speed",
        "Secondary - We focus on perfection",
      ],
    },
  },
  {
    id: "q22",
    question: {
      es: "¿Cuál es tu enfoque hacia el testing y QA?",
      en: "What is your approach to testing and QA?",
    },
    options: {
      es: ["Testing continuo automatizado", "Testing manual exhaustivo", "Testing básico de funcionalidades clave"],
      en: ["Continuous automated testing", "Exhaustive manual testing", "Basic testing of key functionalities"],
    },
  },
  {
    id: "q23",
    question: {
      es: "¿Qué metodología de desarrollo prefieres?",
      en: "What development methodology do you prefer?",
    },
    options: {
      es: ["Agile/Scrum", "Kanban", "Waterfall", "Híbrido según proyecto"],
      en: ["Agile/Scrum", "Kanban", "Waterfall", "Hybrid according to project"],
    },
  },
  {
    id: "q24",
    question: {
      es: "¿Cuál es tu estrategia de backup y recuperación?",
      en: "What is your backup and recovery strategy?",
    },
    options: {
      es: [
        "Backups automáticos con recuperación inmediata",
        "Backups regulares con plan de recuperación",
        "Backups ocasionales",
        "No tenemos estrategia formal",
      ],
      en: [
        "Automatic backups with immediate recovery",
        "Regular backups with recovery plan",
        "Occasional backups",
        "We don't have a formal strategy",
      ],
    },
  },
  {
    id: "q25",
    question: {
      es: "¿Qué tan importante es la accesibilidad en tus productos digitales?",
      en: "How important is accessibility in your digital products?",
    },
    options: {
      es: [
        "Crítica - Cumplimos estándares WCAG AAA",
        "Muy importante - Cumplimos WCAG AA",
        "Importante - Consideraciones básicas",
        "No es prioridad actualmente",
      ],
      en: [
        "Critical - We comply with WCAG AAA standards",
        "Very important - We comply with WCAG AA",
        "Important - Basic considerations",
        "Not a priority currently",
      ],
    },
  },
  {
    id: "q26",
    question: {
      es: "¿Cuál es tu enfoque hacia la documentación técnica?",
      en: "What is your approach to technical documentation?",
    },
    options: {
      es: [
        "Documentación exhaustiva y actualizada",
        "Documentación de componentes clave",
        "Documentación básica",
        "Mínima o inexistente",
      ],
      en: [
        "Comprehensive and updated documentation",
        "Documentation of key components",
        "Basic documentation",
        "Minimal or non-existent",
      ],
    },
  },
  {
    id: "q27",
    question: {
      es: "¿Qué tan importante es la sostenibilidad en tu estrategia tecnológica?",
      en: "How important is sustainability in your technology strategy?",
    },
    options: {
      es: [
        "Crítica - Optimizamos para eficiencia energética",
        "Importante - Consideramos el impacto ambiental",
        "En desarrollo - Comenzando a implementar prácticas",
        "No es prioridad actualmente",
      ],
      en: [
        "Critical - We optimize for energy efficiency",
        "Important - We consider environmental impact",
        "In development - Starting to implement practices",
        "Not a priority currently",
      ],
    },
  },
  {
    id: "q28",
    question: {
      es: "¿Cuál es tu visión tecnológica a largo plazo?",
      en: "What is your long-term technology vision?",
    },
    options: {
      es: [
        "Liderazgo innovador en el sector",
        "Adopción estratégica de tecnologías probadas",
        "Optimización continua de sistemas existentes",
        "Estabilidad y confiabilidad ante todo",
      ],
      en: [
        "Innovative leadership in the sector",
        "Strategic adoption of proven technologies",
        "Continuous optimization of existing systems",
        "Stability and reliability above all",
      ],
    },
  },
]

export default function QuizComponent({ onComplete, savedAnswers = {}, onReset }: QuizComponentProps) {
  const { t, language } = useLanguage()
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
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">{t("quiz.title")}</h1>
          <p className="text-xl text-gray-400 font-medium">{t("quiz.subtitle")}</p>

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
                {t("quiz.reset")}
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
            <h3 className="text-2xl font-bold mb-4">{t("quiz.processing")}</h3>
            <p className="text-gray-400 text-lg">{t("quiz.analyzing")}</p>
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
                  {t("quiz.question")} {currentQuestion + 1} {t("quiz.of")} {questions.length}
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
                  {questions[currentQuestion].question[language]}
                </h2>

                <RadioGroup
                  value={answers[questions[currentQuestion].id] || ""}
                  onValueChange={handleAnswer}
                  className="space-y-4"
                >
                  {questions[currentQuestion].options[language].map((option, index) => (
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
                {t("quiz.previous")}
              </Button>

              <Button
                onClick={handleNext}
                disabled={!answers[questions[currentQuestion].id]}
                className="bg-white text-black hover:bg-gray-200 font-bold px-8 disabled:opacity-50"
              >
                {currentQuestion === questions.length - 1 ? t("quiz.seeResult") : t("quiz.next")}
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </>
        )}
      </div>
    </div>
  )
}
