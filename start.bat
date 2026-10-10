@echo off
title Verdant Payroll OS - 1-Click Startup Launcher
color 0A

echo ========================================================
echo     VERDANT PAYROLL OS - 1-CLICK LAUNCHER
echo     PostgreSQL 18.4 + FastAPI Backend + 3D Frontend
echo ========================================================
echo.

echo [1/3] Checking PostgreSQL Database Service...
sc query postgresql-x64-18 | find "RUNNING" >nul
if errorlevel 1 (
    echo Starting PostgreSQL Service...
    net start postgresql-x64-18
) else (
    echo [OK] PostgreSQL is active and running!
)

echo.
echo [2/3] Launching FastAPI Backend Server (Port 8000)...
cd /d "%~dp0backend"
start "Verdant Backend (FastAPI)" cmd /k "python -m uvicorn main:app --host 127.0.0.1 --port 8000"

echo.
echo [3/3] Launching 3D Cyber-Botanical Frontend (Port 5173)...
cd /d "%~dp0frontend"
start "Verdant Frontend (Vite 3D)" cmd /k "npm run dev"

echo.
echo Waiting 3 seconds for servers to warm up...
timeout /t 3 /nobreak >nul

echo.
echo Opening Verdant Payroll OS in your default browser...
start http://localhost:5173/

echo.
echo ========================================================
echo   ALL SYSTEMS ONLINE!
echo   Frontend: http://localhost:5173/
echo   API Docs: http://localhost:8000/docs
echo ========================================================
echo.
pause
