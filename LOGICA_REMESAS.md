# Lógica de Cálculo de Remesas

## Fecha de creación
28 de octubre de 2025

## Descripción General
Este documento describe la lógica completa para el cálculo y distribución de cuadrantes remesables según su fecha de facturación, forma de pago y vencimiento.

---

## 1. Conceptos Fundamentales

### 1.1. Fecha de Facturación
**Regla base:** Todos los cuadrantes se consideran facturados el **último día real del mes** correspondiente al nombre del cuadrante.

**Ejemplos:**
- Cuadrante `2025-9-295` → Facturado el **30 de septiembre de 2025**
- Cuadrante `2025-2-123` → Facturado el **28 de febrero de 2025** (año no bisiesto)
- Cuadrante `2024-2-456` → Facturado el **29 de febrero de 2024** (año bisiesto)
- Cuadrante `2025-10-789` → Facturado el **31 de octubre de 2025**

### 1.2. Formas de Pago
El sistema soporta 4 formas de pago para recibo domiciliado:

| Código | Descripción | Días adicionales |
|--------|-------------|------------------|
| **RE** | Recibo inmediato | 0 días |
| **R1** | Recibo a 30 días | 30 días |
| **R2** | Recibo a 60 días | 60 días |
| **R3** | Recibo a 90 días | 90 días |

### 1.3. Día de Pago
Es el **día del mes** en que se envía la remesa al banco. Los días de pago disponibles son:
- 5, 10, 15, 17, 20, 25, 28, 30

Cada cliente tiene configurado su día de pago específico.

### 1.4. Regla de Vencimiento
**REGLA CRÍTICA:** **NO se puede cobrar/remesar ANTES de la fecha de vencimiento.**

Esta regla es fundamental para el cálculo correcto del mes de remesa.

---

## 2. Cálculo del Mes de Remesa

### 2.1. Proceso de Cálculo

#### Paso 1: Obtener el mes del cuadrante
```javascript
const nombreCuadrante = cuadrante.nombre; // Ejemplo: "2025-9-295"
const partesNombre = nombreCuadrante.split('-');
const mesCuadrante = parseInt(partesNombre[1], 10); // 9 (septiembre)
```

#### Paso 2: Calcular el vencimiento teórico
```javascript
Fecha facturación: 30 de septiembre
+ Días de la forma de pago (0, 30, 60 o 90)
= Fecha de vencimiento
```

#### Paso 3: Determinar el mes de remesa
Dado que:
- Facturamos el último día del mes (típicamente día 28, 29, 30 o 31)
- Los días de pago son anteriores en el mes (5, 10, 15, 17, 20, 25, 28, 30)
- **NO podemos cobrar antes del vencimiento**

Por tanto, debemos ir al **mes siguiente** después del mes de vencimiento.

### 2.2. Fórmula por Forma de Pago

```javascript
switch (formaPago) {
    case 'RE': 
        mesRemesaCalculado = mesCuadrante + 1;
        break;
    case 'R1': 
        mesRemesaCalculado = mesCuadrante + 2;
        break;
    case 'R2': 
        mesRemesaCalculado = mesCuadrante + 3;
        break;
    case 'R3': 
        mesRemesaCalculado = mesCuadrante + 4;
        break;
}
```

---

## 3. Ejemplos Detallados

### 3.1. Forma de Pago RE (0 días)

**Cuadrante:** `2025-9-295`
- **Mes cuadrante:** 9 (septiembre)
- **Fecha facturación:** 30 de septiembre
- **Vencimiento:** 30 sept + 0 días = **30 de septiembre**
- **Día de pago cliente:** 5
- **Análisis:** Si intentamos cobrar el 5 de septiembre, estaríamos cobrando ANTES del vencimiento (30 sept)
- **Mes de remesa:** 9 + 1 = **10 (octubre)**
- **Fecha de cobro:** **5 de octubre** ✅ (posterior al vencimiento)

### 3.2. Forma de Pago R1 (30 días)

**Cuadrante:** `2025-9-295`
- **Mes cuadrante:** 9 (septiembre)
- **Fecha facturación:** 30 de septiembre
- **Vencimiento:** 30 sept + 30 días = **30 de octubre**
- **Día de pago cliente:** 5
- **Análisis:** Si intentamos cobrar el 5 de octubre, estaríamos cobrando ANTES del vencimiento (30 oct)
- **Mes de remesa:** 9 + 2 = **11 (noviembre)**
- **Fecha de cobro:** **5 de noviembre** ✅ (posterior al vencimiento)

### 3.3. Forma de Pago R2 (60 días)

**Cuadrante:** `2025-9-295`
- **Mes cuadrante:** 9 (septiembre)
- **Fecha facturación:** 30 de septiembre
- **Vencimiento:** 30 sept + 60 días ≈ **29 de noviembre**
- **Día de pago cliente:** 5
- **Análisis:** Si intentamos cobrar el 5 de noviembre, estaríamos cobrando ANTES del vencimiento (~29 nov)
- **Mes de remesa:** 9 + 3 = **12 (diciembre)**
- **Fecha de cobro:** **5 de diciembre** ✅ (posterior al vencimiento)

