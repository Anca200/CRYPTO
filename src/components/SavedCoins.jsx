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
            savedCoin: result
        })
      } catch (error) {
          console.log(error)
      }
  }
  return (
    
   <>

    {/*Table*/}
 <div className='w-[250px]  rounded-[15px]  bg-chart  max-lg:w-full  items-center text-center absolute top-[100px] left-[500px]'>
    <div className='flex items-center p-[10px] text-gray-200 border-b-2 border-gray-500 max-lg:grid-cols-5 max-lg:text-center '>
    </div>

    { movies?.map((item,index) =>(
          <>
       <div key={index}
          className='grid grid-cols-4 items-center p-[10px] text-white border-b-2 border-gray-500 max-lg:grid-cols-5 max-lg:text-center last:border-none max-lg:text-[0.7rem]'>
            <div className='flex items-center gap-[10px] max-lg:flex-col'>
        <div
         className='flex items-center gap-[10px] max-lg:flex-col '>
           <img
           className='w-[55px]'
           src={item.img} alt={item.name}/>
           <p className='text-[2rem]'>{item.name }</p>  
           <p className='absolute right-[10px] cursor-pointer text-[1.5rem]' onClick={()=> deleteShow(item.id)}>x</p>   
        </div>
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