import defaultOperations from './dpdParcelInformation.gql';
import {useCallback, useEffect, useMemo, useState} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {useCartContext} from "@magento/peregrine/lib/context/cart";

export const useDpdParceshopInformation = (props) => {
    const operations = defaultOperations;

    const [currentParcelshop, setCurrentParcelshop] = useState(null);

    const [{ cartId }] = useCartContext();

    // Fetch the current state, meaning the Google Maps API key, current selected parcelshop and cart data
    // selected parcelshop is fetched in case the customer refreshes
    const { data: dpdStateData, loading: isLoadingDpdState } = useQuery(
        operations.getCurrentDpdState,
        {
            fetchPolicy: 'cache-and-network',
            nextFetchPolicy: 'cache-first',
            variables: {
                cartId: cartId,
            },
            skip: !cartId
        }
    );

    // Once we have the current state make the data easier to work with
    const dpdData = useMemo(() => {
        let filteredData;
        if(dpdStateData) {
            filteredData = {
                apiKey: dpdStateData.storeConfig.dpd_google_maps_frontend_key,
                selectedCarrierCode: dpdStateData.cart.shipping_addresses[0].selected_shipping_method.carrier_code,
                selectedMethodCode: dpdStateData.cart.shipping_addresses[0].selected_shipping_method.method_code,
                zipcode: dpdStateData.cart.shipping_addresses[0].postcode,
                countryId: dpdStateData.cart.shipping_addresses[0].country.code,
                selectedParcelshop: dpdStateData.selectedParcelshop,
            };
        }
        return filteredData;
    }, [dpdStateData]);

    // Fetch the parcelshops but only if we have:
    // * A cartId
    // * A DPD state
    // * No parcelshop selected
    const {data: parcelshopsData, loading: isLoadingParcelshops} = useQuery(
        operations.getParcelshops,
        {
            fetchPolicy: 'cache-and-network',
            nextFetchPolicy: 'cache-first',
            variables: {
                cartId: cartId,
                postcode: dpdData ? dpdData.zipcode : '',
                countryId: dpdData ? dpdData.countryId : '',
            },
            skip: !cartId || !dpdData || currentParcelshop
        }
    );

    const parcelshops = useMemo(() => {
        let filteredData;
        if(parcelshopsData) {
            filteredData = parcelshopsData.parcelshops.items;
        }
        return filteredData;
    }, [parcelshopsData]);

    const [
        setParcelshop,
        { error: saveParcelshopError, loading: isSavingParcelshop }
    ] = useMutation(operations.setParcelshop);


    // Used to set the current parcelshop once the dpd data is loaded
    useEffect(() => {
        if (dpdData) {
            setCurrentParcelshop(dpdData.selectedParcelshop);
        }
    }, [dpdData, setCurrentParcelshop]);

    const handleParcelshopSave = useCallback((parcelshop) => {
        setParcelshop({
            variables: {
                cartId: cartId,
                parcelshopId: parcelshop.parcelshop_id,
                company: parcelshop.company,
                street: parcelshop.street,
                houseno: parcelshop.houseno,
                zipcode: parcelshop.zipcode,
                city: parcelshop.city,
                country: parcelshop.country,
            }
        });
        setCurrentParcelshop(parcelshop);

    }, [setParcelshop, cartId]);

    const handleParcelshopReset = useCallback(() => {
        setCurrentParcelshop(null);
    }, [setCurrentParcelshop]);

    return {
        dpdData,
        parcelshops,
        currentParcelshop,
        handleParcelshopSave,
        handleParcelshopReset
    }

}
