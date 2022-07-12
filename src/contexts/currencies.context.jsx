import { Component } from 'react';
import { createContext } from 'react';
import { Query } from '@apollo/client/react/components';

import { gql } from '@apollo/client';
import { graphql } from '@apollo/client/react/hoc';

//currency fetching from graphql

const CURRENCY_QUERY = gql`
    query {
        currencies {
            label
            symbol
        }
    }
`;

export const CurrencyContext = createContext({});

class CurrencyProvider extends Component {
    constructor(props) {
        super(props);

        this.setActiveCurrency = (selectedCurrency) => {
            this.setState(() => {
                return {
                    ...this.state,
                    activeCurrency: selectedCurrency,
                };
            });
        };
        this.state = {
            loading: true,
            currencies: [],
            activeCurrency: 'USD', // to set default value
            setActiveCurrency: this.setActiveCurrency, //currencyToggler
        };
    }

    componentDidUpdate(prevProps) {
        const {
            data: { loading },
        } = this.props;
        if (loading) {
            console.log('lllaoding');
        } else if (this.props.data !== prevProps.data) {
            const { currencies } = this.props.data;
            this.setState(() => {
                return { ...this.state, currencies, loading };
            });
        } // handling async data fetch from apollo HOC query handler
    }

    render() {
        return (
            <CurrencyContext.Provider value={this.state}>
                {this.props.children}
            </CurrencyContext.Provider>
        );
    }
}

export default graphql(gql`
    query {
        currencies {
            label
            symbol
        }
    }
`)(CurrencyProvider);
