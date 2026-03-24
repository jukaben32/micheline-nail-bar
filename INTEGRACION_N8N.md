# 🔗 Integración N8N - Micheline Nail Bar Landing Page

## 📋 Resumen de Cambios

Se han integrado **3 webhooks de n8n** en la landing page:

1. **Webhook de Booking** - Reservas de citas
2. **Webhook de Newsletter** - Suscripción a newsletter
3. **Webhook de Social Tracking** - Rastreo de clics en redes sociales

---

## 🔧 Configuración de Webhooks en N8N

### 1️⃣ Webhook de Booking (Reservas)

**URL del webhook:**
```
https://n8nsophia.duckdns.org/webhook/micheline-booking
```

**Método:** `POST`

**Datos que recibe:**
```json
{
  "type": "booking",
  "source": "landing-page-widget",
  "timestamp": "2026-03-24T10:30:00Z",
  "name": "Ana Pérez",
  "phone": "809-123-4567",
  "branch": "San Pedro de Macorís",
  "service": "Manicure Spa",
  "date": "2026-03-25",
  "time": "14:30",
  "notes": "¡Hola! Me gustaría atenderme con Alba.",
  "specialist": "Alba"
}
```

**Configuración recomendada en n8n:**
- Webhook Trigger + Webhook Response (200 OK)
- Guardar en base de datos
- Enviar confirmación por WhatsApp con Evolution API
- Registrar en CRM o Airtable
- Enviar notificación interna

---

### 2️⃣ Webhook de Newsletter (Suscripciones)

**URL del webhook:**
```
https://n8nsophia.duckdns.org/webhook/micheline-newsletter
```

**Método:** `POST`

**Datos que recibe:**
```json
{
  "type": "newsletter_subscription",
  "source": "landing-page-widget",
  "timestamp": "2026-03-24T10:30:00Z",
  "email": "cliente@example.com"
}
```

**Configuración recomendada en n8n:**
- Webhook Trigger
- Deduplicar emails
- Guardar en base de datos/Airtable
- Enviar email de bienvenida con Resend o Gmail
- Agregar a lista de distribución

---

### 3️⃣ Webhook de Social Tracking (Clics)

**URL del webhook:**
```
https://n8nsophia.duckdns.org/webhook/micheline-social-click
```

**Método:** `POST`

**Datos que recibe:**
```json
{
  "type": "social_click",
  "source": "landing-page-widget",
  "timestamp": "2026-03-24T10:30:00Z",
  "platform": "Instagram",
  "url": "https://www.instagram.com/michelinenailbar/"
}
```

**Configuración recomendada en n8n:**
- Webhook Trigger
- Contar clics por plataforma
- Guardar para analytics
- Dashboard de seguimiento en tiempo real

---

## 🚀 Cómo Ejecutar y Ver los Cambios

### Opción 1: Servidor Local Python (Recomendado para pruebas rápidas)

```bash
# Navega a la carpeta del proyecto
cd c:\Users\IA Power Engine\Documents\MisProyectos\micheline-nail-bar

# Ejecuta servidor Python
python -m http.server 8000

# Ve a tu navegador
# http://localhost:8000
```

### Opción 2: Servidor Node.js Local

```bash
# Instala http-server globalmente (si no lo tienes)
npm install -g http-server

# Navega a la carpeta
cd c:\Users\IA Power Engine\Documents\MisProyectos\micheline-nail-bar

# Ejecuta servidor
http-server -p 8000

# Ve a http://localhost:8000
```

### Opción 3: Live Server en VS Code

1. Instala extensión "Live Server"
2. Haz clic derecho en `index.html`
3. Selecciona "Open with Live Server"
4. Abre automáticamente en `http://127.0.0.1:5500`

---

## 📱 Cómo Probar la Integración

### 1. Probar Formulario de Booking

1. Abre http://localhost:8000
2. Desplázate a "Reserva tu Experiencia"
3. Llena el formulario:
   - Nombre: `Test User`
   - Teléfono: `809-897-9609`
   - Sucursal: `San Pedro de Macorís`
   - Servicio: `Manicure Spa`
   - Fecha: `2026-03-25`
   - Hora: `14:30`
4. Haz clic en "Generar Reserva vía WhatsApp"
5. **Verifica en n8n:**
   - Abre https://n8nsophia.duckdns.org
   - Ve al workflow
   - Deberías ver el webhook ejecutado con los datos

### 2. Probar Newsletter

1. Desplázate a sección de "Ofertas & Novedades"
2. Ingresa un email: `test@example.com`
3. Haz clic en "Suscribirme Ahora"
4. **Verifica en n8n:** Los datos deberían llegar al webhook

### 3. Verificar Rastreo de Redes

1. Haz clic en cualquier icono de red social (Instagram, Facebook, etc.)
2. Abre Console (F12 → Console)
3. Verifica el log: `Social click tracked: Instagram`
4. **En n8n:** Deberías ver eventos de clics registrados

---

## 🌐 Cómo Hacer Deploy a Vercel

### Paso 1: Crear Repositorio GitHub

