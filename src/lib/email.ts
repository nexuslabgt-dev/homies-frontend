import { Resend } from 'resend';

export interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
}

export async function sendEmail({ to, subject, html, from }: EmailOptions) {
  const apiKey = import.meta.env.RESEND_API_KEY;
  const defaultFrom = import.meta.env.RESEND_FROM_EMAIL || 'Homies Pets <noreply@homiespets.com>';

  if (!apiKey) {
    console.warn('[Email] RESEND_API_KEY not configured. Email not sent.');
    return { success: false, error: 'RESEND_API_KEY not configured' };
  }

  const resend = new Resend(apiKey);

  try {
    const { data, error } = await resend.emails.send({
      from: from || defaultFrom,
      to,
      subject,
      html,
    });

    if (error) {
      console.error('[Email] Resend error:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err: any) {
    console.error('[Email] Send error:', err);
    return { success: false, error: err.message || 'Unknown error' };
  }
}

export function createEmailTemplate(content: string, title?: string): string {
  return `
<div style="font-family: 'Poppins', sans-serif; max-width: 600px; margin: 0 auto; color: #171c1a;">
  <div style="background: #2d9290; padding: 24px; text-align: center; border-radius: 12px 12px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 700;">Homies Pets</h1>
    <p style="color: rgba(255,255,255,0.9); margin: 4px 0 0; font-size: 14px;">You leave them, we love them!</p>
  </div>
  <div style="padding: 32px; background: #ffffff; border-left: 1px solid #e4e7e6; border-right: 1px solid #e4e7e6;">
    ${title ? `<h2 style="color: #2d9290; margin: 0 0 16px; font-size: 20px; font-weight: 600;">${title}</h2>` : ''}
    ${content}
  </div>
  <div style="padding: 20px; text-align: center; color: #6c7873; font-size: 12px; background: #f4f5f5; border-radius: 0 0 12px 12px; border: 1px solid #e4e7e6; border-top: none;">
    <p style="margin: 0 0 4px;"><strong>Homies Pets</strong> - Antigua Guatemala</p>
    <p style="margin: 0;">¿Necesitas ayuda? Escríbenos a <a href="mailto:homies.pets.care@gmail.com" style="color: #2d9290;">homies.pets.care@gmail.com</a></p>
  </div>
</div>
  `.trim();
}
