import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

function getWeekNumber(d: Date) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    var weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1)/7);
    return weekNo;
}

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
    const fourWeeksAgoDate = new Date();
    fourWeeksAgoDate.setDate(new Date().getDate() - 28);

    const [
      tasksData,
      notificationsData,
      scriptsData,
      shootsData,
    ] = await Promise.all([
      supabase.from('tasks').select('*').eq('assignee_id', userId).gte('created_at', fourWeeksAgoDate.toISOString()),
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

    const workloadData = Array(7).fill(0).map((_, i) => {
        const date = new Date();
        date.setDate(today.getDate() + i);
        return {
            date: date.toISOString().split('T')[0],
            day: date.toLocaleDateString('en-US', { weekday: 'short' }),
            deadlines: 0,
        };
    });

    tasks.forEach(task => {
        const dueDate = new Date(task.due_date);
        const diffDays = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        if (diffDays >= 0 && diffDays < 7) {
            const dayIndex = (dueDate.getDay() - today.getDay() + 7) % 7;
            if(workloadData[dayIndex]) {
                workloadData[dayIndex].deadlines++;
            }
        }
    });

    const weeklyCompletion: { [key: string]: { completed: number; total: number } } = {};

    tasks.forEach(task => {
        const taskDate = new Date(task.created_at);
        const weekStart = new Date(taskDate);
        weekStart.setDate(weekStart.getDate() - weekStart.getDay());
        const weekKey = `W${getWeekNumber(weekStart)}`;

        if (!weeklyCompletion[weekKey]) {
            weeklyCompletion[weekKey] = { completed: 0, total: 0 };
        }
        weeklyCompletion[weekKey].total++;
        if (task.status === 'Done') {
            weeklyCompletion[weekKey].completed++;
        }
    });

    const taskCompletionData = Object.entries(weeklyCompletion).map(([week, data]) => ({
        week: week,
        ...data
    })).slice(-4);

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
