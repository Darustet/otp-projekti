import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../locales/en.json";
import fi from "../locales/fi.json";
import ru from "../locales/ru.json";
import ja from "../locales/ja.json";

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

        ru: {
            translation: ru,
        },

        ja:{
            translation: ja,
        }



    },
});

export default i18n;
