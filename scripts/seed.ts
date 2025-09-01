// scripts/seed.ts
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY; // Use service key for admin actions

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error("Supabase URL or Service Key is missing from .env.local");
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function main() {
  console.log("Starting to seed the database...");

  // Clear existing data
  await supabase.from('team_members').delete().neq('user_id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('tasks').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('scripts').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('shoots').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('notifications').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('projects').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('clients').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('teams').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('users').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('leads').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  console.log("Cleared existing data.");

  // Seed Users
  const { data: users } = await supabase.from('users').insert([
    { name: 'Alex', email: 'alex@goatmedia.com', role: 'Content Strategist', avatar_url: '/avatars/alex.jpg' },
    { name: 'Morgan', email: 'morgan@goatmedia.com', role: 'Executive', avatar_url: '/avatars/morgan.jpg' },
    { name: 'Casey', email: 'casey@goatmedia.com', role: 'Project Manager', avatar_url: '/avatars/casey.jpg' },
  ]).select();
  console.log("Seeded users:", users);

  // Seed Clients
  const { data: clients } = await supabase.from('clients').insert([
    { name: 'Client A' },
    { name: 'Client B' },
    { name: 'Client C' },
    { name: 'Client D' },
  ]).select();
  console.log("Seeded clients:", clients);

  // Seed Projects
  const { data: projects } = await supabase.from('projects').insert([
    { name: 'Q3 Campaign', client_id: clients![0].id, status: 'In Progress', progress: 75 },
    { name: 'New Product Launch', client_id: clients![1].id, status: 'On Track', progress: 50 },
    { name: 'Brand Refresh', client_id: clients![2].id, status: 'At Risk', progress: 30 },
  ]).select();
  console.log("Seeded projects:", projects);

  // Seed Tasks
  await supabase.from('tasks').insert([
    { title: 'Draft script for Q3 Campaign', status: 'Done', assignee_id: users![0].id, project_id: projects![0].id, due_date: new Date().toISOString() },
    { title: 'Finalize editing for New Product video', status: 'In Progress', assignee_id: users![0].id, project_id: projects![1].id, due_date: new Date().toISOString() },
    { title: 'Review Brand Refresh concepts', status: 'To Do', assignee_id: users![2].id, project_id: projects![2].id, due_date: new Date().toISOString() },
    { title: 'High-priority executive review', status: 'To Do', assignee_id: users![1].id, project_id: projects![0].id, due_date: new Date().toISOString() }
  ]);
  console.log("Seeded tasks.");

  // Seed Shoots
  await supabase.from('shoots').insert([
    { title: 'Client A - Product Shoot', shoot_date: new Date().toISOString(), project_id: projects![0].id },
  ]);
  console.log("Seeded shoots.");

  // Seed Scripts
  await supabase.from('scripts').insert([
    { title: 'IG Reel - Q3 Campaign', version: 'V2', status: 'In Review', project_id: projects![0].id },
    { title: 'YouTube Ad - New Product', version: 'V1', status: 'In Review', project_id: projects![1].id },
  ]);
  console.log("Seeded scripts.");

  // Seed Notifications
  await supabase.from('notifications').insert([
    { user_id: users![0].id, message: 'Shoot rescheduled to tomorrow.' },
    { user_id: users![0].id, message: "New script 'Project Alpha' assigned." },
    { user_id: users![0].id, message: 'Your latest edit was approved.' },
    { user_id: users![1].id, message: 'Q3 budget report is ready for review.' },
  ]);
  console.log("Seeded notifications.");

  // Seed Leads
  await supabase.from('leads').insert([
    { client_name: 'Lead Alpha', status: 'Negotiation', value: 50000 },
    { client_name: 'Lead Beta', status: 'Contacted', value: 25000 },
    { client_name: 'Lead Gamma', status: 'New', value: 10000 },
    { client_name: 'Lead Delta', status: 'Proposal', value: 30000 },
  ]);
  console.log("Seeded leads.");

  console.log("Database seeding completed successfully!");
}

main().catch(err => {
  console.error("Error seeding database:", err);
});
