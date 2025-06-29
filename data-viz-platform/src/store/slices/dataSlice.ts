import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { DataPoint, ChartData } from '../../types';

interface DataState {
  dataPoints: DataPoint[];
  chartData: ChartData;
  selectedDataPoint: DataPoint | null;
  loading: boolean;
  error: string | null;
}

// Generate some sample data
const generateSampleData = (): DataPoint[] => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map((month, index) => ({
    id: `data-${index}`,
    label: month,
    value: Math.floor(Math.random() * 100) + 20,
    timestamp: new Date(2023, index, 1).toISOString(),
    metadata: {
      category: index % 3 === 0 ? 'Category A' : index % 3 === 1 ? 'Category B' : 'Category C',
      region: index % 2 === 0 ? 'North' : 'South',
    },
  }));
};

const sampleData = generateSampleData();

// Transform data points to chart data
const transformToChartData = (dataPoints: DataPoint[]): ChartData => {
  return {
    labels: dataPoints.map(dp => dp.label),
    datasets: [
      {
        label: 'Sample Dataset',
        data: dataPoints.map(dp => dp.value),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        fill: true,
        tension: 0.4,
      },
    ],
  };
};

const initialState: DataState = {
  dataPoints: sampleData,
  chartData: transformToChartData(sampleData),
  selectedDataPoint: null,
  loading: false,
  error: null,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setDataPoints: (state, action: PayloadAction<DataPoint[]>) => {
      state.dataPoints = action.payload;
      state.chartData = transformToChartData(action.payload);
    },
    setSelectedDataPoint: (state, action: PayloadAction<DataPoint | null>) => {
      state.selectedDataPoint = action.payload;
    },
    updateDataPoint: (state, action: PayloadAction<DataPoint>) => {
      const index = state.dataPoints.findIndex(dp => dp.id === action.payload.id);
      if (index !== -1) {
        state.dataPoints[index] = action.payload;
        state.chartData = transformToChartData(state.dataPoints);
      }
    },
    addDataPoint: (state, action: PayloadAction<DataPoint>) => {
      state.dataPoints.push(action.payload);
      state.chartData = transformToChartData(state.dataPoints);
    },
    removeDataPoint: (state, action: PayloadAction<string>) => {
      state.dataPoints = state.dataPoints.filter(dp => dp.id !== action.payload);
      state.chartData = transformToChartData(state.dataPoints);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setDataPoints,
  setSelectedDataPoint,
  updateDataPoint,
  addDataPoint,
  removeDataPoint,
  setLoading,
  setError,
} = dataSlice.actions;

export default dataSlice.reducer;