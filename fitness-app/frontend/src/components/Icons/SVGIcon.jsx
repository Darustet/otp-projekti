import styles from './Icons.module.scss';

/** props included:
 *
 * handlerFunction = an onClick function for buttons
 *
 * stateValue = an optional useState value for the handlerFunction to use
 *
 * styleClass = the className parameter
 *
 * currentColor = optional default color
 *
 * pathD = the d property of the path element
 */
export default function SVGIcon(props) {
    return <svg onClick={()=>props.handlerFunction(props.stateValue)}
                className={styles[props.styleClass]} xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24" fill={props.currentColor}>
        <path d={props.pathD}></path>
    </svg>
};
