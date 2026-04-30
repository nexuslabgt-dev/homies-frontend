import type { APIRoute } from 'astro';
import { supabase } from '@/lib/supabase';

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const user_id = formData.get('user_id') as string;
    const bio = formData.get('bio') as string;
    const experience = formData.get('experience') as string;
    const services = formData.getAll('services') as string[];
    const hourly_rate = parseFloat(formData.get('hourly_rate') as string);

    if (!user_id || !bio || !services.length) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { data, error } = await supabase
      .from('caregivers')
      .insert({
        user_id,
        bio,
        experience,
        services,
        hourly_rate: Math.round(hourly_rate * 100),
        is_available: true,
      })
      .select()
      .single();

    if (error) throw error;

    return new Response(null, { 
      status: 302, 
      headers: { Location: '/es/caregiver/dashboard' } 
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
