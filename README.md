# Belagro

Sitio corporativo de Belagro, fertilizantes líquidos, respaldados por Castilla Agrícola.
Km 3,5 Vía Pradera - Florida, Hacienda Potrerillo, Valle del Cauca.

## Stack

React 19 + Vite 6 + Tailwind v4 + Motion (`motion/react`) + React Router 7.
Iconos: Phosphor. Tipografías autoalojadas con Fontsource: Outfit (títulos) y Source Sans 3 (cuerpo).

```bash
npm install
npm run dev       # desarrollo
npm run build     # producción, sale en dist/
npm run preview   # sirve dist/
npm run smoke     # renderiza las 19 páginas en Node y falla si alguna revienta
```

## Sistema de diseño

Los tokens viven en `src/styles/index.css` y se consumen como utilidades de Tailwind
(`bg-bg`, `text-fg`, `bg-lime`, `bg-surface-violet`, `rounded-card`).

- **Color de acción: solo el verde lima.** El morado y el lavanda son familia de superficie
  (fondos de sección, curvas divisorias) y el naranja pertenece únicamente al logo.
  No agregue un segundo color de acción.
- **Radios:** botones tipo píldora, tarjetas 16px, campos de formulario 12px.
- **Modo claro y oscuro.** Se toma la preferencia del sistema y el usuario puede alternarla
  con el botón de la barra superior. Cualquier color nuevo debe definirse en los dos temas.
- **Curvas divisorias** (`<Wave />`): `color` es el color de la sección de destino y el
  contenedor debe tener el color de origen. Dentro de una sección de color se usa `flip`.

## Qué falta cargar antes de publicar

1. **Fotografías reales.** Todas las imágenes se resuelven desde `src/data/media.js`, que hoy
   usa placeholders de picsum.photos. Reemplace cada URL por la foto real (por ejemplo
   `/img/hero-planta.webp` dentro de `public/img/`). El hero pide la toma aérea de la planta.
2. **Fichas técnicas y de seguridad.** Los botones de cada producto apuntan a
   `/fichas/<slug>-ficha-tecnica.pdf` y `/fichas/<slug>-ficha-seguridad.pdf`. Suba los PDF a
   `public/fichas/` con esos nombres o cambie las rutas en `src/data/products.js`.
3. **Logos de clientes.** `src/data/clients.js` está vacío a propósito: no se inventaron marcas
   porque publicar un cliente que no autorizó su logo sería una afirmación falsa de respaldo.
   Mientras el arreglo esté vacío, la sección muestra un estado vacío. Agregue
   `{ name, logo, url }` por cliente y la franja se llena sola.
4. **Capacidad instalada de maquila.** `src/pages/Maquila.jsx` tiene
   `CAPACIDAD_MILLONES_LITROS_ANIO = 0`, igual que el sitio actual. Ponga la cifra real.
5. **Linkedin.** `site.linkedin` en `src/data/site.js` apunta al home de Linkedin. Cambie la URL
   por el perfil de la empresa.

## Formularios

`src/lib/forms.js` centraliza el envío. Si define la variable de entorno `VITE_FORM_ENDPOINT`
(Formspree, Getform, una función serverless propia), los formularios hacen `POST` con JSON.
Si no la define, se abre el cliente de correo del usuario con el mensaje ya redactado, para que
ningún formulario muestre un "gracias" que en realidad no envía nada.

```bash
# .env.local
VITE_FORM_ENDPOINT=https://formspree.io/f/xxxxxxx
```

## Rutas

Se conservaron los slugs del sitio actual para no romper enlaces ni posicionamiento:
`/`, `/nuestra-compañía`, `/general-4`, `/general-7`, `/services-2-1`, `/portafolio-técnico`,
`/services-2`, `/copia-de-servicios`, `/copia-de-copia-de-servicios`, `/blog`, `/blog/:slug`,
`/contacto`, `/contact-1`, `/política-de-privacidad`.

Al ser una SPA, el servidor debe reescribir todas las rutas a `index.html`. Ya están incluidos
`vercel.json` y `public/_redirects` (Netlify). Para Nginx o Apache use la regla equivalente.
