import { Component } from 'react';
import './App.css';
// import { CategoriesContext } from './contexts/categories.context';
import { gql } from '@apollo/client';
import { Query } from '@apollo/client/react/components';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import ProductDetails from './Routes/ProductDetails/pdp.component';
import Navigation from './Routes/Navigation/navigation.component';
import CategoryPage from './Routes/CategoryPage/CategoryPage.routes';
import ProductsList from './Routes/CategoryPage/PLP/productsList.component';
const ALL_DATA = gql`
    query mainData {
        categories {
            name
            products {
                id
                name
                inStock
                gallery
                category
                prices {
                    amount
                    currency {
                        label
                        symbol
                    }
                }
            }
        }
    }
`;

class App extends Component {
    // static contextType = CategoriesContext;
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        {
            /* there is no homepage, so I'm redirecting to category, I handled the root '/' path matching with v6('all' category was rendered at '/'), but when I migrated project to v5, it kinda got messy :) */
        }
        return (
            <Query query={ALL_DATA}>
                {({ data, loading }) => {
                    if (loading) {
                        return console.log('its loading bro');
                    } else {
                        const { categories } = data;
                        console.log(categories);

                        return (
                            <main>
                                <Navigation />
                                <Switch>
                                    {categories.map((category) => {
                                        // console.log(category);

                                        return (
                                            <Route
                                                key={category.name}
                                                path={`/${category.name}`}
                                            >
                                                <CategoryPage
                                                    name={category.name}
                                                    products={category.products}
                                                />
                                            </Route>
                                        );
                                    })}

                                    <Redirect to={'/all'} />
                                </Switch>
                            </main>
                        );
                    }
                }}
            </Query>
        );
    }
}

// App.contextType = CategoriesContext;
export default withRouter(App);
