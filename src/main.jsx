import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import { createBrowserRouter,RouterProvider} from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Coin from './pages/Coin.jsx';
import CoinContextProvider from './context/CoinContext.jsx';
import Footer from './components/Footer.jsx';

const cors =  require('cors')
app.use(cors({
 origin: "https://peaceful-pixie-d78816.netlify.app/",
 methods: ["GET", "POST", "PUT", "DELETE"]
}))

const router = createBrowserRouter ([
  {
    element: <Navbar/>,

    children: [{
      path: "/",
      element: <Home/>
    },
    {
      path: '/coin/:coinId',
      element: <Coin/>
    }
  ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <CoinContextProvider>
    <RouterProvider router={router}/>
    <Footer/>
    </CoinContextProvider>
  
  </React.StrictMode>,
)
