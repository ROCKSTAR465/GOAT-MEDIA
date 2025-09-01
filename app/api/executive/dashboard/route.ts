import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // In a real app, you'd get the user from the session.
    // For now, we'll hardcode the executive user 'Morgan'.
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, name, role, avatar_url')
      .eq('email', 'morgan@goatmedia.com')
      .single();

    if (userError || !user) {
      console.error('Error fetching user:', userError);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const [
      leadsData,
      projectsData,
      tasksData,
    ] = await Promise.all([
      supabase.from('leads').select('*').order('created_at', { ascending: false }),
      supabase.from('projects').select('*, clients(name)').order('created_at', { ascending: false }),
      supabase.from('tasks').select('*').neq('status', 'Done').order('due_date', { ascending: true }),
    ]);

    if (leadsData.error || projectsData.error || tasksData.error) {
      console.error('Error fetching executive data:', {
        leadsError: leadsData.error,
        projectsError: projectsData.error,
        tasksError: tasksData.error,
      });
      return NextResponse.json({ error: 'Failed to fetch executive data' }, { status: 500 });
    }

    const leads = leadsData.data || [];
    const projects = projectsData.data || [];
    const tasks = tasksData.data || [];

    // Calculate KPIs (simplified for demo)
    const totalRevenue = leads.filter(l => l.status === 'Closed').reduce((acc, l) => acc + l.value, 0);
    const summaryCards = {
      leads: { value: leads.length, change: 12.5 },
      revenue: { value: totalRevenue, change: -2.1 },
      activeCampaigns: { value: projects.filter(p => p.status === 'In Progress' || p.status === 'On Track').length, change: 0 },
      pendingApprovals: { value: tasks.filter(t => t.status === 'In Review').length, change: 0 },
    };

    const revenueByClientData = projects.reduce((acc, p) => {
        const clientName = p.clients?.name || 'Unknown Client';
        const projectRevenue = leads.filter(l => l.client_name.includes(clientName)).reduce((sum, l) => sum + l.value, 0);
        const existingClient = acc.find(c => c.client === clientName);
        if(existingClient) {
            existingClient.revenue += projectRevenue;
        } else {
            acc.push({ client: clientName, revenue: projectRevenue, fill: `hsl(var(--chart-${acc.length + 1}))`});
        }
        return acc;
    }, [] as { client: string; revenue: number; fill: string }[]);


    // Mocking some data that requires more complex queries or historical data
    const revenueTrendData = [
      { month: "Jan", revenue: 80000 },
      { month: "Feb", revenue: 95000 },
      { month: "Mar", revenue: 110000 },
      { month: "Apr", revenue: 105000 },
      { month: "May", revenue: 120000 },
      { month: "Jun", revenue: totalRevenue },
    ];
    const expensesProfitData = [
      { month: "Jan", expenses: 60000, profit: 20000 },
      { month: "Feb", expenses: 65000, profit: 30000 },
      { month: "Mar", expenses: 70000, profit: 40000 },
      { month: "Apr", expenses: 72000, profit: 33000 },
      { month: "May", expenses: 75000, profit: 45000 },
      { month: "Jun", expenses: 80000, profit: totalRevenue - 80000 },
    ];
    const pipelineLeads = leads.slice(0, 4).map(l => ({...l, assigned: "Alex"})); // simplified

    const dashboardData = {
      user,
      summaryCards,
      revenueByClientData,
      revenueTrendData,
      expensesProfitData,
      pipelineLeads,
      projects, // For project status table
    };

    return NextResponse.json(dashboardData);

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
