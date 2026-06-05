# CLAUDE.md — quadrants-fortise

Guía operativa de la base de código para futuras sesiones de Claude Code.
Documento generado a partir de la inspección del código fuente.

---

## 1. Descripción del proyecto

Aplicación web interna de **Fortise S.L.** para la gestión de cuadrantes horarios
de trabajadores en servicios de limpieza, con flujos completos de:

- Gestión de **centros** (clientes) y de su configuración facturable.
- Gestión de **trabajadores** y su estado laboral.
- Elaboración de **cuadrantes mensuales** por centro (turnos, festivos,
  servicios fijos, sustituciones).
- Cierre de **facturación** (PDF + envío por mail) a partir del cuadrante.
- Generación de **remesas SEPA** (XML pain.008.001.02) para BBVA y La Caixa.
- **Control horario** de horas trabajadas por empleado y reporting.

Se publica en producción en `https://gestion.fortisesl.com` (ver `homepage` en
`package.json`).

El backend es una API PHP separada (no incluida en este repo) que se consume vía
Axios contra `RUTA_API` definido en [src/constantes.js](src/constantes.js#L1-L8):

- Dev: `http://localhost/api_quadrants/`
- Prod: `<protocolo>://<host>/api/`

---

## 2. Stack y convenciones

### Stack

- **React 17** + **Redux 4** (no Redux Toolkit; se usa el patrón "ducks").
- **redux-thunk** para acciones asíncronas.
- **React Router v5** (`BrowserRouter` con `Switch/Route` clásico).
- **Material-UI v4** (`@material-ui/core`, `@material-ui/icons`,
  `@material-ui/lab`, `@material-ui/pickers` + `@date-io/date-fns`).
- **Axios 0.22** para HTTP (`multipart/form-data` con `FormData`).
- **CRACO** sobre `react-scripts 5` para extender Webpack 5 sin `eject`
  (polyfills de `stream/crypto/buffer/process/util/zlib/assert`,
  `ProvidePlugin` para `process`/`Buffer`, y `fullySpecified: false` para los
  módulos ESM de `@react-pdf/renderer`). Ver [craco.config.js](craco.config.js).
- **@react-pdf/renderer** para generar facturas y recibos PDF.
- **xlsx (SheetJS)** para exportar listados a Excel.
- **xmlbuilder2** para construir el XML SEPA de las remesas.
- **zipson** para comprimir/parsear los objetos `total` de los cuadrantes (cada
  cuadrante guarda un blob JSON comprimido en la columna `total`).
- **recharts** para los gráficos de inicio / cuadrantes / horas trabajadores.
- **react-draggable**, **react-router-hash-link**, **simple-react-lightbox**,
  **material-ui-popup-state**, **react-error-boundary**.

### Convenciones del repo

- **Idioma del código y de los comentarios:** español (mezcla puntual de
  catalán en notas y en algún identificador, p. ej. `onEstem`, `tancarSessio`,
  `anyo` por "año").
- **Patrón Ducks** estricto en `src/redux/*.js`: cada fichero exporta el
  reducer por defecto + las `*Accion` (action creators / thunks) con nombres
  como `obtener...Accion`, `actualizar...Accion`, `vaciarDatos...Accion`,
  `setea/cambioEstado...Accion`. Los `types` se definen como constantes en
  mayúsculas al inicio del fichero. **No** se usa Redux Toolkit.
- **Componentes funcionales con hooks** (`useState`, `useEffect`, `useRef`,
  `useDispatch`, `useSelector`). No hay TypeScript.
- **Estilos** centralizados en [src/clases.js](src/clases.js) (un único hook
  `Clases = makeStyles(...)` que se reusa en toda la app). Tema MUI en
  [src/temaConfig.js](src/temaConfig.js).
- **Lógica de negocio densa** extraída a `src/logica/*.js` (cálculo de
  cuadrantes, columnas, layout, informes, servicios fijos…). Estos ficheros
  contienen funciones puras y helpers, no componentes.
- **Selectores Redux** se acceden de forma directa con `useSelector(store => store.variablesX.algo)`
  — no hay capa de `createSelector`/reselect.
- **Persistencia de objetos complejos**: los `total` de cada cuadrante llegan
  del backend como string comprimido con `zipson` y se hace `parse(...)` al
  recibirlos / `stringify(..., { fullPrecisionFloats: true })` al guardarlos.
- **No hay tests escritos**: el script `test` existe pero no hay specs en `src/`.
- **No hay configuración de Prettier ni linter más allá del CRA por defecto**
  (`react-app` + `react-app/jest`).
- **Comentarios "modificador:"** en el código (p.ej.
  `// modificador: llistar treballadors de baixa a quadrants`) marcan parches
  intencionales documentados también en `src/notes.txt`.

### Convenciones de naming relevantes

- `objeto` en las llamadas a la API = nombre de la colección/tabla
  (`"cuadrantes"`, `"centros"`, `"trabajadores"`, `"configuracion"`, …).
- Nombre canónico de un cuadrante: `"AÑO-MES-IDCENTRO"` (p. ej. `"2025-9-295"`).
  De aquí se extraen `anyoCuadrante`, `mesCuadrante` y `idCentro` por split.
- Estados de cuadrante usados en UI: **PENDIENTE**, **REGISTRADO**,
  **FACTURADO** (verde), **EMAIL ENVIADO** (azul), **REMESADO** (verde con ✓).
- `calendarioAGestionar` (string `"YYYY-M"`) es la "fecha actual de trabajo"
  del usuario — la fuente de verdad de qué mes se está gestionando en
  `Cuadrantes`, `Pendientes...` y `HorasTrabajadores`.

---

## 3. Estructura de directorios

```text
quadrants-fortise/
├── CLAUDE.md                  ← este archivo (único MD que vive en la raíz)
├── README.md                  ← README original (instalación de dependencias)
├── craco.config.js            ← polyfills + ESM fix
├── package.json               ← scripts: craco start/build/test
├── public/                    ← index.html, favicon, manifest
├── documentacion/             ← todos los demás MDs viven aquí
│   ├── SEGUIMIENTO_PROYECTO.md  ← estado del desarrollo (se actualiza por intervención)
│   └── LOGICA_REMESAS.md        ← spec funcional del cálculo de remesas (2025-10-28)
├── retirat/                   ← código retirado (ahora desconectado del build)
│   ├── Nominas.jsx, Faltantes*.jsx, CasillaServiciosFijos.jsx
│   └── faltantesDucks.js, retirat.js
└── src/
    ├── index.js                ← punto de entrada React DOM
    ├── App.jsx                 ← Provider Redux + ThemeProvider
    ├── App.css
    ├── temaConfig.js           ← tema Material-UI
    ├── clases.js               ← makeStyles globales (~todas las clases CSS-in-JS)
    ├── constantes.js           ← Constantes globales (rutas API, catálogos)
    ├── notes.txt               ← Notas internas del desarrollador (catalán)
    │
    ├── app/                    ← Layout y navegación
    │   ├── Contenedor.jsx        ← Router + Navbar + Cajón + rutas
    │   ├── Navbar.jsx, Menu.jsx, Cajon.jsx
    │   └── NotFoundPage.jsx
    │
    ├── login/Login.jsx
    │
    ├── inicio/                 ← Dashboard inicial
    │   ├── Inicio.jsx
    │   └── graficos/GraficoInicio.jsx
    │
    ├── centros/                ← CRUD de centros (clientes)
    │   ├── Centros.jsx, CentrosEditar.jsx, CentrosRegistrar.jsx
    │   └── componentes/{HorarioCentros, ItemListTime, SelectsTrabajadores}.jsx
    │
    ├── trabajadores/           ← CRUD de trabajadores
    │   └── Trabajadores.jsx, TrabajadoresEditar.jsx, TrabajadoresRegistrar.jsx
    │
    ├── cuadrantes/             ← Pantalla principal: gestión de cuadrantes
    │   ├── Cuadrantes.jsx         ← entry point /cuadrantes
    │   ├── PantallaCuadrantes.jsx ← tabs Pendientes/Registrados/Facturados/Remesas
    │   ├── Pendientes.jsx
    │   ├── PendientesRegistrados.jsx
    │   ├── PendientesFacturados.jsx
    │   ├── PendientesRemesas.jsx  ← UI de generación de remesas SEPA
    │   ├── FacturaPDF.jsx, ReciboPDF.jsx ← plantillas @react-pdf/renderer
    │   ├── componentes/           ← editor visual del cuadrante (cuadrícula
    │   │   │                          de días × trabajadores, casillas,
    │   │   │                          popovers, drag&drop, servicios fijos)
    │   │   └── *.jsx (16 componentes)
    │   └── graficos/GraficoCuadrantes.jsx
    │
    ├── nominas/                ← Control horario (sin nóminas reales)
    │   ├── HorasTrabajadores.jsx, ListadoHorasTrabajadores.jsx
    │   ├── PantallaHoraTrabajador.jsx, PantallaHorasTrabajadores.jsx
    │   └── graficos/GraficoHorasTrabjadores.jsx
    │
    ├── configuracion/          ← Configuración + módulo de instrucciones de uso
    │   ├── Configuracion.jsx
    │   └── Instrucciones*.jsx (Cuadrantes, Centros, Trabajadores,
    │       ServiciosFijos, ControlHorario, Remesas, Varios)
    │
    ├── comun/                  ← Componentes y plantillas compartidas
    │   ├── DialogComponente.jsx, CustomSnack.jsx, Bajas.jsx
    │   ├── TipoServicioFijo.jsx, TipoServicioFijoPersonalizado.jsx
    │   └── InformePDF.jsx
    │
    ├── logica/                 ← Lógica de negocio pura (no UI, no Redux)
    │   ├── logicaApp.js           ← helpers UI generales (TabPanel, Alert,
    │   │                              get*Height/Width, controlActualizacionesPorFecha)
    │   ├── logicaCentros.js
    │   ├── logicaColumnasCuadrantes.js
    │   ├── logicaGestionCuadrantes.js
    │   ├── logicaInformeCuadrantes.js
    │   ├── logicaLayoutCuadrantes.js
    │   └── logicaServiciosFijos.js
    │
    └── redux/                  ← Reducers + actions (patrón ducks)
        ├── store.js               ← combineReducers + thunk
        ├── appDucks.js            ← config global, exports XLSX, lotes
        ├── usuarioDucks.js        ← login/logout, usuario activo
        ├── centrosDucks.js
        ├── trabajadoresDucks.js
        ├── cuadrantesDucks.js
        ├── cuadrantesSettersDucks.js
        ├── cuadrantesHandlersDucks.js
        ├── cuadrantesPopoversDucks.js
        ├── cuadrantesServiciosFijosDucks.js
        ├── cuadrantesFacturacionDucks.js
        ├── cuadrantesMailingDucks.js   ← envío masivo de facturas por mail
        ├── cuadrantesRemesasDucks.js   ← cálculo remesables + XML SEPA
        ├── pendientesDucks.js
        ├── graficosDucks.js
        ├── horasTrabajadoresDucks.js
        └── nominasDucks.js
```

---

## 4. Comandos habituales

Todos vía CRACO (no se usa `react-scripts` directamente).

```bash
# Desarrollo (http://localhost:3000)
npm start

# Build de producción (carpeta build/)
npm run build

# Tests (Jest watch). No hay specs definidos actualmente.
npm test
```

### Versión de Node

De [src/notes.txt](src/notes.txt):

> Para que la aplicación pueda hacer `npm run start` se usaba la versión
> **14.17.1** de Node. Alternativa documentada: **18.14.2**.

Si se usa `nvm`:

```bash
nvm ls
nvm use 14.17.1   # o 18.14.2
```

> **Verificar antes de tocar dependencias**: las versiones de MUI v4 y React 17
> conviven con polyfills de Webpack 5; cambiar Node puede afectar al build.

### No existen scripts adicionales

No hay `lint`, `format`, `typecheck`, `docker`, `deploy`, `e2e` ni hooks de
pre-commit configurados. La revisión de calidad de código es manual.

---

## 5. Notas de arquitectura clave

### 5.1 Frontend acoplado a una API PHP externa

El cliente React **no tiene capa de servicios abstraída**: cada acción Redux
construye su `FormData`, hace `axios.post(rutaApi + "endpoint.php", ...)` y
maneja la respuesta in-place. Endpoints conocidos por inspección:

- `obtener_remesables.php` ([cuadrantesRemesasDucks.js:79](src/redux/cuadrantesRemesasDucks.js#L79))
- `actualizar_lote.php` (cuadrantes batch update)
- Y los implícitos en los demás `obtener*Accion` / `actualizar*Accion`.

El backend vive en otro repo (`api_quadrants`) y no está versionado aquí.

### 5.2 El "objeto total" comprimido (zipson)

Cada cuadrante guarda un blob de datos calculados en el campo `total` del
backend, comprimido con `zipson`. Al leer: `total: parse(cuadrante.total)`.
Al escribir: `total: stringify(objeto, { fullPrecisionFloats: true })`.

Este `total` contiene, entre otros:

- `formaPago` (`'RE'|'R1'|'R2'|'R3'|...` — ver [constantes.js:241](src/constantes.js#L241))
- `diaPago` (string del día del mes)
- `iban`
- `nombreCentro`, `subNombreCentro`
- `procesado` (`{ valor: 'si'|'no', numF, numR }`)
- `remesado` (`'si'|'no'`)
- `mailEnviado` (`'si'|'no'`)
- `totalMasIva`

### 5.3 Lógica de cálculo de remesas (LOGICA_REMESAS.md)

La regla de oro está documentada en [documentacion/LOGICA_REMESAS.md](documentacion/LOGICA_REMESAS.md):

> **No se puede cobrar/remesar ANTES de la fecha de vencimiento.**

El cálculo del mes/año de remesa a partir del nombre del cuadrante y la forma
de pago vive en `obtenerCuadrantesRemesablesAccion`
([cuadrantesRemesasDucks.js:71](src/redux/cuadrantesRemesasDucks.js#L71)):

| FormaPago | Días | Mes remesa     |
|-----------|------|----------------|
| RE        | 0    | mes + 1        |
| R1        | 30   | mes + 2        |
| R2        | 60   | mes + 3        |
| R3        | 90   | mes + 4        |

Cuando el mes calculado >12, se suma 1 al año. El frontend filtra los
remesables tanto por mes **como por año** (a partir del Commit 89).

> **Flag de feature** en [PendientesRemesas.jsx:83](src/cuadrantes/PendientesRemesas.jsx#L83):
> `HABILITAR_DESACTIVACION_REMESAS_VENCIDAS = false`. Mantenerlo en `false`
> deshabilita la validación visual que oculta opciones de vencimiento ya
> pasadas. Documentado para reactivarse en el futuro.

### 5.4 IBANs "parche temporal"

[PendientesRemesas.jsx:86-243](src/cuadrantes/PendientesRemesas.jsx#L86-L243)
contiene un `arrayIbans` hardcoded con ~150 centros. Si el cuadrante no trae
`iban` en su `total`, se intenta resolver mirando este array por
`nombreCentro`. Cualquier centro nuevo sin IBAN no será remesable hasta que
se complete este array (o, idealmente, hasta que se persista el IBAN en BD).
Este es un **parche conocido** marcado como tal en el código.

### 5.5 Generación de XML SEPA

`gestionarRemesaLoteAccion` ([cuadrantesRemesasDucks.js:197](src/redux/cuadrantesRemesasDucks.js#L197))
agrupa los cuadrantes seleccionados por `diaPago` y genera **un XML por
grupo** (`pain.008.001.02`) con `xmlbuilder2`, descargándolo automáticamente
desde el navegador con un `<a download>` sintético. Espera 2 segundos entre
archivos cuando hay varios.

La configuración bancaria (`identificadorSepa`, `iban`, `bic`) se lee de
`objetoConfiguracion.cuenta1` (La Caixa) y `cuenta2` (BBVA), cargada desde
`obtenerConfiguracionAccion('configuracion', 1)`.

El nombre del archivo es `REMESA_{BBVA|La Caixa}_{YYYYMMDD}.xml`.

### 5.6 Ruteo y layout

Todo el árbol cuelga de [src/app/Contenedor.jsx](src/app/Contenedor.jsx). Las
rutas (todas dentro de `BrowserRouter`):

- `/` → `Inicio`
- `/login` → `Login`
- `/cuadrantes` → `Cuadrantes` (envuelto en `ErrorBoundary`)
- `/trabajadores` y `/trabajadores/:id/:nombre`
- `/centros` y `/centros/:id/:nombre`
- `/horasTrabajadores` → `HorasTrabajadores`
- `/configuracion` → `Configuracion`
- `*` → `NotFoundPage`

En **móvil** (breakpoint `<md`) se muestra una pantalla "Aplicación no
disponible para dispositivos móviles" — la app es **desktop-only por diseño**.

### 5.7 Reducers en `combineReducers`

`store.js` combina 18 reducers en namespaces `variables*`
(ej. `variablesCuadrantes`, `variablesCuadrantesRemesas`, `variablesApp`,
`variablesPendientes`, …). Esto significa que casi cualquier funcionalidad
nueva en el módulo de cuadrantes vive en uno de los 9 ducks
`cuadrantes*Ducks.js` ya existentes.

### 5.8 Carpeta `retirat/`

Código **retirado del build** que se conserva como referencia histórica:
módulo antiguo de **Nóminas** y de **Faltantes** (sustituido por el flujo
actual de `HorasTrabajadores` / `Pendientes*`). No está enlazado en el
router ni importado desde `src/`. Tratar como solo lectura salvo que se
decida explícitamente reactivar algo.

### 5.9 Manejo de errores y ErrorBoundary

`Contenedor` envuelve únicamente la ruta `/cuadrantes` en un `ErrorBoundary`
con `MyFallbackComponent` que, en producción, hace `window.location.reload()`
silenciosamente. En dev, loguea el error en consola. **No hay logging
estructurado ni telemetría**.

### 5.10 Notas de desarrollo internas

[src/notes.txt](src/notes.txt) contiene notas del desarrollador (en catalán)
con las **secuencias paso a paso** para añadir un nuevo tipo de servicio
extra (`TIPO_SERVICIO_FIJO`), parches en cálculo de festivos, y la advertencia
sobre **centros de baja con el mismo nombre que el de alta** — hay que añadir
un identificador para evitar duplicados en "cuadrantes pendientes".

---

## 6. Punteros rápidos

| Tarea típica | Empezar por |
| --- | --- |
| Tocar lógica de remesas (cálculo) | [src/redux/cuadrantesRemesasDucks.js](src/redux/cuadrantesRemesasDucks.js) + [documentacion/LOGICA_REMESAS.md](documentacion/LOGICA_REMESAS.md) |
| Tocar UI de remesas | [src/cuadrantes/PendientesRemesas.jsx](src/cuadrantes/PendientesRemesas.jsx) |
| Añadir un nuevo tipo de servicio fijo | Seguir el checklist de [src/notes.txt](src/notes.txt#L35-L60) |
| Tocar el cálculo del cuadrante (horas) | [src/logica/logicaGestionCuadrantes.js](src/logica/logicaGestionCuadrantes.js) y `logicaColumnasCuadrantes.js` |
| Tocar el envío masivo de facturas por mail | [src/redux/cuadrantesMailingDucks.js](src/redux/cuadrantesMailingDucks.js) |
| Cambiar tema / estilos globales | [src/temaConfig.js](src/temaConfig.js), [src/clases.js](src/clases.js) |
| Configuración bancaria / IBAN empresa | [src/configuracion/Configuracion.jsx](src/configuracion/Configuracion.jsx) |
| Añadir/cambiar catálogos (formas de pago, tipos de servicio, remesas…) | [src/constantes.js](src/constantes.js) |
| Subir un nuevo endpoint del backend | Construir `FormData` + `axios.post(rutaApi + "X.php", ...)` siguiendo el patrón del resto |

---

## 7. Cosas que NO se deben hacer sin avisar al usuario

- **Eliminar o reorganizar `retirat/`** — el usuario lo mantiene como referencia
  histórica.
- **Cambiar el flag `HABILITAR_DESACTIVACION_REMESAS_VENCIDAS`** sin pedirlo.
  Es una decisión de negocio temporal documentada en `documentacion/LOGICA_REMESAS.md`.
- **Borrar entradas de `arrayIbans`** en `PendientesRemesas.jsx` — son datos de
  producción usados como fallback.
- **Tocar `craco.config.js`** sin verificar que el build sigue produciendo el
  bundle SEPA correcto (el polyfill de `buffer` es necesario para `xmlbuilder2`).
- **Modificar `src/notes.txt`** sin acuerdo: es el cuaderno de bitácora del
  desarrollador en catalán y refleja decisiones históricas.
- **Reescribir reducers en Redux Toolkit**: el resto del proyecto es ducks
  manuales; una migración parcial rompería la consistencia.
