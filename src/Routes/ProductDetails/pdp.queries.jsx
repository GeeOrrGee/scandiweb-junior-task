import { gql } from '@apollo/client'

export const SELECTED_PRODUCT = gql`
  query ($id: String!) {
    product(id: $id) {
      id
      name

      inStock
      gallery
      category
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      description
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
      brand
    }
  }
`
