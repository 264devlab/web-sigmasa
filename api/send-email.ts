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
            hr: 'gonzalo.balderrama@264devlab.com.ar',
            technical: 'ismaterluk98@gmail.com',
            commercial: 'gonzanicobalderrama@gmail.com',
            consulting: 'ismaterluk98@gmail.com'
        };

        const targetEmail = destinations[area];

        // 2. Validar que el área seleccionada sea válida
        if (!targetEmail) {
            return res.status(400).json({ error: 'Área seleccionada inválida' });
        }

        // 3. Desestructurar { data, error } (Resend no lanza excepciones en errores de API)
        const { data, error } = await resend.emails.send({
            from: 'no-reply@264devlab.com.ar', // Corregido 'no-replay' a 'no-reply'
            to: targetEmail,
            subject: `Nuevo mensaje de ${firstname} ${lastname}`,
            html: `
        <p><strong>Nombre:</strong> ${firstname} ${lastname}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Área:</strong> ${area}</p>
        <p><strong>Mensaje:</strong><br/> ${message}</p>
      `
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