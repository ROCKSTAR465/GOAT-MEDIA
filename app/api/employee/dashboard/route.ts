import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // In a real app, you'd get the user ID from the session.
    // For now, we'll hardcode the user 'Alex' for demonstration.
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, name, role, joined_date, avatar_url')
      .eq('email', 'alex@goatmedia.com')
      .single();

    if (userError || !user) {
      console.error('Error fetching user:', userError);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const userId = user.id;

    // Fetch all necessary data in parallel
    const [
      tasksData,
      notificationsData,
      scriptsData,
      shootsData,
    ] = await Promise.all([
      supabase.from('tasks').select('*').eq('assignee_id', userId),
      supabase.from('notifications').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
      supabase.from('scripts').select('*').eq('status', 'In Review'),
      supabase.from('shoots').select('*').gte('shoot_date', new Date().toISOString()).limit(5),
    ]);

    if (tasksData.error || notificationsData.error || scriptsData.error || shootsData.error) {
        console.error('Error fetching dashboard data:', {
            tasksError: tasksData.error,
            notificationsError: notificationsData.error,
            scriptsError: scriptsData.error,
            shootsError: shootsData.error,
        });
        return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 });
    }

    const tasks = tasksData.data || [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const quickStats = {
      tasksDue: tasks.filter(t => new Date(t.due_date) >= today && t.status !== 'Done').length,
      pendingApprovals: tasks.filter(t => t.status === 'In Review').length, // Assuming 'In Review' is a status
      shootsThisWeek: shootsData.data.length, // Simplified for demo
    };

    // This data would ideally be aggregated in the database for performance
    const taskCompletionData = [
        { week: 'W1', completed: 8, total: 10 },
        { week: 'W2', completed: 7, total: 10 },
        { week: 'W3', completed: 9, total: 10 },
        { week: 'W4', completed: 6, total: 8 },
    ];

    const workloadData = [
        { day: 'Mon', deadlines: 2 },
        { day: 'Tue', deadlines: 3 },
        { day: 'Wed', deadlines: 1 },
        { day: 'Thu', deadlines: 4 },
        { day: 'Fri', deadlines: 2 },
    ];

    const dashboardData = {
      user,
      quickStats,
      taskCompletionData,
      workloadData,
      notifications: notificationsData.data,
      scriptsInReview: scriptsData.data,
      shootsToday: shootsData.data,
    };

    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
