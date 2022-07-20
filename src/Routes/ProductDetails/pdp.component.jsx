import { Component } from 'react';
import './pdp.styles';
import { withRouter } from 'react-router-dom';
import { Query } from '@apollo/client/react/components';
import { gql } from '@apollo/client';
import { withParams } from '../../utils/HOCs/withParams';

const SELECTED_PRODUCT = gql`
    query ($id: String!) {
        product(id: $id) {
            id
            name

            inStock
            gallery
            category
            prices {
                currency {
                    label
                    symbol
                }
                amount
            }
            description
            attributes {
                id
                name
                type
                items {
                    displayValue
                    value
                    id
                }
            }
            brand
        }
    }
`;

class ProductDetails extends Component {
    constructor(props) {
        super(props);

        console.log(this.props);
    }

    render() {
        const productId = this.props.params.productId;
        console.log(this.props);
        return (
            <Query variables={{ id: productId }} query={SELECTED_PRODUCT}>
                {({ data, loading }) => {
                    if (loading) {
                        return <h2>spinner</h2>;
                    } else {
                        console.log(data);
                    }
                }}
            </Query>
        );
    }
}

export default withParams(ProductDetails);
