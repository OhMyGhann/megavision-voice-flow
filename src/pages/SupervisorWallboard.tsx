import { Users, Phone, Clock, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusChip } from "@/components/ui/status-chip";
import type { AgentStatus } from "@/lib/stores/agent-store";

const mockWallboardData = {
  summary: {
    totalAgents: 5,
    availableAgents: 2,
    onCallAgents: 1,
    acwAgents: 1,
    breakAgents: 1,
    callsToday: 48,
    connectRate: 67.5,
    avgAHT: 185,
    avgACW: 45
  },
  agents: [
    {
      id: "agent-001",
      name: "Agent Demo",
      status: "Available" as AgentStatus,
      callsToday: 12,
      connectRate: 75.0,
      avgAHT: 165,
      avgACW: 40,
      lastCallTime: "14:30"
    },
    {
      id: "agent-002", 
      name: "Sarah Lestari",
      status: "On Call" as AgentStatus,
      callsToday: 15,
      connectRate: 80.0,
      avgAHT: 195,
      avgACW: 35,
      lastCallTime: "14:25",
      currentCallDuration: 245
    },
    {
      id: "agent-003",
      name: "Andi Wijaya",
      status: "ACW" as AgentStatus,
      callsToday: 8,
      connectRate: 62.5,
      avgAHT: 210,
      avgACW: 55,
      lastCallTime: "14:28"
    },
    {
      id: "agent-004",
      name: "Maya Sari",
      status: "Break" as AgentStatus,
      callsToday: 10,
      connectRate: 70.0,
      avgAHT: 175,
      avgACW: 50,
      lastCallTime: "14:15"
    },
    {
      id: "agent-005",
      name: "Budi Hartono",
      status: "Offline" as AgentStatus,
      callsToday: 3,
      connectRate: 33.3,
      avgAHT: 120,
      avgACW: 25,
      lastCallTime: "13:45"
    }
  ],
  numbersHealth: [
    {
      number: "+62 8111 2233 4455",
      usedToday: 8,
      dailyCap: 20,
      spamScore: 15,
      status: "Excellent"
    },
    {
      number: "+62 8111 2233 4456", 
      usedToday: 15,
      dailyCap: 20,
      spamScore: 35,
      status: "Good"
    },
    {
      number: "+62 8111 2233 4457",
      usedToday: 18,
      dailyCap: 20,
      spamScore: 65,
      status: "Fair"
    },
    {
      number: "+62 8111 2233 4458",
      usedToday: 20,
      dailyCap: 20,
      spamScore: 85,
      status: "Critical"
    }
  ]
};

export default function SupervisorWallboard() {
  const { summary, agents, numbersHealth } = mockWallboardData;

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getHealthColor = (status: string) => {
    switch (status) {
      case 'Excellent': return 'health-excellent';
      case 'Good': return 'health-good';
      case 'Fair': return 'health-fair';
      case 'Poor': return 'health-poor';
      case 'Critical': return 'health-critical';
      default: return 'health-fair';
    }
  };

  const getConnectRateColor = (rate: number) => {
    if (rate >= 70) return 'text-green-600';
    if (rate >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-h1">Wallboard Supervisor</h1>
        <div className="text-sm text-muted-foreground">
          Live Update: {new Date().toLocaleTimeString('id-ID')}
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="card-dashboard">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.totalAgents}</div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
              <CheckCircle className="h-3 w-3 text-green-500" />
              {summary.availableAgents} Tersedia
            </div>
          </CardContent>
        </Card>

        <Card className="card-dashboard">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Calls Hari Ini</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.callsToday}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {summary.onCallAgents} sedang telepon
            </div>
          </CardContent>
        </Card>

        <Card className="card-dashboard">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Connect Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getConnectRateColor(summary.connectRate)}`}>
              {summary.connectRate}%
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Target: 65%
            </div>
          </CardContent>
        </Card>

        <Card className="card-dashboard">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg AHT</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatDuration(summary.avgAHT)}</div>
            <div className="text-xs text-muted-foreground mt-1">
              ACW: {formatDuration(summary.avgACW)}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Agent Status Table */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Status Agent Real-time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Agent</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Calls</TableHead>
                    <TableHead>Connect Rate</TableHead>
                    <TableHead>AHT</TableHead>
                    <TableHead>ACW</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {agents.map((agent) => (
                    <TableRow key={agent.id}>
                      <TableCell className="font-medium">
                        {agent.name}
                      </TableCell>
                      <TableCell>
                        <StatusChip status={agent.status} />
                        {agent.status === 'On Call' && agent.currentCallDuration && (
                          <div className="text-xs text-muted-foreground mt-1 font-mono">
                            {formatDuration(agent.currentCallDuration)}
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-center">{agent.callsToday}</TableCell>
                      <TableCell className={getConnectRateColor(agent.connectRate)}>
                        {agent.connectRate}%
                      </TableCell>
                      <TableCell className="font-mono">
                        {formatDuration(agent.avgAHT)}
                      </TableCell>
                      <TableCell className="font-mono">
                        {formatDuration(agent.avgACW)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Numbers Health Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Number Health Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {numbersHealth.map((number, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-sm">{number.number}</span>
                    <Badge className={getHealthColor(number.status)}>
                      {number.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Dipakai hari ini:</span>
                      <span className="font-medium">{number.usedToday}/{number.dailyCap}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Spam Score:</span>
                      <span className={`font-medium ${
                        number.spamScore >= 80 ? 'text-red-600' :
                        number.spamScore >= 60 ? 'text-yellow-600' : 'text-green-600'
                      }`}>
                        {number.spamScore}%
                      </span>
                    </div>
                  </div>
                  
                  {/* Usage Progress Bar */}
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full ${
                          (number.usedToday / number.dailyCap) >= 0.9 ? 'bg-red-500' :
                          (number.usedToday / number.dailyCap) >= 0.7 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${(number.usedToday / number.dailyCap) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}