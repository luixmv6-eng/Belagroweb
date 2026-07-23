# Panel de administración

Permite editar los textos, las imágenes y los artículos del sitio sin tocar código.
Vive en `/admin`.

## Cómo funciona

El sitio trae todos sus textos en `src/data/`. El panel **no reescribe esos archivos**:
guarda aparte, en `server/data/content.json`, únicamente lo que usted cambió. Al abrir
la web, esos cambios se superponen sobre los valores del código.

Esto tiene dos consecuencias útiles:

- Si un campo nunca se tocó, sigue el valor original. Nunca queda un hueco en blanco.
- Si el servidor no responde, la web arranca igual con el contenido del código. Un
  fallo del panel no tumba el sitio público.

El botón **Restaurar** de cada sección devuelve esa sección a los valores originales.

## Puesta en marcha

### 1. Contraseña

```bash
npm run admin:password -- "una-contraseña-larga"
```

Imprime una línea `ADMIN_PASSWORD_HASH=...`. Solo se guarda el hash, nunca la
contraseña. Sin esta variable no se puede entrar al panel.

### 2. En local

En **PowerShell** (Windows):

```powershell
npm run build
$env:ADMIN_PASSWORD_HASH = "...el hash del paso 1..."
npm run server
```

En **bash** (Linux, macOS, Git Bash):

```bash
npm run build
ADMIN_PASSWORD_HASH="...el hash del paso 1..." npm run server
```

Queda en `http://localhost:3000`, y el panel en `http://localhost:3000/admin`.

> `npm run dev` sirve solo el sitio, **sin API**: el panel se abriría pero no podría
> ni validar la contraseña ni guardar. Para el panel hace falta `npm run server`.
>
> La variable de entorno solo dura mientras esa ventana de PowerShell siga abierta.
> Si la cierra, hay que volver a definirla.

### 3. En Hostinger

1. hPanel → **Node.js** → crear aplicación
   - Versión de Node: 20 o superior
   - Archivo de arranque: `server/index.js`
   - Carpeta: la raíz del proyecto
2. Subir el proyecto **ya compilado**: ejecute `npm run build` antes de subir, e
   incluya la carpeta `dist/`.
3. Instalar dependencias: `npm install --omit=dev` desde el panel de Node.
4. Variables de entorno (hPanel → su aplicación → Variables de entorno):

   | Variable              | Valor                                     |
   | --------------------- | ----------------------------------------- |
   | `ADMIN_PASSWORD_HASH` | el hash del paso 1                        |
   | `NODE_ENV`            | `production`                              |
   | `SESSION_SECRET`      | una cadena aleatoria larga (recomendado)  |

5. Reiniciar la aplicación.

`NODE_ENV=production` marca la cookie de sesión como `Secure`, así que solo viaja
por HTTPS. Póngala.

### Al actualizar el sitio

Las carpetas `server/data/` y `server/uploads/` guardan el contenido y las imágenes
que se cargaron desde el panel. **No las sobrescriba al subir una versión nueva**:
están fuera del control de versiones justamente por eso.

## Qué se puede editar

27 secciones repartidas en cinco grupos del menú lateral, con 189 campos en total.

| Grupo                  | Secciones                                                                                                                    |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **Marca y contacto**   | Identidad · Datos de contacto · Asesores de WhatsApp · Redes y formularios · Ubicación                                          |
| **Estructura**         | Encabezado (logo, botón y menú completo con submenús) · Pie de página                                                          |
| **Página de inicio**   | Portada · Cifra destacada · Sobre Belagro · Etapas · Clientes · Bloque de Academia · Boletín                                    |
| **Páginas interiores** | Nuestra compañía · Acompañamiento en campo · Desarrollo de productos · Maquila · Portafolio · Etapas · Contacto · Academia · PQRS · Privacidad · Página no encontrada |
| **Contenido**          | Academia (artículos) · Imágenes                                                                                                |

Cada página interior incluye su cabecera, los textos de sus bloques, sus listas
(servicios, ejes, misión y visión, figuras de PQRS…) y su **título y descripción
para buscadores**.

### Lo que sigue en el código, a propósito

- **Los iconos.** Se emparejan por posición con cada elemento de una lista. Si añade
  un elemento más allá de los iconos definidos, se usa el primero como respaldo.
- **El articulado de la política de privacidad.** Por su naturaleza legal. Sí son
  editables su cabecera, la razón social, el NIT y el domicilio.
- **Las fichas de producto** (nombres, componentes, PDF). Viven en
  `src/data/products.js`.
- **Las rutas de las páginas.** Cambiarlas rompería los enlaces y el posicionamiento
  ya ganado.

### Artículos de Academia

Cada artículo tiene autor, fecha, tiempo de lectura, portada, resumen, cuerpo y
enlaces del autor. El cuerpo se arma con bloques: párrafo, subtítulo, lista, cita
destacada e imagen.

La URL se genera sola a partir del título, pero **solo mientras esté vacía**. Si el
artículo ya circula, cambiarla rompe los enlaces que otros hayan compartido.

## Comprobación del esquema

```bash
npm run check:schema
```

Verifica que cada campo declarado en `src/content/schema.js` corresponda a un dato
real, que no haya rutas ni identificadores repetidos y que ningún grupo del menú
quede vacío. Ejecútelo después de tocar el esquema: una ruta mal escrita mostraría
un campo vacío en el panel y guardaría una clave que nadie lee.

## Seguridad

- La contraseña se guarda como hash scrypt, nunca en claro.
- La sesión es una cookie `HttpOnly` firmada, válida 12 horas.
- Ocho intentos fallidos por IP bloquean el acceso durante 15 minutos.
- Las subidas se limitan a imágenes (JPG, PNG, WebP, AVIF, SVG) y 8 MB, y se
  renombran al guardarlas: nunca se usa el nombre que envía el navegador.
- Todo lo que escribe exige sesión. La lectura del contenido es pública, como debe
  ser: es lo que pinta la web.
