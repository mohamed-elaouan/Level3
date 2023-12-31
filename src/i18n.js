import i18n from "i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from "react-i18next";
// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      "Lang": "Languge",
      "Home": "Home",
      "Sup": "Support",
      "Cat": "Category",
    },
  },
  ar: {
    translation: {
      "Lang": "اللغة",
      "Home": "الرئيسية",
      "Sup": "المساعدة",
      "Cat": "الاصناف",
    },
  },
  fr: {
    translation: {
      "Lang": "La Langue",
      "Home": "Accuiel",
      "Sup": "Aider",
      "Cat": "Catégorie",
    },
  },
};

i18n.use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    detection:{
      order: ['htmlTag','localStorage'],
      caches: ['localStorage'],
    },

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    react:{
      useSuspense:false
    }
  });

export default i18n;
