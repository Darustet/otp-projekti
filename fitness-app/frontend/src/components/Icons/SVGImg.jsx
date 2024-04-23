import styles from './Icons.module.scss';

/**
 * A component to use svg images as buttons
 * @param props props for the component:
 * @param props.svgFile the file containing the svg image data
 * @param props.imgAlt the img alt-attribute
 * @param props.styleClass the class for styling
 * @param props.handlerFunction the react useState function
 * @param props.stateValue optional useState value
 * @returns {JSX.Element}
 * @constructor
 */
export default function SVGImg(props) {
    return <img src={props.svgFile} alt={props.imgAlt}
                className={styles[props.styleClass]}
                onClick={()=>props.handlerFunction(props.stateValue)}/>
}
