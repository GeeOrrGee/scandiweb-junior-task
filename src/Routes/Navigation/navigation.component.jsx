import { Component } from 'react';
import { ReactComponent as Logo } from '../../assets/navigation-logo/a-logo.svg';
import { NavLink } from 'react-router-dom';
import { ReactComponent as CartIcon } from '../../assets/navigation-logo/Vector.svg';
import {
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
        this.state = {};
    }

    render() {
        const { setActiveCurrency, activeCurrency, currencies } = this.context;

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
                    <select
                        defaultValue={activeCurrency}
                        onChange={(e) => setActiveCurrency(e.target.value)}
                    >
                        {currencies.map(({ symbol, label }) => (
                            <option
                                key={symbol}
                                value={label}
                            >{`${symbol} ${label}`}</option>
                        ))}
                    </select>
                    {/* state for currency */}
                    <CartIcon></CartIcon>
                </NavCartContainer>
            </NavigationContainer>
        );
    }
}

Navigation.contextType = CurrencyContext;
export default Navigation;
