import styles from './Icons.module.scss';

/**
 * A component to use svg images as buttons
 * @param props props for the component:
 *
 * svgFile
 *
 * imgAlt
 *
 * styleClass
 *
 * handlerFunction
 *
 * stateValue
 * @returns {JSX.Element}
 * @constructor
 */
export default function SVGImg(props) {
    return <img src={props.svgFile} alt={props.imgAlt}
                className={styles[props.styleClass]}
                onClick={()=>props.handlerFunction(props.stateValue)}/>
}
