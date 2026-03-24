@echo off
REM Script para ejecutar servidor local - Micheline Nail Bar
REM Cambiar a la carpeta correcta
cd /d %~dp0

echo.
echo ========================================
echo   Micheline Nail Bar - Servidor Local
echo ========================================
echo.
echo Iniciando servidor en http://localhost:8000
echo.
echo Presiona CTRL+C para detener el servidor
echo.

REM Verificar si Python está instalado
python --version > nul 2>&1
if %errorlevel% == 0 (
    echo [OK] Python detectado
    echo.
    python -m http.server 8000
) else (
    echo [ERROR] Python no está instalado o no está en PATH
    echo.
    echo Alternativas:
    echo 1. Instala Python desde https://www.python.org/
    echo 2. O usa Node.js: npm install -g http-server
    echo 3. O abre index.html directamente en el navegador con Live Server
    pause
)
