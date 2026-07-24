# Panel de administración

Permite editar los textos, las imágenes y los artículos del sitio sin tocar código.
Vive en `/admin`.

## Cómo funciona

El sitio trae todos sus textos en `src/data/`. El panel **no reescribe esos archivos**:
guarda aparte únicamente lo que usted cambió. Al abrir la web, esos cambios se
superponen sobre los valores del código.

Esto tiene dos consecuencias útiles:

- Si un campo nunca se tocó, sigue el valor original. Nunca queda un hueco en blanco.
- Si el servidor no responde, la web arranca igual con el contenido del código. Un
  fallo del panel no tumba el sitio público.

El botón **Restaurar** de cada sección devuelve esa sección a los valores originales.

### Dónde se guarda

El servidor detecta solo dónde está corriendo y elige el almacenamiento:

| Entorno       | Almacenamiento                        | Se activa cuando                |
| ------------- | ------------------------------------- | ------------------------------- |
| Hostinger, VPS, local | Disco (`server/data/`, `server/uploads/`) | por defecto             |
| Vercel        | Vercel Blob                           | existe `BLOB_READ_WRITE_TOKEN`  |

El mismo código sirve para los dos. Puede forzar uno con `STORAGE_DRIVER=fs` o
`STORAGE_DRIVER=blob`.

> **Por qué hacen falta dos.** En Vercel el sistema de archivos es de solo lectura
> salvo `/tmp`, y `/tmp` es efímero y no se comparte entre instancias. Guardar ahí
> respondería «Cambios publicados» y el contenido desaparecería sin ningún error.

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
   - Versión de Node: **20 o superior**
   - Archivo de arranque: `server/index.js`
   - Repositorio: el de GitHub, rama `main`
2. Preparar la aplicación. `dist/` **no está en el repositorio** (es resultado de
   compilar, no código fuente), así que hay que generarla en el servidor:

   ```bash
   npm run setup
   ```

   Equivale a `npm install && npm run build`.

   > **No use `npm install --omit=dev`.** Vite es una dependencia de desarrollo y
   > sin ella no se puede compilar. Instale todo.

3. Variables de entorno (hPanel → su aplicación → Variables de entorno):

   | Variable              | Valor                                     |
   | --------------------- | ----------------------------------------- |
   | `ADMIN_PASSWORD_HASH` | el hash del paso 1                        |
   | `NODE_ENV`            | `production`                              |
   | `SESSION_SECRET`      | una cadena aleatoria larga (recomendado)  |

4. Reiniciar la aplicación.

`NODE_ENV=production` marca la cookie de sesión como `Secure`, así que solo viaja
por HTTPS. Póngala.

### Al actualizar el sitio

Tras traer cambios de GitHub hay que **volver a compilar**, o seguirá sirviéndose la
versión anterior:

```bash
npm run setup
```

Y reiniciar la aplicación.

Las carpetas `server/data/` y `server/uploads/` guardan el contenido y las imágenes
cargadas desde el panel. Tampoco están en el repositorio, justamente para que un
despliegue nuevo no las pise. **No las borre al actualizar**: ahí vive todo lo que
se editó desde el panel.

### Nombres exactos de las variables

Los nombres distinguen mayúsculas y deben escribirse **tal cual**. `adminhash` no
es `ADMIN_PASSWORD_HASH`: el panel de la plataforma la mostrará igual, pero el
servidor no la encontrará y el error no dirá que el nombre está mal.

```
ADMIN_PASSWORD_HASH
SESSION_SECRET
BLOB_READ_WRITE_TOKEN
SMTP_HOST
SMTP_PORT
SMTP_USER
SMTP_PASSWORD
SMTP_FROM
```

### Comprobar un despliegue

`/api/health` dice qué ve el servidor:

```json
{
  "almacenamiento": "Vercel Blob",
  "listo": {
    "almacenamiento": true,
    "contrasenaPanel": true,
    "secretoSesion": true,
    "envioDeCorreo": false
  }
}
```

Los tres primeros tienen que estar en `true` para que el panel funcione. El cuarto
solo afecta al formulario de contacto.

Con sesión iniciada añade un bloque `detalle` con los nombres de variable que
recibe el servidor: sirve para cazar erratas y variables puestas en el entorno
equivocado. Sin sesión no se publica, porque es configuración interna.

Si `momento` no cambia al recargar, está viendo una respuesta cacheada.

### 4. En Vercel

