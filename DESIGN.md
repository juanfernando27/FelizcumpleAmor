---
name: Feliz cumpleaños, amor
description: Una caja de recuerdos íntima, de vino profundo, papel cálido y notas manuscritas.
colors:
  wine: "#420f25"
  pink: "#f4b8c9"
  paper: "#fff4f2"
  blush: "#edc8cf"
  ink: "#4c2031"
  gold: "#efc896"
  rose-ink: "#98415d"
  memories: "#51132c"
  secondary-copy: "#e5bdcc"
  quiet-copy: "#d7a7b8"
  letter: "#fffdfb"
  button-hover: "#ffcfdb"
  wine-hover: "#69203c"
typography:
  display:
    fontFamily: "Bodoni Moda, Georgia, serif"
    fontSize: "clamp(3rem,6.5vw,5.7rem)"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "-.035em"
  headline:
    fontFamily: "Bodoni Moda, Georgia, serif"
    fontSize: "clamp(2.5rem,4.7vw,4.5rem)"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "-.025em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "Manrope, sans-serif"
    fontSize: ".8125rem"
    fontWeight: 400
    lineHeight: 1.7
  handwritten:
    fontFamily: "Caveat, cursive"
    fontSize: "2rem"
    fontWeight: 500
    lineHeight: 1.15
rounded:
  photo: "4px"
  dialog: "12px"
  pill: "30px"
  circle: "50%"
spacing:
  photo-inset: "10px"
  grid-gap: "24px"
  letter-inset: "40px"
  layout-gap: "100px"
  section: "110px"
  section-tablet: "85px"
  section-mobile: "68px"
components:
  button-primary:
    backgroundColor: "{colors.pink}"
    textColor: "{colors.wine}"
    rounded: "{rounded.pill}"
    padding: "14px 28px"
  button-primary-hover:
    backgroundColor: "{colors.button-hover}"
  button-wine:
    backgroundColor: "{colors.wine}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "14px 28px"
  button-wine-hover:
    backgroundColor: "{colors.wine-hover}"
  music-button:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "10px 18px"
  letter:
    backgroundColor: "{colors.letter}"
    textColor: "{colors.ink}"
    padding: "{spacing.letter-inset}"
  polaroid:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    padding: "10px 10px 0"
  photo-dialog:
    backgroundColor: "#2e0b1b"
    textColor: "{colors.paper}"
    rounded: "{rounded.dialog}"
    padding: "28px"
---

# Design System: Feliz cumpleaños, amor

## Overview

**Creative North Star: "Una caja de recuerdos"**

La identidad construida combina vino profundo, papel cálido y fotografías personales. Bodoni Moda da aire a los titulares; Manrope sostiene la lectura; Caveat convierte los pies de foto y las firmas en anotaciones cercanas. Los objetos de papel, pequeños giros y sombras suaves aportan una sensación de álbum que se puede tocar.

El diseño alterna superficies oscuras y claras sin perder su calidez. La fotografía y las palabras personales llevan el protagonismo; los controles acompañan su exploración. Esta documentación extrae el estado de `public/styles.css`, `public/index.html` y las fuentes locales; las medidas son evidencia del código, no una certificación de accesibilidad.

**Key Characteristics:**

- Material de carta y fotografía, con profundidad suave.
- Titulares editoriales y anotaciones manuscritas.
- Acciones redondeadas y lectura espaciosa.
- Adaptación explícita a móvil, teclado y movimiento reducido.

## Colors

### Primary

**Wine** sostiene las superficies oscuras y las acciones sobre fondos claros. **Pink** destaca cursivas, anotaciones, selección y acciones principales. **Rose ink** traslada ese acento a titulares sobre papel.

### Secondary

**Blush** es una superficie clara de transición. **Gold** identifica el deseo de cumpleaños y el foco de teclado; no sustituye el texto de lectura.

### Neutral

**Paper** es fondo de lectura y marco fotográfico; **letter** es la hoja interior más clara. **Ink** ofrece el texto oscuro correspondiente. **Secondary copy** y **quiet copy** acompañan fotografías y notas sobre vino. **Memories** introduce una variación tonal oscura continua con el fondo principal.

**La regla del papel.** Cada cambio de superficie lleva su pareja de texto: papel/tinta o vino/papel. No extender los rosas oscuros de titulares a texto pequeño sobre vino.

## Typography

Las familias y tamaños normativos están en el frontmatter. Los archivos WOFF2 son locales y usan `font-display: swap`. Bodoni Moda está declarado a peso 500 normal y cursiva; Caveat a 500. Las declaraciones Manrope 400, 500 y 600 apuntan a los mismos archivos locales: documentar la intención del CSS no implica que sean tres cortes tipográficos distintos.

- **Display:** titular principal, con cursiva rosa en el énfasis y balance de líneas.
- **Headline:** títulos de sección, con la misma familia y menor compresión de tracking.
- **Body:** lectura base; muchos párrafos de sección usan una variante observada de (.9375rem). Los párrafos tienen un límite de (65ch).
- **Label:** notas y ayuda. Los botones principales usan (.875rem), peso (600).
- **Handwritten:** firmas, notas y pies de foto; no sustituye la tipografía de párrafos largos. Los pies de polaroid usan (1.5rem) y el motivo variable de razones usa `clamp(2rem,4vw,3.5rem)`.

## Layout

