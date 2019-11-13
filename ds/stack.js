
class Stack{

    constructor(){
        this.items = [];
    }

    push(element){
        this.items.push(element)
    }

    pop(){
        if(this.items.length === 0){
            throw Error('Stack Underflow')

        }
        else{
            return this.items.pop()
        }
    }
    peek(){
        return this.items[this.items.length - 1];
    }

    isEmpty(){
        return this.items.length === 0
    }
}

module.exports = Stack;