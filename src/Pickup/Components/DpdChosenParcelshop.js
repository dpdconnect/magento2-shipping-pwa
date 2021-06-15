import React from 'react'
import DpdChangeParcelshopButton from "./DpdChangeParcelshopButton";
import classes from './DpdChosenParcelshop.css';
import {FormattedMessage} from "react-intl";
import {func, shape, string} from "prop-types";
import DpdSelectParcelshopButton from "./DpdSelectParcelshopButton";

const DpdChosenParcelshop = (props) => {

    const {parcelshop, onParcelshopReset} = props;

    return (
        <div className={classes.root}>
            <div className={classes.iconContainer}>
                <img className={classes.icon} src="data:image/png;base64,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"
                />
            </div>
            <div className={classes.title}>
                <FormattedMessage
                    id={'DpdChosenParcelshop.chosenParcelshopHeading'}
                    defaultMessage={'Gekozen parcelshop'}
                />
            </div>
            <div className={classes.company}>{parcelshop.company}</div>
            <div className={classes.street}>{parcelshop.street} {parcelshop.houseno} </div>
            <div className={classes.zipcode}>{parcelshop.zipcode} {parcelshop.city} </div>
            {/*<div className={classes.country}>{parcelshop.country} </div>*/}
            <DpdChangeParcelshopButton
                onParcelshopReset={onParcelshopReset}
            />
        </div>
    )
}

DpdChosenParcelshop.propTypes = {
    parcelshop: shape({
        parcelshop_id: string,
        company: string,
        street: string,
        postcode: string,
        country: string,
    }),
    onParcelshopReset: func.isRequired
}

export default DpdChosenParcelshop;
