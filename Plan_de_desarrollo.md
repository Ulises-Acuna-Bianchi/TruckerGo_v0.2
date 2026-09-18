# TruckerGO — Plan de desarrollo

Fecha: 15 de septiembre de 2026.

Estado: diseño avanzado; desarrollo por iniciar. Este archivo registra el plan acordado, no acredita que las tareas ya estén implementadas. Marcar las casillas al completar y comprobar cada tarea.

## 1. Objetivo y alcance

Construir una landing multipágina responsive con interacciones que permitan explorar la propuesta de TruckerGO. El proyecto también debe servir para aprender React y mostrar un trabajo terminado y comprensible en el portfolio.

Incluye Inicio/Inversores, Dadores, Transportistas, cuatro detalles de cargas, recorrido y Contacto. Los filtros, galerías y pasos del formulario deben funcionar con datos de ejemplo.

Publicar o tomar cargas será una demostración mientras no se acuerde un servicio real. No implementar por anticipado cuentas, pagos, asignación de viajes ni un marketplace operativo. El envío real de consultas se define y conecta explícitamente; no mostrar un envío exitoso si sólo se simuló.

## 2. Stack confirmado

| Herramienta | Función |
| --- | --- |
| React | Componentes visuales e interacciones. |
| TypeScript | Tipos de cargas, formularios y propiedades de componentes. |
| Vite | Servidor local y preparación de archivos para publicar. |
| React Router | Navegación y direcciones de cada página. |
| CSS Modules + variables CSS | Estilos por componente y valores visuales compartidos. |
| Zed | Editor local. |
| Git + GitHub | Historial de cambios y repositorio remoto. |
| Pencil + MCP | Consulta del diseño aprobado durante la implementación. |

Usar TypeScript con tipos claros y sencillos. Agregar dependencias sólo cuando resuelvan una necesidad concreta. El alojamiento se decidirá antes de publicar; GCP es una opción de interés para el objetivo cloud del proyecto.

## 3. Referencia de diseño

- Fuente principal: el `.pen` actual y aprobado, junto con sus recursos originales. No reconstruir la web únicamente desde capturas reducidas.
- Revisar una sola vez si se aplicaron las últimas correcciones: continuidad de contacto en Dadores, contraste, menú abierto, desktop de 1360 px, aclaración del recorrido mobile y orden del lienzo. No repetir toda la auditoría.
- Referencias responsive: mobile 390 px, tablet 768 px y desktop 1360 px. Comprobar también anchos intermedios y móviles más estrechos.
- Una sola interfaz adaptable; no crear tres aplicaciones separadas.
- Mantener las métricas y su contenido aprobado. Registrar cualquier problema encontrado sin cambiarlas automáticamente.
- Paleta: naranja `#FF6B1A`, oscuro `#17212B`, fondo `#EEF4F6`, secundario `#3E6478`; texto naranja sobre superficies claras `#B94300`.
- Tipografía Manrope. Reservas de fotos y videos violetas `#8B5CF6`; mapa verde `#22C55E` mientras falte el recurso real.
- Cuatro cargas de ejemplo. Tarjetas en dos columnas mobile/tablet y cuatro desktop, según el diseño vigente; verificar legibilidad sin achicar indiscriminadamente los textos.
- Tarjeta resumida: ruta, nombre de carga, pago por viaje completo y ambas distancias. Acción: “Ver detalles”. Información completa en el detalle; acción principal: “Tomar carga”.

## 4. Etapas de ejecución

### Etapa 1 — Preparar el entorno

- [ ] Abrir la carpeta del proyecto en Zed y comprobar si ya existe un repositorio Git.
- [ ] Verificar Node.js y npm compatibles con las versiones elegidas de las herramientas.
- [ ] Crear el frontend React + TypeScript con Vite sin sobrescribir el diseño ni archivos existentes.
- [ ] Instalar React Router y preparar CSS Modules y variables visuales.
- [ ] Preparar `.gitignore`: excluir dependencias, compilados, secretos y archivos temporales; conservar el lockfile.
- [ ] Crear o conectar el repositorio privado en GitHub.
- [ ] Configurar revisión de tipos, lint y build; documentar los comandos reales en un README breve.
- [ ] Ejecutar el proyecto localmente y guardar el primer commit.

