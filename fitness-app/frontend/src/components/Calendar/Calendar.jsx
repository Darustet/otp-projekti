import '@mobiscroll/react/dist/css/mobiscroll.min.css'
import {Eventcalendar, setOptions, Toast, localeFi, getJson} from '@mobiscroll/react';
import {useCallback, useEffect, useMemo, useState} from 'react';

setOptions({
    locale: localeFi,
    theme: 'ios',
    themeVariant: 'light'
})

const Calendar = () => {
    const [myEvents, setEvents] = useState([]),
        [isToastOpen, setToastOpen] = useState(false),
        [toastMessage, setToastMessage] = useState()

    const myView = useMemo(
        () => ({
            calendar: {type: 'month'},
            agenda: {type: 'month'},
        }),
        [],
    );

    const handleToastClose = useCallback(args => {
        setToastOpen(false)
    }, []);

    const handleEventClick = useCallback(args => {
        setToastMessage(args.event.title);
        setToastOpen(true);
    }, []);

    useEffect(() => {
        /* source implementation */
        getJson('https://trial.mobiscroll.com/events/?vers=5',
            (events) => {
                setEvents(events)
                console.log(events);
            },
            'jsonp')
        // get the data and call setEvents()
    }, []);

    return (
        <aside id="main-aside">
            <Eventcalendar
                clickToCreate={false}
                dragToCreate={false}
                dragToMove={false}
                dragToResize={false}
                eventDelete={false}
                data={myEvents}
                view={myView}
                onEventClick={handleEventClick}
            />
            <Toast
                message={toastMessage}
                isOpen={isToastOpen}
                onClose={handleToastClose}
            />
        </aside>
    );
}

export default Calendar;
