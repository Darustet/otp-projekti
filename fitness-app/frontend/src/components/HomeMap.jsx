// https://react-leaflet.js.org/docs/start-setup/
import {MapContainer, TileLayer} from 'https://cdn.esm.sh/react-leaflet'

const HomeMap = () => {
    const position = [51.505, -0.09];

    return (<MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
    </MapContainer>)
}

export default HomeMap;
