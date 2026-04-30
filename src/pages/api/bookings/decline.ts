import type { APIRoute } from 'astro';
import { supabase } from '@/lib/supabase';

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const bookingId = formData.get('booking_id') as string;
  
  const { error } = await supabase
    .from('bookings')
    .update({ status: 'cancelled' })
    .eq('id', bookingId);
  
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  return new Response(null, { 
    status: 302, 
    headers: { Location: '/es/caregiver/bookings' } 
  });
};
