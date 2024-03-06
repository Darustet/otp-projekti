import './CreateEvent.css';
import '../../styles/InputTag.module.scss';
import InputTag from "../../components/InputTag";

const CreateEvent = () => {
    return (
        <div className="form-container">
            <h2>Create Event</h2>
            <div className="form-group">
                <label htmlFor="eventName">Event name:</label>
                <input type="text" id="eventName" name="eventName"
                       placeholder="Enter event name"/>
            </div>

            <div className="form-group">
                <label htmlFor="Address">Address:</label>
                <input type="text" id="address" name="address"
                       placeholder="Enter address for event"/>
            </div>

            <div className="form-group">
                <label htmlFor="City">City:</label>
                <input type="text" id="city" name="city" placeholder="Enter city"/>
            </div>

            <div className="form-group">
                <label htmlFor="country">Country:</label>
                <input type="text" id="country" name="country" placeholder="Enter county"/>
            </div>

            <div className="form-group">
                <label htmlFor="zip">ZIP:</label>
                <input type="text" id="zip" name="zip" placeholder="Enter ZIP code"/>
            </div>

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
<<<<<<< Updated upstream
    );
=======

    )
>>>>>>> Stashed changes
}

export default CreateEvent;
