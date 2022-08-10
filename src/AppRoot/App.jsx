import { Component } from 'react'

import { Query } from '@apollo/client/react/components'
import { Routes, Route } from 'react-router-dom'

import Navigation from '../Routes/Navigation/navigation.component'
import CategoryPage from '../Routes/CategoryPage/CategoryPage.routes'
import CheckoutPage from '../Routes/CheckoutPage/checkout.component'
import { Spinner } from '../shared/spinner/spinner.styles'
import { CATEGORIES_NAME } from './App.queries'
class App extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <Query query={CATEGORIES_NAME}>
        {({ data, loading }) => {
          if (loading) {
            return <Spinner />
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
                        element={<CategoryPage name={category.name} />}
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

export default App
