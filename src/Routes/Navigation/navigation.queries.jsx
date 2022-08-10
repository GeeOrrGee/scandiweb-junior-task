import { gql } from '@apollo/client'

export const CATEGORY_NAME = gql`
  query {
    categories {
      name
    }
  }
`
