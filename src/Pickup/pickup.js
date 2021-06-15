import React, {useState} from "react";

import defaultClasses from './pickup.css';
import DpdMap from "./Components/DpdMap";
import DpdChosenParcelshop from "./Components/DpdChosenParcelshop";
import {useDpdParceshopInformation} from "../hooks/useDpdParcelshopInformation";
import {mergeClasses} from "@magento/venia-ui/lib/classify";
import {func, object, shape, string} from "prop-types";
import DpdSelectParcelshopButton from "./Components/DpdSelectParcelshopButton";

const containerStyle = {
    width: '100%',
    height: '550px',
    marginTop: '30px'
};

const Pickup = (props) => {
    const classes = mergeClasses(defaultClasses, props.classes);

    const {
        dpdData,
        parcelshops,
        currentParcelshop,
        handleParcelshopSave,
        handleParcelshopReset
    } = useDpdParceshopInformation();

    if(!dpdData) {
        return null;
    }

    if(dpdData.selectedMethodCode !== 'dpdpickup') {
        return null;
    }

    if (currentParcelshop) {
        return (
            <div className={classes.root}>
                <DpdChosenParcelshop
                    parcelshop={currentParcelshop}
                    onParcelshopReset={handleParcelshopReset}
                />
            </div>
        )
    }

    if(!parcelshops) {
        return (<>Bezig met laden</>);
    }

    return (
        <div className={classes.root}>
            <DpdMap
                mapContainerStyle={containerStyle}
                parcelshops={parcelshops}
                apiKey={dpdData.apiKey}
                onParcelshopChange={handleParcelshopSave}
            />
        </div>
    )
}

Pickup.propTypes = {
    classes: object
}

export default Pickup;
