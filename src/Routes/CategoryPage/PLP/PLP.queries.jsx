import { gql } from '@apollo/client'

export const CATEGORY_DATA = gql`
  query ($title: String!) {
    category(input: { title: $title }) {
      products {
        id
        name
        inStock
        gallery
        description
        category
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
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
    }
  }
`
