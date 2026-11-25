# Para ti, siempre — Felices 19

Un regalo de Juan Fernando para su amor. Álbum con seis fotos, carta desplegable y descargable, 19 razones, capítulo dedicado a su futuro hijo Gael Fernando Urbano Quintero y velitas interactivas. Lista musical de dos canciones aportadas por el usuario, con repetición continua de la lista y controles de pausa/siguiente. El sonido empieza con una interacción. Regalo interactivo con la pregunta «¿Me amas?» y un conejito animado llamado Messi Ronaldo, con controles de repetición y pausa.

## Abrir en Visual Studio Code

Abre esta carpeta y ejecuta en su terminal:

```powershell
npm run dev
```

Visita http://127.0.0.1:4173. Requiere Node.js; no necesita instalar dependencias. También puedes abrir `public/index.html` directamente para usar la página sin servidor.

## Editar

- `public/index.html`: dedicatoria, carta, razones y textos.
- `public/styles.css`: colores, fuentes, composición y adaptación a celular.
- `public/app.js`: galería, carta, velitas y música.
- `public/birthday.js`: secuencia de respiración, soplido, humo, celebración y repetición del pastel con 19 velitas.
- `public/assets/`: imágenes WebP y fuentes locales con licencias OFL.

La imagen de Gael fue proporcionada como una imagen generada por IA, no como una fotografía real. La aclaración se muestra junto a ella. Procedencias: `ASSETS.md`.

## Comprobar y publicar

```powershell
npm run check
npm run build
npx vercel deploy --prod
```

Vercel usa `vercel.json` y publica `dist/`. GitHub está conectado al proyecto de Vercel para despliegues posteriores. `dist/` contiene únicamente los archivos públicos; los documentos de diseño y producto quedan fuera del contenido servido.

## Verificación

Probado con Chrome automatizado a 1440, 390 y 320 px: sin errores de consola ni desplazamiento horizontal; carta, descarga, navegación de galería con teclado, ciclo de 19 razones, velitas y activación/pausa de audio. Respetan `prefers-reduced-motion`. Las pruebas no sustituyen una revisión en un teléfono físico.

Messi Ronaldo es un minijuego de mascota: comidita, limpieza y cariño con guardado local en este navegador. Canasta de seis zanahorias que se repone a los 20 segundos, baño con espuma, juego y caricias. Los niveles bajan suavemente con el tiempo, sin muerte ni pérdida del personaje. Movimiento con WAAPI; pausa explícita y activación voluntaria si el dispositivo solicita movimiento reducido.

Messi Ronaldo recorre ambos lados de su espacio con saltos. El personaje, la sombra, la suciedad y el área para acariciarlo se desplazan juntos. Solo comer pausa el recorrido; el baño y el juego lo mantienen activo. La opción de pausar movimiento sigue disponible. Al cerrar se cancelan las animaciones; al redimensionar se recalculan sus límites.

En el cumpleaños, la caricatura toma aire y sopla el pastel; se apagan las 19 velitas en secuencia, aparece humo y se celebra con confeti. Hay controles para encenderlas y repetir la escena. Con movimiento reducido se conserva una versión breve y sin desplazamientos. Verificado a 1440, 390 y 320 px, incluyendo movimiento real del conejo, límites de recorrido, pausa al comer, continuidad al bañarlo, poses del personaje y apagado de las 19 llamas.
