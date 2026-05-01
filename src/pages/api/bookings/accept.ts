import type { APIRoute } from 'astro';
import { supabase, supabaseAdmin } from '@/lib/supabase';
import { sendEmail, createEmailTemplate } from '@/lib/email';

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const bookingId = formData.get('booking_id') as string;

  const { error } = await supabase
    .from('bookings')
    .update({ status: 'confirmed' })
    .eq('id', bookingId);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Send confirmation email to client
  try {
    const { data: booking } = await supabase
      .from('bookings')
      .select('client_id, start_date, end_date, total_price, notes, service:services(name), pet:pets(name), client_profile:profiles(full_name)')
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
        const totalPrice = booking.total_price ? `Q.${(booking.total_price / 100).toFixed(2)}` : 'Por confirmar';

        await sendEmail({
          to: userData.user.email,
          subject: '¡Tu reserva ha sido confirmada! 🐾',
          html: createEmailTemplate(`
            <p style="font-size: 16px; line-height: 1.6; margin: 0 0 16px;">Hola <strong>${clientName}</strong>,</p>
            <p style="font-size: 16px; line-height: 1.6; margin: 0 0 16px;">¡Buenas noticias! Tu cuidador ha confirmado tu reserva para <strong>${serviceName}</strong>.</p>
            <div style="background: #f9fafa; padding: 16px; border-radius: 8px; margin: 16px 0;">
              <p style="margin: 0 0 8px;"><strong>Mascota:</strong> ${petName}</p>
              <p style="margin: 0 0 8px;"><strong>Servicio:</strong> ${serviceName}</p>
              <p style="margin: 0 0 8px;"><strong>Fecha inicio:</strong> ${startDate}</p>
              <p style="margin: 0 0 8px;"><strong>Fecha fin:</strong> ${endDate}</p>
              <p style="margin: 0;"><strong>Total:</strong> ${totalPrice}</p>
            </div>
            <p style="font-size: 16px; line-height: 1.6; margin: 0;">Gracias por confiar en Homies Pets. Tu cuidador se pondrá en contacto contigo pronto.</p>
          `, 'Reserva Confirmada')
        });
      }
    }
  } catch (emailErr) {
    console.error('[Booking Accept] Email error:', emailErr);
  }

  return new Response(null, {
    status: 302,
    headers: { Location: '/es/caregiver/bookings' }
  });
};
