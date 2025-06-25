# IA Fullstack

Este proyecto es una solución fullstack que integra un frontend en Angular y un backend en NestJS para construir aplicaciones de inteligencia artificial conversacional y de procesamiento de texto.

## Estructura del Proyecto

```
IA_fullstack/
├── seccion1/
│   └── angularGpt/         # Frontend Angular
└── seccion3/
    └── backend/            # Backend NestJS
```

---

## Frontend: AngularGpt
Ubicación: `seccion1/angularGpt/`

### Descripción
Aplicación Angular que sirve como interfaz de usuario para interactuar con los servicios de IA. Incluye componentes para chat, generación de imágenes, ortografía, traducción, y más.

### Módulos principales
- **core/use-cases/**: Lógica de negocio y casos de uso (ej: ortografía).
- **interfaces/**: Definición de interfaces y tipos de datos.
- **presentation/components/**: Componentes visuales reutilizables (burbujas de chat, loaders, cajas de texto, etc).
- **presentation/pages/**: Páginas principales de la app (asistente, ortografía, imagen, audio, etc).
- **presentation/services/**: Servicios para comunicación con APIs externas (ej: OpenAI).

### Cómo correr el frontend
1. Instala dependencias:
   ```bash
   cd seccion1/angularGpt
   npm install
   ```
2. Inicia el servidor de desarrollo:
   ```bash
   ng serve
   ```
3. Abre tu navegador en [http://localhost:4200](http://localhost:4200)

---

## Backend: NestJS
Ubicación: `seccion3/backend/`

### Descripción
API construida con NestJS que expone endpoints para procesamiento de texto, ortografía, integración con modelos GPT, etc.

### Módulos principales
- **gpt/controller, service, module**: Lógica principal para interacción con modelos GPT.
- **gpt/DTOs/**: Definición de objetos de transferencia de datos.
- **gpt/use-cases/**: Casos de uso específicos (ej: ortografía).

### Cómo correr el backend
1. Instala dependencias:
   ```bash
   cd seccion3/backend
   npm install
   # o yarn install
   ```
2. Inicia el servidor de desarrollo:
   ```bash
   npm run start:dev
   # o yarn start:dev
   ```
3. El backend estará disponible en [http://localhost:3000](http://localhost:3000)

---

## Pruebas
- **Frontend:**
  - Unitarias: `ng test`
  - E2E: `ng e2e`
- **Backend:**
  - Unitarias: `npm run test` o `yarn test`
  - Cobertura: `npm run test:cov` o `yarn test:cov`

---

## Notas
- Asegúrate de tener Node.js y Angular CLI instalados globalmente.
- El frontend y backend pueden ejecutarse de forma independiente.
- Configura las variables de entorno necesarias para la conexión con servicios externos (ej: OpenAI).

---

## Autores y Recursos
- Basado en Angular y NestJS.
- Documentación oficial: [Angular](https://angular.dev/), [NestJS](https://docs.nestjs.com/)
