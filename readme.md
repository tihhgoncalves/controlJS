
# rhinoJS
![alt text](https://github.com/tihhgoncalves/rhinoJS/blob/main/assets/images/logo.png?raw=true)
Transformando qualquer site em uma experiência reativa, independentemente da linguagem de programação utilizada

[![Versão mais recente](https://img.shields.io/github/release/tihhgoncalves/rhinoJS.svg?style=flat)]()
[![Último commit](https://img.shields.io/github/last-commit/tihhgoncalves/rhinoJS.svg?style=flat)]()
[![Downloads feitos até hoje](https://img.shields.io/github/downloads/tihhgoncalves/rhinoJS/total.svg?style=flat)]()
[![GitHub contributors](https://img.shields.io/github/contributors/tihhgoncalves/rhinoJS.svg?style=flat)]()
[![Licença MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/)


## Como usar

Vamos começar instalando o script de JavaScript antes do fechamento da tag `</body>` do seu site:
```html
<script src="https://rhinojs.rocket.srv.br/rhino.min.js"></script>
```

Feito isso, você já terá disponível em todo o site o `$rhino` e os recursos disponíveis.

---


## Funcionalidades

- `data` Controle de dados
- `reactElement` - Elementos HTML reativos
- `reactModel` - Campos de formulários reativos
- `watch` - Monitorando qualquer dado e gerando eventos quando são alterados



## Uso/Exemplos

```javascript
$rhino.data = {
    nome: 'Tihh Gonçalves',
    idade: 37
};

$rhino.reactModel("input#nome", "nome"); // o valor do campo estará reativo em $rhino.data.nome
```

## Mantenedora

Este projeto é orgulhosamente mantido pela **[Rocket Produtora Digital](http://www.produtorarocket.com)**.

## Contribuições

Nossa liga de super coders está sempre pronta para a ação! 💥

- @tihhgoncalves 🚀 (O Mestre Jedi dos códigos)

 > Contribuições são sempre bem-vindas! Sinta-se à vontade para contribuir com melhorias no código, documentação ou funcionalidades.

## Autor

Este é um projeto de **[Tihh Gonçalves](https://github.com/tihhgoncalves)**, fundador da Rocket Produtora Digital.

[![Github](https://img.shields.io/badge/GitHub-181717.svg?style=for-the-badge&logo=GitHub&logoColor=white)](https://github.com/tihhgoncalves)
[![Telegram](https://img.shields.io/badge/Telegram-26A5E4.svg?style=for-the-badge&logo=Telegram&logoColor=white)](https://t.me/tihhgoncalves)

## Suporte

Para relatar bugs ou solicitar novas funcionalidades, por favor, abra uma [issue](https://github.com/tihhgoncalves/rhinoJS/issues) no GitHub. Sua contribuição é muito apreciada!


