
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import NewsState from './context/NewsState.jsx'

createRoot(document.getElementById('root')).render(
  <NewsState>
    <App />
  </NewsState>
    

)
