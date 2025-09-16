import { useState } from "react";
import { useParams } from "react-router-dom";
import { User, Phone, Mail, Calendar, FileText, Phone as PhoneIcon, MessageSquare, X, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const mockLeadData = {
  id: "lead-001",
  firstName: "Budi",
  lastName: "Santoso",
  email: "budi.santoso@email.com",
  phoneNumber: "+6281234567890",
  status: "Callback",
  consented: true,
  campaignId: "camp-001",
  campaignName: "Investasi Emas Q1 2024",
  createdAt: "2024-01-10T09:30:00Z",
  lastContactDate: "2024-01-15T14:30:00Z",
  source: "Facebook Ads",
  leadNotes: "Tertarik dengan produk investasi emas, minta dihubungi lagi jam 2 siang",
  
  profile: {
    age: 35,
    occupation: "Manager IT",
    income: "10-15 juta/bulan",
    location: "Jakarta Selatan",
    maritalStatus: "Menikah"
  },

  activityTimeline: [
    {
      id: "act-001",
      type: "call",
      title: "Panggilan Keluar",
      description: "Durasi 3:05 - Tertarik, minta callback",
      timestamp: "2024-01-15T14:30:00Z",
      agent: "Agent Demo",
      outcome: "Callback"
    },
    {
      id: "act-002", 
      type: "note",
      title: "Catatan Ditambahkan",
      description: "Lead menunjukkan minat tinggi pada produk emas 5gr",
      timestamp: "2024-01-15T14:35:00Z",
      agent: "Agent Demo"
    },
    {
      id: "act-003",
      type: "call",
      title: "Panggilan Masuk", 
      description: "Durasi 1:45 - Lead bertanya tentang cara investasi",
      timestamp: "2024-01-12T10:15:00Z",
      agent: "Agent Demo",
      outcome: "Information"
    },
    {
      id: "act-004",
      type: "lead_created",
      title: "Lead Dibuat",
      description: "Sumber: Facebook Ads Campaign",
      timestamp: "2024-01-10T09:30:00Z",
      agent: "System"
    }
  ],

  notesArray: [
    {
      id: "note-001",
      content: "Lead menunjukkan minat tinggi pada produk emas 5gr. Sudah punya pengalaman investasi reksadana.",
      createdAt: "2024-01-15T14:35:00Z",
      agent: "Agent Demo"
    },
    {
      id: "note-002",
      content: "Minta dihubungi kembali hari Selasa jam 14:00. Sedang mempertimbangkan alokasi budget investasi.",
      createdAt: "2024-01-15T14:32:00Z", 
      agent: "Agent Demo"
    }
  ],

  files: [
    {
      id: "file-001",
      name: "Formulir_Minat_Investasi.pdf",
      size: "245 KB",
      uploadedAt: "2024-01-15T14:40:00Z",
      agent: "Agent Demo"
    }
  ]
};

export default function LeadDetail() {
  const { id } = useParams();
  const [newNote, setNewNote] = useState("");
  const [callbackDateTime, setCallbackDateTime] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'bg-blue-100 text-blue-800';
      case 'Contacted': return 'bg-yellow-100 text-yellow-800';
      case 'Interested': return 'bg-green-100 text-green-800';
      case 'Not Interested': return 'bg-red-100 text-red-800';
      case 'Callback': return 'bg-purple-100 text-purple-800';
      case 'DNC': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'call': return <PhoneIcon className="h-4 w-4" />;
      case 'note': return <FileText className="h-4 w-4" />;
      case 'email': return <Mail className="h-4 w-4" />;
      case 'lead_created': return <User className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'call': return 'bg-blue-100 text-blue-600';
      case 'note': return 'bg-yellow-100 text-yellow-600'; 
      case 'email': return 'bg-green-100 text-green-600';
      case 'lead_created': return 'bg-purple-100 text-purple-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      // Add note logic here
      setNewNote("");
    }
  };

  const handleScheduleCallback = () => {
    if (callbackDateTime) {
      // Schedule callback logic here
      setCallbackDateTime("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h1">{mockLeadData.firstName} {mockLeadData.lastName}</h1>
          <p className="text-muted-foreground">Lead ID: {mockLeadData.id}</p>
        </div>
        <div className="flex items-center gap-2">
          {mockLeadData.consented && (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <CheckCircle className="h-3 w-3 mr-1" />
              Consented
            </Badge>
          )}
          <Badge className={getStatusColor(mockLeadData.status)}>
            {mockLeadData.status}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lead Info Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Informasi Lead
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{mockLeadData.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <PhoneIcon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-mono">{mockLeadData.phoneNumber}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  {new Date(mockLeadData.createdAt).toLocaleDateString('id-ID')}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t space-y-2">
              <h4 className="font-medium text-sm">Campaign</h4>
              <p className="text-sm text-muted-foreground">{mockLeadData.campaignName}</p>
              <p className="text-xs text-muted-foreground">Source: {mockLeadData.source}</p>
            </div>

            {/* Quick Actions */}
            <div className="pt-4 border-t space-y-2">
              <h4 className="font-medium text-sm">Quick Actions</h4>
              <div className="space-y-2">
                <Button className="w-full" size="sm">
                  <PhoneIcon className="h-4 w-4 mr-2" />
                  Call Now
                </Button>
                
                <div className="space-y-2">
                  <Input
                    type="datetime-local"
                    value={callbackDateTime}
                    onChange={(e) => setCallbackDateTime(e.target.value)}
                    className="text-sm"
                  />
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={handleScheduleCallback}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Callback
                  </Button>
                </div>

                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Mark as DNC" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="request">Permintaan Lead</SelectItem>
                    <SelectItem value="complaint">Keluhan</SelectItem>
                    <SelectItem value="regulatory">Regulasi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Card className="lg:col-span-2">
          <CardContent className="pt-6">
            <Tabs defaultValue="profile" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
                <TabsTrigger value="files">Files</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-3">Profil Demografis</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Usia:</span>
                        <span>{mockLeadData.profile.age} tahun</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Pekerjaan:</span>
                        <span>{mockLeadData.profile.occupation}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Income:</span>
                        <span>{mockLeadData.profile.income}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Lokasi:</span>
                        <span>{mockLeadData.profile.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <span>{mockLeadData.profile.maritalStatus}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-3">Catatan Terakhir</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {mockLeadData.leadNotes}
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="activity" className="space-y-4">
                <div className="space-y-4">
                  {mockLeadData.activityTimeline.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-sm">{activity.title}</h4>
                          <span className="text-xs text-muted-foreground">
                            {new Date(activity.timestamp).toLocaleString('id-ID')}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {activity.description}
                        </p>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">
                            {activity.agent}
                          </span>
                          {activity.outcome && (
                            <Badge variant="outline" className="text-xs">
                              {activity.outcome}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="notes" className="space-y-4">
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-3">Tambah Catatan</h4>
                    <div className="space-y-3">
                      <Textarea
                        placeholder="Tulis catatan baru..."
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        rows={3}
                      />
                      <Button onClick={handleAddNote} disabled={!newNote.trim()}>
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Simpan Catatan
                      </Button>
                    </div>
                  </div>

                  {mockLeadData.notesArray.map((note) => (
                    <div key={note.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{note.agent}</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(note.createdAt).toLocaleString('id-ID')}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {note.content}
                      </p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="files" className="space-y-4">
                <div className="space-y-4">
                  <div className="p-4 border-2 border-dashed rounded-lg text-center">
                    <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Drag & drop files atau klik untuk upload
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Upload File
                    </Button>
                  </div>

                  {mockLeadData.files.map((file) => (
                    <div key={file.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-sm">{file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {file.size} • {new Date(file.uploadedAt).toLocaleDateString('id-ID')} • {file.agent}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}