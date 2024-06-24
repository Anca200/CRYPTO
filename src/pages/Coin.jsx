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
        'x-cg-demo-api-key': [import.meta.env.VITE_GECKO_API_KEY]
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
        'x-cg-demo-api-key':[import.meta.env.VITE_GECKO_API_KEY]
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
      <div className='bg-gradient-to-r from-blue-900 to-slate-900 w-full h-[150vh] max-lg:h-auto'>
       <div className='p-[10px]'>
         <div className='flex flex-col items-center gap-[20px] m-auto mt-[100px] mb-[50px]'>
           <img
            className='w-[100px]'
           src={coinData.image.large} alt={coinData.name}/>
           <p className='text-[3rem] font-bold text-white'>{coinData.name} ({coinData.symbol.toUpperCase()})</p>
         </div>

         {/* Chart */}
         <div className='w-[600px] h-[250px] m-auto'>
         <LineChart chartData={chartData}/>
         </div>

         <div className='w-[600px] m-auto mt-[200px] flex flex-col'>
      <ul className='flex justify-between p-[10px] border-b-2 border-gray-500 text-gray-200'>
        <li>Crypto Market Rank</li>
        <li>{coinData.market_cap_rank}</li>
      </ul>
      <ul  className='flex justify-between p-[10px] border-b-2 border-gray-500 text-gray-200'>
        <li>Crypto Price</li>
        <li>{currency.symbol} {coinData.market_data.current_price[currency.name].toLocaleString()}</li>
      </ul>
      <ul  className='flex justify-between p-[10px] border-b-2 border-gray-500 text-gray-200'>
        <li>Market Cap</li>
        <li>{currency.symbol} {coinData.market_data.market_cap[currency.name].toLocaleString()}</li>
      </ul>
      <ul  className='flex justify-between p-[10px] border-b-2 border-gray-500 text-gray-200'>
        <li> 24h Market High</li>
        <li>{currency.symbol} {coinData.market_data.high_24h[currency.name].toLocaleString()}</li>
      </ul>
      <ul  className='flex justify-between p-[10px] border-b-2 border-gray-500 text-gray-200'>
        <li> 24h Market Low</li>
        <li>{currency.symbol} {coinData.market_data.low_24h[currency.name].toLocaleString()}</li>
      </ul>
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