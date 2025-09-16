import { useState } from "react";
import { Play, Download, Search, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const mockRecordings = [
  {
    id: "rec-001",
    callId: "call-001",
    leadName: "Budi Santoso",
    agent: "Agent Demo",
    timestamp: "2024-01-15 14:30:22",
    duration: 180,
    sentiment: "Positif",
    score: 85,
    hasTranscript: true,
    retentionUntil: "2024-04-15"
  },
  {
    id: "rec-002",
    callId: "call-003", 
    leadName: "Andi Pratama",
    agent: "Agent Demo",
    timestamp: "2024-01-15 14:20:05",
    duration: 245,
    sentiment: "Netral",
    score: 72,
    hasTranscript: true,
    retentionUntil: "2024-04-15"
  }
];

export default function Recordings() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAgent, setSelectedAgent] = useState("");
  const [selectedSentiment, setSelectedSentiment] = useState("");

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'Positif': return 'bg-green-100 text-green-800';
      case 'Negatif': return 'bg-red-100 text-red-800';
      case 'Netral': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredData = mockRecordings.filter(recording => {
    const matchesSearch = !searchTerm || 
      recording.leadName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recording.callId.includes(searchTerm);
    
    const matchesAgent = !selectedAgent || recording.agent === selectedAgent;
    const matchesSentiment = !selectedSentiment || recording.sentiment === selectedSentiment;
    
    return matchesSearch && matchesAgent && matchesSentiment;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-h1">Recording Review</h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Shield className="h-4 w-4" />
          Rekaman untuk QA - akses terbatas
        </div>
      </div>

      {/* Privacy Notice */}
      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-amber-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-amber-800">Pemberitahuan Privasi</h3>
              <p className="text-sm text-amber-700 mt-1">
                Rekaman panggilan hanya boleh diakses untuk keperluan QA dan training. 
                Semua rekaman akan dihapus otomatis setelah 90 hari sesuai kebijakan retensi. 
                Akses dan download akan dicatat dalam audit log.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
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
                  placeholder="Call ID, nama lead..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Agent</label>
              <Select value={selectedAgent} onValueChange={setSelectedAgent}>
                <SelectTrigger>
                  <SelectValue placeholder="Semua Agent" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Semua Agent</SelectItem>
                  <SelectItem value="Agent Demo">Agent Demo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Sentiment</label>
              <Select value={selectedSentiment} onValueChange={setSelectedSentiment}>
                <SelectTrigger>
                  <SelectValue placeholder="Semua Sentiment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Semua Sentiment</SelectItem>
                  <SelectItem value="Positif">Positif</SelectItem>
                  <SelectItem value="Netral">Netral</SelectItem>
                  <SelectItem value="Negatif">Negatif</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedAgent("");
                  setSelectedSentiment("");
                }}
                className="w-full"
              >
                Reset Filter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recordings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Rekaman ({filteredData.length} files)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Call ID</TableHead>
                  <TableHead>Lead</TableHead>
                  <TableHead>Agent</TableHead>
                  <TableHead>Waktu</TableHead>
                  <TableHead>Durasi</TableHead>
                  <TableHead>Sentiment</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((recording) => (
                  <TableRow key={recording.id}>
                    <TableCell className="font-mono text-sm">
                      {recording.callId}
                    </TableCell>
                    <TableCell className="font-medium">
                      {recording.leadName}
                    </TableCell>
                    <TableCell>{recording.agent}</TableCell>
                    <TableCell className="font-mono text-sm">
                      {recording.timestamp}
                    </TableCell>
                    <TableCell className="font-mono">
                      {formatDuration(recording.duration)}
                    </TableCell>
                    <TableCell>
                      <Badge className={getSentimentColor(recording.sentiment)}>
                        {recording.sentiment}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className={`font-medium ${getScoreColor(recording.score)}`}>
                        {recording.score}%
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Play className="h-3 w-3 mr-1" />
                          Play
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {filteredData.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              Tidak ada rekaman yang ditemukan
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}