El contenedor centrado tiene máximo de (1180px), con ancho `calc(100% - 80px)`. Las secciones mantienen una cadencia amplia; carta y futuro usan dos columnas desiguales, alineadas al centro. La galería tiene tres columnas y separaciones de (24px); la primera foto ocupa dos columnas. No existe una escala matemática global de espaciado: los valores documentados son usos repetidos o estructurales observados.

En (1000px) o menos, el contenedor pasa a `calc(100% - 48px)`, las secciones a (85px), los huecos de las composiciones a (50px), y las fotografías reducen su tamaño. Las entradas fotográficas animadas se habilitan desde (1000px).

En (700px) o menos, el contenedor deja márgenes de (20px), las secciones usan (68px), la carta y el futuro pasan a una columna y la navegación ocupa una segunda fila. La galería conserva dos columnas; las fotos primera, quinta y última ocupan ambas. La última foto se muestra completa con `object-fit: contain`. La hoja usa relleno de (28px 24px). El collage móvil reserva finalmente (395px), con su nota a (328px) del borde superior; esas reglas al final del CSS prevalecen sobre los tamaños anteriores. En (360px) o menos, el collage reserva (375px) y su nota queda a (310px). Mantener el orden de cascada al ajustar esta composición.

## Elevation & Depth

Las superficies de sección son planas; la profundidad pertenece a objetos físicos: fotos, sobre, sello y hoja. La sombra fotográfica es `--shadow-photo`; el sidecar recoge sus valores exactos y los de los demás objetos. Los giros de las fotos mantienen su posición espacial al entrar: no convertir cada párrafo o sección en una tarjeta elevada.

La animación de entrada fotográfica dura (.9s) con `--ease-out`; los controles cambian fondo en (.2s), y el sobre se eleva al hover en (.25s). Hover se limita a dispositivos con puntero fino y capacidad de hover. `prefers-reduced-motion: reduce` elimina animaciones y transiciones, desactiva scroll suave y oculta confeti.

## Shapes

Las acciones usan cápsulas; los controles del visor y el sello son círculos. Las fotos de galería tienen esquinas discretas; los marcos de papel y la hoja mantienen bordes rectos. El diálogo emplea el radio general. El sobre se construye con triángulos recortados, no con un icono ampliado. Las fotos del collage rotan aproximadamente entre (-10deg) y (11deg), con ajustes móviles a (-12deg) y (12deg).

## Components

### Buttons

Acciones tranquilas, con texto legible y foco visible. La acción rosa tiene una altura mínima de (52px); la versión vino invierte los colores para fondos claros. Al pulsar, los botones escalan a (.98). La acción musical es una cápsula transparente con borde tenue y estado `aria-pressed`; sus barras animadas solo se activan al reproducir. El botón de texto usa subrayado, relleno vertical de (8px) y mínimo de (44px).

### Navigation

Enlaces simples de Manrope, sin panel flotante. El hover subraya con separación de (6px). La marca usa Caveat y un corazón lineal. En móvil, los enlaces permanecen visibles en segunda fila.

### Cards / Containers

La polaroid combina marco claro, pie manuscrito y sombra fotográfica. La galería prescinde de una caja alrededor del conjunto foto/texto; al hover solo aumenta el brillo de la imagen. La hoja es un rectángulo claro con sombra tenue y prosa oscura.

### Envelope

El sobre es un botón completo: solapas triangulares, dirección manuscrita y sello circular. Expone `aria-expanded` y `aria-controls`; al abrir, la hoja recibe el foco mediante su destino programático. Conservar la pista textual de apertura y el control para cerrar.

### Photo viewer

Diálogo nativo oscuro, imagen contenida, controles circulares de (46px), pies manuscritos y ayuda de teclado. Mantener cierre con Escape, flechas anterior/siguiente, nombres accesibles y el texto alternativo de la fotografía. El ancho y alto se limitan al viewport, con unidades `dvh` para altura móvil.

### Accessible interaction

El foco global usa un contorno dorado de (3px) separado (6px). En las secciones claras de carta, razones y futuro, el foco usa vino para conservar contraste. Un enlace de salto aparece al enfocar. Los cambios de razones y deseo usan regiones de estado; el contenido decorativo queda oculto a tecnologías de asistencia. Las imágenes tienen texto alternativo y el origen de la imagen imaginada de Gael se explica en su pie visible. No hay campos ni chips en la implementación actual; no se prescriben estilos inventados para ellos.

## Do's and Don'ts

### Do:

- **Do** conservar las parejas de superficie y texto del sistema.
- **Do** reservar Caveat para anotaciones, firmas y frases breves.
- **Do** verificar el collage y la navegación en los tres cambios de ancho documentados.
- **Do** conservar foco visible, etiquetas de control y alternativas de movimiento reducido.
- **Do** mantener visible la aclaración de imagen generada junto al retrato imaginado.

### Don't:

- **Don't** convertir la galería en tarjetas con fondo y borde repetidos.
- **Don't** aplicar hover persistente a interacciones táctiles.
- **Don't** añadir animación a todo el contenido ni retirar las reglas de movimiento reducido.
- **Don't** confundir los colores auxiliares derivados del sidecar con nuevos colores aprobados del producto.

La sorpresa final conserva vino, rosa y oro. Caja de regalo CSS, botones de respuesta y diálogo con conejito geométrico CSS, luna y estrellas. Entrada de 2.2 s, salto de 2 s y parpadeo de 4.5 s. Movimiento reducido elimina animación; el usuario puede pausarla o cerrar la escena. Música con HTMLAudioElement y dos pistas locales en ciclo.
