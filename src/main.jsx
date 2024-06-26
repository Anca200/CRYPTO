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
import SignUp from './pages/SignUp.jsx';
import LogIn from './pages/LogIn.jsx';
import { AuthContextProvider } from './context/AuthContext.jsx';
import Account from "./pages/Account.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx"

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
    },
    {
      path:"/sign",
      element: <SignUp/>
    },
    { path: "/log",
      element:<LogIn/>
    },
    {
      path: "/account",
      element:
      <ProtectedRoute>
      <Account/>
      </ProtectedRoute>   
    }
  ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
    <CoinContextProvider>
    <RouterProvider router={router}/>
    <Footer/>
    </CoinContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
