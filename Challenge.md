Requisitos Funcionales

1. Pantalla de Inicio (Home)
   ● Obtención de Datos:
   ○ Consumir la API de GitHub para obtener una lista inicial de usuarios:
   https://api.github.com/users

● Listado de Usuarios:
○ Mostrar los usuarios en una lista (puede ser un FlatList), presentando al
menos el avatar y el nombre (o login).

● Buscador:
○ Implementar un buscador que permita filtrar usuarios por nombre, realizando
peticiones a:
https://api.github.com/search/users?q={term}
○ El buscador puede actualizar resultados en vivo o mediante un botón de
búsqueda.
● Favoritos:
○ Permitir marcar o desmarcar usuarios como favoritos (no es necesario
persistir los datos a largo plazo; pueden mantenerse en memoria o usando
AsyncStorage). 2. Pantalla de Detalle del Usuario
● Navegación:
○ Al seleccionar un usuario desde la pantalla de inicio, navegar a una pantalla
de detalle.
● Detalles a Mostrar:
○ Consumir la API de GitHub para obtener detalles de un usuario específico:
https://api.github.com/users/{username}
○ Mostrar información como: avatar, nombre, bio, número de repositorios y
otros datos relevantes.
○ Indicar si el usuario está marcado como favorito y permitir alternar este
estado.

3. Navegación y Estado Global
   ● Utilizar React Navigation para gestionar la navegación entre pantallas.
   ● Implementar un mecanismo (por ejemplo, Context API o un state manager ligero)
   para compartir el estado de "favoritos" entre las distintas pantallas.

Requisitos Técnicos

● Tecnologías:
○ React Native (puedes usar Expo o CLI según tu preferencia).
○ React Navigation para la navegación.
○ Para realizar peticiones HTTP, puedes usar fetch o una librería como Axios.
● Estilo:
○ Se puede optar por usar estilos nativos con StyleSheet, o emplear librerías
como Styled Components, React Native Paper o Native Base.
