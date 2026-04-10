@echo off
title UNC-VDB - Khoi tao Database
echo ========================================
echo    Khoi tao Database unc_vdb
echo ========================================
echo.

cd /d "%~dp0"

if not exist node_modules (
    echo Cai dat dependencies truoc...
    npm install
)

echo Dang tao database va cac bang...
node init-db.js
echo.
pause
