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

const CATEGORY_NAME = gql`
    query {
        categories {
            name
        }
    }
`;

class Navigation extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <NavigationContainer>
                <NavListContainer>
                    <Query query={CATEGORY_NAME}>
                        {({ data, loading }) => {
                            console.log(data);
                            if (loading) {
                                console.log('loading bro');
                            } else {
                                const { categories } = data;
                                return categories.map((categoryObj) => (
                                    <>
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
                                    </>
                                ));
                            }
                        }}
                    </Query>
                </NavListContainer>
                <NavLogoContainer>
                    <Logo />
                </NavLogoContainer>

                <NavCartContainer>
                    <p>currency</p>
                    {/* state for currency */}
                    <CartIcon></CartIcon>
                </NavCartContainer>
            </NavigationContainer>
        );
    }
}

export default Navigation;
