class rhinoJS {
  constructor(data) {
    this.version = "%VERSION%";
    this.data = data;
    this.watchCallbacks = {};

    // ativa monitores
    this.monitorRShow(); // [r-show]
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

  getPropByPath(propPath) {
    const parts = propPath.split(".");
    let currentObj = this.data;

    for (let part of parts) {
      if (currentObj.hasOwnProperty(part)) {
        currentObj = currentObj[part];
      } else {
        // Caso a propriedade não seja encontrada, retorna undefined
        return undefined;
      }
    }

    return currentObj;
  }

  watch(props, callback) {
    const originalData = this.data;

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
        this.watchCallbacks[propKey] = [];
      }

      this.watchCallbacks[propKey].push(callback);

      Object.defineProperty(objBase, prop, {
        get: function () {
          return value;
        },
        set: (newValue) => {
          if (newValue !== value) {
            let oldValue = value;
            value = newValue;

            this.watchCallbacks[propKey].forEach((cb) => {
              cb(newValue, oldValue);
            });
          }
        },
      });
    });

    this.data = originalData;
  }

  reactElement(selector, prop, dataKey, filter) {
    let element = document.querySelector(selector);

    let acao = (v) => {
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

    this.watch(dataKey, (v) => {
      acao(v);
    });

    const split = this.prepare(dataKey);
    const objBase = split.objBase;
    dataKey = split.prop;
    acao(objBase[dataKey]);
  }

  reactModel(selector, prop) {
    const propOriginal = prop;
    const prepare = this.prepare(prop);
    prop = prepare.prop;
    let objBase = prepare.objBase;

    const elements = document.querySelectorAll(selector);

    elements.forEach((element) => {
      const updateElement = () => {
        if (element.tagName === "SELECT") {
          element.value = objBase[prop];
        } else {
          element.value = objBase[prop];
        }
      };
      console.log("TAGNAME", element.tagName);
      console.log("ELEMENT", element.value);
      if (element.tagName === "SELECT") {
        element.addEventListener("change", (event) => {
          console.log("EVENTO - CHANGE", event);
          objBase[prop] = event.target.value;
        });
      } else if (element.tagName === "INPUT") {
        element.addEventListener("input", (event) => {
          console.log("EVENTO - INPUT", event);
          objBase[prop] = event.target.value;
        });
      }

      this.watch(propOriginal, () => {
        updateElement();
      });

      updateElement(); // Inicializa o valor do elemento
    });
  }

  monitorRShow() {
    const rShowElements = document.querySelectorAll("[r-show]");

    rShowElements.forEach((element) => {

      let dataKey = element.getAttribute("r-show");

      let negate = false;

      if (dataKey.startsWith("!")) {
        negate = true;
        dataKey = dataKey.substring(1);
      }

      const fncExec = (dataKey, element, negate) => {
        let val = this.getPropByPath(dataKey);

        if (negate) {
          val = !val;
        }

        element.style.display = val ? "block" : "none";
      };

      this.watch(dataKey, () => {
        fncExec(dataKey, element, negate);
      });

      //executa na execução da página
      fncExec(dataKey, element, negate);
    });
  }
}
