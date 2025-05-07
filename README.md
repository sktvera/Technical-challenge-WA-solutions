📌 Proyecto: Technical-challenge-WA-solutions

📅 Fecha: 2025-05-08

✍️ Autor: Julian David Vera Godoy

🚀 Descripción del Proyecto

Este proyecto es una aplicación web desarrollada en React utilizando Styled Components, Three.js para gráficos/Estructuras en 3D y Material UI para la interfaz de usuario. Se implementa el patrón de diseño Atomic Design para garantizar la escalabilidad y modularidad del código.

🔧 Tecnologías Utilizadas
	•	React: Biblioteca principal para construir interfaces de usuario.
	•	Styled Components: Manejo de estilos de manera modular y escalable.
	•	Three.js + @react-three/fiber: Renderizado 3D interactivo.
	•	Material UI: Componentes UI modernos y personalizables.
	•	React Router: Navegación entre páginas.
	•	Atomic Design Pattern: Estructuración clara y modular de componentes.

🗂️ Estructura del Proyecto


.
├── package-lock.json       # Archivo generado automáticamente para la gestión de dependencias
├── package.json            # Archivo de configuración del proyecto con dependencias y scripts
├── public                  # Archivos estáticos accesibles desde el navegador
│   ├── favicon.ico         # Ícono de la aplicación
│   ├── index.html          # Página HTML principal
│   ├── logo192.png         # Logotipo en formato PNG (192x192)
│   ├── logo512.png         # Logotipo en formato PNG (512x512)
│   ├── manifest.json       # Archivo para Progressive Web App (PWA)
│   ├── Prueba Tecnica React v2 .pdf # Documento de especificación técnica
│   └── robots.txt          # Archivo para controlar rastreadores web
├── README.md               # Documentación del proyecto
└── src                     # Código fuente de la aplicación
    ├── App                 # Componente raíz de la aplicación
    │   ├── App.js          # Punto de entrada principal
    │   ├── App.test.js     # Pruebas unitarias
    │   └── assets
    │       └── DatosPruebas.json # Datos de prueba para el componente
    ├── Components          # Componentes divididos según Atomic Design
    │   ├── atoms           # Componentes básicos e independientes
    │   │   ├── SpaceHeader # Componente de encabezado animado
    │   │   │   ├── assets
    │   │   │   │   └── astronaut_redux_animated.glb # Modelo 3D de astronauta
    │   │   │   └── SpaceHeader.jsx # Renderizado del astronauta flotante
    │   │   └── SpaceScene  # Escena 3D del espacio
    │   │       ├── assets
    │   │       │   └── spaceship.glb # Modelo 3D de nave espacial
    │   │       └── SpaceScene.jsx    # Componente de escena espacial
    │   ├── molecules        # Componentes intermedios (aún vacío)
    │   ├── organisms        # Componentes complejos que combinan moléculas
    │   │   └── ColumnSummary # Resumen de columnas de datos
    │   │       ├── assets
    │   │       │   └── ColumnSummaryStyles.jsx # Estilos del resumen de columnas
    │   │       └── ColumnSummary.jsx # Componente del resumen de columnas
    │   ├── pages            # Vistas principales de la aplicación
    │   │   └── Home         # Página de inicio
    │   │       ├── assets
    │   │       │   ├── AppStyles.jsx # Estilos personalizados
    │   │       │   └── image.png     # Imagen de fondo/logo
    │   │       └── Home.jsx          # Página principal de bienvenida
    │   └── templates       # Plantillas para la estructura visual
    │       └── GridTemplate # Tabla dinámica de datos
    │           ├── Assets
    │           │   ├── GridTemplate.css      # Estilo CSS de la tabla
    │           │   └── GridTemplateStyles.jsx # Estilos con Styled Components
    │           └── GridTemplate.jsx # Componente principal para visualización de datos
    ├── index.css           # Estilos globales de la aplicación
    ├── index.js            # Punto de entrada de React para el DOM
    ├── logo.svg            # Logotipo en formato SVG
    ├── reportWebVitals.js  # Métricas de rendimiento
    └── setupTests.js       # Configuración para pruebas unitarias



🧩 Patrón de Diseño: Atomic Design

La estructura del proyecto sigue el patrón Atomic Design, que facilita la creación de interfaces escalables y organizadas:
	1.	Átomos: Componentes básicos e independientes (botones, inputs).
	2.	Moléculas: Combinación de átomos para formar unidades más complejas (formularios).
	3.	Organismos: Conjuntos de moléculas que forman secciones completas (tablas, menús).
	4.	Plantillas: Estructura de página que organiza organismos.
	5.	Páginas: Composición final visible para el usuario.


# Instalar dependencias:
npm install

Ejecutar el proyecto:
npm start


HOTS POR DEFECTO http://localhost:3000


📦 Dependencias Principales
	•	react: Biblioteca para la construcción de interfaces.
	•	styled-components: Estilo en componentes de manera modular.
	•	@react-three/fiber: Integración de Three.js en React.
	•	@react-three/drei: Utilidades para mejorar la experiencia 3D.
	•	material-ui: Componentes de diseño visual moderno.


    📈 Características del Proyecto
	•	Interactividad 3D: Utiliza modelos en formato .glb para experiencias inmersivas.
	•	Interfaz Modular: Componentes diseñados para fácil mantenimiento atomic design.
	•	Grid data datble : Iterfaz modular , la cual permite administracion de datos filtrado y organizacion de los mismos .
	•	Filtros Dinámicos: Filtrado eficiente por referencia y otros criterios.
	•	Estilo Futurista: Inspiración en temas espaciales y de ciencia ficción.
	•	Resultados grid data table: consolidado de datos seleccionados por columna.



    📝 Licencia

Proyecto realizado con fines educativos como parte de un reto técnico para WA Solutions.



    Jest + React Testing Library 
Lazy Loading, Code Splitting y Memoization.