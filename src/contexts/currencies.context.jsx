import { Component } from 'react'
import { createContext } from 'react'
import { gql } from '@apollo/client'
import { graphql } from '@apollo/client/react/hoc'
export const CurrencyContext = createContext({})

class CurrencyProvider extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      currencies: [],
      activeCurrencySymbol: '$',
      activeCurrency: 'USD', // to set default value
      setActiveCurrency: this.setActiveCurrency.bind(this), //currencyToggler
    }
  }

  setActiveCurrency(selectedCurrency, selectedSymbol) {
    this.setState(() => {
      return {
        ...this.state,
        activeCurrency: selectedCurrency,
        activeCurrencySymbol: selectedSymbol,
      }
    })
  }

  componentDidMount() {
    const prevState = JSON.parse(localStorage.getItem('currencyContext'))
    if (prevState === null || undefined) return
    this.setState({ ...prevState })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      localStorage.setItem('currencyContext', JSON.stringify(this.state))
    }
    const {
      data: { loading },
    } = this.props
    if (loading) {
      return
    } else if (this.props.data !== prevProps.data) {
      const { currencies } = this.props.data
      this.setState(() => {
        return { ...this.state, currencies, loading }
      })
    } // handling async data fetch from apollo HOC query handler
  }

  render() {
    return (
      <CurrencyContext.Provider value={this.state}>
        {this.props.children}
      </CurrencyContext.Provider>
    )
  }
}

export default graphql(gql`
  query {
    currencies {
      label
      symbol
    }
  }
`)(CurrencyProvider)
