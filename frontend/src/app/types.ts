export type Client = {
    id: number;
    name: string;
    email: string;
    primary_number: string;
    secondary_number: string;
    address: string;
    zipcode:string;
    city: string;
    company_name: string;
    vat: string;
    company_type: string;
    industry: number;
    user: string;
}

export type Lead = {
    id: number;
    title: string;
    description: string;
    status: number;
    client: string;
    user: string;
    contact_date: any;
}

export type Sprint = {
    id: number;
    title: string;
    description: string;
    status: number;
    lead: string;
    user: string;
    deadline: string;
}

export type Task = {
    id: number;
    title: string;
    description: string;
    status: number;
    sprint: string;
    user: string;
    deadline: string;
}

export type User = {
    id: number;
    name: string;
    email: string;
    address: string;
    work_number: string;
    personal_number: string;
}

export type Notification = {
    id: number;
    name: string;
    description: string;
    status: number;
}

export type Role = {
    id: number;
    name: string;
}

export type Permission = {
    id: number;
    name: string;
}

export type RoleHasPermission = {
    id: number;
    role_id: number;
    permission_id: number;
}

export type Array = {
    id: number;
}

export type Query = {
    client: Client[];
    clients: Client[];
    users: User[];
    user: User[];
    leads: Lead[];
    lead: Lead[];
    sprints: Sprint[];
    sprint: Sprint[];
    tasks: Task[];
    task: Task[];
    notifications: Notification[];
    notificationsByUserAndStatus: Notification[];
    notificationHasLead: Array[];
    role: Role[];
    roles: Role[];
    permissions: Permission[];
    roleHasPermission: RoleHasPermission[];
}
