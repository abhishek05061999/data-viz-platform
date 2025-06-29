import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useRedux';
import Header from '../../components/common/Header';
import ChartContainer from '../../components/Dashboard/ChartContainer';
import VariablesList from '../../components/Dashboard/VariablesList';
import DataPointDetails from '../../components/Dashboard/DataPointDetails';
import VariableEditForm from '../../components/SlideOver/VariableEditForm';

const DashboardPage: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { selectedDataPoint } = useAppSelector((state) => state.data);
  const { isEditingVariables } = useAppSelector((state) => state.variables);

  // Redirect if user is not logged in
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Chart Area */}
            <div className="lg:col-span-3">
              <ChartContainer />
            </div>
            
            {/* Variables Sidebar */}
            <div className="lg:col-span-1">
              <VariablesList />
            </div>
          </div>
        </div>
      </main>
      
      {/* Modals and Slide-overs */}
      {selectedDataPoint && <DataPointDetails />}
      {isEditingVariables && <VariableEditForm />}
    </div>
  );
};

export default DashboardPage;