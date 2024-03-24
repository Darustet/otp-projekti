import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../locales/en.json";
import fi from "../locales/fi.json";
import ru from "../locales/ru.json";
import ja from "../locales/ja.json";
import ar from "../locales/ar.json";

export const supportedLngs = {
    en: "English",
    ja: "Japanese (日本語)",
    ru: "Russian (Русский)",
    fi: "Finnish (Suomi)",
    ar: "Arabic (العربية)"
  };

i18n.use(initReactI18next).init({
	fallbackLng: "en",
	debug: true,
	interpolation: {
		escapeValue: false,
	},

    lng : "ja",
    supportedLngs: Object.keys(supportedLngs),
    resources: {
        fi: {
            translation: fi,
        },
        en: {
            translation: en,
        },

        ru: {
            translation: ru,
        },

        ja:{
            translation: ja,
        },

        ar:{
            translation: ar,
        }



    },
});

export default i18n;
