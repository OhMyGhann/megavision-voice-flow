import { useState } from "react";
import { Search, Download, Filter, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const mockCDRData = [
  {
    id: "call-001",
    timestamp: "2024-01-15 14:30:22",
    callerIdUsed: "+62 8111 2233 4455",
    leadName: "Budi Santoso",
    leadPhone: "+62 812 3456 7890",
    agent: "Agent Demo",
    duration: 180,
    outcome: "Interested",
    hangupCause: "Normal",
    hasRecording: true
  },
  {
    id: "call-002", 
    timestamp: "2024-01-15 14:25:11",
    callerIdUsed: "+62 8111 2233 4456",
    leadName: "Sari Wijaya",
    leadPhone: "+62 876 5432 1098",
    agent: "Agent Demo",
    duration: 65,
    outcome: "No Answer", 
    hangupCause: "No Answer",
    hasRecording: false
  },
  {
    id: "call-003",
    timestamp: "2024-01-15 14:20:05",
    callerIdUsed: "+62 8111 2233 4455", 
    leadName: "Andi Pratama",
    leadPhone: "+62 821 9876 5432",
    agent: "Agent Demo",
    duration: 245,
    outcome: "Callback",
    hangupCause: "Normal",
    hasRecording: true
  }
];

export default function CDRExplorer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOutcome, setSelectedOutcome] = useState("all");
  const [selectedAgent, setSelectedAgent] = useState("all");

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getOutcomeColor = (outcome: string) => {
    switch (outcome) {
      case 'Interested': return 'bg-green-100 text-green-800';
      case 'Not Interested': return 'bg-red-100 text-red-800'; 
      case 'Callback': return 'bg-blue-100 text-blue-800';
      case 'No Answer': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredData = mockCDRData.filter(call => {
    const matchesSearch = !searchTerm || 
      call.leadName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      call.leadPhone.includes(searchTerm) ||
      call.callerIdUsed.includes(searchTerm);
    
    const matchesOutcome = !selectedOutcome || selectedOutcome === "all" || call.outcome === selectedOutcome;
    const matchesAgent = !selectedAgent || selectedAgent === "all" || call.agent === selectedAgent;
    
    return matchesSearch && matchesOutcome && matchesAgent;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-h1">CDR Explorer</h1>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter & Pencarian
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Cari</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Nama, telepon, Caller ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Outcome</label>
              <Select value={selectedOutcome} onValueChange={setSelectedOutcome}>
                <SelectTrigger>
                  <SelectValue placeholder="Semua Outcome" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Outcome</SelectItem>
                  <SelectItem value="Interested">Interested</SelectItem>
                  <SelectItem value="Not Interested">Not Interested</SelectItem>
                  <SelectItem value="Callback">Callback</SelectItem>
                  <SelectItem value="No Answer">No Answer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Agent</label>
              <Select value={selectedAgent} onValueChange={setSelectedAgent}>
                <SelectTrigger>
                  <SelectValue placeholder="Semua Agent" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Agent</SelectItem>
                  <SelectItem value="Agent Demo">Agent Demo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedOutcome("all");
                  setSelectedAgent("all");
                }}
                className="w-full"
              >
                Reset Filter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CDR Table */}
      <Card>
        <CardHeader>
          <CardTitle>Riwayat Panggilan ({filteredData.length} records)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Waktu</TableHead>
                  <TableHead>Caller ID yang Dipakai</TableHead>
                  <TableHead>Lead</TableHead>
                  <TableHead>Agent</TableHead>
                  <TableHead>Durasi</TableHead>
                  <TableHead>Outcome</TableHead>
                  <TableHead>Recording</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((call) => (
                  <TableRow key={call.id}>
                    <TableCell className="font-mono text-sm">
                      {call.timestamp}
                    </TableCell>
                    <TableCell className="font-mono">
                      {call.callerIdUsed}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{call.leadName}</p>
                        <p className="text-sm text-muted-foreground font-mono">
                          {call.leadPhone}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{call.agent}</TableCell>
                    <TableCell className="font-mono">
                      {formatDuration(call.duration)}
                    </TableCell>
                    <TableCell>
                      <Badge className={getOutcomeColor(call.outcome)}>
                        {call.outcome}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {call.hasRecording ? (
                        <Button variant="ghost" size="sm">
                          <Play className="h-3 w-3 mr-1" />
                          Play
                        </Button>
                      ) : (
                        <span className="text-muted-foreground text-sm">-</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}