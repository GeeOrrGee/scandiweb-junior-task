import { Component } from 'react';
import { CurrencyContext } from '../../contexts/currencies.context';
import './category-item.styles';
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
        };
    }

    render() {
        const { prices, inStock, gallery, name } = this.props.product;
        const { activeCurrency } = this.context;
        const { amount, currency } = prices.find(
            ({ amount, currency }) => currency.label === activeCurrency
        ); // finding price by currency context

        const mouseEnterHandler = () => {
            this.setState({ ...this.state, hoverIcon: true });
        };
        const mouseLeaveHandler = () => {
            this.setState({ ...this.state, hoverIcon: false });
        };
        return (
            <ProductContainer
                onMouseEnter={mouseEnterHandler}
                onMouseLeave={mouseLeaveHandler}
                inStock={inStock}
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
        );
    }
}
CategoryItem.contextType = CurrencyContext;
export default CategoryItem;
