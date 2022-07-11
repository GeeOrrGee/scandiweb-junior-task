import { Component } from 'react';
import './App.css';
// import { CategoriesContext } from './contexts/categories.context';
import { gql } from '@apollo/client';
import { Query } from '@apollo/client/react/components';
import { Route, Routes, withRouter } from 'react-router-dom';
import Navigation from './Routes/Navigation/navigation.component';
import CategoryPage from './Routes/CategoryPage/category-page.component';
const ALL_DATA = gql`
    query mainData {
        categories {
            name
            products {
                id
                name
                inStock
                gallery
                description
                category
                prices {
                    amount
                    currency {
                        label
                        symbol
                    }
                }
                attributes {
                    id
                    name
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
        return (
            <Query query={ALL_DATA}>
                {({ data, loading }) => {
                    if (loading) {
                        return console.log('its loading bro');
                    } else {
                        const { categories } = data;

                        return (
                            <main>
                                <Navigation />
                                <Routes>
                                    {categories.map((category) => {
                                        // console.log(category);
                                        return (
                                            <Route
                                                key={category.name}
                                                path={`/${
                                                    category.name === 'all'
                                                        ? ''
                                                        : `${category.name}/*`
                                                }`}
                                                element={
                                                    <CategoryPage
                                                        products={
                                                            category.products
                                                        }
                                                        name={category.name}
                                                    />
                                                }
                                            ></Route>
                                        );
                                    })}
                                </Routes>
                            </main>
                        );
                    }
                }}
            </Query>
        );
    }
}

// App.contextType = CategoriesContext;
export default App;
