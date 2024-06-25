import React from 'react';
import { Link } from 'react-router-dom';

const LogIn = () => {
  return (
    <div className='bg-gradient-to-r from-blue-900 to-slate-900 h-screen w-full'>
   <div className='bg-black/60'></div>
      <div className=' w-full px-4 py-24 z-50'>
        <div className='max-w-[450px] h-[600px] mx-auto bg-black/75 text-white rounded-[20px]'>
          <div className='max-w-[320px] mx-auto py-16'>
            <h1 className='text-3xl font-bold'>Log In</h1>
            <form className='w-full flex flex-col py-4'>
              <input
                className='p-3 my-2 bg-gray-700 rouded'
                type='email'
                placeholder='Email'
                autoComplete='email'
              />
               <div className='flex'>
                <input
                  className='p-3 my-2 bg-gray-700 rouded w-full'

                  name="password"
                  placeholder='Password'
                  autoComplete='current-password'
                />
                <span className='flex justify-around items-center cursor-pointer'></span>
                </div>
              <button className='bg-blue-900 py-3 my-6 rounded font-bold'>
                Log In
              </button>
     
              <p className='py-8'>
                <span className='text-gray-600'>Don't have an account?</span>{' '}
                <Link to='/sign'>Sign Up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogIn