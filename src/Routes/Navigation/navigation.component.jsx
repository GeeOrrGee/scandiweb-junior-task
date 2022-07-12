import { Component } from 'react';
import { ReactComponent as Logo } from '../../assets/navigation-logo/a-logo.svg';
import { NavLink } from 'react-router-dom';
import { ReactComponent as VectorDown } from '../../assets/vectors/Vector-Down.svg';
import { ReactComponent as VectorUp } from '../../assets/vectors/Vector-Up.svg';
import { ReactComponent as CartIcon } from '../../assets/navigation-logo/Vector.svg';
import {
    DropdownContainer,
    NavCartContainer,
    NavigationContainer,
    NavListContainer,
    NavLogoContainer,
} from './navigation.styles.jsx';
import { Query } from '@apollo/client/react/components';
import { gql } from '@apollo/client';
import { CurrencyContext } from '../../contexts/currencies.context';
console.log(CurrencyContext);
const CATEGORY_NAME = gql`
    query {
        categories {
            name
        }
    }
`;

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownActive: false,
        };
    }

    render() {
        const { setActiveCurrency, loading, activeCurrency, currencies } =
            this.context;
        if (loading) return;
        const { symbol } = currencies.find((currencyObj) => {
            return currencyObj.label === activeCurrency;
        }); // to output a activeCurrency symbol
        // console.log(dd);

        return (
            <NavigationContainer>
                <NavListContainer>
                    <Query query={CATEGORY_NAME}>
                        {({ data, loading }) => {
                            if (loading) {
                                console.log('loading bro');
                            } else {
                                const { categories } = data;
                                return categories.map((categoryObj) => (
                                    <li key={categoryObj.name}>
                                        <NavLink
                                            className={({ isActive }) =>
                                                isActive ? 'nav-active' : ''
                                            }
                                            to={`/${
                                                categoryObj.name === 'all'
                                                    ? ''
                                                    : categoryObj.name
                                            }`}
                                        >
                                            {categoryObj.name}
                                        </NavLink>
                                    </li>
                                ));
                            }
                        }}
                    </Query>
                </NavListContainer>
                <NavLogoContainer>
                    <Logo />
                </NavLogoContainer>

                <NavCartContainer>
                    <div
                        onClick={() => {
                            this.setState({
                                dropdownActive: !this.state.dropdownActive,
                            });
                        }}
                    >
                        <span>{symbol}</span>
                        {!this.state.dropdownActive ? (
                            <VectorDown />
                        ) : (
                            <VectorUp />
                        )}
                    </div>

                    <CartIcon></CartIcon>
                    {this.state.dropdownActive && (
                        <DropdownContainer>
                            {currencies.map((currencyObj) => (
                                <span
                                    key={currencyObj.symbol}
                                    onClick={() => {
                                        setActiveCurrency(currencyObj.label);
                                        this.setState({
                                            dropdownActive:
                                                !this.state.dropdownActive,
                                        });
                                    }}
                                >{`${currencyObj.symbol} ${currencyObj.label}`}</span>
                            ))}
                        </DropdownContainer>
                    )}

                    {/* state for currency */}
                </NavCartContainer>
            </NavigationContainer>
        );
    }
}

Navigation.contextType = CurrencyContext;
export default Navigation;
