import React, {useState} from "react";
import {InfoWindow, Marker} from "@react-google-maps/api";
import DpdMarkerContent from "./DpdMarkerContent";
import {func, shape, string} from "prop-types";
import DpdSelectParcelshopButton from "./DpdSelectParcelshopButton";

const DpdMarker = (props) => {

    const {parcelshop, onParcelshopChange} = props;

    const [isOpen, setIsOpen] = useState(false);

    const onToggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <Marker
            key={parcelshop.parcelshop_id}
            onClick={onToggleOpen}
            {...props}
        >
            {isOpen && <InfoWindow onCloseClick={onToggleOpen}>
                <DpdMarkerContent
                    parcelshop={parcelshop}
                    onParcelshopChange={onParcelshopChange}
                />
            </InfoWindow>
            }
        </Marker>
    )
}

DpdMarker.propTypes = {
    parcelshop: shape({
        parcelshop_id: string,
        company: string,
        street: string,
        postcode: string,
        country: string,
    }),
    onParcelshopChange: func.isRequired
}


export default DpdMarker;
