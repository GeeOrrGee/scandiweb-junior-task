import { Component } from 'react';
import { CurrencyContext } from '../../contexts/currencies.context';
import './category-item.styles';
import { Redirect, withRouter } from 'react-router-dom';
import {
    ProductContainer,
    ProductImgContainer,
    ProductHoverIcon,
    ProductInfoContainer,
} from './category-item.styles';

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

    redirectProduct() {
        console.log(this.state);
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
        const { match } = this.props;

        const { activeCurrency } = this.context;
        const { amount, currency } = prices.find(
            ({ amount, currency }) => currency.label === activeCurrency
        ); // finding price by currency context

        // const mouseEnterHandler = () => {
        //     this.setState({ ...this.state, hoverIcon: !this.state.hoverIcon });
        // };
        // const mouseLeaveHandler = () => {
        //     this.setState({ ...this.state, hoverIcon: false });
        // };

        return (
            <>
                {this.state.redirectToProductPage && (
                    <Redirect from={`${match.url}`} to={`/${category}/${id}`} />
                )}

                <ProductContainer
                    onMouseEnter={this.hoverOverHandler}
                    onMouseLeave={this.hoverOverHandler}
                    inStock={inStock}
                    onClick={this.redirectProduct}
                >
                    <ProductImgContainer>
                        <img src={gallery[0]} alt={name} />
                        {this.state.hoverIcon && <ProductHoverIcon />}
                    </ProductImgContainer>
                    <ProductInfoContainer>
                        <p>{name}</p>
                        <span>{`${currency.symbol} ${amount}`}</span>
                    </ProductInfoContainer>
                </ProductContainer>
            </>
        );
    }
}
CategoryItem.contextType = CurrencyContext;
export default withRouter(CategoryItem);

// details page (params)
// cart functionality
