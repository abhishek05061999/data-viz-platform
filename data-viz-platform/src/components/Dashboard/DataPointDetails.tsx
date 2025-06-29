import React from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/useRedux';
import { setSelectedDataPoint } from '../../store/slices/dataSlice';

const DataPointDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedDataPoint } = useAppSelector((state) => state.data);

  if (!selectedDataPoint) {
    return null;
  }

  const handleClose = () => {
    dispatch(setSelectedDataPoint(null));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
          aria-hidden="true"
          onClick={handleClose}
        ></div>

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  Data Point Details
                </h3>
                
                <div className="mt-4 space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Label</h4>
                    <p className="mt-1 text-sm text-gray-900">{selectedDataPoint.label}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Value</h4>
                    <p className="mt-1 text-sm text-gray-900">{selectedDataPoint.value}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Date</h4>
                    <p className="mt-1 text-sm text-gray-900">{formatDate(selectedDataPoint.timestamp)}</p>
                  </div>
                  
                  {selectedDataPoint.metadata && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Metadata</h4>
                      <div className="mt-1 bg-gray-50 p-3 rounded-md">
                        {Object.entries(selectedDataPoint.metadata).map(([key, value]) => (
                          <div key={key} className="flex justify-between text-sm">
                            <span className="font-medium text-gray-500">{key}:</span>
                            <span className="text-gray-900">
                              {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button 
              type="button" 
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataPointDetails;