import { useState } from "react";
import { Hash, Play, Pause, RefreshCw, Plus, AlertTriangle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const mockNumbersPool = [
  {
    id: "num-001",
    e164: "+62 8111 2233 4455",
    provider: "Twilio",
    status: "Active",
    dailyCap: 20,
    usedToday: 8,
    spamScore: 15,
    lastUsedAt: "2024-01-15 14:30:22",
    inboundRoute: "ivr-main",
    pausedUntil: null
  },
  {
    id: "num-002",
    e164: "+62 8111 2233 4456", 
    provider: "Twilio",
    status: "Active",
    dailyCap: 20,
    usedToday: 15,
    spamScore: 35,
    lastUsedAt: "2024-01-15 14:25:11",
    inboundRoute: "ivr-main",
    pausedUntil: null
  },
  {
    id: "num-003",
    e164: "+62 8111 2233 4457",
    provider: "Twilio", 
    status: "Paused",
    dailyCap: 20,
    usedToday: 18,
    spamScore: 65,
    lastUsedAt: "2024-01-15 13:45:33",
    inboundRoute: "ivr-main",
    pausedUntil: "2024-01-16 09:00:00"
  },
  {
    id: "num-004",
    e164: "+62 8111 2233 4458",
    provider: "Twilio",
    status: "Critical",
    dailyCap: 20,
    usedToday: 20,
    spamScore: 85,
    lastUsedAt: "2024-01-15 12:30:15",
    inboundRoute: "ivr-main", 
    pausedUntil: "2024-01-17 00:00:00"
  }
];

export default function NumbersPool() {
  const [selectedNumbers, setSelectedNumbers] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const { toast } = useToast();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Paused': return 'bg-yellow-100 text-yellow-800';
      case 'Critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getSpamScoreColor = (score: number) => {
    if (score >= 80) return 'health-critical';
    if (score >= 60) return 'health-poor';
    if (score >= 40) return 'health-fair';
    if (score >= 20) return 'health-good';
    return 'health-excellent';
  };

  const getUsagePercentage = (used: number, cap: number) => {
    return Math.round((used / cap) * 100);
  };

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedNumbers(mockNumbersPool.map(num => num.id));
    } else {
      setSelectedNumbers([]);
    }
  };

  const handleSelectNumber = (numberId: string, checked: boolean) => {
    if (checked) {
      setSelectedNumbers([...selectedNumbers, numberId]);
    } else {
      setSelectedNumbers(selectedNumbers.filter(id => id !== numberId));
    }
  };

  const handleBulkAction = (action: 'pause' | 'resume' | 'replace') => {
    if (selectedNumbers.length === 0) {
      toast({
        title: "Pilih Nomor",
        description: "Silakan pilih nomor terlebih dahulu",
        variant: "destructive"
      });
      return;
    }

    const actionText = {
      pause: "dijeda",
      resume: "dilanjutkan", 
      replace: "diganti"
    };

    toast({
      title: `Bulk Action: ${actionText[action]}`,
      description: `${selectedNumbers.length} nomor telah ${actionText[action]}`,
    });
    
    setSelectedNumbers([]);
  };

  const filteredNumbers = mockNumbersPool.filter(number => {
    return !statusFilter || statusFilter === "all" || number.status === statusFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-h1">Numbers Pool Manager</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Tambah Nomor
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="card-dashboard">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Numbers</p>
                <p className="text-2xl font-bold">{mockNumbersPool.length}</p>
              </div>
              <Hash className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-dashboard">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active</p>
                <p className="text-2xl font-bold text-green-600">
                  {mockNumbersPool.filter(n => n.status === 'Active').length}
                </p>
              </div>
              <Play className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-dashboard">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Paused</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {mockNumbersPool.filter(n => n.status === 'Paused').length}
                </p>
              </div>
              <Pause className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-dashboard">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Critical</p>
                <p className="text-2xl font-bold text-red-600">
                  {mockNumbersPool.filter(n => n.status === 'Critical').length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Kontrol & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium">Filter Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Semua Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Paused">Paused</SelectItem>
                  <SelectItem value="Critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button 
                variant="outline"
                onClick={() => handleBulkAction('pause')}
                disabled={selectedNumbers.length === 0}
              >
                <Pause className="h-4 w-4 mr-2" />
                Bulk Pause
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => handleBulkAction('resume')}
                disabled={selectedNumbers.length === 0}
              >
                <Play className="h-4 w-4 mr-2" />
                Bulk Resume
              </Button>

              <Button 
                variant="outline"
                onClick={() => handleBulkAction('replace')}
                disabled={selectedNumbers.length === 0}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Bulk Replace
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Numbers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Nomor ({filteredNumbers.length} numbers)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox 
                      checked={selectedNumbers.length === filteredNumbers.length}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>E.164</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Daily Cap</TableHead>
                  <TableHead>Dipakai Hari Ini</TableHead>
                  <TableHead>Spam Score</TableHead>
                  <TableHead>Terakhir Dipakai</TableHead>
                  <TableHead>Inbound Route</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredNumbers.map((number) => {
                  const usagePercentage = getUsagePercentage(number.usedToday, number.dailyCap);
                  
                  return (
                    <TableRow key={number.id}>
                      <TableCell>
                        <Checkbox 
                          checked={selectedNumbers.includes(number.id)}
                          onCheckedChange={(checked) => handleSelectNumber(number.id, !!checked)}
                        />
                      </TableCell>
                      <TableCell className="font-mono">
                        {number.e164}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(number.status)}>
                          {number.status}
                        </Badge>
                        {number.pausedUntil && (
                          <div className="text-xs text-muted-foreground mt-1">
                            Until: {new Date(number.pausedUntil).toLocaleDateString('id-ID')}
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-center">{number.dailyCap}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{number.usedToday}/{number.dailyCap}</span>
                          <div className="flex-1 min-w-0">
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div 
                                className={`h-1.5 rounded-full ${getUsageColor(usagePercentage)}`}
                                style={{ width: `${usagePercentage}%` }}
                              />
                            </div>
                          </div>
                          <span className="text-xs text-muted-foreground">{usagePercentage}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getSpamScoreColor(number.spamScore)}>
                          {number.spamScore}%
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {new Date(number.lastUsedAt).toLocaleString('id-ID')}
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {number.inboundRoute}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {number.status === 'Active' ? (
                            <Button variant="ghost" size="sm">
                              <Pause className="h-3 w-3" />
                            </Button>
                          ) : (
                            <Button variant="ghost" size="sm">
                              <Play className="h-3 w-3" />
                            </Button>
                          )}
                          <Button variant="ghost" size="sm">
                            <RefreshCw className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}