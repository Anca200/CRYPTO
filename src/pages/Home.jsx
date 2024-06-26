import React, { useContext, useEffect, useState } from 'react';
import { CoinContext } from '../context/CoinContext';
import { Link } from 'react-router-dom';
import {db} from "../firebase";
import {arrayUnion, doc, updateDoc} from "firebase/firestore";
import { UserAuth } from '../context/AuthContext';

const Home = () => {

     const {allCoin, currency} = useContext(CoinContext);
     const [displayCoin, setDisplayCoin] = useState([]);
     const [input, setInput] = useState("");

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

     
     const inputHandler = (event) => {
         setInput(event.target.value);
     }
     const searchHandler = async (event) => {
        event.preventDefault();
        const coins = await allCoin.filter((item) => {
          return item.name.toLowerCase().includes(input.toLowerCase())
        })
        setDisplayCoin(coins);
     }

     useEffect(() => {
        setDisplayCoin(allCoin);
     },[allCoin])

  
  return (

<div className='bg-gradient-to-r from-blue-900 to-slate-900 w-full h-auto max-lg:h-auto'> 
 <div className=' flex flex-col  text-center gap-[20px] w-[600px] m-auto
 max-lg:w-full'>

    {/*Context*/}
 <h1 className='mt-[50px] text-[3rem] text-gray-200 font-bold'>Largest <br/> Crypto Marketplace</h1>
 <p className='text-white'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum saepe eum distinctio voluptas tempore exercitationem!</p>

   {/*Form*/}
 <form 
  onSubmit={searchHandler}
 className='p-[8px] w-[80%] bg-gray-200 rounded-[5px] text-[20px] flex justify-center items-center gap-[10px] m-auto max-lg:w-[90%]'>
<input  
onChange={inputHandler}
value={input}
className="flex-1 outline-none text-lg bg-gray-200 "
type="text"
placeholder='Search crypto..'
required/> 
    <button  className="bg-purple-500 cursor-pointer text-gray-200  text-[16px] rounded-[5px] p-[5px]" type="submit">Search</button>
 </form>
 </div>

   {/*Table*/}
 <div className='w-[800px] m-auto rounded-[15px]  bg-gradient-to-t from-purple-900 to-blue-900 mt-[50px] max-lg:w-full relative'>
    <div className='grid grid-cols-gridcol items-center p-[10px] text-gray-200 border-b-2 border-gray-500 max-lg:grid-cols-5 max-lg:text-center'>
        <p>#</p>
        <p>Coins</p>
        <p>Price</p>
        <p className='text-center '>24H </p>
        <p className='text-right max-lg:text-center'>Market Cap</p>
    </div>

    {
     
        displayCoin.slice(0,10).map((item,index) =>(
          <>
          <div
          key={index}
          className='grid grid-cols-gridcol items-center p-[10px] text-white border-b-2 border-gray-500 max-lg:grid-cols-5 max-lg:text-center last:border-none max-lg:text-[0.7rem]'>

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
        ))
    }
 </div>
</div>
  )
}

export default Home