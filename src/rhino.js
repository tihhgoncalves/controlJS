class rhinoJS {
  constructor() {
    this.version = "%VERSION%";
    this.data = {};
    this.watchCallbacks = {};
  }

  prepare(prop) {
    const objBase = this.data;
    const parts = prop.split(".");
    var propKey = "";

    if (parts.length > 1) {
      let currentObj = this.data;

      for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i];
        currentObj = currentObj[part];

        propKey += part + ".";
      }

      return {
        objBase: currentObj,
        prop: parts[parts.length - 1],
        propKey: propKey + parts[parts.length - 1],
      };
    }

    return {
      objBase,
      prop,
      propKey: prop,
    };
  }

  watch(props, callback) {
    const originalData = this.data; // Armazena a referência original para this.data

    if (!Array.isArray(props)) {
      props = [props];
    }

    props.forEach((prop) => {
      const prepare = this.prepare(prop);
      const objBase = prepare.objBase;
      const propKey = prepare.propKey;
      prop = prepare.prop;

      var value = objBase[prop];

      if (!this.watchCallbacks[propKey]) {
        this.watchCallbacks[propKey] = []; // Inicializa um array para os callbacks da prop
      }

      // Adiciona o callback ao array da propriedade
      this.watchCallbacks[propKey].push(callback);

      Object.defineProperty(objBase, prop, {
        get: function () {
          return value;
        },
        set: (newValue) => {
          if (newValue !== value) {
            let oldValue = value;
            value = newValue;

            // Chama todos os callbacks associados a esta propriedade
            this.watchCallbacks[propKey].forEach((cb) => {
              cb(newValue, oldValue);
            });
          }
        },
      });
    });

    this.data = originalData; // Restaura this.data para o valor original
  }

  reactElement(selector, prop, dataKey, filter) {
    let element = document.querySelector(selector);

    let acao = (v) => {
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
    const split = this.prepare(dataKey);
    const objBase = split.objBase;
    dataKey = split.prop;
    acao(objBase[dataKey]);
  }

  reactModel(selector, prop) {
    //prepara campos multiniveis
    const propOriginal = prop;
    const prepare = this.prepare(prop);
    prop = prepare.prop;
    let objBase = prepare.objBase;

    const elements = document.querySelectorAll(selector);

    if (elements.length > 1) {
      console.warn(
        `[rhinoJS] reactModel > Mais de um elemento foi encontrado com o selector indicado e isso pode comprometer o funcionamento desse recurso.`,
        selector,
        prop
      );
    }

    elements.forEach((element) => {
      element.addEventListener("input", (event) => {
        objBase[prop] = event.target.value;
      });

      this.watch(propOriginal, (newValue) => {
        element.value = newValue;
      });

      // Atualiza o valor do elemento com o valor da variável inicialmente
      element.value = objBase[prop];
    });
  }
}

const $rhino = new rhinoJS();
