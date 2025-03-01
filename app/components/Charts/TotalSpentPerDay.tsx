// @ts-nocheck
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { LineChart } from '@mui/x-charts/LineChart';
import dayjs from 'dayjs';
import { arrayBuffer } from 'stream/consumers';
import ReactECharts from 'echarts-for-react';

export default function SessionsChart() {
  const [spentData, setSpentData] = React.useState<
    { date: number; total: number }[]
  >([]);

  const [chartData, setChartData] = React.useState<[string, number][]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/spent-daily', {
          next: { revalidate: 3600 },
        });
        const rawData: Record<string, unknown> = await response.json();

        const formattedData: [string, number][] = Object.entries(rawData)
          .map(([date, total]) => [
            dayjs(date).format('YYYY-MM-DD'),
            typeof total === 'number' ? total : 0,
          ])
          .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime());

        setChartData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const options = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#222',
      borderColor: '#555',
      textStyle: { color: '#fff' },
    },
    xAxis: {
      type: 'category',
      data: chartData.map((d) => d[0]),
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: '#aaa' },
      splitLine: { lineStyle: { color: '#444' } },
    },
    series: [
      {
        name: 'Daily Spend',
        data: chartData.map((d) => d[1]),
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 1,
        lineStyle: { width: 1, color: 'hsl(0, 90%, 30%)' },
        itemStyle: { color: '#ff9800', borderWidth: 2 },
      },
    ],
    grid: { left: '10%', right: '10%', bottom: '15%', top: '10%' },
  };

  const theme = useTheme();

  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Total spent per day
        </Typography>
        <Stack sx={{ justifyContent: 'space-between' }}>
          <Stack
            direction="row"
            sx={{
              alignContent: { xs: 'center', sm: 'flex-start' },
              alignItems: 'center',
              gap: 1,
            }}
          ></Stack>
        </Stack>
        <ReactECharts
          option={options}
          style={{ width: '100%', height: '250px' }}
        />
      </CardContent>
    </Card>
  );
}
