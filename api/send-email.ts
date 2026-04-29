import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { firstname, lastname, email, message, area } = req.body;

    // 1. Validar que vengan los datos obligatorios
    if (!firstname || !email || !message || !area) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    // 🔁 Mapeo de áreas → emails (MEJOR ACÁ, no en Angular)
    const destinations: Record<string, string> = {
      hr: 'ismaterluk98@gmail.com',
      technical: 'ismaterluk98@gmail.com',
      commercial: 'ismaterluk98@gmail.com',
      consulting: 'ismaterluk98@gmail.com'
    };

    const targetEmail = destinations[area];

    // 2. Validar que el área seleccionada sea válida
    if (!targetEmail) {
      return res.status(400).json({ error: 'Área seleccionada inválida' });
    }

    //templateHTML
    let templateHTML = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Nuevo mensaje de Contacto</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f4f7f6; font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333333;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f7f6; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                  <!-- Header -->
                  <tr>
                    <td style="background-color: #2c3e50; padding: 30px 40px; text-align: center;">
                      <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: 1px;">SIGMASA</h1>
                      <p style="color: #3498db; margin: 10px 0 0 0; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Nuevo Mensaje de Contacto</p>
                    </td>
                  </tr>
                  <!-- Body -->
                  <tr>
                    <td style="padding: 40px;">
                      <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.5; color: #333333;">
                        Hola equipo de <strong> Recursos Humanos </strong>,
                      </p>
                      <p style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.5; color: #333333;">
                        Han recibido un nuevo mensaje a través del formulario de contacto del sitio web. A continuación se detallan los datos del remitente:
                      </p>
                      
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f9fbfc; border: 1px solid #e1e8ed; border-radius: 6px; padding: 20px; margin-bottom: 30px;">
                        <tr>
                          <td style="padding-bottom: 10px;">
                            <span style="font-size: 12px; text-transform: uppercase; color: #7f8c8d; font-weight: 600; display: block; margin-bottom: 4px;">Nombre completo</span>
                            <span style="font-size: 16px; color: #2c3e50; font-weight: 500;">${firstname} ${lastname}</span>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding-bottom: 10px; padding-top: 10px; border-top: 1px solid #e1e8ed;">
                            <span style="font-size: 12px; text-transform: uppercase; color: #7f8c8d; font-weight: 600; display: block; margin-bottom: 4px;">Correo electrónico</span>
                            <a href="mailto:${email}" style="font-size: 16px; color: #3498db; text-decoration: none; font-weight: 500;">${email}</a>
                          </td>
                        </tr>
                      </table>

                      <h3 style="font-size: 14px; text-transform: uppercase; color: #7f8c8d; font-weight: 600; margin: 0 0 10px 0; letter-spacing: 1px;">Mensaje</h3>
                      <div style="background-color: #f9fbfc; border-left: 4px solid #3498db; padding: 20px; border-radius: 0 4px 4px 0; font-size: 15px; line-height: 1.6; color: #34495e; white-space: pre-wrap;">${message}</div>
                    </td>
                  </tr>
                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f4f7f6; padding: 20px; text-align: center; border-top: 1px solid #e1e8ed;">
                      <p style="margin: 0; font-size: 12px; color: #7f8c8d;">
                        Este es un mensaje automático generado desde el sitio web de Sigmasa.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
        `;

    // 3. Desestructurar { data, error } (Resend no lanza excepciones en errores de API)
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: targetEmail,
      subject: `Nuevo mensaje de ${firstname} ${lastname}`,
      html: templateHTML
    });

    // Si la API de Resend falla (ej. dominio no verificado, cuota excedida)
    if (error) {
      console.error('Error en API de Resend:', error);
      return res.status(400).json({ error });
    }

    return res.status(200).json({ success: true, data });

  } catch (error) {
    console.error('Error del servidor:', error);
    return res.status(500).json({ error: 'Error interno del servidor enviando el email' });
  }
}