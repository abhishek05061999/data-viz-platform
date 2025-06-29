import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
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
} from 'chart.js';
import VariablesPanel from '../components/Dashboard/VariablesPanel';
import SlideOver from '../components/SlideOver/SlideOver'
import DetailsCard from '../components/Details/DetailsCard';
import type { DataPoint } from '../types';
import { logout } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DashboardPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { chartData, loading: dataLoading } = useAppSelector((state) => state.data);
  const { variableGroups } = useAppSelector((state) => state.variables);
  const navigate = useNavigate();

  // Local state for interactions
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
  const [hoveredDataPoint, setHoveredDataPoint] = useState<DataPoint | null>(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Fetch initial data when dashboard loads
    // Example: dispatch(fetchUserData(user.uid));
  }, [dispatch, user]);

  // Chart options for better interaction
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Data Visualization Dashboard',
      },
      tooltip: {
        enabled: false, // We'll use custom tooltip
      },
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
    onHover: (event: any, elements: any) => {
      if (elements && elements.length > 0) {
        const element = elements[0];
        const dataIndex = element.index;
        const datasetIndex = element.datasetIndex;
        
        if (chartData && chartData.datasets[datasetIndex] && chartData.datasets[datasetIndex].data[dataIndex]) {
          const dataPoint: DataPoint = {
            id: `point-${dataIndex}`,
            value: chartData.datasets[datasetIndex].data[dataIndex],
            label: chartData.labels[dataIndex],
            timestamp: new Date().toISOString(),
            metadata: {
              dataset: chartData.datasets[datasetIndex].label,
              index: dataIndex,
            }
          };
          
          setHoveredDataPoint(dataPoint);
          setHoverPosition({ x: event.x, y: event.y });
        }
      } else {
        setHoveredDataPoint(null);
      }
    },
  };

  // Generate sample chart data if none exists
  const displayChartData = chartData || {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Sales Data',
        data: [65, 59, 80, 81, 56, 55, 40, 45, 60, 70, 85, 90],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Revenue',
        data: [28, 48, 40, 19, 86, 27, 90, 85, 70, 60, 75, 80],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Data Visualization Platform</h1>
              <p className="text-sm text-gray-500">Welcome back, {user?.displayName || 'User'}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSlideOverOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
                Edit Variables
              </button>
              <button
                onClick={async () => {
                  await dispatch(logout());
                  navigate('/auth');
                }}
                className="ml-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Variables Panel */}
          <div className="lg:col-span-1">
            <VariablesPanel />
          </div>

          {/* Chart Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Data Visualization</h2>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Live Data</span>
                </div>
              </div>
              
              {dataLoading ? (
                <div className="flex items-center justify-center h-96">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <div className="relative">
                  <div className="h-96">
                    <Line data={displayChartData} options={chartOptions} />
                  </div>
                  
                  {/* Custom Details Card on Hover */}
                  {hoveredDataPoint && (
                    <div
                      className="absolute z-10"
                      style={{
                        left: hoverPosition.x + 10,
                        top: hoverPosition.y - 10,
                        transform: 'translateY(-50%)',
                      }}
                    >
                      <DetailsCard dataPoint={hoveredDataPoint} />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Slide Over for Variable Editing */}
      <SlideOver
        isOpen={isSlideOverOpen}
        onClose={() => setIsSlideOverOpen(false)}
        variableGroups={variableGroups}
      />
    </div>
  );
};

export default DashboardPage;