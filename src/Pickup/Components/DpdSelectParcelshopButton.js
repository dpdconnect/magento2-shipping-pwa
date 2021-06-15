import React from "react";
import classes from './DpdSelectParcelshopButton.css';
import {func, shape, string} from "prop-types";
import {FormattedMessage} from "react-intl";

const DpdSelectParcelshopButton = (props) => {

    const {parcelshop, onParcelshopChange} = props;

    return (
        <a
            className={classes.root}
            id={parcelshop.parcelshop_id}
            onClick={onParcelshopChange.bind(this, parcelshop)}
        >
            <FormattedMessage
                id={'dpdSelectParcelshopButton.text'}
                defaultMessage={'Selecteer parcelshop'}
            />
        </a>
    )
}

DpdSelectParcelshopButton.propTypes = {
    parcelshop: shape({
        parcelshop_id: string,
        company: string,
        street: string,
        postcode: string,
        country: string,
    }),
    onParcelshopChange: func.isRequired
}

export default DpdSelectParcelshopButton;