Vercel compila y despliega solo en cada push, así que no hay que ejecutar nada a
mano. Lo que sí hay que hacer es darle un sitio donde guardar, porque su sistema de
archivos no sirve.

1. Importar el repositorio. `vercel.json` ya trae la configuración: compila con
   `npm run build`, publica `dist/` y enruta `/api/*` a la función de `api/index.js`.
2. **Storage → Blob → Create**, y conectarlo al proyecto.

   > **Dos trampas aquí, las dos comprobadas en un despliegue real.**
   >
   > **El campo de prefijo.** Al conectar, Vercel ofrece un *Environment Variables
   > Prefix*. **Déjelo vacío.** Si escribe ahí `BLOB_READ_WRITE_TOKEN` creyendo que
   > es el nombre de la variable, acabará con `BLOB_READ_WRITE_TOKEN_STORE_ID` y
   > compañía, y el token de verdad no existirá.
   >
   > **El token puede no crearse solo.** Según la versión, conectar el almacén crea
   > `BLOB_STORE_ID` y `BLOB_WEBHOOK_PUBLIC_KEY` pero **no** el token de escritura.
   > Compruébelo en Settings → Environment Variables. Si falta, ábralo desde
   > Storage → su Blob, copie el valor que empieza por `vercel_blob_rw_` y añádalo
   > a mano como `BLOB_READ_WRITE_TOKEN`.

   El servidor acepta el token con prefijo o sin él, pero necesita que exista.
3. Variables de entorno (Settings → Environment Variables):

   | Variable              | Valor                                    |
   | --------------------- | ---------------------------------------- |
   | `ADMIN_PASSWORD_HASH` | el hash del paso 1                       |
   | `SESSION_SECRET`      | cadena aleatoria larga, **obligatoria**  |

   `NODE_ENV` la pone Vercel sola en `production`.

   `SESSION_SECRET` aquí no es opcional: cada instancia serverless generaría el suyo
   y nadie podría mantener la sesión. El servidor se niega a arrancar sin ella y lo
   dice claramente. Genérela con:

   ```powershell
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

4. Volver a desplegar para que tome las variables.

Las imágenes subidas quedan en Blob y se sirven desde su CDN, con URL absolutas. El
panel las guarda tal cual, así que funciona igual que en disco.

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

## Correo de los formularios

Los formularios de **Contacto** y **Maquila** los envía el servidor por SMTP. A qué
buzón llegan se decide en el panel, en **Datos de contacto → Correo que recibe los
formularios**. Si se deja vacío, llegan al correo comercial.

Ese campo no aparece en la web: es solo el destino interno.

### Configurar el SMTP

Sin estas variables el servidor no puede enviar. Van donde el resto (hPanel o
Vercel → Environment Variables):

| Variable        | Ejemplo               |
| --------------- | --------------------- |
| `SMTP_HOST`     | `smtp.hostinger.com`  |
| `SMTP_PORT`     | `465`                 |
| `SMTP_USER`     | `web@sudominio.com`   |
| `SMTP_PASSWORD` | la contraseña de esa cuenta |
| `SMTP_FROM`     | opcional; si falta, se usa `SMTP_USER` |

Use una cuenta de correo **del propio dominio** como remitente. Enviar desde un
Gmail ajeno hace que los mensajes acaben en spam.

> **Si no configura SMTP no se rompe nada.** El servidor responde 501 y el
> navegador abre el cliente de correo del visitante con el mensaje ya redactado.
> Lo que nunca ocurre es que el formulario diga «enviado» sin haber enviado.

El destinatario sale siempre del servidor, nunca de lo que manda el navegador: si
se aceptara del cliente, cualquiera podría usar el formulario para mandar correo a
quien quisiera.

## Aviso emergente

**Estructura del sitio → Aviso emergente.** Llega desactivado.

Se configura el interruptor de encendido, el título, el texto, el botón (etiqueta y
a qué página lleva, elegida de una lista), cada cuánto reaparece y cuántos segundos
tarda en salir.

Sobre la frecuencia: «una vez y no vuelve a salir» es lo recomendable. Repetirlo en
cada visita cansa y resta credibilidad al aviso.

## Modo claro y oscuro

La web **siempre arranca en claro**, sin seguir la preferencia del sistema
operativo. La identidad de Belagro se construyó sobre fondo claro y quien entra por
primera vez debe verla así.

El modo oscuro sigue disponible desde el botón de la barra superior, y esa elección
se recuerda: quien lo active lo verá oscuro las siguientes veces.

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
