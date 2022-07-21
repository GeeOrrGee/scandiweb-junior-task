import { Component, createRef } from 'react';
import { CurrencyContext } from '../../contexts/currencies.context';
import './category-item.styles';
import { Navigate } from 'react-router-dom';
import {
    ProductContainer,
    ProductImgContainer,
    ProductHoverIcon,
    ProductInfoContainer,
} from './category-item.styles';
import { CartContext } from '../../contexts/Cart.context';

class CategoryItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hoverIcon: false,
            redirectToProductPage: false,
        };
        this.toggleHoverIcon = this.toggleHoverIcon.bind(this);
        this.redirectProduct = this.redirectProduct.bind(this);
        this.hoverOverHandler = this.hoverOverHandler.bind(this);

        this.cartIconRef = createRef();
    }

    componentDidMount() {
        window.addEventListener('resize', this.toggleHoverIcon);
        this.toggleHoverIcon();
    }
    toggleHoverIcon() {
        const getWindowWidth = window.innerWidth;
        if (getWindowWidth < 761) {
            this.setState({ ...this.state, hoverIcon: true });
        } else {
            this.setState({ hoverIcon: false });
        }
    }

    redirectProduct(event) {
        if (event) return; // was using created ref to prevent the redirecting, but redirect path[0] was throwing error because event was undefined, so this condition is sufficient for functionality

        if (!this.state.redirectToProductPage) {
            this.setState({ ...this.state, redirectToProductPage: true });
        } else {
            this.setState({ ...this.state, redirectToProductPage: false });
        }
    }

    hoverOverHandler() {
        this.setState({
            ...this.state,
            hoverIcon: !this.state.hoverIcon,
        });
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.toggleHoverIcon);
    }

    render() {
        const { prices, inStock, gallery, name, category, id } =
            this.props.product;

        // const { activeCurrency } = this.context;

        // const mouseEnterHandler = () => {
        //     this.setState({ ...this.state, hoverIcon: !this.state.hoverIcon });
        // };
        // const mouseLeaveHandler = () => {
        //     this.setState({ ...this.state, hoverIcon: false });
        // };

        return (
            <CurrencyContext.Consumer>
                {({ activeCurrency }) => {
                    const { amount, currency } = prices.find(
                        ({ amount, currency }) =>
                            currency.label === activeCurrency
                    ); // finding price by currency context

                    return (
                        <CartContext.Consumer>
                            {({ addCartItem }) => (
                                <>
                                    {this.state.redirectToProductPage && (
                                        <Navigate to={`/${category}/${id}`} />
                                    )}

                                    <ProductContainer
                                        onMouseEnter={this.hoverOverHandler}
                                        onMouseLeave={this.hoverOverHandler}
                                        inStock={inStock}
                                        onClick={this.redirectProduct}
                                    >
                                        <ProductImgContainer>
                                            <img src={gallery[0]} alt={name} />
                                            {this.state.hoverIcon && (
                                                <ProductHoverIcon
                                                    ref={this.cartIconRef} // to add product from PLP , as it was noted on FAQ
                                                    onClick={addCartItem.bind(
                                                        null,
                                                        this.props.product
                                                    )} // passing product into the cart context setState
                                                />
                                            )}
                                        </ProductImgContainer>
                                        <ProductInfoContainer>
                                            <p>{name}</p>
                                            <span>{`${currency.symbol} ${amount}`}</span>
                                        </ProductInfoContainer>
                                    </ProductContainer>
                                </>
                            )}
                        </CartContext.Consumer>
                    );
                }}
            </CurrencyContext.Consumer>
        );
    }
}

export default CategoryItem;

// details page (params)
// cart functionality
