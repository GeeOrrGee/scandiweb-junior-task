import { Component } from 'react';
import './pdp.styles';
import { withRouter } from 'react-router-dom';
import { Query } from '@apollo/client/react/components';
import { gql } from '@apollo/client';

class ProductDetails extends Component {
    constructor(props) {
        super(props);

        console.log(this.props);
    }

    render() {
        return <h1>asdasd</h1>;
    }
}

export default withRouter(ProductDetails);
