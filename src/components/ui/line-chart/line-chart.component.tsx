import {
  ChartData,
  CategoryScale,
  Chart,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

import styles from "./line-chart.module.scss";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type Props = {
  chartData: ChartData<"line">;
};

const LineChart = ({ chartData }: Props) => {
  return (
    <>
      <div className={styles.wrapper}>
        <Line data={chartData} />
      </div>
    </>
  );
};

export default LineChart;
