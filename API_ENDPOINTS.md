# API Endpoints - SENA PPS Backend

Este documento describe todos los endpoints disponibles en el backend para ser consumidos por el frontend.

## Base URL

Todos los endpoints comienzan con: `http://localhost:3000/avi`

## Módulo de Usuarios

### Listar Usuarios
- **GET** `/usuarios`
- **Descripción**: Obtiene la lista de todos los usuarios
- **Respuesta**: Array de usuarios
```json
[
  {
    "id": 2,
    "nombre": "Admin",
    "email": "admin@admin.com",
    "role": "Administrador",
    "estado": "Habilitado",
    "fecha_inscripcion": "2025-03-14T07:00:02.513Z",
    "createdAt": "2025-03-14T07:00:02.513Z"
  }
]
```

### Crear Usuario
- **POST** `/usuarios/crear`
- **Descripción**: Crea un nuevo usuario
- **Body**:
```json
{
  "nombre": "Rusia",
  "email": "rusia@rusia.com",
  "password": "rusia123456",
  "role": "Supervisor",
  "estado": "Habilitado"
}
```

### Actualizar Usuario
- **PATCH** `/usuarios/:id`
- **Descripción**: Actualiza un usuario existente
- **Parámetros**: id (número)
- **Body**:
```json
{
  "nombre": "Nuevo Nombre",
  "email": "nuevo.email@example.com",
  "role": "Director",
  "estado": "Vacaciones"
}
```

### Buscar Usuario por Email
- **GET** `/usuarios/email/:email`
- **Descripción**: Busca un usuario por su email
- **Parámetros**: email (string)

### Listar Usuarios por Rol
- **GET** `/usuarios/role/:role`
- **Descripción**: Lista todos los usuarios con un rol específico
- **Parámetros**: role (RoleEnum)

### Auditoría de Usuarios
- **GET** `/usuarios/auditar`
- **Descripción**: Obtiene el registro de auditoría de usuarios

## Módulo de Beneficios

### Listar Beneficios
- **GET** `/beneficio`
- **Descripción**: Obtiene la lista de todos los beneficios
- **Respuesta**: Array de beneficios completos

### Listar Beneficios (Paginado)
- **GET** `/beneficio?page=1&limit=10`
- **Descripción**: Obtiene una lista paginada de beneficios
- **Parámetros Query**:
  - page: número de página (default: 1)
  - limit: registros por página (default: 10)

### Listar Remisiones
- **GET** `/beneficio/remisiones`
- **Descripción**: Obtiene la lista de todas las remisiones
- **Respuesta**:
```json
[
  {
    "id_remision": "REM001"
  }
]
```

### Listar Remisiones por Empresa
- **GET** `/beneficio/empresas?id_empresa=EMPRESA1`
- **Descripción**: Lista las remisiones de una empresa específica
- **Parámetros Query**: id_empresa (string)

### Buscar Beneficio por Remisión
- **GET** `/beneficio/:id_remision`
- **Descripción**: Obtiene los detalles de un beneficio específico
- **Parámetros**: id_remision (string)

### Crear Beneficio
- **POST** `/beneficio`
- **Descripción**: Crea un nuevo registro de beneficio
- **Body**:
```json
{
  "id_remision": "REM001",
  "id_empresa": "EMP001",
  "region_procedencia": "Región",
  "granja": "Nombre Granja",
  "galpon": "ID Galpón",
  "linea_aves": "Línea",
  "sexo": "Macho/Hembra",
  "edad": 42,
  "peso_promedio_ave_granja": 2450,
  "placa_vehiculo": "ABC123",
  "id_conductor": "C001",
  "nombre_conductor": "Nombre",
  "id_plan_sanitario": "PS001",
  "tp_profesional_granja": "TP001",
  "nombre_profesional": "Nombre",
  "tp_profesional_planta": "TP002",
  "nombre_auditor": "Nombre",
  "hora_beneficio": "2025-03-14T14:30:00Z",
  "aves_por_guacal": 8,
  "guacales_vacios": 10,
  "guacales_usados": 125,
  "guacal_extra": 1,
  "aves_remisionadas": 1000,
  "aves_en_guacal_extra": 4,
  "aves_colgadas": 990,
  "aves_asfixiadas": 5,
  "aves_decomisadas": 2,
  "aves_destrozadas": 1,
  "peso_1_guacal_vacio": 2000,
  "peso_torre_7_guacales": 15000
}
```

### Actualizar Beneficio
- **PATCH** `/beneficio/:id_remision`
- **Descripción**: Actualiza un beneficio existente
- **Parámetros**: id_remision (string)
- **Body** (campos opcionales):
```json
{
  "aves_colgadas": 995,
  "aves_asfixiadas": 3,
  "aves_decomisadas": 1,
  "aves_destrozadas": 0
}
```

## Campos Calculados Automáticamente

Los siguientes campos se calculan automáticamente al crear o actualizar un beneficio:

1. `peso_promedio_ave_planta`: 
   - Fórmula: `aves_por_guacal * 7 - peso_1_guacal_vacio * 7`

2. `diferencial_peso_granja_planta`:
   - Fórmula: `peso_promedio_ave_granja - peso_promedio_ave_planta`

3. `peso_ton_lote_procesada`:
   - Fórmula: `(peso_promedio_ave_planta * aves_colgadas) / 1000000`

4. `canales_obtenidas`:
   - Fórmula: `aves_colgadas - aves_decomisadas - aves_destrozadas`

5. `diferencial_aves_entrega`:
   - Fórmula: `aves_remisionadas - aves_colgadas - aves_asfixiadas`
