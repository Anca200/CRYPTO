import React, { useContext, useEffect, useState } from 'react';
import { CoinContext } from '../context/CoinContext';
import { Link } from 'react-router-dom';

import CoinMain from '../components/CoinMain';

const Home = () => {

     const {allCoin, currency} = useContext(CoinContext);
     const [displayCoin, setDisplayCoin] = useState([]);
     const [input, setInput] = useState("");

     

     
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
      <p>Save</p>
        <p>#</p>
        <p>Coins</p>
        <p>Price</p>
        <p className='text-center '>24H </p>
        <p className='text-right max-lg:text-center'>Market Cap</p>
    </div>

    { displayCoin.slice(0,10).map((item,index) =>(
          <>
      <CoinMain key={index} item={item}/>
          </>
        ))
    }
 </div>
</div>
  )
}

export default Home