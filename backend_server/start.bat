@echo off
title UNC-VDB Server
echo ========================================
echo    UNC-VDB Server - Khoi dong
echo ========================================
echo.

cd /d "%~dp0"

echo Kiem tra Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo [LOI] Node.js chua duoc cai dat!
    echo Tai tai: https://nodejs.org
    pause
    exit /b 1
)

if not exist node_modules (
    echo Cai dat dependencies...
    npm install
)

echo.
echo Khoi dong server...
echo Nhan Ctrl+C de dung server
echo.
node server.js
pause
