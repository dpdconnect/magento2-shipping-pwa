import React from 'react'
import classes from './DpdChangeParcelshopButton.css'
import {FormattedMessage} from "react-intl";
import {func, shape, string} from "prop-types";
import DpdSelectParcelshopButton from "./DpdSelectParcelshopButton";

const DpdChangeParcelshopButton = (props) => {

    const {onParcelshopReset} = props;

    return (
        <a className={classes.root}
            onClick={onParcelshopReset.bind(this)}

        >
            <FormattedMessage
                id={'DpdChangeParcelshopButton.changeParcelshopText'}
                defaultMessage={'Klik hier om uw parcelshop te wijzigen'}
            />
        </a>
    )
}
DpdChangeParcelshopButton.propTypes = {
    onParcelshopReset: func.isRequired
}

export default DpdChangeParcelshopButton;
