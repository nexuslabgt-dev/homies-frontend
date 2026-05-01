import type { APIRoute } from 'astro';
import { supabase, supabaseAdmin } from '@/lib/supabase';
import { sendEmail, createEmailTemplate } from '@/lib/email';

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

  // Send decline email to client
  try {
    const { data: booking } = await supabase
      .from('bookings')
      .select('client_id, start_date, end_date, service:services(name), pet:pets(name), client_profile:profiles(full_name)')
      .eq('id', bookingId)
      .single();

    if (booking && supabaseAdmin) {
      const { data: userData, error: userError } = await supabaseAdmin.auth.admin.getUserById(booking.client_id);
      if (!userError && userData?.user?.email) {
        const clientName = (booking.client_profile as any)?.full_name || 'Cliente';
        const serviceName = (booking.service as any)?.name || 'Servicio';
        const petName = (booking.pet as any)?.name || 'tu mascota';
        const startDate = booking.start_date ? new Date(booking.start_date).toLocaleDateString('es-GT') : '-';

        await sendEmail({
          to: userData.user.email,
          subject: 'Tu reserva ha sido rechazada',
          html: createEmailTemplate(`
            <p style="font-size: 16px; line-height: 1.6; margin: 0 0 16px;">Hola <strong>${clientName}</strong>,</p>
            <p style="font-size: 16px; line-height: 1.6; margin: 0 0 16px;">Lamentamos informarte que tu reserva para <strong>${serviceName}</strong> no pudo ser confirmada en esta ocasión.</p>
            <div style="background: #f9fafa; padding: 16px; border-radius: 8px; margin: 16px 0;">
              <p style="margin: 0 0 8px;"><strong>Mascota:</strong> ${petName}</p>
              <p style="margin: 0 0 8px;"><strong>Servicio:</strong> ${serviceName}</p>
              <p style="margin: 0;"><strong>Fecha solicitada:</strong> ${startDate}</p>
            </div>
            <p style="font-size: 16px; line-height: 1.6; margin: 0 0 16px;">Te invitamos a realizar una nueva reserva seleccionando otro cuidador o fecha disponible.</p>
            <p style="font-size: 16px; line-height: 1.6; margin: 0;">Si tienes alguna pregunta, no dudes en contactarnos.</p>
          `, 'Reserva Rechazada')
        });
      }
    }
  } catch (emailErr) {
    console.error('[Booking Decline] Email error:', emailErr);
  }

  return new Response(null, {
    status: 302,
    headers: { Location: '/es/caregiver/bookings' }
  });
};
