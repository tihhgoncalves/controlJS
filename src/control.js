class JSControl {
  constructor() {
    this.data = {};
  }

  _splitProperty(prop) {
    const objBase = this.data;
    const parts = prop.split(".");

    if (parts.length > 1) {
      let currentObj = this.data;

      for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i];
        currentObj = currentObj[part];
      }

      return {
        objBase: currentObj,
        prop: parts[parts.length - 1],
      };
    }

    return {
      objBase,
      prop,
    };
  }

  watch(props, callback) {
    const originalData = this.data; // Armazena a referência original para this.data

    if (!Array.isArray(props)) {
      props = [props];
    }

    props.forEach((prop) => {
      const split = this._splitProperty(prop);

      const objBase = split.objBase;
      prop = split.prop;
      var value = objBase[prop];

      Object.defineProperty(objBase, prop, {
        get: function () {
          return value;
        },
        set: function (newValue) {
          if (newValue !== value) {
            let oldValue = value;
            value = newValue;
            callback(newValue, oldValue);
          }
        },
      });
    });

    this.data = originalData; // Restaura this.data para o valor original
  }

  reactElement(selector, prop, dataKey, filter) {
    let element = document.querySelector(selector);

    let acao = (v) => {
      console.log("[V]", v);

      // se tiver parâmetro de filtro, trata valor por ele antes
      if (filter) {
        v = filter(v);
      }

      if (prop.toLowerCase() == "text") {
        element.innerText = v;
      } else if (prop.toLowerCase() == "html") {
        element.innerHTML = v;
      } else if (prop.toLowerCase() == "value") {
        element.value = v;
      }
    };

    // começa a monitorar alteração da variável pra replicar a ação
    this.watch(dataKey, (v) => {
      acao(v);
    });

    //executa ação pela primeira vez
    const split = this._splitProperty(dataKey);
    const objBase = split.objBase;
    dataKey = split.prop;
    acao(objBase[dataKey]);
  }

  reactModel(selector, prop) {
    //prepara campos multiniveis
    const prepare = this._splitProperty(prop);
    prop = prepare.prop;
    let objBase = prepare.objBase;

    const elements = document.querySelectorAll(selector);

    if (elements.length > 1) {
      console.warn(
        `[controlJS] reactModel > Mais de um elemento foi encontrado com o selector indicado e isso pode comprometer o funcionamento desse recurso.`,
        selector,
        prop
      );
    }

    elements.forEach((element) => {

        console.log('REGISTRANDO', element.id);

      element.addEventListener("input", (event) => {
        objBase[prop] = event.target.value;
        console.log("[INPUT]", element, event.target.value);
      });



      this.watch(prop, (newValue) => {
        console.log("VALOR", newValue, element.id);
        element.value = newValue;
      });

      // Atualiza o valor do elemento com o valor da variável inicialmente
      element.value = objBase[prop];
    });
  }
}

const $control = new JSControl();
