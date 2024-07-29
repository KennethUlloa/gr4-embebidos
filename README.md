# Visualizador de eventos
Consiste en una página web sencilla que está registrada a un servidor WebSocket para actualizar en tiempo real la pantalla cada vez que ocurre un evento.
## Instalación
1. Crear y activar el entorno virtual
```shell
# Windows
python -m venv .venv
.\.venv\Scripts\activate
# Linux
python3 -m venv .venv
cd ./.venv
source bin/activate
```
2. Instalar las dependencias
```shell
pip install -r requirements.txt
```
3. Ejecutar la aplicación
```shell
python app/main.py
```
Se levantará la aplicación en el puerto 5000.

## Endpoints de la API
|Método|Ruta|Descripción|
|-|-|-|
|GET|/events|Lista todos los eventos ocurridos con el formato `{"name": "string", "date": "string"}`
|POST|/events|Guarda un evento con el formato `{"name": "string", "date": "string"}`