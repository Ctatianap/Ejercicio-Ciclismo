  

    function cargarInfo () {
        return{
            ciclistas: JSON.parse(localStorage.getItem("ciclistas") || "[]"), 
        }
    }

    function guardarInfo(ciclistas){
        localStorage.setItem("ciclistas", JSON.stringify(ciclistas));
    }

    export {cargarInfo, guardarInfo}
