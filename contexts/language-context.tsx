"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "es" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("es")
  const [translations, setTranslations] = useState<Record<string, Record<string, string>>>({})
  const [isLoaded, setIsLoaded] = useState(false)

  // Cargar el idioma desde localStorage al iniciar
  useEffect(() => {
    const savedLanguage = localStorage.getItem("quiz_language")
    if (savedLanguage && (savedLanguage === "es" || savedLanguage === "en")) {
      setLanguageState(savedLanguage as Language)
    }

    // Cargar traducciones
    import("@/translations").then((module) => {
      setTranslations(module.default)
      setIsLoaded(true)
    })
  }, [])

  // Guardar el idioma en localStorage cuando cambie
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    localStorage.setItem("quiz_language", newLanguage)
  }

  // Función de traducción
  const t = (key: string): string => {
    if (!isLoaded) return key

    const keys = key.split(".")
    let current = translations

    // Navegar por la estructura de traducciones
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) return key
      current = current[keys[i]] as Record<string, string>
    }

    const lastKey = keys[keys.length - 1]
    const translation = current[language]?.[lastKey]

    return translation || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
