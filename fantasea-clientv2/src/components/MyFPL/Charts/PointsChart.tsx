import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
  
interface ChartDataPoint {
    gameweek: number;
    value: number;
}
  
interface PointsChartProps {
    data: ChartDataPoint[];
}
  
export const PointsChart = ({ data }: PointsChartProps): JSX.Element => {
    return (
      <div className="w-full h-56">
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: -10 }}>
            <CartesianGrid strokeDasharray="0 1" />
            <XAxis
              dataKey="gameweek"
              tickFormatter={(value) => `GW${value}`}
              label={{ value: 'Gameweek', position: 'insideBottom', offset: -10 }}
              tick={{ fontSize: 10 }}
              interval={0}
            />
            <YAxis
              tick={{ fontSize: 10 }}
              domain={['dataMin', 'dataMax']}
            />
            <Tooltip labelFormatter={(label) => `Gameweek ${label}`} />
            <Line
              type="linear"
              dataKey="value"
              stroke="#63C6BE"
              strokeWidth={3}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
};
  