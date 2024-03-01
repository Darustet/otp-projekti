import './CreateEvent.scss';
import '../../components/InputTag/InputTag.module.scss';
import InputTag from "../../components/InputTag/InputTag";
import FormTextElement from '../../components/FormTextElement';

const CreateEvent = () => {
    const formGroupStyle = "form-group";

    return (
        <div className="form-container">
            <h2>Create Event</h2>
            <FormTextElement className={formGroupStyle}
                             innerText="Event name" id="eventName"
                             name="eventName" placeholder="Enter event name"/>

            <FormTextElement className={formGroupStyle}
                             innerText="Address" id="address"
                             name="address" placeholder="Enter address for event"/>

            <FormTextElement className={formGroupStyle}
                             innerText="City" id="city"
                             name="city" placeholder="Enter city"/>

            <FormTextElement className={formGroupStyle}
                             innerText="Country" id="country"
                             name="country" placeholder="Enter county"/>

            <FormTextElement className={formGroupStyle}
                             innerText="ZIP" id="zip"
                             name="zip" placeholder="Enter ZIP code"/>

            <div className="form-group">
                <label htmlFor="description">Event description:</label>
                <textarea cols={40} rows={5} id="description" name="description"
                          placeholder="Enter description of event"/>
            </div>

            <div className="input-tag">
                <InputTag/>
                <br/>
            </div>

            <div className="form-group">
                <button type="button">Create Event</button>
            </div>

        </div>
    );
}

export default CreateEvent;
