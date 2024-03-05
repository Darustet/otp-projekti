export default function FormTextElement(props) {
    return (<div className={props.className}>
        <label htmlFor={props.id}>{props.innerText}:</label>
        <input id={props.id} type={props.inputType ? props.inputType : 'text'}
               name={props.name} placeholder={props.placeholder}
               value={props.stateValue} onChange={e => props.handlerFunction(e.target.value)}
        />
    </div>)
}