@echo off
echo Building Smart Healthcare Application...
echo.

echo Step 1: Installing dependencies...
npm install

echo.
echo Step 2: Running build...
npm run build

echo.
echo Step 3: Build completed!
echo.
echo You can now deploy the application or run it with:
echo npm start
echo.
pause
