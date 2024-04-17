import { useTranslation } from "react-i18next";
import { useLanguage } from "../context/LanguageContext.js";
import { supportedLngs } from './i18n';
import styles from "./LocaleSwitcher.module.scss";
import { useState } from "react";
import SVGImg from '../components/Icons/SVGImg';
import localeIcon from './LanguageIcon.svg';

export default function LocaleSwitcher({ size= 24 , location = { top: 60}}) {
	const { setLanguage } = useLanguage();
	const { i18n } = useTranslation();
    const [open, setOpen] = useState(false);

	return (
		<div className="items-center">
			<div className={styles["locale-switcher"]}>
				<SVGImg svgFile={localeIcon} imgAlt="a sphere with longitude lines"
					styleClass="lang-icon"
					handlerFunction={setOpen} stateValue={!open}/>
				{open &&
					<div className={styles["dropdown"]}>
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
