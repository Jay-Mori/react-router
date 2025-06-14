import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { Provider } from 'react-redux'

import { PersistGate } from 'redux-persist/integration/react'
import { store,persistor } from './reducer/store.jsx'
 import { ToastContainer, toast } from 'react-toastify';

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
<BrowserRouter>
<App></App>
 <ToastContainer />
</BrowserRouter>
   </PersistGate>
    </Provider>

)









