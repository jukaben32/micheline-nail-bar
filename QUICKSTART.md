# ⚡ Quick Start - Ver Cambios Inmediatamente

## 🚀 3 Pasos para Ver tu Landing Page

### Paso 1: Abre Terminal
```
Windows: Presiona Win + R → escribe cmd
Mac/Linux: Terminal
```

### Paso 2: Navega a la carpeta
```bash
cd c:\Users\IA Power Engine\Documents\MisProyectos\micheline-nail-bar
```

### Paso 3: Ejecuta servidor
```bash
python -m http.server 8000
```

**Si Python no está instalado, usa:**
```bash
# Instala Node.js primero: https://nodejs.org/
npm install -g http-server
http-server -p 8000
```

---

## 🌐 URL para Ver los Cambios

```
http://localhost:8000
```

**Abre esta URL en tu navegador** → ¡Listo! 🎉

---

## ✅ Qué cambió (para comprobar)

1. **Números de teléfono** ← Ahora **809 897 9609** (ambas sucursales)
2. **Color rosa elegante** ← En botones, redes sociales, sección "Conecta con Nosotras"
3. **7 redes sociales** ← Instagram, Facebook, TikTok, X, LinkedIn, YouTube, Pinterest
4. **Nueva sección de redes** ← Justo antes del footer con efectos hover
5. **Webhooks de n8n** ← Formularios conectados al workflow

---

## 📍 Dónde Verificar Cada Cambio

### Ver números actualizados
- Sección "Ubicaciones" → Ver sección de sucursales
- Sección "Reserva tu Experiencia" → Ver botones de contacto

### Ver color rosa
- Desplázate a cualquier botón "Reservar Cita" → Ve el efectito rosa en hover
- Sección "Conecta Con Nosotras" → Rosa es el color principal

### Ver redes sociales
- **Footer** (abajo) → 7 iconos en pequeño
- **Sección "Conecta Con Nosotras"** → Vista grande y elegante con efectos

### Verificar webhooks funcionan
1. Abre Console del navegador (presiona F12)
2. Ve a "Console" tab
3. Llena el formulario de booking
4. Deberías ver: `"Enviando..."` 
5. Luego: `"Social click tracked: WhatsApp"` si haces clic en redes

---

## 🔧 Configurar N8N (IMPORTANTE)

Tu workflow en `https://n8nsophia.duckdns.org/workflow/8UfTHxqqN2Mh2I8mqv9NB` necesita recibir estas URLs:

### Agrega estos Webhooks al workflow:

**1. Booking:**
```
POST /webhook/micheline-booking
```

**2. Newsletter:**
```
POST /webhook/micheline-newsletter
```

**3. Social Tracking:**
```
POST /webhook/micheline-social-click
```

Cada webhook recibe datos en JSON (ve archivo `INTEGRACION_N8N.md` para detalles completos)

---

## 🎯 Próximas Acciones Recomendadas

### Inmediato (Hoy)
- ✅ Ve los cambios en localhost
- ✅ Verifica que rosaz se vea bien
- ✅ Prueba los formularios

### Corto Plazo (Esta semana)
- ⏳ Configura los webhooks en n8n
- ⏳ Prueba que los datos lleguen a n8n
- ⏳ Integra con Evolution API para WhatsApp

### Mediano Plazo (Próximas dos semanas)
- ⏳ Subir a GitHub
- ⏳ Deploy en Vercel
- ⏳ Pruebas de integración completa

---

## 📱 Detalles de Prueba

**Número de WhatsApp para pruebas:** 809 897 9609

**Luego de probar, cambia a producción:**
- San Pedro: 809-627-7471
- Boca Chica: 829-823-3476

---

## 🆘 Si algo no funciona

### "Port 8000 ya está en uso"
Cambia a otro puerto:
```bash
python -m http.server 8001
# Luego abre http://localhost:8001
```

### "No se ve color rosa"
1. Presiona F5 para refrescar
2. Presiona Ctrl+Shift+Delete para borrar caché
3. Abre Console (F12) y busca errores

### "Los webhooks no se activan"
1. Verifica que n8n esté corriendo
2. Abre Console (F12) y busca errores de red
3. Verifica que las URLs de webhook sean exactas

---

*Última actualización: Marzo 24, 2026*
*Landing Page: Micheline Nail Bar ✨*
