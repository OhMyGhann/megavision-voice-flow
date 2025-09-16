import { useState } from "react";
import { Phone, PhoneCall, PhoneOff, Mic, MicOff, Volume2, VolumeX, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAgentStore, type AgentStatus } from "@/lib/stores/agent-store";
import { useSoftphoneStore } from "@/lib/stores/softphone-store";
import { StatusChip } from "@/components/ui/status-chip";
import { useToast } from "@/hooks/use-toast";

const mockLeads = [
  {
    id: "1",
    firstName: "Budi",
    lastName: "Santoso", 
    phoneNumber: "+6281234567890",
    email: "budi.santoso@email.com",
    campaignId: "camp-1",
    status: "New" as const,
    consented: true,
    notes: "Tertarik dengan produk investasi"
  },
  {
    id: "2", 
    firstName: "Sari",
    lastName: "Wijaya",
    phoneNumber: "+6287654321098", 
    email: "sari.wijaya@email.com",
    campaignId: "camp-1",
    status: "Callback" as const,
    consented: true,
    notes: "Minta dihubungi lagi jam 2 siang"
  }
];

export default function AgentDesktop() {
  const { currentAgent, updateAgentStatus } = useAgentStore();
  const { activeCall, isOnline, startCall, endCall, muteCall, setCurrentLead, currentLead } = useSoftphoneStore();
  const { toast } = useToast();
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleStatusChange = (newStatus: AgentStatus) => {
    updateAgentStatus(newStatus);
    toast({
      title: "Status Diperbarui",
      description: `Status Anda sekarang: ${newStatus}`,
    });
  };

  const handleStartCall = (phone: string, leadId?: string) => {
    if (!isOnline) {
      toast({
        title: "Error",
        description: "Softphone tidak online. Silakan login terlebih dahulu.",
        variant: "destructive"
      });
      return;
    }

    startCall(phone, leadId);
    updateAgentStatus('On Call');
    toast({
      title: "Memulai Panggilan",
      description: `Menggunakan Caller ID: +62 8111 (rotasi)`,
    });
  };

  const handleEndCall = () => {
    endCall();
    updateAgentStatus('ACW');
    // ACW Modal would open here
  };

  const handleLeadSelect = (lead: typeof mockLeads[0]) => {
    setCurrentLead(lead);
    setPhoneNumber(lead.phoneNumber);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-h1">Desktop Agent</h1>
        <div className="flex items-center gap-4">
          <StatusChip status={currentAgent?.status || 'Offline'} />
          <Select onValueChange={(value) => handleStatusChange(value as AgentStatus)}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Ubah Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Available">Tersedia</SelectItem>
              <SelectItem value="Break">Istirahat</SelectItem>
              <SelectItem value="Offline">Offline</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Softphone Panel */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Softphone
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Connection Status */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Status Koneksi:</span>
              <Badge variant={isOnline ? "default" : "secondary"}>
                {isOnline ? "Online" : "Offline"}
              </Badge>
            </div>

            {/* Phone Number Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Nomor Telepon</label>
              <Input 
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+62..."
                disabled={!!activeCall}
              />
            </div>

            {/* Call Controls */}
            <div className="space-y-3">
              {!activeCall ? (
                <Button 
                  onClick={() => handleStartCall(phoneNumber)}
                  disabled={!phoneNumber || !isOnline}
                  className="w-full"
                  size="lg"
                >
                  <PhoneCall className="h-4 w-4 mr-2" />
                  Mulai Panggilan
                </Button>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2 p-3 bg-primary/10 rounded-lg">
                    <Clock className="h-4 w-4" />
                    <span className="font-mono">00:00:00</span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      onClick={muteCall}
                      variant={activeCall.muted ? "default" : "outline"}
                      size="sm"
                    >
                      {activeCall.muted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    </Button>
                    
                    <Button
                      onClick={() => {}}
                      variant="outline"
                      size="sm"
                    >
                      {activeCall.onHold ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </Button>
                    
                    <Button
                      onClick={handleEndCall}
                      variant="destructive"
                      size="sm"
                    >
                      <PhoneOff className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Lead Workbench */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Lead Workbench</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentLead ? (
                <div className="p-4 border rounded-lg bg-card">
                  <h3 className="font-medium">{currentLead.firstName} {currentLead.lastName}</h3>
                  <p className="text-sm text-muted-foreground">{currentLead.phoneNumber}</p>
                  <p className="text-sm text-muted-foreground">{currentLead.email}</p>
                  {currentLead.notes && (
                    <p className="text-sm mt-2 p-2 bg-muted rounded">{currentLead.notes}</p>
                  )}
                  <div className="flex items-center gap-2 mt-3">
                    <Badge variant="outline">{currentLead.status}</Badge>
                    {currentLead.consented && (
                      <Badge variant="secondary">Consented</Badge>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  Pilih lead dari daftar di bawah untuk memulai
                </p>
              )}

              {/* Lead List */}
              <div className="space-y-2">
                <h4 className="font-medium">Lead Tersedia</h4>
                {mockLeads.map((lead) => (
                  <div 
                    key={lead.id}
                    className={`p-3 border rounded-lg cursor-pointer hover:bg-accent transition-colors ${
                      currentLead?.id === lead.id ? 'bg-primary/10 border-primary' : ''
                    }`}
                    onClick={() => handleLeadSelect(lead)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{lead.firstName} {lead.lastName}</p>
                        <p className="text-sm text-muted-foreground">{lead.phoneNumber}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {lead.status}
                        </Badge>
                        <Button 
                          size="sm" 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLeadSelect(lead);
                            handleStartCall(lead.phoneNumber, lead.id);
                          }}
                          disabled={!!activeCall}
                        >
                          <PhoneCall className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}