import { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router';
import ProductDetails from '../ProductDetails/pdp.component';
import ProductsList from './PLP/productsList.component';

class CategoryPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { name, products, match } = this.props; // I know this is a prop drilling but graphql schema didn't let me grab only category name in order to make seperate api calls based on THAT category name.
        console.log(this.props);
        return (
            <Switch>
                <Route path={`${match.path}/:productId`}>
                    <ProductDetails />
                </Route>
                <Route path={`${match.path}`}>
                    <ProductsList products={products} name={name} />
                </Route>
            </Switch>
        );
    }
}

export default withRouter(CategoryPage);
