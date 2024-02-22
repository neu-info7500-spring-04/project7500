import { Box, Card, Grid, useTheme } from '@mui/material';
import { useState, useEffect } from 'react';
import { getHashrateDifficultyData } from 'src/service/BitcoinTranscationService';

import { LineChart } from '@mui/x-charts';

function DifficultyChart() {
  const theme = useTheme();
  const [xAxis, setXAxis] = useState<any>();
  const [yAxis, setYAxis] = useState<any>();
  const [chartData, setChartData] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHashrateDifficultyData();

        const xAxisData = data.map((entry) => new Date(entry.x));
        const yAxisData = data.map((entry) => entry.y);
        setChartData(data);
        setXAxis(xAxisData);
        setYAxis(yAxisData);
      } catch (error) {
        // Handle error
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Card>
      <Grid spacing={0} container>
        <Grid item xs={12} alignItems={'center'}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {xAxis && yAxis && (
              <LineChart
                xAxis={[{ data: xAxis }]}
                series={[
                  {
                    data: yAxis
                  }
                ]}
                width={800}
                height={500}
                title="BitCoin Difficulty"
                dataset={chartData}
              />
            )}
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}

export default DifficultyChart;

// import React, { useState, useEffect } from 'react';
// import { AxisOptions, Chart } from 'react-charts';
// import { getHashrateDifficultyData } from 'src/service/BitcoinTranscationService';
// type MyDatum = { x: Date; y: number };
// function DifficultyChart() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     // Fetch data when the component mounts
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const data = await getHashrateDifficultyData();

//       const xAxisData = data.map((entry) => new Date(entry.x));
//       const yAxisData = data.map((entry) => entry.y);
//       data.map((el) => new Date(el.x));
//       console.log('el', data);
//       setData(data);
//     } catch (error) {
//       // Handle error
//       console.error('Error fetching data:', error);
//     }
//   };

//   const primaryAxis = React.useMemo(
//     (): AxisOptions<MyDatum> => ({
//       getValue: (datum) => new Date(datum.x)
//     }),
//     [data]
//   );

//   const secondaryAxes = React.useMemo(
//     (): AxisOptions<MyDatum>[] => [
//       {
//         getValue: (datum) => datum.y
//       }
//     ],
//     [data]
//   );

//   return (
//     <>
//       {primaryAxis && secondaryAxes && (
//         <Chart
//           options={{
//             data,
//             primaryAxis,
//             secondaryAxes
//           }}
//         />
//       )}
//     </>
//   );
// }

// export default DifficultyChart;
