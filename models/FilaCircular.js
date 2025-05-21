class FilaCircular{ 
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
     return this.#qtd === 
             this.#elementos.length;            
    }

    isEmpty(){
        return this.#qtd === 0; 
    }

    enqueue(dado){
        if(!this.isFull()){
            if(this.#fim === 
                this.#elementos.length-1)
                this.#fim = 0;
            else    
                this.#fim++;
            this.#elementos[this.#fim] = dado;
            this.#qtd++;
            console.log("Ini:"+this.#inicio+ 
                 " Fim:"+this.#fim + " Qtd:"+ this.#qtd);
            return true;
        }// fim if
        else
            return false; // se estiver cheio
    }

    dequeue(){
        if(!this.isEmpty()){
            const dado = 
                 this.#elementos[this.#inicio];
            if(this.#inicio === this.#elementos.length-1)
                this.#inicio=0;
            else
                 this.#inicio++;
            this.#qtd--;
            console.log("Ini:"+this.#inicio+ 
                " Fim:"+this.#fim + " Qtd:"+ this.#qtd);
            return dado;
        }// fim if
        else
            return null; // se estiver vazio 
    }

    toString(){
        let filaString = "";
        let pos = this.#inicio;
        for(let i=0; i<this.#qtd;i++){
            filaString += this.#elementos[pos] +" |";
            if(pos === this.#elementos.length-1)
                pos=0;
            else
                pos++;
        }// fim for
        console.log(filaString);
        return filaString;
    }

    [Symbol.iterator]() {
        let i = this.#inicio;
        let qtd = this.#qtd;
        let cont = 0;
        const elementos = this.#elementos;
        return {
            next: () => {
                let dado = elementos[i];
                if (cont < qtd) {
                    if(i === elementos.length-1) 
                        i = 0;
                    else
                        i++;
                    cont++;
                    return { value: dado, done: false };
                } else {
                    return { done: true };
                }
            }
        };
    }

}// fim classe
