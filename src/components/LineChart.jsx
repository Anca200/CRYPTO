import React, { useEffect, useState } from 'react';
import Chart from 'react-google-charts';

const LineChart = ({chartData}) => {

const [data,setData] = useState([["Date", "Prices"]]);

useEffect(() => {
 let dataCopy = [["Date", "Prices"]];
 if(chartData.prices){
    chartData.prices.map((item) =>{
        dataCopy.push([`${new Date(item[0]).toLocaleDateString().slice(0,-5)}`,item[1]])
    })
    setData(dataCopy);
 }
},[chartData])

  return (
<Chart
chartType='AreaChart'
data={data}
height="100%"
width="100%"
legendToggle
options = {{

  backgroundColor: "transparent",
      colors: ["white"],
      hAxis: {
        textStyle:{color: 'white'}
    },
    vAxis: {
      textStyle:{color: 'white'}
  }
}

}

/>
  )
}

export default LineChart