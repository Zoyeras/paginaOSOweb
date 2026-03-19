# Paso a Paso: Productos Dinamicos desde Google Drive en OSOweb

## 1) Objetivo del cambio
Migrar la pagina para que los productos no salgan de archivos locales, sino de Google Drive en tiempo real, manteniendo:
- Categorias dinamicas por carpeta.
- Carga progresiva de productos.
- Carrito y formularios que envian a WhatsApp.
- Vista previa (modal) de producto.

---

## 2) Estado inicial (antes)
- Habia logica local en `src/paginas/homePage.tsx` para leer imagenes del `public/`.
- La coleccion y categorias dependian del build del frontend.
- Si se agregaban disenos nuevos en Drive, no aparecian automaticamente en la web.

---

## 3) Backend: API de productos en Vercel
Archivo clave: `api/products.js`

### 3.1 Endpoint
- Ruta: `GET /api/products`
- Respuesta esperada:

```json
{
  "products": [
    {
      "id": "folderId_fileId",
      "title": "nombre limpio",
      "category": "Anime",
      "price": "COTIZA YA",
      "badge": "Top ventas",
      "image": "url",
      "description": "Diseño de la colección Anime."
    }
  ]
}
```

### 3.2 Variables de entorno requeridas
La API valida estas variables antes de continuar:
- `GOOGLE_PROJECT_ID`
- `GOOGLE_PRIVATE_KEY_ID`
- `GOOGLE_PRIVATE_KEY`
- `GOOGLE_CLIENT_EMAIL`
- `GOOGLE_CLIENT_ID`
- `DRIVE_FOLDER_ID`

Si falta alguna, retorna 500 con detalle (`Configuracion incompleta`).

### 3.3 Conexion con Google Drive
- Se crea `GoogleAuth` con scope `drive.readonly`.
- Se consultan subcarpetas dentro de `DRIVE_FOLDER_ID`.
- Cada subcarpeta representa una categoria.
- Luego se listan las imagenes de cada subcarpeta y se mapean a `products[]`.

### 3.4 Mejora de calidad de imagen
Se agrego `getHighResDriveImage(file)` para evitar thumbnails borrosos:
- Si existe `thumbnailLink`, se ajusta a `=s1600`.
- Si no existe, usa fallback: `https://drive.google.com/thumbnail?id=FILE_ID&sz=w1600`.

Esto mejora especialmente la vista de cards y modal.

---

## 4) Frontend: carga dinamica con useEffect
Archivo clave: `src/paginas/homePage.tsx`

### 4.1 Estados de datos remotos
- `driveProducts`: productos provenientes de la API.
- `driveCategories`: categorias calculadas desde los productos.

### 4.2 useEffect de carga inicial
En el montaje del componente:
1. Hace `fetch('/api/products')`.
2. Guarda productos en `setDriveProducts(data.products)`.
3. Construye categorias dinamicas con `Set`:
   - `['Todo', ...categoriasUnicas]`
4. Si falla la carga, muestra notificacion de error.

### 4.3 Fuente unica de productos
La vista ya no usa fuente local; ahora usa:
- `currentProducts = driveProducts`
- `currentCategories = driveCategories`

Con esto, cualquier cambio en Drive se refleja sin recompilar assets locales.

---

## 5) Filtro, paginacion y responsive
### 5.1 Filtro por categoria
`filteredProducts` se calcula con `useMemo`:
- Si categoria es `Todo`, muestra todos.
- Si no, filtra por `product.category`.

### 5.2 Carga por lotes
- Desktop: 3 filas x 4 columnas = 12 por lote.
- Movil: 8 por lote.
- Boton `Ver mas` aumenta `visibleProductsCount` por lote.

### 5.3 Deteccion movil
Otro `useEffect` escucha `resize` y actualiza `isMobileView` para ajustar el lote dinamicamente.

---

## 6) UX que se mantuvo/fortalecio
### 6.1 Modal de vista previa
- `previewProduct` abre imagen en primer plano.
- Cierre con clic fuera o tecla `Escape`.
- Bloqueo de scroll de fondo mientras modal esta abierto.

### 6.2 Notificaciones emergentes
`notice` centraliza mensajes de exito/error para:
- Errores de carga.
- Validaciones de formularios.
- Confirmaciones al abrir WhatsApp.

### 6.3 Carrito y WhatsApp
- `addToCart`, `changeQuantity`, `cartTotal`.
- `handleCartSubmit` valida nombre/ubicacion y arma mensaje estructurado con productos, cantidades y total.

### 6.4 Contacto y WhatsApp
- `handleContactSubmit` valida campos clave.
- Construye mensaje estructurado y abre WhatsApp.

---

## 7) Incidencia real en produccion: Error 500
### 7.1 Sintoma
`/api/products` respondia 500 en Vercel.

### 7.2 Diagnostico
El detalle de respuesta indico:
- Google Drive API deshabilitada en el proyecto GCP.

### 7.3 Solucion aplicada
1. Habilitar Google Drive API en Google Cloud del proyecto correcto.
2. Confirmar variables en Vercel.
3. Redeploy.
4. Reprobar endpoint.

Resultado: la API volvio a responder 200 y cargaron productos.

---

## 8) Flujo completo (end-to-end)
1. El usuario entra a `HomePage`.
2. `useEffect` pide `GET /api/products`.
3. API autentica con service account.
4. API lee carpetas + imagenes de Drive.
5. API retorna `products[]` con categoria, titulo, badge, precio e imagen.
6. Frontend guarda productos, crea categorias y renderiza grilla.
7. Usuario filtra, ve modal, agrega al carrito y/o envia WhatsApp.

---

## 9) Beneficios logrados
- Catalogo desacoplado del build frontend.
- Gestion de productos por carpetas en Drive (mas simple para negocio).
- Escalabilidad: agregar imagenes nuevas sin tocar codigo.
- Mejor resiliencia: validaciones y mensajes claros en backend/frontend.
- Mejor calidad visual por URLs de imagen en mayor resolucion.

---

## 10) Checklist operativo para futuro
- Si no cargan productos:
  1. Probar `GET /api/products` directamente.
  2. Revisar logs de Vercel Function.
  3. Validar env vars.
  4. Verificar Drive API habilitada.
  5. Confirmar permisos de carpeta al service account.

- Si imagenes salen borrosas:
  1. Revisar que `getHighResDriveImage` siga activo.
  2. Ajustar tamano (`s1600`, `s2000`, etc.) segun necesidad.

---

## Archivos clave del flujo
- `api/products.js`
- `src/paginas/homePage.tsx`
- `vercel.json`

