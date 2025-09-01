import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { notification_id } = await request.json();

    if (!notification_id) {
      return NextResponse.json({ error: 'Notification ID is required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', notification_id)
      .select();

    if (error) {
      console.error('Error dismissing notification:', error);
      return NextResponse.json({ error: 'Failed to dismiss notification' }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'Notification not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Notification dismissed successfully', data });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