Resultado: aplicación visible en el navegador y proyecto versionado.

### Etapa 2 — Base visual, navegación y hero

- [ ] Implementar colores, fuente, espaciados y contenedores compartidos.
- [ ] Construir botones, campos y elementos reutilizables necesarios.
- [ ] Implementar encabezado, menú abierto/cerrado y footer.
- [ ] Configurar las rutas y una pantalla de página no encontrada.
- [ ] Construir el hero de Inicio con el contenido disponible.
- [ ] Revisar mobile, tablet y desktop; ajustar encuadres y contraste.
- [ ] Incorporar las transiciones sencillas de menú, botones y hero.

Resultado: primera parte completa que Ulises puede recorrer, leer en código y modificar.

### Etapa 3 — Inicio / Inversores

- [ ] Completar las secciones en el orden del diseño aprobado.
- [ ] Mantener el bloque de problema/propuesta, sus elementos unidos y numerados y sus espacios de video.
- [ ] Incorporar las métricas sin alterar sus valores ni textos.
- [ ] Crear el componente de tarjeta y usarlo en “Vista de plataforma”.
- [ ] Conectar los accesos a Dadores, Transportistas y Contacto.
- [ ] Completar el contenido multimedia disponible y revisar la página entera.

Resultado: página principal completa y responsive.

### Etapa 4 — Transportistas

- [ ] Centralizar las cuatro cargas ficticias en un único archivo de datos tipados.
- [ ] Implementar filtros y ordenamiento sobre esos datos con criterios explícitos y coherentes.
- [ ] Diferenciar resultados y ausencia de resultados.
- [ ] Crear una página de detalle reutilizable que reciba el identificador de la carga desde la URL.
- [ ] Implementar galería, datos operativos, pago, plazos y ambas distancias.
- [ ] Implementar recorrido y selección de tramo según el alcance aprobado. No presentar distancias ficticias como cálculos reales de GPS.
- [ ] Resolver visualmente “Tomar carga” como demostración, sin asignar viajes reales.
- [ ] Verificar enlace directo, carga inexistente, regreso al listado y conservación de filtros.

Resultado: listado → detalle → recorrido coherentes para las cuatro cargas.

### Etapa 5 — Dadores

- [ ] Implementar datos básicos, detalles y revisión como pasos de un mismo formulario.
- [ ] Conservar valores al avanzar, volver y editar desde el resumen.
- [ ] Validar campos obligatorios con mensajes junto al campo correspondiente.
- [ ] Usar los datos ingresados para generar la revisión, sin valores ficticios que aparezcan de repente.
- [ ] Implementar previsualización de fotos si forma parte del diseño; distinguirla de una subida real.
- [ ] Mantener la publicación como demostración identificada mientras no exista backend acordado.
- [ ] Agregar una transición breve entre pasos sin afectar foco ni lectura.

Resultado: formulario demostrativo completo, coherente y navegable.

### Etapa 6 — Contacto

- [ ] Construir el formulario según el diseño aprobado.
- [ ] Conectar “Solicitar una demo” con el motivo y perfil apropiados cuando se conozcan.
- [ ] Validar datos y conservarlos ante un error.
- [ ] Incorporar video de fondo, portada y posibilidad de pausarlo.
- [ ] Definir destinatario y servicio/backend para recibir consultas reales.
- [ ] Conectar el envío y verificar recepción antes de habilitar un mensaje de éxito real.

Resultado: contacto usable; si falta el servicio, registrar ese único pendiente claramente.

### Etapa 7 — Revisión final y publicación

