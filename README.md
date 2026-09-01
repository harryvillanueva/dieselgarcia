# Diesel Garcia Showcase

Rol: Actúa como un diseñador UI/UX experto y un desarrollador frontend Senior.

Objetivo del proyecto: Generar el código frontend completo (solo la parte visual y de interfaz, sin backend ni base de datos funcional) para una tienda virtual moderna, dinámica y altamente atractiva llamada dieselgarcia.com. Todas las interacciones de compra (añadir al carrito, checkout, enviar formulario) deben ser simuladas visualmente en la interfaz mediante estados o alertas, pero sin procesar datos reales.

Paleta de Colores y Branding:

Nombre de la marca: dieselgarcia.com (debe aparecer en el header/logo de forma estilizada).

Color Principal: Azul (recomiendo un tono azul vibrante o azul marino profundo que transmita confianza y modernidad).

Color de Acento/Llamada a la acción (CTA): Amarillo (un amarillo brillante o neón que contraste fuertemente con el azul para los botones de "Comprar", "Añadir al carrito" y etiquetas de "Oferta").

Colores neutros: Blanco, gris claro y gris oscuro para fondos secundarios y textos, asegurando una excelente legibilidad.

Requisitos de Diseño y Experiencia de Usuario (UX):

Estilo Visual: Muy moderno, limpio y profesional. Uso de tarjetas (cards) con bordes redondeados y sombras suaves (soft shadows).

Efectos y Animaciones: Añade micro-interacciones. Los botones deben tener efectos hover suaves (cambio de color o escala). Las imágenes de los productos deben hacer un ligero zoom al pasar el ratón. Incorpora transiciones de entrada (fade-in) cuando el usuario hace scroll hacia abajo.

Responsividad: Diseño 100% Mobile-First. Debe verse perfecto en teléfonos, tablets y monitores grandes.

Navegación: Un menú superior adhesivo (sticky header) con el logotipo a la izquierda, los enlaces de navegación en el centro, y los iconos de carrito y usuario a la derecha. En móvil, usa un menú de hamburguesa.

Páginas a generar (Estructura de Vistas):

Index (Página de Inicio): > * Un Hero Section (banner principal) grande y llamativo con una imagen de fondo o gráfico moderno, un título principal impactante, un subtítulo y un botón amarillo grande que diga "Explorar Tienda".

Una sección de "Productos Destacados" (carrusel o cuadrícula de 4 productos).

Una sección de "Categorías".

Un Footer completo (enlaces útiles, redes sociales, newsletter).

Página de Tienda (Shop):

Una barra lateral (sidebar) a la izquierda con filtros visuales (por categoría, precio, tamaño/color) usando checkboxes y sliders simulados.

Una cuadrícula (grid) a la derecha con múltiples tarjetas de productos. Cada tarjeta debe mostrar la foto, nombre, precio y botón de "Añadir".

Detalle del Producto:

Layout de dos columnas (en escritorio). A la izquierda, una galería de imágenes grande con miniaturas debajo.

A la derecha, título grande del producto, precio destacado, descripción, selector de cantidad, y un botón amarillo muy visible de "Añadir al Carrito".

Carrito de Compras (Cart):

Una tabla o lista limpia mostrando los productos añadidos (foto miniatura, nombre, cantidad modificable, precio unitario y subtotal).

Un panel lateral o inferior con el "Resumen del Pedido" (Subtotal, Envío simulado, Total) y un botón para "Proceder al Pago".

Checkout (Página de Pago):

Formulario visual dividido en secciones o pasos: "Datos de Envío" y "Método de Pago".

Campos de formulario estilizados y modernos (nombre, dirección, tarjeta simulada).

Botón final de "Confirmar Pedido".

Contacto:

Un formulario de contacto limpio (Nombre, Email, Mensaje).

Una sección visual con información de la tienda (Email ficticio, teléfono, horario) y un mapa simulado o icono de ubicación.

Términos Legales:

Una página con un diseño limpio y centrado en la tipografía para leer fácilmente las "Políticas de Privacidad", "Términos de Servicio" y "Políticas de Devolución".

Instrucción técnica final: Genera el código priorizando una estructura semántica, clases CSS bien nombradas y un código limpio que sea fácil de leer y modificar posteriormente.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f5c70816-d8dc-4d60-9d1c-409a7b3ef71c).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
