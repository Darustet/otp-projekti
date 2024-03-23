import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../locales/en.json";
import fi from "../locales/fi.json";

i18n.use(initReactI18next).init({
	fallbackLng: "en",
	debug: true,
	interpolation: {
		escapeValue: false,
	},
    resources: {
        fi: {
            translation: fi,
        },
        en: {
            translation: en,
        },
    },
});

export default i18n;
