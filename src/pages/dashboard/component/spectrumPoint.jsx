import { Card, Select } from "antd";
import reportAPI from "apis/reportAPI";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { SPECTRUM_CHART_TYPE } from "constants/types";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { caculateScore } from "utils/common";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const SpectrumPoint = ({ classroomId, examId }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  const [spectrumChartType, setSpectrumChartType] = useState(
    SPECTRUM_CHART_TYPE.AMOUNT.code
  );

  const [spectrumPointData, setSpectrumPointData] = useState();
  const [chartData, setChartData] = useState();

  useEffect(() => {
    if (classroomId && examId) getSpectrumChartType();
  }, [classroomId, examId]);

  useEffect(() => {
    if (spectrumPointData) renderChartData();
  }, [spectrumPointData,spectrumChartType]);

  const getSpectrumChartType = async () => {
    await reportAPI
      .getSpectrumPoint({ classroomId: classroomId, examId: examId })
      .then((res) => {
        if (res.data) {
          setSpectrumPointData(res.data);
        }
      });
  };

  const renderChartData = () => {
    if (spectrumChartType === SPECTRUM_CHART_TYPE.AMOUNT.code) {
      const listAllPoint = Array.from(
        Array(spectrumPointData?.amountQuestion + 1).keys()
      );

      const chartData = listAllPoint?.map(
        (point) =>
          spectrumPointData.listPoint?.filter((item) => item === point)
            ?.length ?? 0
      );

      setChartData({
        labels: listAllPoint,
        datasets: [
          {
            label: "Số lượng",
            data: chartData,
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      });
    } else if (spectrumChartType === SPECTRUM_CHART_TYPE.POINT.code) {
      const listAllPoint = Array.from(Array(41).keys()).map(item=> item*0.25);

      const chartData = listAllPoint?.map(
        (point) =>
          spectrumPointData.listPoint?.filter((item) => caculateScore(item, spectrumPointData?.amountQuestion)===point)
            ?.length ?? 0
      );

      console.log({listAllPoint, chartData})

      setChartData({
        labels: listAllPoint,
        datasets: [
          {
            label: "Số lượng",
            data: chartData,
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      });
    }
  };

  return (
    <>
      <Card className="h-100" bodyStyle={{height:"100%"}}>
        <div className='row g-3'>
          <div className='col-12 d-flex justify-content-between align-content-center'>
            <div className='font-weight-bold'>Phổ điểm bài thi</div>
            <div>
              <Select
                style={{ minWidth: "10rem" }}
                value={spectrumChartType}
                onChange={(value) => setSpectrumChartType(value)}
                options={Object.values(SPECTRUM_CHART_TYPE)?.map((exam) => ({
                  value: exam?.code,
                  label: exam?.meaning,
                }))}
              />
            </div>
          </div>

          <div className='col-12'>
            {chartData && <Line options={options} data={chartData} />}
          </div>
        </div>
      </Card>
    </>
  );
};

export default SpectrumPoint;
