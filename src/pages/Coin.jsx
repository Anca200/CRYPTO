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
       <div className='p-[10px] bg-chart w-[60%] rounded-[20px] h-[500px] m-auto'>
         <div className='flex items-center gap-[20px] m-auto mt-[10px] mb-[50px] '>
           <img
            className='w-[80px]'
           src={coinData.image.large} alt={coinData.name}/>
           <p className='text-[2rem] font-bold text-white'>{coinData.name}  <span className='text-[1rem]'>({coinData.symbol.toUpperCase()})</span></p>
           <p>{currency.symbol} {coinData.market_data.current_price[currency.name].toLocaleString()}</p>
         </div>

         {/* Chart */}
         <div className='w-[800px] h-[350px] m-auto max-lg:w-full '>
         <LineChart chartData={chartData} />
         </div>

         <div className='w-[600px] m-auto mt-[200px] flex flex-col max-lg:w-full'>
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