- [ ] Completar o acordar qué recursos pendientes se mostrarán en la versión pública.
- [ ] Revisar enlaces, formularios, teclado, foco, etiquetas, contraste y responsive.
- [ ] Probar filtros y conservación de datos mediante pruebas automáticas enfocadas en esos comportamientos.
- [ ] Ejecutar revisión de tipos, lint y build sin errores.
- [ ] Revisar imágenes, videos y rendimiento con contenido real.
- [ ] Definir antes de publicar la generación de HTML de las páginas públicas, metadatos y vistas previas al compartir. Vite con una SPA básica no resuelve por sí solo el prerenderizado.
- [ ] Configurar alojamiento, HTTPS y acceso directo a las rutas de React Router.
- [ ] Publicar una versión de revisión y recoger la devolución del cliente.
- [ ] Aplicar ajustes acordados y publicar la versión aprobada.
- [ ] Documentar brevemente cómo ejecutar, compilar y desplegar el proyecto.

Resultado: landing publicada y mantenible, con su alcance real explicado.

## 5. Contenido real y animaciones

Incorporar el material real al construir cada sección, antes de darla por terminada siempre que esté disponible. Los textos y encuadres influyen en la distribución.

| Material | Momento |
| --- | --- |
| Logo, fuente y textos aprobados | Base del proyecto. |
| Foto/video del hero | Etapa 2. |
| Videos de problema y propuesta | Etapa 3. |
| Fotos de cargas y galería | Etapas 3 y 4. |
| Video de Contacto | Etapa 6. |

Trabajar con archivos originales y preparar versiones optimizadas. Si un recurso falta, usar la reserva correspondiente y anotarlo; revisar de nuevo esa sección al reemplazarla. No hace falta volver a Pencil para cargar cada recurso.

En videos, preparar portada, reproducción adecuada al contexto, pausa y subtítulos si contienen voz informativa. El contenido esencial debe poder entenderse sin depender del video de fondo.

Las animaciones sencillas se harán con CSS. Definir antes de implementar cualquier efecto que cambie la estructura, como una sección fija durante el scroll. Agregar movimiento al cerrar cada sección y respetar la preferencia de movimiento reducido. Una biblioteca adicional sólo se evalúa si CSS no alcanza para el efecto acordado.

## 6. Organización sugerida del código

| Ubicación | Contenido |
| --- | --- |
| `src/components/` | Botones, encabezado, footer, tarjetas, galería y campos compartidos. |
| `src/pages/` | Inicio, Dadores, Transportistas, detalle, recorrido y Contacto. |
| `src/data/` | Las cuatro cargas de ejemplo. |
| `src/types/` | Tipos compartidos cuando sea necesario. |
| `src/styles/` | Variables y estilos globales. |
| Junto a cada componente | Su archivo `.module.css`. |
| `public/` o `src/assets/` | Recursos web según cómo se utilicen. |

Adaptar esta estructura al proyecto existente. No crear carpetas vacías ni capas de abstracción sin uso.

## 7. Forma de trabajar con Codex

1. Elegir una porción concreta del plan.
2. Consultar los frames pertinentes en Pencil.
3. Implementar diseño, interacción y adaptación responsive de esa porción.
4. Verificarla en el navegador y corregir los problemas encontrados.
5. Explicar brevemente qué archivos cambiaron y cómo funcionan.
6. Guardar un commit coherente y actualizar las casillas de este plan.

Evitar pedir todo el sitio en una sola tarea. No repetir auditorías completas después de cada cambio. No generar respaldos automáticos del `.pen`: Ulises los hace manualmente. Usar Git para el historial del código y mantener la documentación breve.

## 8. Próxima tarea

Preparar el proyecto local y construir encabezado, menú y hero de Inicio. Revisar esa primera entrega antes de ampliar el mismo patrón al resto de la web.

No se fijan fechas ni horas estimadas: avanzar por entregables verificables y disponibilidad del contenido.
