# 🚀 Ejercicios Prácticos de Higher-Order Components (HOCs)

## 📚 Índice

1. [Ejercicios Básicos](#ejercicios-básicos)
2. [Ejercicios Intermedios](#ejercicios-intermedios)
3. [Ejercicios Avanzados](#ejercicios-avanzados)
4. [Proyectos Finales](#proyectos-finales)

---

## 🟢 Ejercicios Básicos

### 1. **withLoading** - Indicador de Carga

**📝 Descripción:** Crear un HOC que muestre un spinner mientras se cargan datos.

**🎯 Objetivo:** Aprender a inyectar props y manejar estados de carga.

**📋 Requisitos:**

- Mostrar un spinner cuando `isLoading` es `true`
- Renderizar el componente cuando `isLoading` es `false`
- Permitir personalizar el mensaje de carga

```tsx
// Ejemplo de uso esperado:
const ProductListWithLoading = withLoading(ProductList);

<ProductListWithLoading
  isLoading={loading}
  loadingMessage="Cargando productos..."
  products={products}
/>;
```

**✅ Criterios de éxito:**

- [ ] El HOC recibe configuración `{ loadingMessage?: string }`
- [ ] Muestra spinner personalizable
- [ ] Pasa todas las props al componente envuelto
- [ ] TypeScript completamente tipado

---

### 2. **withToggle** - Estado de Toggle

**📝 Descripción:** HOC que inyecta funcionalidad de toggle (mostrar/ocultar) a cualquier componente.

**🎯 Objetivo:** Aprender a inyectar lógica de estado en componentes.

**📋 Requisitos:**

- Inyectar `isOpen`, `toggle`, `open`, `close`
- Permitir valor inicial configurable
- Manejar múltiples instancias independientes

```tsx
// Ejemplo de uso esperado:
const CollapsibleCard = withToggle({ initialOpen: false })(Card);

<CollapsibleCard>
  {({ isOpen, toggle }) => (
    <>
      <button onClick={toggle}>{isOpen ? 'Cerrar' : 'Abrir'}</button>
      {isOpen && <CardContent />}
    </>
  )}
</CollapsibleCard>;
```

**✅ Criterios de éxito:**

- [ ] Estado interno independiente por instancia
- [ ] Props de control inyectadas correctamente
- [ ] Configuración inicial flexible
- [ ] TypeScript con tipos correctos

---

### 3. **withLogger** - Logging Automático

**📝 Descripción:** HOC que registra automáticamente renderizados, props y eventos del ciclo de vida.

**🎯 Objetivo:** Aprender interceptación de ciclo de vida y debugging.

**📋 Requisitos:**

- Log cuando el componente se monta/desmonta
- Log cuando cambian las props (opcional)
- Log clicks y eventos (configurable)
- Modo desarrollo/producción

```tsx
// Ejemplo de uso esperado:
const UserProfileWithLogger = withLogger({
  logProps: true,
  logEvents: ['onClick', 'onSubmit'],
  prefix: 'UserProfile',
})(UserProfile);
```

**✅ Criterios de éxito:**

- [ ] Logs claros y estructurados
- [ ] Configuración granular
- [ ] Solo activo en desarrollo
- [ ] No afecta el comportamiento del componente

---

## 🟡 Ejercicios Intermedios

### 4. **withAuth** - Control de Autenticación

**📝 Descripción:** HOC que protege componentes requiriendo autenticación.

**🎯 Objetivo:** Aprender patrones de autorización y redirección.

**📋 Requisitos:**

- Verificar si el usuario está autenticado
- Mostrar fallback o redireccionar si no está autenticado
- Inyectar información del usuario autenticado
- Manejar diferentes roles/permisos

```tsx
// Ejemplo de uso esperado:
const AdminPanelProtected = withAuth({
  requireRoles: ['admin'],
  fallback: <AccessDenied />,
  redirectTo: '/login',
})(AdminPanel);
```

**✅ Criterios de éxito:**

- [ ] Verificación de autenticación
- [ ] Sistema de roles/permisos
- [ ] Fallbacks configurables
- [ ] Integración con contexto de auth

---

### 5. **withCache** - Cache de Datos

**📝 Descripción:** HOC que cachea automáticamente datos del componente.

**🎯 Objetivo:** Optimización de rendimiento y gestión de cache.

**📋 Requisitos:**

- Cachear datos por clave única
- TTL (time to live) configurable
- Invalidación manual de cache
- Estrategias de cache (memory, localStorage, sessionStorage)

```tsx
// Ejemplo de uso esperado:
const CachedProductList = withCache({
  cacheKey: 'products',
  ttl: 5 * 60 * 1000, // 5 minutos
  storage: 'memory',
})(ProductList);
```

**✅ Criterios de éxito:**

- [ ] Cache efectivo con TTL
- [ ] Múltiples estrategias de storage
- [ ] Invalidación manual
- [ ] Performance mejorada observable

---

### 6. **withDebounce** - Debounce de Props

**📝 Descripción:** HOC que aplica debounce a props específicas antes de pasarlas al componente.

**🎯 Objetivo:** Control de frecuencia de updates y optimización.

**📋 Requisitos:**

- Debounce configurable por prop
- Diferentes delays por prop
- Cancelación de debounce pendientes
- Modo inmediato opcional

```tsx
// Ejemplo de uso esperado:
const DebouncedSearchResults = withDebounce({
  searchTerm: 300,
  filters: 500,
})(SearchResults);
```

**✅ Criterios de éxito:**

- [ ] Debounce selectivo por props
- [ ] Delays configurables
- [ ] Cancelación correcta
- [ ] No pérdida de datos

---

## 🔴 Ejercicios Avanzados

### 7. **withErrorRecovery** - Recuperación de Errores

**📝 Descripción:** HOC avanzado que maneja errores con estrategias de recuperación automática.

**🎯 Objetivo:** Resilencia y recuperación automática de fallos.

**📋 Requisitos:**

- Detectar diferentes tipos de errores
- Estrategias de retry automático
- Fallbacks progresivos
- Logging de errores para analytics

```tsx
// Ejemplo de uso esperado:
const ResilientAPIComponent = withErrorRecovery({
  maxRetries: 3,
  retryDelay: 1000,
  backoffStrategy: 'exponential',
  fallbackComponent: <OfflineMode />,
  onError: (error, retryCount) =>
    analytics.track('error', { error, retryCount }),
})(APIDataComponent);
```

**✅ Criterios de éxito:**

- [ ] Retry automático inteligente
- [ ] Estrategias de backoff
- [ ] Fallbacks progresivos
- [ ] Analytics de errores

---

### 8. **withIntersectionObserver** - Lazy Loading Avanzado

**📝 Descripción:** HOC que implementa lazy loading usando Intersection Observer API.

**🎯 Objetivo:** Optimización de rendimiento con carga bajo demanda.

**📋 Requisitos:**

- Detectar cuando el elemento entra en viewport
- Configuración de thresholds y rootMargin
- Callback de visibilidad
- Cleanup automático

```tsx
// Ejemplo de uso esperado:
const LazyImageGallery = withIntersectionObserver({
  threshold: 0.1,
  rootMargin: '100px',
  triggerOnce: true,
  onVisible: (entry) => console.log('Elemento visible', entry),
})(ImageGallery);
```

**✅ Criterios de éxito:**

- [ ] Detección precisa de visibilidad
- [ ] Configuración flexible
- [ ] Performance optimizada
- [ ] Cleanup correcto

---

### 9. **withRealTimeData** - Datos en Tiempo Real

**📝 Descripción:** HOC que conecta componentes a fuentes de datos en tiempo real (WebSockets, SSE).

**🎯 Objetivo:** Manejo de conexiones en tiempo real y sincronización de datos.

**📋 Requisitos:**

- Conectar/desconectar automáticamente
- Reconexión automática
- Buffer de mensajes
- Estado de conexión

```tsx
// Ejemplo de uso esperado:
const LiveDashboard = withRealTimeData({
  endpoint: 'ws://localhost:3000/dashboard',
  reconnect: true,
  bufferSize: 100,
  onConnect: () => console.log('Conectado'),
  onDisconnect: () => console.log('Desconectado'),
})(Dashboard);
```

**✅ Criterios de éxito:**

- [ ] Conexión estable con reconexión
- [ ] Manejo de estados de conexión
- [ ] Buffer de mensajes
- [ ] Cleanup automático

---

### 10. **withA11y** - Accesibilidad Automática

**📝 Descripción:** HOC que añade automáticamente características de accesibilidad.

**🎯 Objetivo:** Mejorar accesibilidad de forma automática y consistente.

**📋 Requisitos:**

- ARIA labels automáticos
- Navegación por teclado
- Anuncios para screen readers
- Validación de contraste

```tsx
// Ejemplo de uso esperado:
const AccessibleForm = withA11y({
  announceChanges: true,
  keyboardNavigation: true,
  ariaLabels: 'auto',
  contrastCheck: true,
})(ContactForm);
```

**✅ Criterios de éxito:**

- [ ] ARIA labels correctos
- [ ] Navegación por teclado fluida
- [ ] Anuncios apropiados
- [ ] Cumple WCAG 2.1

---

## 🎯 Proyectos Finales

### Proyecto 1: **Sistema de HOCs Composable**

Crear un sistema donde múltiples HOCs se puedan componer fácilmente:

```tsx
const SuperComponent = compose(
  withAuth({ requireRoles: ['user'] }),
  withLoading,
  withErrorBoundary,
  withLogger({ logProps: true }),
  withCache({ ttl: 300000 }),
)(BaseComponent);
```

### Proyecto 2: **HOC Factory Avanzado**

Crear una factory que genere HOCs personalizados basados en configuración:

```tsx
const customHOC = createHOC({
  features: ['auth', 'loading', 'cache'],
  config: {
    auth: { roles: ['admin'] },
    loading: { message: 'Cargando...' },
    cache: { ttl: 5000 },
  },
});

const EnhancedComponent = customHOC(BaseComponent);
```

### Proyecto 3: **Dashboard con HOCs Múltiples**

Crear un dashboard completo usando todos los HOCs creados:

- Autenticación y autorización
- Carga de datos con cache
- Actualizaciones en tiempo real
- Manejo de errores resiliente
- Logging y analytics
- Accesibilidad completa

---

## 📚 Recursos Adicionales

### Patrones Avanzados a Explorar:

1. **Render Props + HOCs**: Combinar ambos patrones
2. **HOCs con Hooks**: Migración y compatibilidad
3. **HOCs Async**: Manejo de operaciones asíncronas
4. **HOCs con Context**: Integración con React Context
5. **HOCs Performantes**: Optimización con memo y callback

### Herramientas Recomendadas:

- **TypeScript**: Para tipado estricto
- **React DevTools**: Para debugging
- **Storybook**: Para documentar HOCs
- **Testing Library**: Para testing
- **Bundle Analyzer**: Para análisis de performance

---

## 🎓 Criterios de Evaluación

Para cada ejercicio, evalúa tu solución con estos criterios:

### ⚡ **Performance**

- [ ] No re-renders innecesarios
- [ ] Memory leaks evitados
- [ ] Bundle size optimizado

### 🔧 **Funcionalidad**

- [ ] Todos los requisitos cumplidos
- [ ] Edge cases manejados
- [ ] Error handling robusto

### 📖 **Código**

- [ ] TypeScript completo
- [ ] Código limpio y mantenible
- [ ] Documentación clara
- [ ] Tests incluidos

### 🎨 **UX/UI**

- [ ] Experiencia fluida
- [ ] Accesibilidad considerada
- [ ] Responsive design
- [ ] Performance perceptible

---

## 🚦 Siguientes Pasos

1. **Empieza con los básicos** - Domina withLoading y withToggle
2. **Progresa gradualmente** - No saltes ejercicios intermedios
3. **Practica composición** - Combina múltiples HOCs
4. **Documenta tu código** - Cada HOC debe ser reutilizable
5. **Escribe tests** - Asegura calidad y confianza
6. **Optimiza performance** - Mide y mejora continuamente

¡Que disfrutes aprendiendo HOCs! 🎉
