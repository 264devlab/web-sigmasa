import { Resend } from "resend";

const resend = new Resend(process.env['RESEND_API_KEY']);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      firstname,
      lastname,
      email,
      phone,
      provinceName,
      city,
      study_level,
      worked_projects,
      which_projects,
      company,
      message,
      area
    } = req.body;

    // 1. Validar que vengan los datos obligatorios base
    if (!firstname || !lastname || !email || !phone || !provinceName || !city || !area || !message) {
      return res.status(400).json({ error: 'Faltan campos obligatorios generales' });
    }

    // 2. Validar campos obligatorios según el área
    if (area === 'hr') {
      if (!study_level || !worked_projects) {
        return res.status(400).json({ error: 'Faltan campos obligatorios para el área de Recursos Humanos' });
      }
    } else if (area === 'technical') {
      if (!company) {
        return res.status(400).json({ error: 'Faltan campos obligatorios para el área Técnica' });
      }
    }

    // 3. Mapeo de áreas → emails y nombres
    const areaDetails: Record<string, { email: string, name: string }> = {
      hr: { email: 'ismaterluk98@gmail.com', name: 'Recursos Humanos' },
      technical: { email: 'ismaterluk98@gmail.com', name: 'Técnica' },
      commercial: { email: 'ismaterluk98@gmail.com', name: 'Comercial' },
      consulting: { email: 'ismaterluk98@gmail.com', name: 'Consultoría' }
    };

    const targetArea = areaDetails[area];

    if (!targetArea) {
      return res.status(400).json({ error: 'Área seleccionada inválida' });
    }

    // 4. Construir filas extra para la tabla de detalles según los datos recibidos
    let extraDetails = `
      <tr>
        <td style="padding-bottom: 10px; padding-top: 10px; border-top: 1px solid #e1e8ed;">
          <span style="font-size: 12px; text-transform: uppercase; color: #7f8c8d; font-weight: 600; display: block; margin-bottom: 4px;">Teléfono</span>
          <span style="font-size: 16px; color: #2c3e50; font-weight: 500;">${phone}</span>
        </td>
      </tr>
      <tr>
        <td style="padding-bottom: 10px; padding-top: 10px; border-top: 1px solid #e1e8ed;">
          <span style="font-size: 12px; text-transform: uppercase; color: #7f8c8d; font-weight: 600; display: block; margin-bottom: 4px;">Ubicación</span>
          <span style="font-size: 16px; color: #2c3e50; font-weight: 500;">${city}, ${provinceName}</span>
        </td>
      </tr>
    `;

    if (area === 'hr') {
      const studyLevelMap: Record<string, string> = {
        primary: 'Primario',
        secondary: 'Secundario',
        tertiary: 'Terciario',
        university: 'Universitario'
      };
      const workedProjectsStr = worked_projects === 'yes' ? 'Sí' : 'No';

      extraDetails += `
        <tr>
          <td style="padding-bottom: 10px; padding-top: 10px; border-top: 1px solid #e1e8ed;">
            <span style="font-size: 12px; text-transform: uppercase; color: #7f8c8d; font-weight: 600; display: block; margin-bottom: 4px;">Nivel de estudios</span>
            <span style="font-size: 16px; color: #2c3e50; font-weight: 500;">${studyLevelMap[study_level] || study_level}</span>
          </td>
        </tr>
        <tr>
          <td style="padding-bottom: 10px; padding-top: 10px; border-top: 1px solid #e1e8ed;">
            <span style="font-size: 12px; text-transform: uppercase; color: #7f8c8d; font-weight: 600; display: block; margin-bottom: 4px;">¿Trabajó en proyectos relacionados?</span>
            <span style="font-size: 16px; color: #2c3e50; font-weight: 500;">${workedProjectsStr}</span>
          </td>
        </tr>
      `;

      if (which_projects) {
        extraDetails += `
          <tr>
            <td style="padding-bottom: 10px; padding-top: 10px; border-top: 1px solid #e1e8ed;">
              <span style="font-size: 12px; text-transform: uppercase; color: #7f8c8d; font-weight: 600; display: block; margin-bottom: 4px;">¿Cuáles proyectos?</span>
              <span style="font-size: 16px; color: #2c3e50; font-weight: 500;">${which_projects}</span>
            </td>
          </tr>
        `;
      }
    } else if (area === 'technical') {
      extraDetails += `
        <tr>
          <td style="padding-bottom: 10px; padding-top: 10px; border-top: 1px solid #e1e8ed;">
            <span style="font-size: 12px; text-transform: uppercase; color: #7f8c8d; font-weight: 600; display: block; margin-bottom: 4px;">Empresa</span>
            <span style="font-size: 16px; color: #2c3e50; font-weight: 500;">${company}</span>
          </td>
        </tr>
      `;
    }

    let messageSection = '';
    if (message) {
      messageSection = `
        <h3 style="font-size: 14px; text-transform: uppercase; color: #7f8c8d; font-weight: 600; margin: 0 0 10px 0; letter-spacing: 1px;">Mensaje</h3>
        <div style="background-color: #f9fbfc; border-left: 4px solid #3498db; padding: 20px; border-radius: 0 4px 4px 0; font-size: 15px; line-height: 1.6; color: #34495e; white-space: pre-wrap;">${message}</div>
      `;
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
                      <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: 1px;">SIGMA SA</h1>
                      <p style="color: #3498db; margin: 10px 0 0 0; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Nuevo mensaje para <strong>${targetArea.name}</strong></p>
                    </td>
                  </tr>
                  <!-- Body -->
                  <tr>
                    <td style="padding: 40px;">
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
                        ${extraDetails}
                      </table>

                      ${messageSection}
                    </td>
                  </tr>
                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f4f7f6; padding: 20px; text-align: center; border-top: 1px solid #e1e8ed;">
                      <p style="margin: 0; font-size: 12px; color: #7f8c8d;">
                        Este es un mensaje automático generado desde el sitio web de Sigma SA.
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

    // 5. Desestructurar { data, error } (Resend no lanza excepciones en errores de API)
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: targetArea.email,
      subject: `Nuevo mensaje de ${firstname} ${lastname} - ${targetArea.name}`,
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