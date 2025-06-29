import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/useRedux';
import { setUser } from '../store/slices/authSlice';

const TestComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, loading: authLoading, error: authError } = useAppSelector((state) => state.auth);
  const { chartData, loading: dataLoading, error: dataError } = useAppSelector((state) => state.data);
  const { variableGroups, loading: variablesLoading, error: variablesError } = useAppSelector((state) => state.variables);

  useEffect(() => {
    console.log('TestComponent mounted');
    console.log('Current auth state:', { user, authLoading, authError });
    console.log('Current data state:', { chartData, dataLoading, dataError });
    console.log('Current variables state:', { variableGroups, variablesLoading, variablesError });
    
    // Set a mock user for testing if no user is present
    if (!user) {
      console.log('Setting mock user');
      const mockUser = {
        uid: 'mock-user-123',
        email: 'test@example.com',
        displayName: 'Test User',
        photoURL: '',
      };
      dispatch(setUser(mockUser));
    }
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test Component</h1>
      
      <div className="mb-6 p-4 bg-gray-100 rounded">
        <h2 className="text-xl font-semibold mb-2">Authentication Status:</h2>
        {authLoading ? (
          <p className="text-blue-600">⏳ Loading authentication...</p>
        ) : user ? (
          <div className="text-green-600">
            <p>✅ Authenticated as: {user.email}</p>
            <p>Display Name: {user.displayName}</p>
            <p>User ID: {user.uid}</p>
          </div>
        ) : (
          <p className="text-red-600">❌ Not authenticated</p>
        )}
        {authError && <p className="text-red-600 mt-2">Error: {authError}</p>}
      </div>

      <div className="mb-6 p-4 bg-gray-100 rounded">
        <h2 className="text-xl font-semibold mb-2">Chart Data:</h2>
        {dataLoading ? (
          <p className="text-blue-600">⏳ Loading chart data...</p>
        ) : chartData ? (
          <div>
            <p>✅ Chart data is available</p>
            <p>Labels: {chartData.labels.join(', ')}</p>
            <p>Dataset: {chartData.datasets[0]?.label || 'No label'}</p>
            <p>Data points: {chartData.datasets[0]?.data?.length || 0}</p>
            <pre className="mt-2 p-2 bg-gray-200 rounded text-xs overflow-auto max-h-40">
              {JSON.stringify(chartData, null, 2)}
            </pre>
          </div>
        ) : (
          <p className="text-red-600">❌ No chart data available</p>
        )}
        {dataError && <p className="text-red-600 mt-2">Error: {dataError}</p>}
      </div>

      <div className="mb-6 p-4 bg-gray-100 rounded">
        <h2 className="text-xl font-semibold mb-2">Variables:</h2>
        {variablesLoading ? (
          <p className="text-blue-600">⏳ Loading variables...</p>
        ) : variableGroups.length > 0 ? (
          <div>
            <p>✅ Variables are available</p>
            <p>Number of groups: {variableGroups.length}</p>
            <p>Total variables: {variableGroups.reduce((acc, group) => acc + group.variables.length, 0)}</p>
            <pre className="mt-2 p-2 bg-gray-200 rounded text-xs overflow-auto max-h-40">
              {JSON.stringify(variableGroups, null, 2)}
            </pre>
          </div>
        ) : (
          <p className="text-red-600">❌ No variables available</p>
        )}
        {variablesError && <p className="text-red-600 mt-2">Error: {variablesError}</p>}
      </div>

      <div className="mt-8 flex space-x-4">
        <a href="/dashboard" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Go to Dashboard
        </a>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
};

export default TestComponent;