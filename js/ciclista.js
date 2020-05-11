export default class Ciclista {
    constructor (name, times){
        this.name = name;
        this.times = times.map(element => Number(element));
        

    }
    calcularPromedio (){

        let sum = 0
        this.times.forEach((element) =>{
            sum += element
        })
        return sum/this.times.length;
    }
    
}