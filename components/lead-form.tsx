"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { User, Mail, Phone, Send } from "lucide-react"

interface LeadFormProps {
  onSubmit: (data: any) => void
}

export default function LeadForm({ onSubmit }: LeadFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "+1",
    email: "",
    acceptTerms: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.acceptTerms) {
      onSubmit(formData)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const isFormValid =
    formData.firstName && formData.lastName && formData.phone && formData.email && formData.acceptTerms

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
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">CASI LISTO</h1>
          <p className="text-xl text-gray-400 font-medium">Completa tus datos para recibir tu análisis personalizado</p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-gray-900/50 border-gray-800 rounded-2xl p-8 shadow-xl backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                  <Label htmlFor="firstName" className="text-lg font-medium mb-3 block">
                    Nombre *
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className="pl-12 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 h-12 rounded-xl focus:border-[#FF4D00] focus:ring-[#FF4D00]"
                      placeholder="Tu nombre"
                      required
                    />
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                  <Label htmlFor="lastName" className="text-lg font-medium mb-3 block">
                    Apellido *
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className="pl-12 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 h-12 rounded-xl focus:border-[#FF4D00] focus:ring-[#FF4D00]"
                      placeholder="Tu apellido"
                      required
                    />
                  </div>
                </motion.div>
              </div>

              {/* Contact Fields */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <Label htmlFor="phone" className="text-lg font-medium mb-3 block">
                  Teléfono *
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="pl-12 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 h-12 rounded-xl focus:border-[#FF4D00] focus:ring-[#FF4D00]"
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                <Label htmlFor="email" className="text-lg font-medium mb-3 block">
                  Email *
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="pl-12 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 h-12 rounded-xl focus:border-[#FF4D00] focus:ring-[#FF4D00]"
                    placeholder="tu@empresa.com"
                    required
                  />
                </div>
              </motion.div>

              {/* Terms Checkbox */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex items-start space-x-3 p-4 rounded-xl border border-gray-700"
              >
                <Checkbox
                  id="terms"
                  checked={formData.acceptTerms}
                  onCheckedChange={(checked) => handleInputChange("acceptTerms", checked as boolean)}
                  className="mt-1 border-gray-600 data-[state=checked]:bg-[#FF4D00] data-[state=checked]:border-[#FF4D00]"
                />
                <Label htmlFor="terms" className="text-sm text-gray-300 leading-relaxed cursor-pointer">
                  Acepto los <span className="text-[#FF4D00] hover:underline">Términos y Condiciones</span> y autorizo
                  el tratamiento de mis datos personales para recibir información comercial.
                </Label>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="pt-4"
              >
                <Button
                  type="submit"
                  disabled={!isFormValid}
                  className="w-full bg-white text-black hover:bg-gray-200 font-bold text-lg h-14 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  <Send className="w-5 h-5 mr-3" />
                  OBTENER MI ANÁLISIS
                </Button>
              </motion.div>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
