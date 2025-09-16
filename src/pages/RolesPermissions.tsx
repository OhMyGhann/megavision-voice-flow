import { useState } from "react";
import { Shield, Users, Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";

const mockRoles = [
  {
    id: "role-agent",
    name: "Agent",
    description: "Akses dasar untuk melakukan panggilan outbound",
    userCount: 15,
    permissions: [
      "agent.desktop.access",
      "leads.view_assigned", 
      "calls.make_outbound",
      "calls.view_own_cdr",
      "notes.create",
      "notes.view_own"
    ]
  },
  {
    id: "role-spv",
    name: "Supervisor", 
    description: "Akses monitoring dan manajemen agent",
    userCount: 3,
    permissions: [
      "agent.desktop.access",
      "spv.wallboard.access",
      "cdr.view_all",
      "recordings.access",
      "recordings.download",
      "leads.view_all",
      "leads.assign",
      "calls.view_all_cdr",
      "notes.view_all",
      "campaigns.view",
      "numbers.view_pool"
    ]
  },
  {
    id: "role-admin",
    name: "Admin",
    description: "Akses penuh ke semua fitur sistem",
    userCount: 2,
    permissions: [
      "system.admin.access",
      "users.manage",
      "roles.manage", 
      "numbers.manage_pool",
      "campaigns.manage",
      "recordings.manage_retention",
      "settings.system",
      "audit.access",
      "webhooks.manage"
    ]
  }
];

const mockUsers = [
  {
    id: "user-001",
    name: "Agent Demo",
    email: "agent@megavision.id",
    role: "Agent",
    status: "Active",
    lastLogin: "2024-01-15T14:30:00Z",
    createdAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "user-002", 
    name: "Sarah Lestari",
    email: "sarah.lestari@megavision.id",
    role: "Agent", 
    status: "Active",
    lastLogin: "2024-01-15T13:45:00Z",
    createdAt: "2024-01-02T00:00:00Z"
  },
  {
    id: "user-003",
    name: "Budi Santoso",
    email: "budi.santoso@megavision.id", 
    role: "Supervisor",
    status: "Active",
    lastLogin: "2024-01-15T14:00:00Z",
    createdAt: "2023-12-15T00:00:00Z"
  },
  {
    id: "user-004",
    name: "Maya Admin",
    email: "maya.admin@megavision.id",
    role: "Admin",
    status: "Active", 
    lastLogin: "2024-01-15T09:00:00Z",
    createdAt: "2023-11-01T00:00:00Z"
  }
];

const allPermissions = [
  {
    category: "Agent Desktop",
    permissions: [
      { key: "agent.desktop.access", name: "Akses Desktop Agent", description: "Dapat mengakses halaman desktop agent" },
      { key: "calls.make_outbound", name: "Panggilan Keluar", description: "Dapat melakukan panggilan outbound" },
      { key: "calls.view_own_cdr", name: "Lihat CDR Sendiri", description: "Dapat melihat CDR panggilan sendiri" }
    ]
  },
  {
    category: "Leads Management", 
    permissions: [
      { key: "leads.view_assigned", name: "Lihat Lead Assigned", description: "Dapat melihat lead yang ditugaskan" },
      { key: "leads.view_all", name: "Lihat Semua Lead", description: "Dapat melihat semua lead" },
      { key: "leads.assign", name: "Assign Lead", description: "Dapat menugaskan lead ke agent" },
      { key: "leads.manage", name: "Kelola Lead", description: "Dapat mengedit dan menghapus lead" }
    ]
  },
  {
    category: "CDR & Recordings",
    permissions: [
      { key: "cdr.view_all", name: "Lihat Semua CDR", description: "Dapat melihat CDR semua agent" },
      { key: "recordings.access", name: "Akses Rekaman", description: "Dapat mengakses rekaman panggilan" },
      { key: "recordings.download", name: "Download Rekaman", description: "Dapat download rekaman panggilan" },
      { key: "recordings.manage_retention", name: "Kelola Retensi", description: "Dapat mengatur kebijakan retensi rekaman" }
    ]
  },
  {
    category: "Supervisor Tools",
    permissions: [
      { key: "spv.wallboard.access", name: "Akses Wallboard", description: "Dapat mengakses wallboard supervisor" },
      { key: "campaigns.view", name: "Lihat Campaign", description: "Dapat melihat daftar campaign" },
      { key: "campaigns.manage", name: "Kelola Campaign", description: "Dapat mengedit dan membuat campaign" }
    ]
  },
  {
    category: "Numbers Pool",
    permissions: [
      { key: "numbers.view_pool", name: "Lihat Numbers Pool", description: "Dapat melihat daftar nomor" },
      { key: "numbers.manage_pool", name: "Kelola Numbers Pool", description: "Dapat mengedit dan menambah nomor" }
    ]
  },
  {
    category: "System Administration", 
    permissions: [
      { key: "system.admin.access", name: "Akses Admin", description: "Akses penuh sistem administrasi" },
      { key: "users.manage", name: "Kelola User", description: "Dapat menambah, edit, hapus user" },
      { key: "roles.manage", name: "Kelola Role", description: "Dapat mengedit role dan permission" },
      { key: "audit.access", name: "Akses Audit Log", description: "Dapat melihat log audit sistem" },
      { key: "webhooks.manage", name: "Kelola Webhook", description: "Dapat mengatur webhook configuration" }
    ]
  }
];

export default function RolesPermissions() {
  const [selectedRole, setSelectedRole] = useState(mockRoles[0]);
  const [editingPermissions, setEditingPermissions] = useState(false);

  const getRoleColor = (roleName: string) => {
    switch (roleName) {
      case 'Admin': return 'bg-red-100 text-red-800';
      case 'Supervisor': return 'bg-blue-100 text-blue-800';
      case 'Agent': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-gray-100 text-gray-700';
      case 'Suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const hasPermission = (permission: string) => {
    return selectedRole.permissions.includes(permission);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-h1">Roles & Permissions</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Tambah Role Baru
        </Button>
      </div>

      <Tabs defaultValue="roles" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="roles">Roles Management</TabsTrigger>
          <TabsTrigger value="users">Users Management</TabsTrigger>
        </TabsList>

        <TabsContent value="roles">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Roles List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Daftar Role
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockRoles.map((role) => (
                    <div 
                      key={role.id}
                      className={`p-4 border rounded-lg cursor-pointer hover:bg-accent transition-colors ${
                        selectedRole.id === role.id ? 'bg-primary/10 border-primary' : ''
                      }`}
                      onClick={() => setSelectedRole(role)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={getRoleColor(role.name)}>
                          {role.name}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {role.userCount} users
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {role.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {role.permissions.length} permissions
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Role Detail */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    {selectedRole.name}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setEditingPermissions(!editingPermissions)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      {editingPermissions ? 'Simpan' : 'Edit Permissions'}
                    </Button>
                  </div>
                </div>
                <p className="text-muted-foreground">{selectedRole.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {allPermissions.map((category) => (
                    <div key={category.category}>
                      <h4 className="font-medium mb-3">{category.category}</h4>
                      <div className="space-y-2">
                        {category.permissions.map((permission) => (
                          <div 
                            key={permission.key}
                            className="flex items-start gap-3 p-3 border rounded-lg"
                          >
                            {editingPermissions ? (
                              <Checkbox 
                                checked={hasPermission(permission.key)}
                                onCheckedChange={() => {
                                  // Toggle permission logic here
                                }}
                              />
                            ) : (
                              <div className={`w-4 h-4 rounded-sm border-2 flex items-center justify-center ${
                                hasPermission(permission.key) 
                                  ? 'bg-primary border-primary' 
                                  : 'border-gray-300'
                              }`}>
                                {hasPermission(permission.key) && (
                                  <div className="w-2 h-2 bg-white rounded-sm" />
                                )}
                              </div>
                            )}
                            <div className="flex-1">
                              <p className="font-medium text-sm">{permission.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {permission.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Manajemen User
                </CardTitle>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah User
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nama</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge className={getRoleColor(user.role)}>
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(user.status)}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {new Date(user.lastLogin).toLocaleDateString('id-ID')}
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {new Date(user.createdAt).toLocaleDateString('id-ID')}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}