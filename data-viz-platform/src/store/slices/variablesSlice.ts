import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Variable, VariableGroup } from '../../types';

interface VariablesState {
  variableGroups: VariableGroup[];
  selectedVariable: Variable | null;
  isEditingVariables: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: VariablesState = {
  variableGroups: [
    {
      id: 'primary-variables',
      name: 'Primary Variables',
      variables: [
        {
          id: 'variable1',
          name: 'Estimated Cost',
          value: 428.07,
          type: 'number',
          description: 'The estimated cost of charging based on current rates and usage patterns.',
          active: true,
        },
        {
          id: 'variable2',
          name: 'Fleet Growth',
          value: 33.07,
          type: 'number',
          description: 'The percentage growth of the fleet over the selected time period.',
          active: true,
        },
        {
          id: 'variable3',
          name: 'Estimated Charge',
          value: 21.9,
          type: 'number',
          description: 'The estimated charge percentage based on current usage patterns.',
          active: true,
        },
        {
          id: 'variable4',
          name: 'Fleet Growth',
          value: 7.03,
          type: 'number',
          description: 'The percentage growth of the fleet over the selected time period.',
          active: true,
        },
      ],
    },
    {
      id: 'secondary-variables',
      name: 'Secondary Variables',
      variables: [
        {
          id: 'variable5',
          name: 'Peak Usage Time',
          value: '14:00-16:00',
          type: 'string',
          description: 'The time period with the highest charging station usage.',
          active: false,
        },
        {
          id: 'variable6',
          name: 'Average Charge Time',
          value: 45,
          type: 'number',
          description: 'The average time in minutes spent at a charging station.',
          active: false,
        },
        {
          id: 'variable7',
          name: 'Enable Notifications',
          value: true,
          type: 'boolean',
          description: 'Enable push notifications for charging status updates.',
          active: true,
        },
        {
          id: 'variable8',
          name: 'Data Source',
          value: 'api',
          type: 'string',
          description: 'The source of data for the visualization.',
          active: true,
          options: [
            { label: 'API', value: 'api' },
            { label: 'Database', value: 'database' },
            { label: 'File Upload', value: 'file' },
          ],
        },
      ],
    },
  ],
  selectedVariable: null,
  isEditingVariables: false,
  loading: false,
  error: null,
};

const variablesSlice = createSlice({
  name: 'variables',
  initialState,
  reducers: {
    setSelectedVariable: (state, action: PayloadAction<Variable | null>) => {
      state.selectedVariable = action.payload;
    },
    toggleVariableActive: (state, action: PayloadAction<string>) => {
      const variableId = action.payload;
      for (const group of state.variableGroups) {
        const variable = group.variables.find(v => v.id === variableId);
        if (variable) {
          variable.active = !variable.active;
          break;
        }
      }
    },
    toggleVariable: (state, action: PayloadAction<string>) => {
      const variableId = action.payload;
      for (const group of state.variableGroups) {
        const variable = group.variables.find(v => v.id === variableId);
        if (variable) {
          variable.active = !variable.active;
          break;
        }
      }
    },
    updateVariable: (state, action: PayloadAction<Variable>) => {
      const updatedVariable = action.payload;
      for (const group of state.variableGroups) {
        const index = group.variables.findIndex(v => v.id === updatedVariable.id);
        if (index !== -1) {
          group.variables[index] = updatedVariable;
          break;
        }
      }
    },
    updateVariableValue: (state, action: PayloadAction<{ id: string; value: string | number | boolean }>) => {
      const { id, value } = action.payload;
      for (const group of state.variableGroups) {
        const variable = group.variables.find(v => v.id === id);
        if (variable) {
          variable.value = value;
          break;
        }
      }
    },
    setEditingVariables: (state, action: PayloadAction<boolean>) => {
      state.isEditingVariables = action.payload;
    },
    addVariable: (state, action: PayloadAction<{ groupId: string; variable: Variable }>) => {
      const { groupId, variable } = action.payload;
      const group = state.variableGroups.find(g => g.id === groupId);
      if (group) {
        group.variables.push(variable);
      }
    },
    removeVariable: (state, action: PayloadAction<string>) => {
      const variableId = action.payload;
      for (const group of state.variableGroups) {
        const index = group.variables.findIndex(v => v.id === variableId);
        if (index !== -1) {
          group.variables.splice(index, 1);
          break;
        }
      }
    },
  },
});

export const {
  setSelectedVariable,
  toggleVariableActive,
  toggleVariable,
  updateVariable,
  updateVariableValue,
  setEditingVariables,
  addVariable,
  removeVariable,
} = variablesSlice.actions;

export default variablesSlice.reducer;