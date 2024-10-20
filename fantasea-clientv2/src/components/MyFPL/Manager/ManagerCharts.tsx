import { useEffect, useState } from "react";
import { ManagerDetails } from "../../../models/manager/ManagerDetails"
import { EventHistory } from "../../../models/manager/ManagerHistory";
import { PointsChart } from "../Charts/PointsChart";
import { RankChart } from "../Charts/RankChart";

interface ManagerChartsProps {
    managerDetails: ManagerDetails
}
interface ChartDataPoint {
    gameweek: number;
    value: number;
}
export const ManagerCharts = ({managerDetails}:ManagerChartsProps):JSX.Element => {
    const [pointsData, setPointsData] = useState<ChartDataPoint[]>([]);
    const [rankData, setRankData] = useState<ChartDataPoint[]>([]);

    useEffect(() => {
        const history = managerDetails.manager_history.current;
        const pointsChartData: ChartDataPoint[] = history.map((item:EventHistory) => ({
            gameweek: item.event,
            value: item.points
        }))
        setPointsData(pointsChartData);

        const rankChartData: ChartDataPoint[] = history.map((item:EventHistory) => ({
            gameweek: item.event,
            value: item.overall_rank  
        }))
        setRankData(rankChartData)
    }, [managerDetails])

    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <div className="p-4 bg-white rounded-lg shadow">
                <h3 className="text-sm font-semibold mb-4 text-center">Points Per Gameweek</h3>
                {pointsData.length > 0 ? (
                    <PointsChart data={pointsData}/>
                ):
                (<p>No data available to display</p>)}
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
                <h3 className="text-sm font-semibold mb-4 text-center">Rank Per Gameweek</h3>
                {pointsData.length > 0 ? (
                    <RankChart data={rankData}/>
                ):
                (<p>No data available to display</p>)}
            </div>
        </div>
    )
}