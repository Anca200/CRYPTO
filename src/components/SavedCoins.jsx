import React, {useState,useEffect} from 'react';
import { UserAuth } from '../context/AuthContext';
import {db} from "../firebase";
import { updateDoc, doc, onSnapshot } from 'firebase/firestore';

const SavedCoins = () => {
    const {user} = UserAuth()

  return (
   <>

    {/*Table*/}
 <div className='w-[800px] m-auto rounded-[15px]  bg-gradient-to-t from-purple-900 to-blue-900 mt-[50px] max-lg:w-full relative'>
    <div className='grid grid-cols-gridcol items-center p-[10px] text-gray-200 border-b-2 border-gray-500 max-lg:grid-cols-5 max-lg:text-center'>
      <p>Save</p>
        <p>#</p>
        <p>Coins</p>
        <p>Price</p>
        <p className='text-center '>24H </p>
        <p className='text-right max-lg:text-center'>Market Cap</p>
    </div>

    { displayCoin.map((item,index) =>(
          <>
       <div
          className='grid grid-cols-gridcol items-center p-[10px] text-white border-b-2 border-gray-500 max-lg:grid-cols-5 max-lg:text-center last:border-none max-lg:text-[0.7rem]'>
<p>{item.market_cap_rank}</p>
  
    
        <Link
        to={`/coin/${item.id}`}
         className='flex items-center gap-[10px] max-lg:flex-col'>
           <img
           className='w-[35px]'
           src={item.img} alt={item.name}/>
           <p>{item.name + " - " + item.symbol}</p>
           
        </Link>
        <p>{currency.symbol} {item.current_price.toLocaleString()}</p>
        <p 
        className={item.price_change_percentage_24h > 0 ? "text-green-500 text-center" :  "text-red-500 text-center"}>{Math.floor(item.price_change_percentage_24h * 100)/100}</p>
        <p className='text-right max-lg:text-center max-lg:text-[0.6rem]'>{currency.symbol} {item.market_cap.toLocaleString()}</p>
          </div>
          </>
        ))
    }
 </div>
   </>
  )
}

export default SavedCoins