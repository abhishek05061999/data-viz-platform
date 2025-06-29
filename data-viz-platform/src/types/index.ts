// Data visualization types
export interface DataPoint {
  id: string;
  value: number;
  label: string;
  timestamp: string;
  metadata?: Record<string, string | number | boolean | object | null>;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
    fill?: boolean;
    tension?: number;
  }[];
}

// Variable types for data visualization
export interface Variable {
  id: string;
  name: string;
  value: string | number | boolean;
  type: 'string' | 'number' | 'boolean';
  description: string;
  active: boolean;
  options?: Array<{ label: string; value: string | number | boolean }>;
}

export interface VariableGroup {
  id: string;
  name: string;
  variables: Variable[];
}

// User authentication types
export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}