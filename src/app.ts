export const address = "ahmedabad"

export const a = 1;
export const b = 2;
export const c = 3;

const add = (a, b) => {
    return a + b;
}

// only 1 export defult is allowed / file
export default add;

class Counter extends HTMLElement {
    #xValue = 0;
  
    get #x() {
      return this.#xValue;
    }
    set #x(value) {
      this.#xValue = value;
      window.requestAnimationFrame(this.#render.bind(this));
    }
  
    #clicked() {
      this.#x++;
    }

    #render() {
        
    }
  }
  
  

