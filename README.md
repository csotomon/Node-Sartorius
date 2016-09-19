# Node-Sartorius
Programa en Node.js que se conecta a una balazan Satorius por puerto serial y publica el resultado en un servicio web JSON

Primero corre el comando: npm install

Modifica la linea 10 de index.js y cambiala por el puerto COM al cual está conectado la balanza.

Modifica las lineas de la 11 a la 15 para cambiar los parámetros de comunicación serial de acuerdo a la configuración de la balanza.

El servidor web correrá en el puerto 8888, si se desea modificar, puede hacerlo en la línea 65.

Puede probar el funcionamiento de la aplicacion llamando al servidor web de la siguietne manera

http://localhost:8888/peso
