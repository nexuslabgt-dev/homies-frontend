import type { APIRoute } from 'astro';
import { sendEmail } from '@/lib/email';
import { supabase } from '@/lib/supabase';

export const POST: APIRoute = async ({ request }) => {
  // Get auth token from header
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.replace('Bearer ', '');

  if (!token) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  // Verify user with Supabase
  const { data: { user }, error: authError } = await supabase.auth.getUser(token);
  if (authError || !user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const body = await request.json();
  const { to, subject, html } = body;

  if (!to || !subject || !html) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
  }

  const result = await sendEmail({ to, subject, html });

  if (!result.success) {
    return new Response(JSON.stringify({ error: result.error }), { status: 500 });
  }

  return new Response(JSON.stringify({ success: true, data: result.data }), { status: 200 });
};
