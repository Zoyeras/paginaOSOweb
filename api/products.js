// api/products.js
import { google } from 'googleapis';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Validar variables de entorno
        const requiredEnvVars = [
            'GOOGLE_PROJECT_ID',
            'GOOGLE_PRIVATE_KEY_ID',
            'GOOGLE_PRIVATE_KEY',
            'GOOGLE_CLIENT_EMAIL',
            'GOOGLE_CLIENT_ID',
            'DRIVE_FOLDER_ID'
        ];

        const missingVars = requiredEnvVars.filter(v => !process.env[v]);
        if (missingVars.length > 0) {
            console.error('Variables de entorno faltantes:', missingVars);
            return res.status(500).json({
                error: 'Configuración incompleta',
                missing: missingVars
            });
        }

        // Construir credenciales
        const credentials = {
            type: "service_account",
            project_id: process.env.GOOGLE_PROJECT_ID,
            private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
            private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            client_email: process.env.GOOGLE_CLIENT_EMAIL,
            client_id: process.env.GOOGLE_CLIENT_ID,
            auth_uri: "https://accounts.google.com/o/oauth2/auth",
            token_uri: "https://oauth2.googleapis.com/token",
        };

        const FOLDER_ID = process.env.DRIVE_FOLDER_ID;

        // Autenticar
        const auth = new google.auth.GoogleAuth({
            credentials,
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
        });
        const drive = google.drive({ version: 'v3', auth });

        console.log('Obteniendo carpetas de:', FOLDER_ID);

        // 1. Obtener subcarpetas
        const foldersRes = await drive.files.list({
            q: `'${FOLDER_ID}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`,
            fields: 'files(id, name)',
            pageSize: 100,
        });
        const folders = foldersRes.data.files || [];

        console.log(`Encontradas ${folders.length} carpetas`);

        if (folders.length === 0) {
            console.warn('No se encontraron carpetas en el FOLDER_ID');
            return res.status(200).json({ products: [] });
        }

        // 2. Para cada carpeta, obtener imágenes
        const products = [];
        for (const folder of folders) {
            console.log(`Procesando carpeta: ${folder.name}`);

            const imagesRes = await drive.files.list({
                q: `'${folder.id}' in parents and mimeType contains 'image/' and trashed=false`,
                fields: 'files(id, name, thumbnailLink, webContentLink)',
                pageSize: 100,
            });
            const images = imagesRes.data.files || [];

            console.log(`  - ${images.length} imágenes encontradas`);

            images.forEach((file, index) => {
                products.push({
                    id: `${folder.id}_${file.id}`,
                    title: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ').trim(),
                    category: folder.name,
                    price: 'COTIZA YA',
                    badge: index < 3 ? 'Top ventas' : 'Disponible',
                    image: file.thumbnailLink || file.webContentLink || '',
                    description: `Diseño de la colección ${folder.name}.`,
                });
            });
        }

        console.log(`Total de productos: ${products.length}`);

        res.status(200).json({ products });
    } catch (error) {
        console.error('Error en API de productos:', {
            message: error.message,
            stack: error.stack,
            code: error.code,
        });

        res.status(500).json({
            error: 'Error al obtener productos de Drive',
            details: error.message
        });
    }
}