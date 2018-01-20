import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import board from './reducers'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

const store = createStore(board)
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
)
registerServiceWorker()
