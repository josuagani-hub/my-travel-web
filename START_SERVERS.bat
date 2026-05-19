@echo off
title TravelEase - Startup

echo.
echo ==========================================
echo   TRAVELEASE - STARTUP SCRIPT
echo ==========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [✓] Node.js found
echo.

REM Install backend dependencies if node_modules doesn't exist
if not exist "server\node_modules" (
    echo [*] Installing backend dependencies...
    cd server
    call npm install
    cd ..
    echo [✓] Backend dependencies installed
    echo.
)

REM Install frontend dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo [*] Installing frontend dependencies...
    call npm install
    echo [✓] Frontend dependencies installed
    echo.
)

echo.
echo ==========================================
echo   STARTING SERVERS...
echo ==========================================
echo.

echo [1] Starting Backend Server (port 5000)...
echo [2] Starting Frontend Server (port 3000)...
echo.
echo Frontend akan buka otomatis di http://localhost:3000
echo Backend berjalan di http://localhost:5000
echo.
echo Admin Login:
echo   Username: admin
echo   Password: admin123
echo.
echo Admin Panel: http://localhost:3000/admin/login
echo.

REM Start backend in new window
start cmd /k "cd server && npm start"

REM Wait a bit for backend to start
timeout /t 3 /nobreak

REM Start frontend in new window
start cmd /k "npm start"

echo.
echo ==========================================
echo   SERVERS STARTED!
echo ==========================================
echo.
echo Tutup window ini jika ingin menghentikan servers
pause
