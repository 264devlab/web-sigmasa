const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { firstname, lastname, email, message, area } = req.body;

        // 🔁 Mapeo de áreas → emails (MEJOR ACÁ, no en Angular)
        const destinations: Record<string, string> = {
            hr: 'gonzalo.balderrama@264devlab.com.ar',
            technical: 'ismaterluk98@gmail.com',
            commercial: 'gonzanicobalderrama@gmail.com',
            consulting: 'ismaterluk98@gmail.com'
        };

        const response = await resend.emails.send({
            from: 'no-replay@264devlab.com.ar',
            to: destinations[area],
            subject: `Hola amigo ${firstname} ${lastname}`,
            html: `
        <p><strong>Nombre:</strong> ${firstname} ${lastname}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong> ${message}</p>
      `
        });

        return res.status(200).json({ success: true, response });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error sending email' });
    }
}