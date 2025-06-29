import React from 'react';
import type { DataPoint } from '../../types';

interface DetailsCardProps {
  dataPoint: DataPoint;
}

const DetailsCard: React.FC<DetailsCardProps> = ({ dataPoint }) => {
  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const formatValue = (value: number) => {
    return new Intl.NumberFormat().format(value);
  };

  return (
    <div className="animate-fade-in bg-white rounded-lg shadow-lg border border-gray-200 p-4 w-64">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-900">Data Point Details</h3>
        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        {/* Label */}
        <div>
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Label</label>
          <p className="text-sm text-gray-900 font-medium">{dataPoint.label}</p>
        </div>

        {/* Value */}
        <div>
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Value</label>
          <p className="text-lg font-bold text-blue-600">{formatValue(dataPoint.value)}</p>
        </div>

        {/* Timestamp */}
        <div>
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Timestamp</label>
          <p className="text-xs text-gray-600">{formatTimestamp(dataPoint.timestamp)}</p>
        </div>

        {/* Metadata */}
        {dataPoint.metadata && Object.keys(dataPoint.metadata).length > 0 && (
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Additional Info</label>
            <div className="mt-1 space-y-1">
              {Object.entries(dataPoint.metadata).map(([key, value]) => (
                <div key={key} className="flex justify-between text-xs">
                  <span className="text-gray-600 capitalize">{key}:</span>
                  <span className="text-gray-900 font-medium">
                    {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ID */}
        <div>
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">ID</label>
          <p className="text-xs text-gray-600 font-mono">{dataPoint.id}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Hover to view details</span>
          <div className="flex items-center space-x-1">
            <div className="w-1 h-1 bg-green-500 rounded-full"></div>
            <span>Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsCard; 