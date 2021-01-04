import React, { useEffect, useState } from 'react';
import { Bar, defaults, HorizontalBar } from 'react-chartjs-2';
import { Doughnut, Line } from 'react-chartjs-2';
import { compareAsc, format } from 'date-fns';
import { CFormGroup, CSelect } from '@coreui/react';
import Select from 'react-select';

const options = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
  { value: '6', label: '6' },
  { value: '7', label: '7' },
  { value: '8', label: '8' },
  { value: '9', label: '9' },
  { value: '10', label: '10' },
  { value: '11', label: '11' },
  { value: '12', label: '12' }
];

function getDaysInMonth(month, year) {
  let date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    const fomatedDate = format(new Date(date), 'dd/MM/yyyy');
    days.push(fomatedDate);
    date.setDate(date.getDate() + 1);
  }

  return days;
}

const makeLabe = month => {
  const test = getDaysInMonth(month - 1, 2020);
  return test;
};

const AnalyzeExam = () => {
  const [dataPieChartReading, setDataPieChartReading] = useState({});
  const [dataPieChartListening, setDataPieChartListening] = useState({});
  const [data, setData] = useState({});

  const [dataColumnChart, setDataColumnChart] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [sumScore, setSumScore] = useState(null);
  /*  useEffect(() => {
    let cancelled = false;
    (async () => {
      const reqModel = {
        url: `http://localhost:9999/api/Fullexam/info`,
        id: id
      };
      dispatch(getExam(reqModel));
    })();
    return () => {
      cancelled = true;
    };
  }, []); */
  const dataMockColumnChar = () => {
    const result = [];
    let count = 1;
    while (count < 28) {
      const doOrNot = Math.floor(Math.random() * 1 + 1);
      const doTimes = Math.floor(Math.random() * 10) + 1;
      doOrNot && result.push(doTimes);
      count = count + 1;
    }
    return result;
  };

  const changeAnalyzeTimes = month => {
    const columnChar = {
      labels: makeLabe(month),
      datasets: [
        {
          label: 'Số lần làm bài(ngày)',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: dataMockColumnChar(),
          barPercentage: 0.8,
          categoryPercentage: 0.5
        }
      ]
    };
    const readScore = Math.floor(Math.random() * 400) + 50;
    const pieReadChar = {
      labels: ['Điểm đọc'],
      datasets: [
        {
          data: [readScore, 495 - readScore],
          backgroundColor: ['#33abe5', '#D3D3D3'],
          hoverBackgroundColor: ['#33abe5', '#D3D3D3']
        }
      ]
    };
    const listenScore = Math.floor(Math.random() * 400) + 50;
    const pieLisChar = {
      labels: ['Điểm nghe'],
      datasets: [
        {
          data: [listenScore, 495 - listenScore],
          backgroundColor: ['#33abe5', '#D3D3D3'],
          hoverBackgroundColor: ['#33abe5', '#D3D3D3']
        }
      ]
    };

    return {
      pieReadChar,
      pieLisChar,
      columnChar,
      sumScore: readScore + listenScore
    };
  };
  const handleChange = selectedOption => {
    setSelectedOption(selectedOption);
    console.log(selectedOption);
    const {
      pieReadChar,
      pieLisChar,
      columnChar,
      sumScore
    } = changeAnalyzeTimes(selectedOption.value);
    setSumScore(sumScore);
    setDataColumnChart(columnChar);
    setDataPieChartListening(pieLisChar);
    setDataPieChartReading(pieReadChar);
  };

  return (
    <div>
      <div className='analyze-filter'>
        <h3>Tháng:</h3>
        <Select
          className='months-selection'
          value={selectedOption}
          onChange={handleChange}
          options={options}
        />
      </div>
      {selectedOption && (
        <div className='analyze-score'>
          <div className='title'>
            Bài đạt điểm cao nhất:
            <span className='highlight'>{sumScore}/990</span>
            {/* (12/12/2020 14h20) */}
          </div>
          <div className='graph'>
            <Doughnut height='100' width='1100' data={dataPieChartListening} />
            <div className='listen-score'>
              <div>450/495 Listen</div>
            </div>
            <Doughnut height='100' width='1100' data={dataPieChartReading} />
            <div className='reading-score'>
              <div>300/495 Read</div>
            </div>
          </div>
        </div>
      )}
      {dataColumnChart && (
        <div className='analyze-times'>
          <div className='title'>
            Thống kê lượt làm bài tháng:
            <span className='highlight'>
              {selectedOption ? selectedOption.label : null}
            </span>
          </div>
          <Bar
            data={dataColumnChart}
            options={{
              maintainAspectRatio: false
            }}
          />
        </div>
      )}
    </div>
  );
};

export default AnalyzeExam;
