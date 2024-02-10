import Show from "./monitors/show";

class rhinoJS {
  constructor(config) {
    //atribui datas no this
    Object.assign(this, config.data);

    //atribui methods no this
    Object.assign(this, config.methods);

    // monitora propriedades
    Object.keys(this).forEach((key) => {
      this._defineProperty(key, this[key]);
    });
  }

  _defineProperty(key, value) {
    let internalValue = value;
    Object.defineProperty(this, key, {
      get() {
        console.log(`Acessando ${key}`);
        return internalValue;
      },
      set(newValue) {
        console.log(`Alterando ${key} de ${internalValue} para ${newValue}`);
        internalValue = newValue;
      },
      enumerable: true,
      configurable: true,
    });
  }
}
window.rhinoJS = rhinoJS;
export default rhinoJS;
