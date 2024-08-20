import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from "react-redux"
import store from './app/store'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { NextUIProvider } from '@nextui-org/react'
import { PrimeReactProvider } from 'primereact/api';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId='127887814825-t0qe3hm5lbv2beonk9sgu594qjhj0s2n.apps.googleusercontent.com'>
      <Provider store={store}>
        <PrimeReactProvider>
          <NextUIProvider>
            <App />
          </NextUIProvider>
        </PrimeReactProvider>
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
)