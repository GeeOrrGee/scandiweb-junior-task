import { Component } from 'react';
import { Routes, Route, RoutesProps } from 'react-router-dom';
import ProductDetails from '../ProductDetails/pdp.component';
import ProductsList from './PLP/productsList.component';

class CategoryPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { name, products } = this.props; // I know this is a prop drilling but graphql schema didn't let me grab only category name in order to make seperate api calls based on THAT category name.
        console.log(this.props);
        return (
            <Routes>
                <Route
                    index
                    element={<ProductsList products={products} name={name} />}
                />
                <Route path={`/:productId`} element={<ProductDetails />} />
            </Routes>
        );
    }
}

export default CategoryPage;
