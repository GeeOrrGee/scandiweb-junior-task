import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
// import { CategoriesProvider } from './contexts/categories.context';
import { BrowserRouter } from 'react-router-dom'
import CurrencyProvider from './contexts/currencies.context'
import { CartProvider } from './contexts/Cart.context'
// import { gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
})
// const data = gql`
//     query GetData {
//         Price {
//             currency
//             float
//         }
//     }
// `;
// console.log(data);

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      {/* <CategoriesProvider> */}
      <BrowserRouter>
        <CurrencyProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </CurrencyProvider>
      </BrowserRouter>
      {/* </CategoriesProvider> */}
    </ApolloProvider>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
