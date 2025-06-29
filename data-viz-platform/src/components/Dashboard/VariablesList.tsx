import React from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/useRedux';
import { toggleVariableActive, setSelectedVariable, setEditingVariables } from '../../store/slices/variablesSlice';
import type { Variable } from '../../types';

const VariablesList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { variableGroups } = useAppSelector((state) => state.variables);

  const handleToggleVariable = (variableId: string) => {
    dispatch(toggleVariableActive(variableId));
  };

  const handleEditVariable = (variable: Variable) => {
    dispatch(setSelectedVariable(variable));
    dispatch(setEditingVariables(true));
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-800">Variables</h2>
      </div>
      
      <div className="divide-y divide-gray-200">
        {variableGroups.map((group) => (
          <div key={group.id} className="p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">{group.name}</h3>
            
            <div className="space-y-3">
              {group.variables.map((variable) => (
                <div 
                  key={variable.id} 
                  className={`flex items-center justify-between p-3 rounded-md ${variable.active ? 'bg-blue-50' : 'bg-gray-50'}`}
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`variable-${variable.id}`}
                      checked={variable.active}
                      onChange={() => handleToggleVariable(variable.id)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label 
                      htmlFor={`variable-${variable.id}`}
                      className="ml-2 block text-sm font-medium text-gray-700"
                    >
                      {variable.name}
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">
                      {typeof variable.value === 'number' ? variable.value.toFixed(2) : variable.value.toString()}
                    </span>
                    <button
                      onClick={() => handleEditVariable(variable)}
                      className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VariablesList;