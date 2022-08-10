import { gql } from '@apollo/client'

export const CATEGORIES_NAME = gql`
  query mainData {
    categories {
      name
    }
  }
`
