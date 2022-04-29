#############################################################
# Challenge Siempre en casa - Pablo Caraballo
nextjs + typescript + react context + styled-components + jest/react-testing-library + otras (axios + lodash)

_sitio activo:_ 
_https://shopcart-challenge.vercel.app/_

_api endpoints (uso nextjs api generando ciertos endpoints solicitados):_ 
_https://shopcart-challenge.vercel.app/api/products_
_https://shopcart-challenge.vercel.app/api/categories_
_https://shopcart-challenge.vercel.app/api/recommendations_


### INSTRUCTIONS STEPS 📋


_1 . Install the dependencies on the project root folder_

```
npm install
```

_2 . start the app_

```
npm run dev
``` 

_3 . for testing_

```
npm run test
``` 

## Estructura general

_Pagina principal_
```
    pages/products/index.js (contiene el context provider y los componentes principales de la home como
    AppLayout que se reutiliza en todas las pages y que contiene el comp Header por ej)

    pages/products/[id].js (contiene el detalle de producto cuando se navega a un detalle)

```
```
_Componentes principales_

```
    AppLayout: Componente que se reutiliza en todas las pages, este siempre carga el component Header:

    Header: Componente que se carga siempre, este contiene el sector de carrito para ver el resumen de compras y tambien el icono para volver siempre a la HOME.

    Categories: Componente que se encarga de traer las categories haciendo una peticion al endpoint respectivo.
    
    MainContainer: En la home principal, usamos este componente, dentro del mismo se encuentra la peticion
    al endpoint de productos y al setearlos al context, el component ProductList hace uso del mismo.

    Modal: Usado para mostrar el resumen de productos del carrito y sus cantidades, total y subtotales.

    ProductDetail: Usado cuando se navega al detalle de un producto (pages/products/[id].js)
 
    ProductList: Componente muy util, ya que se penso para ser reutilizado en dos sectores: uno la Home principal
    donde mostramos todos los productos y si cambiamos de categoria, actualiza el context disparando los reducers
    y el otro lugar es en el detalle de producto, en este sector mostramos los productos recomendados disparando
    el endpoint recommendatios.

    ProductList/CartOperations: Contiene las acciones de agregar o eliminar items de un producto, este componente
    se reutiliza en el listado general de productos y tambien en el modal con el resumen de productos del carrito.
 ```

```
    libs: En este directorio se pueden encontras las constantes, context-lib, reducer y reducerAction respectivamente.
    
    libs\context-lib.js - usado para el react context api
    libs\models.js - contiene las interfases de typescript usadas en los distintos modelos de datos
    libs\reducer-lib.js - reducer usado necesarios al invocar los dispatch para cambiar estados del context.
    libs\reducerAction-lib.js - los distintos ACTIONS que luego son usados con los reducers
    libs\services.js - contiene las funciones de peticiones ajax
    libs\theme.js - algunos valores de valores para reutilizar con style component (style tiene su propio uso de themeProvider, para este challenge optamos en mantenerlo simple con este approach)
```

```
    .env: Contiene la url del backend, en el caso de cambiar algun puerto, esto tambien se deberia modificar
    como hace uso del /api de nextjs los endpoints estan en esta mismo app.
```

```
    Testing: Para fines de demostracion se puso un ejemplo de testing en el archivo:
    components/ProductList/Item.test.tsx con varios asserts
```

```
    Datos de prueba: Se hizo uso del json de ejemplo oficial del repo de front que estaba en Siempre en casa.
```

```
    State management: Se hace uso de react context para el manejo del state management en la aplicacion en general
    con esto evitamos la sobrecarga de peticiones (tambien usamos router.push con el flag shallow: true), cuando se cambia de categoria, se hace uso del context, cuando se navega entre productos hace uso del context y cuando se agrega items o eliminan del carrito hace uso del context entre el listado de productos y el componente de carrito que figura en el Modal.
```

```
    IMPORTANTE :) ->State management/localStorage: Ademas de que guardamos en react context la info del carrito, este queda preservado en window.localStorage, por lo cual si recargamos la pagina o navegamos en otro momento, nuestro estado va a seguir existiendo :)
```