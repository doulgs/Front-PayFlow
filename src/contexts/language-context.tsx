// src/contexts/LanguageContext.tsx
import React, { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

type LanguageContextType = {
  currentLanguage: string;
  setLanguage: (lng: "pt" | "en") => Promise<void>;
  availableLanguages: ["pt", "en"];
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<string>(i18n.language);

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLang = await AsyncStorage.getItem("language");
      if (savedLang) {
        i18n.changeLanguage(savedLang);
        setCurrentLanguage(savedLang);
      }
    };
    loadLanguage();
  }, []);

  const setLanguage = async (lng: "pt" | "en") => {
    await i18n.changeLanguage(lng);
    setCurrentLanguage(lng);
    await AsyncStorage.setItem("language", lng);
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, availableLanguages: ["pt", "en"] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguageContext = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguageContext must be used inside LanguageProvider");
  return context;
};
