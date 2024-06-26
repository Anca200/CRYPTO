import React, {useState,useEffect} from 'react';
import { UserAuth } from '../context/AuthContext';
import {db} from "../firebase";
import { updateDoc, doc, onSnapshot } from 'firebase/firestore';

const SavedCoins = () => {
    const {user} = UserAuth();
   const [movies,setMovie] = useState([])


   useEffect(() => {
    onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
      setMovie(doc.data()?.savedCoin);
    });
  }, [user?.email]);

  const movieRef = doc(db, 'users', `${user?.email}`)
  const deleteShow = async (passedID) => {
      try {
        const result = movies.filter((item) => item.id !== passedID)
        await updateDoc(movieRef, {
            savedShows: result
        })
      } catch (error) {
          console.log(error)
      }
  }
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

    { movies?.map((item,index) =>(
          <>
       <div key={index}
          className='grid grid-cols-gridcol items-center p-[10px] text-white border-b-2 border-gray-500 max-lg:grid-cols-5 max-lg:text-center last:border-none max-lg:text-[0.7rem]'>
<p>{item.market_cap_rank}</p>
  
        <div
         className='flex items-center gap-[10px] max-lg:flex-col'>
           <img
           className='w-[35px]'
           src={item.img} alt={item.name}/>
           <p>{item.name }</p>  
        </div>
          </div>
          </>
        ))
    }
 </div>
   </>
  )
}

export default SavedCoins