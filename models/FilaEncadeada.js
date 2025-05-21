//models/FilaEncadeada.js
class FilaEncadeada{
    #inicio;
    #fim;
    #qtd;

    constructor(){
        this.#inicio = null;
        this.#fim = null;
        this.#qtd = 0;
    }

    isEmpty(){
        return this.#inicio == null;
    }

    enqueue(dado){
        const novoNo = new No(dado);
        if (!this.isEmpty())
          this.#fim.proximo = novoNo;
        else 
          this.#inicio = novoNo;
        this.#fim = novoNo;
        this.#qtd++;
    }

    dequeue(){
        // const noremovido = this.#inicio;
        if(!this.isEmpty()){
        const dado = this.#inicio.dado;
        this.#inicio = this.#inicio.proximo;
        if(this.#inicio == null)
            this.#fim = null;
        this.#qtd--;
        // free(noremovido);
        return dado;
    }
        return null;
    }

    toString(){
        let filaString = "";
        let aux = this.#inicio;
        while(aux != null){
            filaString += aux.dado + "-->";
            aux = aux.proximo;
        }
        console.log(filaString);
        return filaString;
    }

    [Symbol.iterator]() {
        let aux = this.#inicio;
        return {
            next: () => {
                if (aux != null) {
                    let dado = aux.dado;
                    aux = aux.proximo;
                    return { value: dado, done: false };
                } else {
                    return { done: true };
                }
            }
        };
    }

} // fim da classe