```bash
# Navega a la carpeta
cd c:\Users\IA Power Engine\Documents\MisProyectos\micheline-nail-bar

# Inicialize git
git init

# Agrega todos los archivos
git add .

# Commit inicial
git commit -m "Initial commit: Micheline Nail Bar Landing Page"

# Crea repositorio en GitHub manualmente
# https://github.com/new

# Agrega remote
git remote add origin https://github.com/TU_USUARIO/micheline-nail-bar.git
git branch -M main
git push -u origin main
```

### Paso 2: Deploy en Vercel

1. Ve a https://vercel.com
2. Haz clic en "New Project"
3. Selecciona tu repositorio de GitHub
4. Haz clic en "Deploy"
5. **Tu URL será:** `https://micheline-nail-bar.vercel.app`

### Paso 3: Actualizar URLs de Webhook (Importante)

Si tienes un dominio propio o quieres usar HTTPS, actualiza en `main.js`:

```javascript
const N8N_WEBHOOK_URL = 'https://n8nsophia.duckdns.org/webhook/micheline-booking';
const N8N_NEWSLETTER_WEBHOOK = 'https://n8nsophia.duckdns.org/webhook/micheline-newsletter';
const N8N_SOCIAL_WEBHOOK = 'https://n8nsophia.duckdns.org/webhook/micheline-social-click';
```

---

## ✅ Checklist de Verificación

### Pruebas en Localhost

- [ ] El servidor local corre sin errores en http://localhost:8000
- [ ] Puedo ver la landing page completa
- [ ] Los colores rosa se ven correctamente
- [ ] Las redes sociales están todas visibles (7 total)
- [ ] El formulario de booking aparece bien
- [ ] El formulario de newsletter aparece bien

### Pruebas de Webhooks

- [ ] Al enviar booking, se ve en Console: "Enviando..."
- [ ] Los datos llegan a n8n webhook (verificar en ejecuciones de workflow)
- [ ] Al enviar newsletter, se ve "✓ ¡Suscrita!"
- [ ] Los datos de newsletter llegan a n8n
- [ ] Los clics en redes se rastrean (ver Console)
- [ ] El número de teléfono es 809 897 9609 en todo lado

### Deploy en Vercel

- [ ] Repositorio GitHub está creado
- [ ] Deploy en Vercel está successful
- [ ] URL en Vercel funciona correctamente
- [ ] Los webhooks siguen funcionando desde Vercel
- [ ] Los números de WhatsApp son correctos

---

## 🔍 Troubleshooting

### Problema: "Webhook no recibe datos"

**Solución:**
1. Verifica que n8n esté corriendo: https://n8nsophia.duckdns.org
2. Verifica que la URL del webhook sea exacta
3. Abre Console del navegador (F12) para ver si hay errores CORS
4. Verifica en n8n que el webhook trigger esté activado

### Problema: "CORS error"

**Solución:**
En tu n8n, agrega headers CORS:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: POST, GET
Access-Control-Allow-Headers: Content-Type
```

### Problema: "WhatsApp no abre"

**Solución:**
1. Verifica que el número sea correcto: `18098979609`
2. Intenta manualmente: https://wa.me/18098979609
3. Asegúrate de tener WhatsApp instalado o usar web.whatsapp.com

### Problema: "Newsletter no envía emails"

**Solución:**
1. Verifica que tengas email service configurado en n8n (Resend, Gmail, Mailgun, etc.)
2. Comprueba la bandeja de spam
3. Verifica logs en n8n workflow

---

## 📊 Flujo de Datos Completo

```
┌─────────────────────────────────────────┐
│   Landing Page (localhost:8000)         │
│                                         │
│  • Formulario Booking                   │
│  • Newsletter                           │
│  • Social Clicks                        │
└─────────────────┬───────────────────────┘
                  │
                  │ JSON POST
                  ▼
┌─────────────────────────────────────────┐
│   N8N Webhooks                          │
│   https://n8nsophia.duckdns.org         │
│                                         │
│  ✓ /webhook/micheline-booking           │
│  ✓ /webhook/micheline-newsletter        │
│  ✓ /webhook/micheline-social-click      │
└─────────────────┬───────────────────────┘
                  │
                  ├─► Guardar en BD
                  ├─► Enviar WhatsApp (Evolution API)
                  ├─► Guardar en Airtable
                  ├─► Enviar emails
                  └─► Logging/Analytics
```

---

## 📞 Números de Teléfono para Pruebas

**Todas las sucursales en desarrollo:**
- 📱 WhatsApp: **809 897 9609**
- ☎️ Teléfono: **809 897 9609**

**Producción (cuando esté lista):**
- San Pedro: 809-627-7471
- Boca Chica: 829-823-3476

---

## 🎉 Próximos Pasos

1. ✅ **Hecho:** Integración de webhooks en landing
2. ⏳ **Configurar n8n:** Webhooks receptores
3. ⏳ **Testing:** Probar cada webhook
4. ⏳ **Deploy GitHub:** Subir repositorio
5. ⏳ **Deploy Vercel:** Ir a producción
6. ⏳ **Monitoreo:** Analitics y métricas

---

**Última actualización:** Marzo 24, 2026
**Estado:** 🟢 Listo para pruebas
**Versión:** 1.0 con integración N8N + Rosa de Marca

