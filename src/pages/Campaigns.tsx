import { useState } from "react";
import { Target, Plus, Play, Pause, BarChart3, Users, Phone, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mockCampaigns = [
  {
    id: "camp-001",
    name: "Investasi Emas Q1 2024",
    status: "Active",
    startDate: "2024-01-01",
    endDate: "2024-03-31",
    totalLeads: 1500,
    contactedLeads: 450,
    connectedCalls: 285,
    convertedLeads: 32,
    assignedAgents: 3,
    assignedNumbers: 5,
    connectRate: 63.3,
    conversionRate: 11.2
  },
  {
    id: "camp-002", 
    name: "Asuransi Kesehatan Keluarga",
    status: "Paused",
    startDate: "2024-01-15",
    endDate: "2024-04-15",
    totalLeads: 800,
    contactedLeads: 120,
    connectedCalls: 85,
    convertedLeads: 8,
    assignedAgents: 2,
    assignedNumbers: 3,
    connectRate: 70.8,
    conversionRate: 9.4
  },
  {
    id: "camp-003",
    name: "Kredit Usaha UMKM",
    status: "Completed",
    startDate: "2023-11-01",
    endDate: "2023-12-31",
    totalLeads: 2000,
    contactedLeads: 1850,
    connectedCalls: 1295,
    convertedLeads: 156,
    assignedAgents: 5,
    assignedNumbers: 8,
    connectRate: 70.0,
    conversionRate: 12.0
  }
];

const mockCampaignDetail = {
  id: "camp-001",
  overview: {
    description: "Kampanye promosi produk investasi emas untuk nasabah potensial dengan profil middle income",
    targetAudience: "Usia 25-45, Income 5-15 juta/bulan",
    objectives: "Mencapai 100 konversi dengan conversion rate minimal 10%"
  },
  dialingRules: {
    callWindow: "09:00 - 17:00",
    maxAttempts: 3,
    retryInterval: "24 jam",
    cpsLimit: 2,
    respectDNC: true
  },
  numbersAssignment: [
    { number: "+62 8111 2233 4455", priority: 1, dailyCap: 20 },
    { number: "+62 8111 2233 4456", priority: 2, dailyCap: 20 },
    { number: "+62 8111 2233 4457", priority: 3, dailyCap: 15 }
  ],
  webhooks: [
    { event: "call_completed", url: "https://api.megavision.id/webhooks/call", status: "Active" },
    { event: "lead_converted", url: "https://api.megavision.id/webhooks/conversion", status: "Active" }
  ]
};

export default function Campaigns() {
  const [selectedCampaign, setSelectedCampaign] = useState(mockCampaigns[0]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Paused': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      case 'Scheduled': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
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
        <h1 className="text-h1">Campaign Manager</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Buat Campaign Baru
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Campaign List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Daftar Campaign
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockCampaigns.map((campaign) => (
                <div 
                  key={campaign.id}
                  className={`p-3 border rounded-lg cursor-pointer hover:bg-accent transition-colors ${
                    selectedCampaign.id === campaign.id ? 'bg-primary/10 border-primary' : ''
                  }`}
                  onClick={() => setSelectedCampaign(campaign)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={getStatusColor(campaign.status)}>
                      {campaign.status}
                    </Badge>
                    <div className="flex gap-1">
                      {campaign.status === 'Active' ? (
                        <Button variant="ghost" size="sm">
                          <Pause className="h-3 w-3" />
                        </Button>
                      ) : (
                        <Button variant="ghost" size="sm">
                          <Play className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="font-medium text-sm mb-2">{campaign.name}</h3>
                  
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Leads:</span>
                      <span>{campaign.contactedLeads}/{campaign.totalLeads}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Connect Rate:</span>
                      <span className={getConnectRateColor(campaign.connectRate)}>
                        {campaign.connectRate}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Conversion:</span>
                      <span className="font-medium">{campaign.conversionRate}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Campaign Detail */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{selectedCampaign.name}</CardTitle>
              <Badge className={getStatusColor(selectedCampaign.status)}>
                {selectedCampaign.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="leads">Leads</TabsTrigger>
                <TabsTrigger value="dialing">Dialing Rules</TabsTrigger>
                <TabsTrigger value="numbers">Numbers</TabsTrigger>
                <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                {/* KPI Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Card className="card-dashboard">
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Total Leads</p>
                          <p className="text-lg font-bold">{selectedCampaign.totalLeads}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="card-dashboard">
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Connected</p>
                          <p className="text-lg font-bold">{selectedCampaign.connectedCalls}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="card-dashboard">
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Connect Rate</p>
                          <p className={`text-lg font-bold ${getConnectRateColor(selectedCampaign.connectRate)}`}>
                            {selectedCampaign.connectRate}%
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="card-dashboard">
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Conversion</p>
                          <p className="text-lg font-bold text-green-600">
                            {selectedCampaign.conversionRate}%
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Campaign Info */}
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Deskripsi Campaign</h4>
                    <p className="text-sm text-muted-foreground">
                      {mockCampaignDetail.overview.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Target Audience</h4>
                      <p className="text-sm text-muted-foreground">
                        {mockCampaignDetail.overview.targetAudience}
                      </p>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Objectives</h4>
                      <p className="text-sm text-muted-foreground">
                        {mockCampaignDetail.overview.objectives}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="p-3 border rounded-lg">
                      <p className="text-xs text-muted-foreground">Periode</p>
                      <p className="font-medium text-sm">
                        {new Date(selectedCampaign.startDate).toLocaleDateString('id-ID')} - 
                        {new Date(selectedCampaign.endDate).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <p className="text-xs text-muted-foreground">Agents</p>
                      <p className="font-medium">{selectedCampaign.assignedAgents}</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <p className="text-xs text-muted-foreground">Numbers</p>
                      <p className="font-medium">{selectedCampaign.assignedNumbers}</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <p className="text-xs text-muted-foreground">Converted</p>
                      <p className="font-medium text-green-600">{selectedCampaign.convertedLeads}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="leads">
                <div className="text-center py-8 text-muted-foreground">
                  Lead management interface akan ditambahkan di sini
                </div>
              </TabsContent>

              <TabsContent value="dialing">
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-3">Aturan Pemanggilan</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Call Window:</span>
                        <span className="ml-2 font-medium">{mockCampaignDetail.dialingRules.callWindow}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Max Attempts:</span>
                        <span className="ml-2 font-medium">{mockCampaignDetail.dialingRules.maxAttempts}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Retry Interval:</span>
                        <span className="ml-2 font-medium">{mockCampaignDetail.dialingRules.retryInterval}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">CPS Limit:</span>
                        <span className="ml-2 font-medium">{mockCampaignDetail.dialingRules.cpsLimit}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="numbers">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nomor</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Daily Cap</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockCampaignDetail.numbersAssignment.map((number, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-mono">{number.number}</TableCell>
                          <TableCell>{number.priority}</TableCell>
                          <TableCell>{number.dailyCap}</TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800">Active</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="webhooks">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Event</TableHead>
                        <TableHead>URL</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockCampaignDetail.webhooks.map((webhook, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-mono">{webhook.event}</TableCell>
                          <TableCell className="font-mono text-xs">{webhook.url}</TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800">{webhook.status}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}