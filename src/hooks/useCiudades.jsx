import { useEffect, useState } from "react";


function useCiudades() {

  const [ciudades, setCiudades] = useState([]);
  const [cargandoCiudades, setCargandoCiudades] = useState(true);
  const [errorCiudades, setErrorCiudades] = useState(false);


  useEffect(() => {

    let activo = true;


    const obtenerCiudades = async () => {

      try {

        setCargandoCiudades(true);
        setErrorCiudades(false);


        const respuesta = await fetch(
          "https://api-colombia.com/api/v1/City"
        );


        if (!respuesta.ok) {

          throw new Error(
            "No se pudieron cargar las ciudades"
          );

        }


        const data = await respuesta.json();


        if (!activo) {
          return;
        }


        /*
          Quitamos posibles ciudades
          repetidas usando el nombre.
        */

        const ciudadesUnicas = Array.from(
          new Map(
            data.map((ciudad) => [
              ciudad.name,
              ciudad,
            ])
          ).values()
        );


        /*
          Ordenamos alfabéticamente.
        */

        ciudadesUnicas.sort(
          (a, b) =>
            a.name.localeCompare(
              b.name,
              "es"
            )
        );


        setCiudades(ciudadesUnicas);


      } catch (error) {

        console.error(
          "Error cargando las ciudades:",
          error
        );


        if (activo) {
          setErrorCiudades(true);
        }


      } finally {

        if (activo) {
          setCargandoCiudades(false);
        }

      }

    };


    obtenerCiudades();


    return () => {
      activo = false;
    };

  }, []);


  return {
    ciudades,
    cargandoCiudades,
    errorCiudades,
  };

}


export default useCiudades;