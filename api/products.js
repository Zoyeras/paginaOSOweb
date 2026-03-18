// api/products.js
import { google } from 'googleapis';

// Credenciales desde variables de entorno (configurar en Vercel)
const credentials = {
    type: "service_account",
    project_id: process.env.GOOGLE_PROJECT_ID,
    private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'), // necesario para saltos de línea
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    client_id: process.env.GOOGLE_CLIENT_ID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
};

const FOLDER_ID = process.env.DRIVE_FOLDER_ID || '152ockAeZWIwL8yVT-8K1FyvemyDwRtV4';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const auth = new google.auth.GoogleAuth({
            credentials,
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
        });
        const drive = google.drive({ version: 'v3', auth });

        // 1. Obtener subcarpetas
        const foldersRes = await drive.files.list({
            q: `'${FOLDER_ID}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`,
            fields: 'files(id, name)',
        });
        const folders = foldersRes.data.files || [];

        // 2. Para cada carpeta, obtener imágenes
        const products = [];
        for (const folder of folders) {
            const imagesRes = await drive.files.list({
                q: `'${folder.id}' in parents and mimeType contains 'image/' and trashed=false`,
                fields: 'files(id, name, thumbnailLink, webContentLink)',
            });
            const images = imagesRes.data.files || [];

            images.forEach((file, index) => {
                products.push({
                    id: `${folder.id}_${file.id}`,
                    title: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ').trim(),
                    category: folder.name,
                    price: 'COTIZA YA',
                    badge: index < 3 ? 'Top ventas' : 'Disponible',
                    image: file.thumbnailLink || '',
                    description: `Diseño de la colección ${folder.name}.`,
                });
            });
        }

        res.status(200).json({ products });
    } catch (error) {
        console.error('Error en API:', error);
        res.status(500).json({ error: 'Error al obtener productos de Drive' });
    }
}