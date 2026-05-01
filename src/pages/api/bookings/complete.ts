import type { APIRoute } from 'astro';
import { supabase, supabaseAdmin } from '@/lib/supabase';
import { sendEmail, createEmailTemplate } from '@/lib/email';

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const bookingId = formData.get('booking_id') as string;

  const { error } = await supabase
    .from('bookings')
    .update({ status: 'completed' })
    .eq('id', bookingId);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Send completion + review invitation email to client
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
        const endDate = booking.end_date ? new Date(booking.end_date).toLocaleDateString('es-GT') : startDate;

        await sendEmail({
          to: userData.user.email,
          subject: '¡Servicio completado! Cuéntanos tu experiencia 🐾',
          html: createEmailTemplate(`
            <p style="font-size: 16px; line-height: 1.6; margin: 0 0 16px;">Hola <strong>${clientName}</strong>,</p>
            <p style="font-size: 16px; line-height: 1.6; margin: 0 0 16px;">¡Esperamos que <strong>${petName}</strong> haya tenido una experiencia increíble con nuestro servicio de <strong>${serviceName}</strong>!</p>
            <div style="background: #f9fafa; padding: 16px; border-radius: 8px; margin: 16px 0;">
              <p style="margin: 0 0 8px;"><strong>Servicio:</strong> ${serviceName}</p>
              <p style="margin: 0 0 8px;"><strong>Fecha:</strong> ${startDate} ${endDate !== startDate ? ' - ' + endDate : ''}</p>
              <p style="margin: 0;"><strong>Mascota:</strong> ${petName}</p>
            </div>
            <p style="font-size: 16px; line-height: 1.6; margin: 0 0 16px;">Tu opinión es muy importante para nosotros y ayuda a otros dueños a encontrar el cuidador perfecto.</p>
            <div style="text-align: center; margin: 24px 0;">
              <a href="${import.meta.env.SITE_URL || 'https://homiespets.com'}/es/dashboard" style="display: inline-block; background: #2d9290; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600;">Dejar una reseña</a>
            </div>
            <p style="font-size: 16px; line-height: 1.6; margin: 0;">Gracias por confiar en Homies Pets. ¡Esperamos verte pronto!</p>
          `, 'Servicio Completado')
        });
      }
    }
  } catch (emailErr) {
    console.error('[Booking Complete] Email error:', emailErr);
  }

  return new Response(null, {
    status: 302,
    headers: { Location: '/es/caregiver/bookings' }
  });
};
