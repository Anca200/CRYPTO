import React, { useContext, useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { Link,useNavigate} from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { CoinContext } from '../context/CoinContext';
import {UserAuth} from "../context/AuthContext"




const Navbar = () => {
    const {user, logOut} = UserAuth();
    const navigate = useNavigate()
    const {setCurrency} = useContext(CoinContext)
 
    {/*for currecncy*/}

    const currencyHandler = (event) => {
          switch (event.target.value) {
            case "usd":{
                setCurrency({name: "usd", symbol: "$"});
                break;
            }
            case "eur":{
                setCurrency({name: "eur", symbol: "€"});
                break;
            }
            default : {
                setCurrency({name: "eur", symbol: "$"});
                break;
            }
          }
    }
  
    {/*for nav menu*/}
    const [nav,setNav] = useState(false);

    const handleNav = () => {
        setNav(!nav)
    }

    {/*Log Out*/}
    const handleLogOut = async () => {
        try{
            await logOut()
            navigate('/');
        }
        catch(error){
            console.log(error)
        }
      };

  return (
<>
<nav className="flex justify-around items-center text-center p-[1rem] border-b-2 border-gray-500 h-[100px] relative bg-gradient-to-r from-blue-900 to-slate-900">

    {/*Logo*/}

      <Link to="/"><h1 className='text-gray-200  text-2xl cursor-pointer font-bold'>CryptoLogo</h1></Link>

        {/*Links*/}
       <div className={
          nav
            ? 'ease-in duration-300 fixed text-gray-200 left-0 top-0 w-full h-screen bg-black/90 px-4 py-7 z-10 '
            : 'max-lg:hidden'}> 
    <ul className={nav ? "max-lg:flex text-2xl flex-col gap-5 mt-[150px] "  : "flex   gap-5 group max-lg:hidden"} >
       <Link to="/"><li className='text-gray-200  cursor-pointer'>Home</li></Link>
        <li className='  text-gray-200 cursor-pointer'>Features</li>
        <li className='  text-gray-200 cursor-pointer'>Pricing</li>
        <li className=' text-gray-200 cursor-pointer'>Blog</li>
    </ul>
       </div>

        {/*currency*/}
       <div className='max-lg:flex max-lg:flex-col-reverse gap-[10px] items-center '>
        <select 
        onChange={currencyHandler}
        className='bg-transparent  border-2 border-solid p-[0.2rem] text-gray-200  rounded-[10px] mr-[10px]' >
            <option  className="bg-blue-900" value="usd">USD</option>
            <option  className="bg-blue-900" value="eur">EUR</option>
        </select>
    </div>

    {/*nav menu*/}
    <button onClick={handleNav} className=" hidden max-lg:block z-10">
        <FaBars className='text-gray-200 ' size={20}/>
    </button>

    {user?.email ?
        <div>
        <Link to="/account"> <button className='text-white pr-4'>Account</button></Link>
        <button  onClick={handleLogOut} className='bg-red-600 px-6 py-2 rounded cursor-pointer text-white'>LogOut</button> 
        </div> :
        <div>
       {/*Register*/}
       <Link to="/log">
     <button className='bg-transparent  border-2 border-solid p-[0.2rem] text-gray-200  rounded-[10px]'>
    Log In</button></Link>
   <Link to="/sign">
   <button className='bg-transparent  border-2 border-solid p-[0.2rem] text-gray-200  rounded-[10px] ml-[10px]'>
    Sign Up</button></Link></div>}
</nav>
<Outlet/>
</>
  )
}

export default Navbar