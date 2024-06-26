import React from 'react'
import SavedCoins from '../components/SavedCoins'

const Account = () => {
  return (
    <div
    className='bg-gradient-to-r from-blue-900 to-slate-900 w-full h-screen'>
        <div className='absolute top-[20%] p-4 md:p-8'>
          <h1 className='text-3xl md:text-5xl font-bold'>My coins</h1>
        </div>
        <SavedCoins/>
      </div>
  )
}

export default Account