# Taller1SistemasRecomendacion

La API del backend se encuentra en http://172.24.41.184:8081/ y el frontend se encuentra en http://172.24.41.184:8080/ ingresando con el VPN de Uniandes.

API URL
http://172.24.41.184:8081

Paths API:

Obtener info de un usuario:
GET: /find_usuario/<id>
  
Obtener los artistas que un usuario ha escuchado:
GET: /find_artists_by_user/<id>
  
Obtener las top 20 recomendaciones de artistas para un usuario
GET: /get_recomendaciones/<id>
