'use strict'
import { cargarInfo,guardarInfo} from './almacenamiento.js'
import Ciclista from './ciclista.js';

let {ciclistas} = cargarInfo();

const convertirJsonACiclista = (elemento => {
    return new Ciclista (elemento.name, elemento.times)
})

ciclistas = ciclistas.map(convertirJsonACiclista)
ciclistas.forEach(element => {
    agregarDatos(element, false)
    
});


// --------------Seccion Registro Tiempos-----------//

document.getElementById("btn-agregar-reg-tiempo").addEventListener("click", ()=>{
    $("#modalRegistroTiempo").modal('toggle');;
});

function agregarDatos(ciclista, guardar=true){

    if(guardar){
        ciclistas.push(convertirJsonACiclista(ciclista));
        guardarInfo(ciclistas);
    }

    document.querySelector("#tbl-registro-tiempos tbody").innerHTML+= 
        `<tr>
        <td>${document.querySelectorAll("#tbl-registro-tiempos tbody tr").length+1}</td>
        <td>${ciclista.name}</td>
        <td>${ciclista.times[0]}</td>
        <td>${ciclista.times[1]}</td>
        <td>${ciclista.times[2]}</td>
        <td>${ciclista.times[3]}</td>
        <td>${ciclista.times[4]}</td>
        <td><a href=#""> Ver </a></td>
        </tr>`
}



document.querySelector("#btn_guardar_nueva_reg_tiempo").addEventListener("click", ()=>{

    if(!document.getElementById("frm_nueva_registro_tiempo").reportValidity()){
        alert('Ingrese bien los datos');
        return ;
    }

    const name = document.getElementById("nombre_corredor").value;
    const time1 = document.getElementById("carreraUno").value;
    const time2 = document.getElementById("carreraDos").value;
    const time3 = document.getElementById("carreraTres").value;
    const time4 = document.getElementById("carreraCuatro").value;
    const time5 = document.getElementById("carreraCinco").value;
    const ciclista = {
        name,
        times: [
            time1,
            time2,
            time3,
            time4,
            time5
        ]     
        
    }
    agregarDatos(ciclista);
    document.getElementById("frm_nueva_registro_tiempo").reset();
})



// --------------Seccion Promedios-----------//


document.getElementById("promedio-tiempos-tab").addEventListener("click", () =>{
    
    const tblPromedio = document.querySelector("#tbl-promedio-tiempos tbody")
    tblPromedio.innerHTML = "";
    ciclistas.forEach(  (element, i) =>{
        tblPromedio.innerHTML += `<tr>
                                    <td>${i+1}</td>
                                    <td>${element.name}</td>
                                    <td>${element.calcularPromedio()}</td>
                                </tr>`
    })
    
})

// --------------Seccion Mejores Tiempos-----------//


function calcularMejorTiempo(){

    const listaPromedios = [...ciclistas]
    listaPromedios.sort((a,b ) => a.calcularPromedio() - b.calcularPromedio() );
    return listaPromedios;
}




document.getElementById("mejores-tiempos-tab").addEventListener("click", () =>{

    const listaPromedios = calcularMejorTiempo() ;
    const premios = calcularPremio();

    function calcularPremio (){
        let premioOro = 0;
        let premioPlata = 0;
        let premioBronce = 0;

        if(listaPromedios[0].name.length < 15){
            premioOro = 25000;
        }else if(listaPromedios[0].name.length >= 15 && listaPromedios[0].name.length <=30){
            premioOro = 27500;
        }else if(listaPromedios[0].name.length >= 30 ){
            premioOro = 30000;
        }
        if(listaPromedios[1].name.length < 10){
            premioPlata = 15000;
        }else if(listaPromedios[1].name.length >= 10 && listaPromedios[1].name.length <=25){
            premioPlata = 17500;
        }else if(listaPromedios[1].name.length >= 25 ){
            premioPlata = 20000;
        }
        if(listaPromedios[2].name.length < 10){
            premioBronce = 7500;
        }else if(listaPromedios[2].name.length >= 10 && listaPromedios[2].name.length <=25){
            premioBronce = 10000;
        }else if(listaPromedios[2].name.length >= 25 ){
            premioBronce = 12500;
        }

        if (listaPromedios[0].name === "PERIQUITO PEREZ"){
            premioOro += 2000000; 
        }else if (listaPromedios[1].name === "PERIQUITO PEREZ"){
            premioPlata += 2000000; 
        }else if (listaPromedios[2].name === "PERIQUITO PEREZ"){
            premioBronce += 2000000; 
        }

        return [premioOro,premioPlata,premioBronce];
   
    }


    const tblOro = document.querySelector("#tbl-oro tbody")
    tblOro.innerHTML = "";
    
    tblOro.innerHTML += `<tr>
                            <td>
                                <p>Corredor: ${listaPromedios[0].name.toUpperCase()}<p>
                                <p>Tiempo: ${listaPromedios[0].calcularPromedio()} min<p>
                            </td>    
                            <td>$${premios[0]}</td>
                        </tr>`
    
    const tblPlata = document.querySelector("#tbl-plata tbody")
    tblPlata.innerHTML = "";
    
    tblPlata.innerHTML += `<tr>
                            <td>
                                <p>Corredor: ${listaPromedios[1].name.toLowerCase()}<p>
                                <p>Tiempo: ${listaPromedios[1].calcularPromedio()} min<p>
                            </td>    
                            <td>$${premios[1]}</td>
                        </tr>`
    
    const tblBronce = document.querySelector("#tbl-bronce tbody")
    tblBronce.innerHTML = "";
    const nameBronce= listaPromedios[2].name
    tblBronce.innerHTML += `<tr>
                            <td>
                                <p>Corredor: ${nameBronce.charAt(0).toUpperCase()+nameBronce.slice(1).toLowerCase()}<p>
                                <p>Tiempo: ${listaPromedios[2].calcularPromedio()} min<p>
                            </td>    
                            <td>$${premios[2]}</td>
                        </tr>`
                        
    
})