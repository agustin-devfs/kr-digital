"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Calendar, Sparkles, Loader2 } from "lucide-react"

interface ResultsDisplayProps {
  response: string
  onOpenModal: () => void
}

export default function ResultsDisplay({ response, onOpenModal }: ResultsDisplayProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (response) {
      setIsLoading(false)
    }
  }, [response])

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">TU ANÁLISIS</h1>
          <p className="text-xl text-gray-400 font-medium">Resultados personalizados basados en tus respuestas</p>
        </motion.div>

        {/* Results Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-gray-900/50 border-gray-800 rounded-2xl p-8 shadow-xl backdrop-blur-sm">
            {isLoading ? (
              <motion.div className="text-center py-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="inline-block mb-6"
                >
                  <Loader2 className="w-16 h-16 text-[#FF4D00]" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-4">Analizando tus respuestas...</h3>
                <p className="text-gray-400 text-lg">Nuestro sistema de IA está generando tu reporte personalizado</p>
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
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <div className="flex items-center mb-6">
                  <Sparkles className="w-8 h-8 text-[#FF4D00] mr-3" />
                  <h3 className="text-2xl font-bold">Análisis Completado</h3>
                </div>

                <div className="prose prose-invert max-w-none">
                  <p className="text-lg leading-relaxed text-gray-300 mb-8">{response}</p>
                </div>

                <motion.div
                  className="border-t border-gray-700 pt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="bg-gradient-to-r from-[#FF4D00]/10 to-[#FF6F3C]/10 rounded-xl p-6 border border-[#FF4D00]/20">
                    <h4 className="text-xl font-bold mb-3">¿Listo para el siguiente paso?</h4>
                    <p className="text-gray-300 mb-6">
                      Agenda una consulta gratuita con nuestros expertos para discutir tu estrategia tecnológica
                      personalizada.
                    </p>

                    <Button
                      onClick={onOpenModal}
                      className="bg-gradient-to-r from-[#FF4D00] to-[#FF6F3C] hover:from-[#FF6F3C] hover:to-[#FF4D00] text-white font-bold text-lg px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
                    >
                      <Calendar className="w-5 h-5 mr-3" />
                      AGENDAR CONSULTA GRATUITA
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
