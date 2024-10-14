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
  
interface RankChartProps {
    data: ChartDataPoint[];
}
  
export const RankChart = ({ data }: RankChartProps): JSX.Element => {
    return (
      <div className="w-full h-56">
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 0 }}>
            <CartesianGrid strokeDasharray="0 1" />
            <XAxis
              dataKey="gameweek"
              tickFormatter={(value) => `GW${value}`}
              label={{ value: 'Gameweek', position: 'insideBottom', offset: -10 }}
              tick={{ fontSize: 12 }}
              interval={0}
            />
            <YAxis
              reversed={true} // Reverse Y-axis since lower rank is better
              tick={{ fontSize: 12 }}
              domain={['dataMin', 'dataMax']}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip
              labelFormatter={(label) => `Gameweek ${label}`}
              formatter={(value: number) => value.toLocaleString()}
            />
            <Line
              type="linear"
              dataKey="value"
              stroke="#FF6666"
              strokeWidth={3}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
};
  