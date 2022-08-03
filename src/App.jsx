import { Component } from 'react'
import './App.css'
// import { CategoriesContext } from './contexts/categories.context';
import { gql } from '@apollo/client'
import { Query } from '@apollo/client/react/components'
import { Routes, Route } from 'react-router-dom'

import Navigation from './Routes/Navigation/navigation.component'
import CategoryPage from './Routes/CategoryPage/CategoryPage.routes'
import CheckoutPage from './Routes/CheckoutPage/checkout.component'

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
        description
        brand
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
`

class App extends Component {
  // static contextType = CategoriesContext;
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <Query query={ALL_DATA}>
        {({ data, loading }) => {
          if (loading) {
            return console.log('its loading bro')
          } else {
            const { categories } = data

            return (
              <main>
                <Navigation />
                <Routes>
                  {categories.map((category) => {
                    return (
                      <Route
                        key={category.name}
                        path={`${
                          category.name === 'all' ? '/' : category.name
                        }/*`}
                        element={
                          <CategoryPage
                            name={category.name}
                            products={category.products}
                          />
                        }
                      />
                    )
                  })}
                  <Route path="/checkout" element={<CheckoutPage />} />
                </Routes>
              </main>
            )
          }
        }}
      </Query>
    )
  }
}

// App.contextType = CategoriesContext;
export default App
