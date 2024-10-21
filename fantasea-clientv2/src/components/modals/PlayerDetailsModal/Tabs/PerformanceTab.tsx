import { useEffect, useState } from "react";
import { PlayerHistoryItem } from "../../../../models/PlayerHistoryItems";
import { Element } from "../../../../models/gen-info/Element";
import { PlayerSelectedChart } from "../Charts/PlayerSelectedChart";
import { PlayerPriceChart } from "../Charts/PlayerPriceChart";
import { PlayerPointsChart } from "../Charts/PlayerPointsChart";
import { PlayerMinutesChart } from "../Charts/PlayerMinutesChart";

interface PerformanceTabProps {
    player: Element;
    history: PlayerHistoryItem[];
}
interface ChartDataPoint {
    gameweek: number;
    value: number;
  }
  
export const PerformanceTab = ({player, history}: PerformanceTabProps):JSX.Element => {
    const [priceData, setPriceData] = useState<ChartDataPoint[]>([]);
    const [pointsData, setPointsData] = useState<ChartDataPoint[]>([]);
    const [selectedData, setSelectedData] = useState<ChartDataPoint[]>([]);
    const [minutesData, setMinutesData] = useState<ChartDataPoint[]>([]);
    useEffect(() => {
        const priceChartData: ChartDataPoint[] = history.map((item) => ({
            gameweek: item.round,
            value: item.value / 10,
        }));
        setPriceData(priceChartData);

        const pointsChartData: ChartDataPoint[] = history.map((item) => ({
            gameweek: item.round,
            value: item.total_points,
        }))
        setPointsData(pointsChartData);

        const selectedChartData: ChartDataPoint[] = history.map((item) => ({
            gameweek: item.round,
            value: item.selected
        }))
        setSelectedData(selectedChartData);

        const minutesChartData: ChartDataPoint[] = history.map((item) => ({
            gameweek: item.round,
            value: item.minutes
        }))
        setMinutesData(minutesChartData);
      }, [history]);
    
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Selected Chart */}
            <div className="md:p-4 bg-white rounded-lg shadow">
                <h3 className="text-sm font-semibold mb-4 text-center">Player Selected Over Time</h3>
                {selectedData.length > 0 ? (
                  <PlayerSelectedChart data={selectedData} />
                ) : (
                  <p>No data available to display.</p>
                )}
            </div>
          {/* Price Chart */}
          <div className="md:p-4 bg-white rounded-lg shadow">
            <h3 className="text-sm font-semibold mb-4 text-center">Player Price Over Time</h3>
            {priceData.length > 0 ? (
              <PlayerPriceChart data={priceData} />
            ) : (
              <p>No data available to display.</p>
            )}
          </div>
    
          {/* Point Chart */}
          <div className="md:p-4 bg-white rounded-lg shadow">
            <h3 className="text-sm font-semibold mb-4 text-center">Player Points Over Time</h3>
            {pointsData.length > 0 ? (
              <PlayerPointsChart data={pointsData} />
            ) : (
              <p>No data available to display.</p>
            )}
          </div>

            {/* Minutes Chart */}
            <div className="md:p-4 bg-white rounded-lg shadow">
            <h3 className="text-sm font-semibold mb-4 text-center">Player Minutes Over Time</h3>
            {minutesData.length > 0 ? (
              <PlayerMinutesChart data={minutesData} />
            ) : (
              <p>No data available to display.</p>
            )}
          </div>
    

        </div>
      );
}