### 3.4. Forma de Pago R3 (90 días)

**Cuadrante:** `2025-9-295`
- **Mes cuadrante:** 9 (septiembre)
- **Fecha facturación:** 30 de septiembre
- **Vencimiento:** 30 sept + 90 días ≈ **29 de diciembre**
- **Día de pago cliente:** 5
- **Análisis:** Si intentamos cobrar el 5 de diciembre, estaríamos cobrando ANTES del vencimiento (~29 dic)
- **Mes de remesa:** 9 + 4 = **13** → **1 (enero del año siguiente)**
- **Fecha de cobro:** **5 de enero 2026** ✅ (posterior al vencimiento)

---

## 4. Tabla Resumen de Conversión

| Forma Pago | Días | Mes Cuadrante | + Incremento | = Mes Remesa | Ejemplo (Sept → ?) |
|------------|------|---------------|--------------|--------------|-------------------|
| **RE** | 0 | n | +1 | n+1 | Sept → **Oct** |
| **R1** | 30 | n | +2 | n+2 | Sept → **Nov** |
| **R2** | 60 | n | +3 | n+3 | Sept → **Dic** |
| **R3** | 90 | n | +4 | n+4 | Sept → **Ene (año+1)** |

---

## 5. Casos Especiales

### 5.1. Cambio de Año

Cuando el mes calculado supera 12, debemos ajustar al año siguiente:

**Ejemplo:**
- Cuadrante `2025-11-295` (noviembre) con R2
- Mes calculado: 11 + 3 = 14
- Mes real: 14 - 12 = **2 (febrero 2026)**

**Ejemplo:**
- Cuadrante `2025-12-295` (diciembre) con RE
- Mes calculado: 12 + 1 = 13
- Mes real: 13 - 12 = **1 (enero 2026)**

### 5.2. Clientes sin Día de Pago Configurado

Si un cliente no tiene día de pago configurado, el cuadrante no debe aparecer en las opciones remesables.

### 5.3. Cuadrantes sin IBAN

Los cuadrantes sin IBAN configurado aparecen en la lista pero están deshabilitados (no se pueden seleccionar para remesar).

---

## 6. Flujo en el Sistema

### 6.1. Obtención de Cuadrantes Remesables

**Función:** `obtenerCuadrantesRemesablesAccion(objeto, mes)`

**Parámetros:**
- `objeto`: "cuadrantes" (nombre de la colección)
- `mes`: Mes para el que queremos obtener las remesas (número 1-12)

**Proceso:**

1. **Obtener todos los cuadrantes facturados** desde la base de datos
2. **Primera criba:** Filtrar solo formas de pago RE, R1, R2, R3
3. **Segunda criba:** Calcular el mes de remesa según la lógica descrita
4. **Incluir en resultado:** Solo los cuadrantes cuyo `mesRemesaCalculado === mes` (parámetro)

### 6.2. Ejemplo de Filtrado

**Contexto:** Estamos en la interfaz gestionando remesas de **OCTUBRE (mes 10)**

**Cuadrantes disponibles en BD:**
```
1. 2025-9-295 (Sept) - RE - diaPago: 5  → mesCalculado: 10 ✅ INCLUIR
2. 2025-9-296 (Sept) - R1 - diaPago: 10 → mesCalculado: 11 ❌ EXCLUIR
3. 2025-8-297 (Ago)  - R1 - diaPago: 5  → mesCalculado: 10 ✅ INCLUIR
4. 2025-7-298 (Jul)  - R2 - diaPago: 15 → mesCalculado: 10 ✅ INCLUIR
5. 2025-10-299 (Oct) - RE - diaPago: 20 → mesCalculado: 11 ❌ EXCLUIR
```

**Resultado:** Se mostrarían los cuadrantes 1, 3 y 4 para remesar en octubre.

---

## 7. Consideraciones de Implementación

### 7.1. Archivo: `cuadrantesRemesasDucks.js`

**Ubicación:** `src/redux/cuadrantesRemesasDucks.js`

**Función clave:** `obtenerCuadrantesRemesablesAccion`

```javascript
const cuadrantesRemesables = cuadrantesProcesados.filter(cuadrante => {
    const formaPago = cuadrante.total?.formaPago;
    
    // Primera criba: forma de pago
    if (!['RE', 'R1', 'R2', 'R3'].includes(formaPago)) {
        return false;
    }
    
    const mesCuadrante = parseInt(partesNombre[1], 10);
    const mesActual = mes; // Mes que estamos gestionando
    
    // Calcular mes de remesa
    let mesRemesaCalculado = mesCuadrante;
    
    switch (formaPago) {
        case 'RE': mesRemesaCalculado = mesCuadrante + 1; break;
        case 'R1': mesRemesaCalculado = mesCuadrante + 2; break;
        case 'R2': mesRemesaCalculado = mesCuadrante + 3; break;
        case 'R3': mesRemesaCalculado = mesCuadrante + 4; break;
        default: return false;
    }
    
    // Incluir solo si coincide con el mes objetivo
    return mesRemesaCalculado === mesActual;
});
```

