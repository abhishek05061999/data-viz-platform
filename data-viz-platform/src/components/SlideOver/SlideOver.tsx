import React, { useState } from 'react';
import { useAppDispatch } from '../../hooks/useRedux';
import { updateVariableValue, toggleVariable } from '../../store/slices/variablesSlice';
import type { VariableGroup } from '../../types';

interface SlideOverProps {
  isOpen: boolean;
  onClose: () => void;
  variableGroups: VariableGroup[];
}

const SlideOver: React.FC<SlideOverProps> = ({ isOpen, onClose, variableGroups }) => {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState(0);

  const handleVariableChange = (variableId: string, value: string | number | boolean) => {
    dispatch(updateVariableValue({ id: variableId, value }));
  };

  const handleVariableToggle = (variableId: string) => {
    dispatch(toggleVariable(variableId));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 overflow-hidden z-50">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        onClick={onClose}
      />
      
      {/* Slide-over panel */}
      <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
        <div className="w-screen max-w-md">
          <div className="h-full flex flex-col bg-white shadow-xl">
            {/* Header */}
            <div className="px-4 py-6 bg-gray-50 sm:px-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">Edit Variables</h2>
                <button
                  onClick={onClose}
                  className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <span className="sr-only">Close panel</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {variableGroups.length > 0 ? (
                <div className="px-4 py-6 sm:px-6">
                  {/* Tabs */}
                  {variableGroups.length > 1 && (
                    <div className="border-b border-gray-200 mb-6">
                      <nav className="-mb-px flex space-x-8">
                        {variableGroups.map((group, index) => (
                          <button
                            key={group.id}
                            onClick={() => setActiveTab(index)}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${
                              activeTab === index
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                          >
                            {group.name}
                          </button>
                        ))}
                      </nav>
                    </div>
                  )}

                  {/* Variable Groups */}
                  <div className="space-y-6">
                    {variableGroups.map((group, groupIndex) => (
                      <div
                        key={group.id}
                        className={groupIndex === activeTab ? 'block' : 'hidden'}
                      >
                        <h3 className="text-lg font-medium text-gray-900 mb-4">{group.name}</h3>
                        <div className="space-y-4">
                          {group.variables.map((variable) => (
                            <div key={variable.id} className="bg-gray-50 rounded-lg p-4">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-3">
                                  <button
                                    onClick={() => handleVariableToggle(variable.id)}
                                    className={`w-5 h-5 rounded border-2 transition-colors ${
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
                                    <label className="text-sm font-medium text-gray-900">
                                      {variable.name}
                                    </label>
                                    <p className="text-xs text-gray-500">{variable.description}</p>
                                  </div>
                                </div>
                                <span className="text-xs text-gray-400 uppercase tracking-wide">
                                  {variable.type}
                                </span>
                              </div>

                              <div className="space-y-3">
                                {variable.type === 'boolean' ? (
                                  <div className="flex items-center space-x-4">
                                    <button
                                      onClick={() => handleVariableChange(variable.id, true)}
                                      className={`px-3 py-2 text-sm rounded-md transition-colors ${
                                        variable.value
                                          ? 'bg-blue-600 text-white'
                                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                      }`}
                                    >
                                      Enabled
                                    </button>
                                    <button
                                      onClick={() => handleVariableChange(variable.id, false)}
                                      className={`px-3 py-2 text-sm rounded-md transition-colors ${
                                        !variable.value
                                          ? 'bg-red-600 text-white'
                                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                      }`}
                                    >
                                      Disabled
                                    </button>
                                  </div>
                                ) : variable.type === 'number' ? (
                                  <div>
                                    <input
                                      type="number"
                                      value={variable.value as number}
                                      onChange={(e) => handleVariableChange(variable.id, parseFloat(e.target.value) || 0)}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                      placeholder="Enter a number"
                                    />
                                  </div>
                                ) : variable.options ? (
                                  <div>
                                    <select
                                      value={variable.value as string}
                                      onChange={(e) => handleVariableChange(variable.id, e.target.value)}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                      {variable.options.map((option) => (
                                        <option key={option.value.toString()} value={option.value.toString()}>
                                          {option.label}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                ) : (
                                  <div>
                                    <input
                                      type="text"
                                      value={variable.value as string}
                                      onChange={(e) => handleVariableChange(variable.id, e.target.value)}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                      placeholder="Enter a value"
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="px-4 py-6 sm:px-6">
                  <div className="text-center py-8">
                    <div className="w-12 h-12 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-500">No variables available for editing</p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex-shrink-0 px-4 py-4 border-t border-gray-200">
              <div className="flex justify-end space-x-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideOver; 