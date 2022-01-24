# Criando Add-ons para o gateway WebThings

O gateway WebThings possui uma comunidade ativa, esta que possui uma grande gama de desenvolvedores, que criam diversas aplicações para a manipulação de dispositivos inteligentes pelo gateway.

A Mozilla disponibilizou arquivos contendo informações sobre os serviços do gateway para desenvolvedores, como APIs, Schemas, Hardware suportado, guias para a criação de Add-ons e etc. Tudo pode ser encontrado nesse [link](https://github.com/WebThingsIO/wiki/wiki).

Os Add-ons podem ser criados em qualquer liguagem, contudo, o gateway disponibiliza suporte oficial para as linguaguens Python e JavaScript, oferecendo bibliotecas para o desenvolvimento de add-ons para elas. A maioria dos add-ons até o momento são feitos em uma dessas duas linguaguens.

Como descrito na página [HOWTO: Create an add on](https://github.com/WebThingsIO/wiki/wiki/HOWTO%3A-Create-an-add-on) (recomendo a leitura), os add-ons são dividos em principais categorias, algumas são:

Adapter: Um objeto que server para gerenciar a comunicação com um dispositivo fisico, o conectando ao gateway, um adaptador.

Device: O dispostivo, a representação do dispostivo de hardrware ou virtual via código. Pode-se dizer que é a classe que representará o seu objeto, contendo variáveis, funções e etc.

Property: As propriedades do dispostivo, esta representa as opções que o seu dispostivo terá e que serão apresentadas na tela do gateway.

Estas são apenas descrições resumidas, existem outros tipos de add-ons que podem ser encontrados na página HOWTO.

## Criando um add-on com Adapter, Device e Property (Node.js)

Agora que temos algumas definições, poderemos partir para a criação do código. Vamos criar um add-on bem básico, que na verdade, não faz nada. Antes de iniciar, o gateway necessita de algumas definições (arquivos .json) para o seu projeto. Estas exigências podem ser encontradas neste [guia](https://github.com/WebThingsIO/addon-list/blob/master/manifest.md).

Primeiro, precisamos de um pasta para o nosso projeto, chamarei de exemplo-addon, esta é a primeira exigência, o `package`.

# manifest.json
Na pasta do nosso add-on, devemos ter um arquivo manifest.json, ele contém informações sobre o nosso add-on e guarda quais tipos de opções teremos para ele. O arquivo manifest possui campos obrigatórios, que estão listados no guia.
Aqui temos o nosso manifest.json de exemplo, contendo campos obrigatórios suficientes para o seu funcionamento:

`{
  "author": "Lucas Ferraz",
  "description": "Exemplo de Add-on.",
  "gateway_specific_settings": {
    "webthings": {
      "exec": "{nodeLoader} {path}",
      "primary_type": "adapter",
      "strict_max_version": "*",
      "strict_min_version": "0.10.0"
    }
  },
  "homepage_url": "https://github.com/danielyujiyamada/CFA-Projetos",
  "id": "exemplo-addon",
  "license": "MPL-2.0",
  "manifest_version": 1,
  "name": "Exemplo",
  "options": {
    "default": {
      "devices": []
    },
    "schema": {
      "type": "object",
      "required": [
        "devices"
      ],
      "properties": {
        "devices": {
          "description": "Lista de dispostivos",
          "type": "array",
          "items": {
            "type": "object",
            "required": [
              "address"
            ],
            "properties": {
              "Texto": {
                "description": "Algum campo de texto",
                "type": "string"
              },
              "Boolean": {
                "description": "Algum campo booleano",
                "type": "boolean"
            }
          }
        }
      }
    }
  },
  "short_name": "Exemplo",
  "version": "0.1"
}`

Nas propriedades, definimos um array de dispostivos, cada dispostivo terá dois campos, um texto e um booleano. Esses campos podem ser recuperados via código posteriormetne.

# Código

Agora, criaremos o nosso código, criaremos um arquivo index.js e executaremos o comando `npm init`, com este comando, criaremos o nosso projeto Node.js tendo o index.js como arquivo de inicialização e o package.json que guardará a lista de bibliotecas que serão utilizadas e as baixará automaticamente.
![image](https://user-images.githubusercontent.com/56172744/150714088-0c4518da-bb52-4063-9131-7e99dc29ce4e.png)

Separeremos as nossas classes Adapter, Device e Property dentro de uma pasta lib. Começaremos com o Adapter, o adapter é reponsável por encontrar e inicializar os dipostivos. Para isso, temos a nossa função startPairing. Note que a função de pareamento depende 100% do seu projeto, você está tentando encontrar algo por Wi-Fi? Você quer se conectar a uma URL especifica (pode ser mesmo aquela que está definica como parte do objeto no manifest.json)? Quer se conectar a um Arduino? Para cada coisa terá um código diferente, o importante é que você consiga se conectar ao seu dispostivo de alguma forma e criar um objeto do tipo Device com os dados.

