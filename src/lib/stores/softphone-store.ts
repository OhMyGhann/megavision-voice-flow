import { create } from 'zustand';

export type CallState = 'idle' | 'connecting' | 'ringing' | 'connected' | 'ending';

export interface ActiveCall {
  id: string;
  leadId?: string;
  phoneNumber: string;
  callerIdUsed?: string;
  startTime?: Date;
  answerTime?: Date;
  endTime?: Date;
  duration: number;
  state: CallState;
  muted: boolean;
  onHold: boolean;
  disposition?: string;
  notes?: string;
}

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email?: string;
  campaignId: string;
  status: 'New' | 'Contacted' | 'Interested' | 'Not Interested' | 'Callback' | 'DNC';
  consented: boolean;
  lastContactDate?: Date;
  notes?: string;
}

interface SoftphoneState {
  isOnline: boolean;
  activeCall: ActiveCall | null;
  callHistory: ActiveCall[];
  currentLead: Lead | null;
  
  // WebRTC/Voice SDK state
  device: any; // Twilio Device instance
  accessToken: string | null;
  
  // Actions
  setOnline: (online: boolean) => void;
  setDevice: (device: any) => void;
  setAccessToken: (token: string) => void;
  startCall: (phoneNumber: string, leadId?: string) => void;
  acceptCall: () => void;
  endCall: (disposition?: string, notes?: string) => void;
  muteCall: () => void;
  holdCall: () => void;
  updateCallState: (state: CallState) => void;
  setCurrentLead: (lead: Lead | null) => void;
  addCallToHistory: (call: ActiveCall) => void;
}

export const useSoftphoneStore = create<SoftphoneState>((set, get) => ({
  isOnline: false,
  activeCall: null,
  callHistory: [],
  currentLead: null,
  device: null,
  accessToken: null,
  
  setOnline: (online) => set({ isOnline: online }),
  setDevice: (device) => set({ device }),
  setAccessToken: (token) => set({ accessToken: token }),
  
  startCall: (phoneNumber, leadId) => {
    const callId = crypto.randomUUID();
    const newCall: ActiveCall = {
      id: callId,
      leadId,
      phoneNumber,
      startTime: new Date(),
      duration: 0,
      state: 'connecting',
      muted: false,
      onHold: false
    };
    
    set({ activeCall: newCall });
    
    // Simulate call progression
    setTimeout(() => {
      set((state) => ({
        activeCall: state.activeCall ? {
          ...state.activeCall,
          state: 'ringing'
        } : null
      }));
    }, 1000);
  },
  
  acceptCall: () => set((state) => ({
    activeCall: state.activeCall ? {
      ...state.activeCall,
      answerTime: new Date(),
      state: 'connected'
    } : null
  })),
  
  endCall: (disposition, notes) => set((state) => {
    if (!state.activeCall) return state;
    
    const endTime = new Date();
    const duration = state.activeCall.answerTime 
      ? endTime.getTime() - state.activeCall.answerTime.getTime()
      : 0;
    
    const completedCall: ActiveCall = {
      ...state.activeCall,
      endTime,
      duration,
      state: 'idle',
      disposition,
      notes
    };
    
    return {
      activeCall: null,
      callHistory: [completedCall, ...state.callHistory]
    };
  }),
  
  muteCall: () => set((state) => ({
    activeCall: state.activeCall ? {
      ...state.activeCall,
      muted: !state.activeCall.muted
    } : null
  })),
  
  holdCall: () => set((state) => ({
    activeCall: state.activeCall ? {
      ...state.activeCall,
      onHold: !state.activeCall.onHold
    } : null
  })),
  
  updateCallState: (callState) => set((state) => ({
    activeCall: state.activeCall ? {
      ...state.activeCall,
      state: callState
    } : null
  })),
  
  setCurrentLead: (lead) => set({ currentLead: lead }),
  
  addCallToHistory: (call) => set((state) => ({
    callHistory: [call, ...state.callHistory]
  }))
}));