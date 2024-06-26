import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CoinContext } from '../context/CoinContext';
import { MoonLoader } from 'react-spinners';
import LineChart from '../components/LineChart';



const Coin = () => {

  const {coinId} = useParams();
  const [coinData, setCoinData] = useState();
  const {currency} = useContext(CoinContext);
  const [chartData, setChartData] = useState();

  const fetchCoinData = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': "CG-WkUaYvmehwbK5sBz3XdTx33M"
      }
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then(response => response.json())
      .then(response => setCoinData(response))
      .catch(err => console.error(err));
  }

  const fetchChartData = async () =>{
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': "CG-WkUaYvmehwbK5sBz3XdTx33M"
      }
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options)
      .then(response => response.json())
      .then(response => setChartData(response))
      .catch(err => console.error(err));
  }
  useEffect(() => {
fetchCoinData();
fetchChartData();
  },[currency])



  if(coinData && chartData) {
    return (
      <div className='bg-gradient-to-r from-blue-900 to-slate-900 w-full h-[150vh] max-lg:h-auto p-[50px]'>
       <div className='p-[10px] bg-chart w-[60%] rounded-[20px] h-auto m-auto'>
         <div className='flex flex-col  items-center gap-[20px] m-auto mt-[10px]'>
           <img
            className='w-[70px]'
           src={coinData.image.large} alt={coinData.name}/>

           <p className='text-[2rem] font-bold text-white'>{coinData.name}  <span className='text-[1rem] text-gray-400'>({coinData.symbol.toUpperCase()})</span></p>
           <p className='text-gray-200 text-[2rem] '>{currency.symbol} {coinData.market_data.current_price[currency.name].toLocaleString()}</p>
           </div>

         {/* Chart */}
         <div className='w-[800px] h-[350px] m-auto max-lg:w-full '>
         <LineChart chartData={chartData} />
         </div>

         <div className='flex justify-evenly text-center items-center'>
         <div>
         <h2 className='text-gray-400'> 24h Market High</h2>
         <p className='text-gray-200 text-[1.4rem]'>{currency.symbol} {coinData.market_data.high_24h[currency.name].toLocaleString()}</p>
         </div>
         <div>
         <h2 className='text-gray-400'> 24h Market Low</h2>
         <p className='text-gray-200 text-[1.4rem]'>{currency.symbol} {coinData.market_data.low_24h[currency.name].toLocaleString()}</p>
         </div>
         <div>
         <h2 className='text-gray-400'>Market Cap</h2>
         <p className='text-gray-200 text-[1.4rem]'>{currency.symbol} {coinData.market_data.market_cap[currency.name].toLocaleString()}</p>
         </div>
        </div>
       </div>
      </div>
    )
  }else {
    return (
      <div className='grid place-self-center h-[80vh]'>
       <div className='w-[65px] h-[65px] place-self-center '>
       <MoonLoader color="#4500c6" />
       </div>
      </div>
    )
  }
  
}

export default Coin