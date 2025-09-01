export interface User {
    id: string;
    name: string;
    role: string;
    joined_date: string;
    avatar_url: string;
}

export interface Task {
    id: string;
    title: string;
    status: string;
    due_date: string;
    assignee_id: string;
    project_id: string;
}

export interface Notification {
    id: string;
    user_id: string;
    message: string;
    is_read: boolean;
    created_at: string;
}

export interface Script {
    id: string;
    title: string;
    version: string;
    status: string;
    project_id: string;
}

export interface Shoot {
    id: string;
    title: string;
    shoot_date: string;
    project_id: string;
}

export interface Lead {
    id:string;
    client_name: string;
    status: string;
    value: number;
    assigned?: string; // This was added in the API logic
}

export interface Client {
    id: string;
    name: string;
}

export interface Project {
    id: string;
    name: string;
    status: string;
    progress: number;
    clients: Client | null;
}

export interface EmployeeDashboardData {
    user: User;
    quickStats: {
        tasksDue: number;
        pendingApprovals: number;
        shootsThisWeek: number;
    };
    taskCompletionData: { week: string; completed: number; total: number }[];
    workloadData: { day: string; deadlines: number }[];
    notifications: Notification[];
    scriptsInReview: Script[];
    shootsToday: Shoot[];
}

export interface ExecutiveDashboardData {
    user: User;
    summaryCards: {
        leads: { value: number; change: number };
        revenue: { value: number; change: number };
        activeCampaigns: { value: number; change: number };
        pendingApprovals: { value: number; change: number };
    };
    revenueByClientData: { client: string; revenue: number; fill: string }[];
    revenueTrendData: { month: string; revenue: number }[];
    expensesProfitData: { month: string; expenses: number; profit: number }[];
    pipelineLeads: Lead[];
    projects: Project[];
}