### 7.2. Archivo: `PendientesRemesas.jsx`

**Ubicación:** `src/cuadrantes/PendientesRemesas.jsx`

**Funcionalidad adicional:** Control de deshabilitación temporal de remesas vencidas

```javascript
const HABILITAR_DESACTIVACION_REMESAS_VENCIDAS = false;
```

**Propósito:** Permite activar/desactivar temporalmente la validación de fechas en el selector de remesas sin perder el código.

---

## 8. Validaciones Adicionales

### 8.1. Estado del Cuadrante

Para ser remesable, un cuadrante debe estar:
- ✅ En estado **FACTURADO** (color verde)
- ✅ O en estado **EMAIL ENVIADO** (color azul)

### 8.2. IBAN del Cliente

- Si el cuadrante tiene IBAN → Seleccionable para remesa
- Si el cuadrante NO tiene IBAN → Aparece pero deshabilitado

### 8.3. Estado de Remesa

- Si `total.remesado === "si"` → Aparece marcado en verde con ✓ y deshabilitado
- Si `total.remesado === "no"` → Seleccionable para remesar

---

## 9. Días de Vencimiento Disponibles

El sistema soporta 8 opciones de remesa (vencimientos):

| Código | Etiqueta | Banco | Día |
|--------|----------|-------|-----|
| RB05 | Vto 05 BBVA | BBVA | 5 |
| RC10 | Vto 10 La Caixa | La Caixa | 10 |
| RC15 | Vto 15 La Caixa | La Caixa | 15 |
| RB17 | Vto 17 BBVA | BBVA | 17 |
| RC20 | Vto 20 La Caixa | La Caixa | 20 |
| RC25 | Vto 25 La Caixa | La Caixa | 25 |
| RB28 | Vto 28 BBVA | BBVA | 28 |
| RC30 | Vto 30 La Caixa | La Caixa | 30 |

---

## 10. Proceso de Usuario (UX)

### Paso 1: Seleccionar remesa
Usuario selecciona del desplegable (ej: "Vto 05 BBVA")

### Paso 2: Ver cuadrantes disponibles
Se muestran solo los cuadrantes con `diaPago === 5` del mes gestionado

### Paso 3: Seleccionar cuadrantes
- Botón "Seleccionar todos" para marcar todos
- O selección individual con checkboxes

### Paso 4: Generar remesa
- Botón muestra: "Vto 05 BBVA (3)" → 3 cuadrantes seleccionados
- Al pulsar, se genera el archivo XML SEPA
- Se descarga automáticamente en carpeta de Descargas

### Paso 5: Actualización automática
- Los cuadrantes procesados se marcan como `remesado: "si"`
- Se actualiza la visualización (color verde con ✓)
- Se recargan los cuadrantes disponibles

---

## 11. Notas Técnicas

### 11.1. Gestión de Lotes
Si hay múltiples días de pago en una selección, el sistema:
1. Agrupa los cuadrantes por día de pago
2. Genera un archivo XML por cada grupo
3. Descarga todos los archivos con 2 segundos de espera entre cada uno

### 11.2. Formato del Archivo XML
- Nombre: `REMESA_[BANCO]_[FECHA].xml`
- Ejemplo: `REMESA_BBVA_20251105.xml`
- Formato: SEPA (pain.008.001.02)

### 11.3. Configuración Bancaria
La aplicación requiere configuración previa de:
- Identificador SEPA (cod6)
- IBAN de la cuenta (cod10)
- BIC del banco (cod11)

Estos datos se obtienen de `objetoConfiguracion.cuenta1` (La Caixa) o `objetoConfiguracion.cuenta2` (BBVA).

---

## 12. Historial de Cambios

### 28 de octubre de 2025
- ✅ Desactivación temporal de validación de fechas vencidas en selector
- ✅ Corrección de lógica de cálculo de mes de remesa
- ✅ Implementación de regla: "No cobrar antes del vencimiento"
- ✅ Ajuste de todas las formas de pago (RE, R1, R2, R3)
- ✅ Eliminación de validación por día actual
- ✅ Documentación completa de la lógica

---

## 13. Para Reactivar Funcionalidades Desactivadas

En el futuro, si se desea reactivar la validación de remesas vencidas en el selector:

**Archivo:** `src/cuadrantes/PendientesRemesas.jsx`

**Cambiar:**
```javascript
const HABILITAR_DESACTIVACION_REMESAS_VENCIDAS = false;
```

**Por:**
```javascript
const HABILITAR_DESACTIVACION_REMESAS_VENCIDAS = true;
```

Esto habilitará la función `esVencimientoDeshabilitado()` que deshabilita opciones de remesa según:
- Mes futuro → todas habilitadas
- Mes pasado → todas deshabilitadas  
- Mes actual → deshabilitar si el día de vencimiento ya pasó

---

## Fin del Documento









