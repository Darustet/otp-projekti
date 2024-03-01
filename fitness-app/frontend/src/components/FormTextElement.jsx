export default function FormTextElement(props) {
    return (<div className={props.className}>
        <label htmlFor={props.id}>{props.innerText}:</label>
        <input id={props.id} type="text"
               name={props.name} placeholder={props.placeholder}/>
    </div>)
}