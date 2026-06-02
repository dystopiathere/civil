@echo off
find /c "sv_licenseKey REPLACE_WITH_YOUR_LICENSE_KEY" server.cfg >NUL
if %errorlevel% equ 0 goto :notok
goto :ok
:notok
	echo Please fill out correct license key in server.cfg and restart server
	pause
	goto :done
:ok
	.\artifact\FXServer.exe +exec server.cfg
:done