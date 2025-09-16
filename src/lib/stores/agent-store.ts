import { create } from 'zustand';

export type AgentStatus = 'Available' | 'On Call' | 'ACW' | 'Break' | 'Offline';

export interface Agent {
  id: string;
  name: string;
  email: string;
  status: AgentStatus;
  role: 'Agent' | 'SPV' | 'Admin';
  loginTime?: Date;
  lastStatusChange?: Date;
}

export interface AgentStatusLog {
  id: string;
  agentId: string;
  status: AgentStatus;
  startTime: Date;
  endTime?: Date;
  duration?: number;
}

interface AgentState {
  currentAgent: Agent | null;
  statusLogs: AgentStatusLog[];
  
  // Actions
  setCurrentAgent: (agent: Agent) => void;
  updateAgentStatus: (status: AgentStatus) => void;
  addStatusLog: (log: AgentStatusLog) => void;
  logout: () => void;
}

export const useAgentStore = create<AgentState>((set, get) => ({
  currentAgent: null,
  statusLogs: [],
  
  setCurrentAgent: (agent) => set({ currentAgent: agent }),
  
  updateAgentStatus: (status) => set((state) => {
    if (!state.currentAgent) return state;
    
    const now = new Date();
    const updatedAgent = {
      ...state.currentAgent,
      status,
      lastStatusChange: now
    };
    
    // End current status log and start new one
    const updatedLogs = state.statusLogs.map(log => 
      !log.endTime ? { ...log, endTime: now, duration: now.getTime() - log.startTime.getTime() } : log
    );
    
    const newLog: AgentStatusLog = {
      id: crypto.randomUUID(),
      agentId: state.currentAgent.id,
      status,
      startTime: now
    };
    
    return {
      currentAgent: updatedAgent,
      statusLogs: [...updatedLogs, newLog]
    };
  }),
  
  addStatusLog: (log) => set((state) => ({
    statusLogs: [...state.statusLogs, log]
  })),
  
  logout: () => set((state) => {
    const now = new Date();
    const updatedLogs = state.statusLogs.map(log => 
      !log.endTime ? { ...log, endTime: now, duration: now.getTime() - log.startTime.getTime() } : log
    );
    
    return {
      currentAgent: null,
      statusLogs: updatedLogs
    };
  })
}));