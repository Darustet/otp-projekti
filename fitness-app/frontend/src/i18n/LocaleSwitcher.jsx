import { useTranslation } from "react-i18next";
import LangIcon from "../components/Icons/LangIcon/LangIcon";
import { useLanguage } from "../context/LanguageContext.js";
import { supportedLngs } from "../i18n/i18n.js";
import styles from "./LocaleSwitcher.module.scss";
import { useState } from "react";

export default function LocaleSwitcher({ size= 24 , location = { top: 60}}) {
	const { setLanguage } = useLanguage();
	const { i18n } = useTranslation();
    const [open, setOpen] = useState(false);

	return (
		<div className="items-center">
			<div className="locale-switcher">
                <div style={{width: size, height: size}}  className= {styles["icon"]} onClick={() => setOpen(!open)}>
                    <LangIcon color="black" /></div>
                    {open && 
				<div style={{top:location.top }} className={styles["dropdown"]}>


				<select value={i18n.resolvedLanguage} onChange={(e) => setLanguage(e.target.value)}>
					{Object.entries(supportedLngs).map(([code, name]) => (
						<option value={code} key={code}>
							{name}
						</option>
					))}
				</select>
                </div>
                }
			</div>
		</div>
	);
}
