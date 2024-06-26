import React, { useContext, useEffect, useState } from 'react';
import { CoinContext } from '../context/CoinContext';
import { Link } from 'react-router-dom';
import {db} from "../firebase";
import {arrayUnion, doc, updateDoc} from "firebase/firestore";
import { UserAuth } from '../context/AuthContext';
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

const CoinMain = ({item}) => {
    
    const {allCoin, currency} = useContext(CoinContext);

       {/* for saving coin*/}
       const [like, setLike] = useState(false);
       const [saved, setSaved] = useState(true);
       const {user} = UserAuth();
       
       const coinID = doc(db, "users", `${user?.email}`)

       const saveCoin = async () => {
         if(user?.email) {
           setLike(!like)
           setSaved(true)
           await updateDoc(coinID, {
             savedCoin : arrayUnion({
               id: item.id,
               name: item.name,
               img: item.image
             })
           })
         }
         else{
          alert('Please log in to save a Coin')
         }
       }
  return (
    <>
      <div
          className='grid grid-cols-gridcol items-center p-[10px] text-white border-b-2 border-gray-500 max-lg:grid-cols-5 max-lg:text-center last:border-none max-lg:text-[0.7rem]'>

        
        <p  onClick={saveCoin}>
           {like ? ( <FaStar  size={20}/>)
           : (<FaRegStar size={20}/>)}
</p>
<p>{item.market_cap_rank}</p>
  
    
        <Link
        to={`/coin/${item.id}`}
         className='flex items-center gap-[10px] max-lg:flex-col'>
           <img
           className='w-[35px]'
           src={item.image} alt={item.name}/>
           <p>{item.name + " - " + item.symbol}</p>
           
        </Link>
        <p>{currency.symbol} {item.current_price.toLocaleString()}</p>
        <p 
        className={item.price_change_percentage_24h > 0 ? "text-green-500 text-center" :  "text-red-500 text-center"}>{Math.floor(item.price_change_percentage_24h * 100)/100}</p>
        <p className='text-right max-lg:text-center max-lg:text-[0.6rem]'>{currency.symbol} {item.market_cap.toLocaleString()}</p>
          </div>
    </>
  )
}

export default CoinMain