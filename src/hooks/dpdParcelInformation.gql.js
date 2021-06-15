import { gql } from '@apollo/client';

const GET_PARCELSHOPS = gql`
    query getDpdParcelshops(
        $postcode: String,
        $countryId: String
    ) {
        parcelshops(postcode: $postcode, countryId: $countryId) {
            items {
                parcelshop_id
                company
                street
                houseno
                zipcode
                city
                country
                latitude
                longitude
                opening_hours {
                    open_morning
                    open_afternoon
                    close_morning
                    close_afternoon
                    weekday
                }
            }
            total_count
        }
    }
`;

const GET_CURRENT_DPD_STATE = gql`
    query getCurrentDpdState(
        $cartId: String!
    ) {
        storeConfig {
            dpd_google_maps_frontend_key
          	__typename
        }
        cart(
            cart_id: $cartId
        ) {
            id
            shipping_addresses {
                selected_shipping_method {
                    carrier_code
                    method_code
                }
                country {
                    code
                  	__typename
                }
                street
                postcode
              	__typename
            }
            __typename
        }
        selectedParcelshop(
            cart_id: $cartId
        ) {
            parcelshop_id
            company
            street
            zipcode
            city
            country
            __typename
        }
    }
`;

const SET_PARCELSHOP = gql`
    mutation saveParcelshop(
        $cartId: String!
        $parcelshopId: String!
        $company: String!
        $street: String!
        $houseno: String!
        $zipcode: String!
        $city: String!
        $country: String!
    ){
      setParcelshop(
        cart_id: $cartId,
        parcelshop_id: $parcelshopId,
        company: $company,
        street: $street,
        houseno: $houseno,
        zipcode: $zipcode,
        city: $city,
        country: $country
      )
    }
`;

export default {
    getParcelshops: GET_PARCELSHOPS,
    setParcelshop: SET_PARCELSHOP,
    getCurrentDpdState: GET_CURRENT_DPD_STATE
};
