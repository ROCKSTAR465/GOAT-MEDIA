import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, name, role, avatar_url')
      .eq('email', 'morgan@goatmedia.com')
      .single();

    if (userError || !user) {
      console.error('Error fetching user:', userError);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const [
      leadsData,
      projectsData,
      tasksData,
    ] = await Promise.all([
      supabase.from('leads').select('*').gte('created_at', sixMonthsAgo.toISOString()),
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

    const closedLeads = leads.filter(l => l.status === 'Closed');
    const totalRevenue = closedLeads.reduce((acc, l) => acc + l.value, 0);

    const summaryCards = {
      leads: { value: leads.length, change: 12.5 },
      revenue: { value: totalRevenue, change: -2.1 },
      activeCampaigns: { value: projects.filter(p => p.status === 'In Progress' || p.status === 'On Track').length, change: 0 },
      pendingApprovals: { value: tasks.filter(t => t.status === 'In Review').length, change: 0 },
    };

    const revenueByClientData = projects.reduce((acc, p) => {
        const clientName = p.clients?.name || 'Unknown Client';
        const projectRevenue = closedLeads.filter(l => l.client_name.includes(clientName)).reduce((sum, l) => sum + l.value, 0);
        const existingClient = acc.find(c => c.client === clientName);
        if(existingClient) {
            existingClient.revenue += projectRevenue;
        } else {
            acc.push({ client: clientName, revenue: projectRevenue, fill: `hsl(var(--chart-${acc.length + 1}))`});
        }
        return acc;
    }, [] as { client: string; revenue: number; fill: string }[]);

    const monthlyRevenue: { [key: string]: number } = {};
    closedLeads.forEach(lead => {
        const month = new Date(lead.created_at).toLocaleString('default', { month: 'short' });
        monthlyRevenue[month] = (monthlyRevenue[month] || 0) + lead.value;
    });

    const revenueTrendData = Object.entries(monthlyRevenue).map(([month, revenue]) => ({ month, revenue }));

    const expensesProfitData = revenueTrendData.map(item => {
        const expenses = item.revenue * 0.7; // Mock expenses as 70% of revenue
        return {
            month: item.month,
            expenses,
            profit: item.revenue - expenses,
        }
    });

    const pipelineLeads = leads.filter(l => l.status !== 'Closed').slice(0, 4).map(l => ({...l, assigned: "Alex"}));

    const dashboardData = {
      user,
      summaryCards,
      revenueByClientData,
      revenueTrendData,
      expensesProfitData,
      pipelineLeads,
      projects,
    };

    return NextResponse.json(dashboardData);

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
