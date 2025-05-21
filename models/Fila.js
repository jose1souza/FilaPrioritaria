class Fila{ 
    #inicio; //# privados
    #fim;
    #qtd;
    #elementos; // vetor
    constructor(tamanho=10){ 
        this.#inicio = 0;
        this.#fim = -1;
        this.#qtd = 0;
        this.#elementos = new Array(tamanho);
    }
    
    isFull(){
     return this.#fim === 
             this.#elementos.length - 1;            
    }

    isEmpty(){
        return this.#fim < this.#inicio; 
    }

    enqueue(dado){
        if(!this.isFull()){
            this.#fim++;
            this.#elementos[this.#fim] = dado;
            this.#qtd++;
            return true;
        }// fim if
        else
            return false; // se estiver cheio
    }

    dequeue(){
        if(!this.isEmpty()){
            const dado = 
                 this.#elementos[this.#inicio];
            this.#inicio++;
            this.#qtd--;
            return dado;
        }// fim if
        else
            return null; // se estiver vazio 
    }

    toString(){
        let filaString = "";
        for(let i=this.#inicio; i<=this.#fim;i++){
            filaString += this.#elementos[i] +" |";
        }// fim for
        console.log(filaString);
        return filaString;
    }

    [Symbol.iterator]() {
        let i = this.#inicio;
        let fim = this.#fim;
        return {
            next: () => {
                if (i <= fim) {
                    return { value: this.#elementos[i++], done: false };
                } else {
                    return { done: true };
                }
            }
        };
    }

}// fim classe
