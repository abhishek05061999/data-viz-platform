import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/useRedux';
import { toggleVariable, updateVariableValue } from '../../store/slices/variablesSlice';

const VariablesPanel: React.FC = () => {
  const dispatch = useAppDispatch();
  const { variableGroups } = useAppSelector((state) => state.variables);
  const [hoveredVariable, setHoveredVariable] = useState<string | null>(null);

  const handleVariableToggle = (variableId: string) => {
    dispatch(toggleVariable(variableId));
  };

  const handleVariableChange = (variableId: string, value: string | number | boolean) => {
    dispatch(updateVariableValue({ id: variableId, value }));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Variables Panel</h2>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>Active</span>
        </div>
      </div>

      <div className="space-y-6">
        {variableGroups.map((group) => (
          <div key={group.id} className="border-b border-gray-200 pb-4 last:border-b-0">
            <h3 className="text-sm font-medium text-gray-700 mb-3">{group.name}</h3>
            <div className="space-y-3">
              {group.variables.map((variable) => (
                <div
                  key={variable.id}
                  className="relative"
                  onMouseEnter={() => setHoveredVariable(variable.id)}
                  onMouseLeave={() => setHoveredVariable(null)}
                >
                  <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleVariableToggle(variable.id)}
                        className={`w-4 h-4 rounded border-2 transition-colors ${
                          variable.active
                            ? 'bg-blue-600 border-blue-600'
                            : 'bg-white border-gray-300'
                        }`}
                      >
                        {variable.active && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{variable.name}</p>
                        <p className="text-xs text-gray-500">{variable.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {variable.type === 'boolean' ? (
                        <button
                          onClick={() => handleVariableChange(variable.id, !variable.value)}
                          className={`px-2 py-1 text-xs rounded ${
                            variable.value
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {variable.value ? 'On' : 'Off'}
                        </button>
                      ) : variable.type === 'number' ? (
                        <input
                          type="number"
                          value={variable.value as number}
                          onChange={(e) => handleVariableChange(variable.id, parseFloat(e.target.value) || 0)}
                          className="w-16 px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      ) : variable.options ? (
                        <select
                          value={variable.value as string}
                          onChange={(e) => handleVariableChange(variable.id, e.target.value)}
                          className="px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                          {variable.options.map((option) => (
                            <option key={option.value.toString()} value={option.value.toString()}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="text"
                          value={variable.value as string}
                          onChange={(e) => handleVariableChange(variable.id, e.target.value)}
                          className="w-20 px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      )}
                    </div>
                  </div>

                  {/* Hover Tooltip */}
                  {hoveredVariable === variable.id && (
                    <div className="absolute z-20 left-full ml-2 top-1/2 transform -translate-y-1/2 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-lg">
                      <div className="font-medium mb-1">{variable.name}</div>
                      <div className="text-gray-300">{variable.description}</div>
                      <div className="mt-2 pt-2 border-t border-gray-700">
                        <div className="flex justify-between">
                          <span>Type:</span>
                          <span className="text-blue-300">{variable.type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Status:</span>
                          <span className={variable.active ? 'text-green-300' : 'text-red-300'}>
                            {variable.active ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </div>
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-0 h-0 border-l-4 border-l-gray-900 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {variableGroups.length === 0 && (
        <div className="text-center py-8">
          <div className="w-12 h-12 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <p className="text-sm text-gray-500">No variables available</p>
        </div>
      )}
    </div>
  );
};

export default VariablesPanel; 