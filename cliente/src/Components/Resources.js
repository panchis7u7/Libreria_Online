export function getApi(api){
    let headers = new Headers();
      headers.append("Content-Type", "application/json");
      fetch(getApi, {
        method: "GET",
        headers: headers,
      })
        .then((respuesta) => respuesta.json())
        .then((resultado) => {
            console.log(resultado);
            return JSON.parse(resultado);
      })
      .catch((error) => {
        console.log("error: ", error)
    });
}