import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import type { ChartEvent, ActiveElement, TooltipItem } from 'chart.js';
import { useAppSelector, useAppDispatch } from '../../hooks/useRedux';
import { setSelectedDataPoint } from '../../store/slices/dataSlice';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ChartContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { chartData, dataPoints } = useAppSelector((state) => state.data);
  const { variableGroups } = useAppSelector((state) => state.variables);
  
  // Get active variables
  const activeVariables = variableGroups.flatMap(group => 
    group.variables.filter(variable => variable.active)
  );

  // Handle point click
  const handlePointClick = (point: ActiveElement) => {
    const dataIndex = point.index;
    if (dataIndex !== undefined && dataPoints[dataIndex]) {
      dispatch(setSelectedDataPoint(dataPoints[dataIndex]));
    }
  };

  // Configure chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Data Visualization',
        font: {
          size: 16,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: TooltipItem<'line'>) {
            const dataPoint = dataPoints[context.dataIndex];
            return `Value: ${dataPoint.value}`;
          },
          afterLabel: function() {
            const labels: string[] = [];
            
            // Add active variable information to tooltip
            activeVariables.forEach(variable => {
              labels.push(`${variable.name}: ${variable.value}`);
            });
            
            return labels;
          },
        },
      },
    },
    onClick: (_event: ChartEvent, elements: ActiveElement[]) => {
      if (elements && elements.length > 0) {
        handlePointClick(elements[0]);
      }
    },
    hover: {
      mode: 'nearest' as const,
      intersect: true,
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="w-full h-96 p-4 bg-white rounded-lg shadow-md">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default ChartContainer;