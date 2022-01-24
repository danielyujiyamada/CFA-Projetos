# Criando Add-ons para o gateway WebThings

O gateway WebThings possui uma comunidade ativa, esta que possui uma grande gama de desenvolvedores, que criam diversas aplicações para a manipulação de dispositivos inteligentes pelo gateway.

A Mozilla disponibilizou arquivos contendo informações sobre os serviços do gateway para desenvolvedores, como APIs, Schemas, Hardware suportado, guias para a criação de Add-ons e etc. Tudo pode ser encontrado nesse [link](https://github.com/WebThingsIO/wiki/wiki).

Os Add-ons podem ser criados em qualquer liguagem, contudo, o gateway disponibiliza suporte oficial para as linguaguens Python e JavaScript, oferecendo bibliotecas para o desenvolvimento de add-ons para elas. A maioria dos add-ons até o momento são feitos em uma dessas duas linguaguens.

Como descrito na página [HOWTO: Create an add on](https://github.com/WebThingsIO/wiki/wiki/HOWTO%3A-Create-an-add-on) (recomendo a leitura), os add-ons são dividos em principais categorias, algumas são:

Adapter: Um objeto que serve para gerenciar a comunicação com um dispositivo fisico, o conectando-o ao gateway, um adaptador.

Device: O dispostivo, a representação do dispostivo de hardrware ou virtual via código. Pode-se dizer que é a classe que representará o seu objeto, contendo variáveis, funções e etc.

Property: As propriedades do dispostivo, esta representa as opções que o seu dispostivo terá e que serão apresentadas na tela do gateway.

Estas são apenas descrições resumidas, existem outros tipos de add-ons que podem ser encontrados na página HOWTO.

## Criando um add-on com Adapter, Device e Property (Node.js)

Agora que temos algumas definições, poderemos partir para a criação do código. Vamos criar um add-on bem básico, que na verdade, não faz nada. Antes de iniciar, o gateway necessita de algumas definições (arquivos .json) para o seu projeto. Estas exigências podem ser encontradas neste [guia](https://github.com/WebThingsIO/addon-list/blob/master/manifest.md).

Primeiro, precisamos de um pasta para o nosso projeto, chamarei de exemplo-addon, esta é a primeira exigência, o `package`.

## manifest.json
Na pasta do nosso add-on, devemos ter um arquivo chamado manifest.json, ele contém informações sobre o nosso add-on e guarda quais tipos de opções teremos para ele. O arquivo manifest possui campos obrigatórios, que estão listados no guia.
Aqui temos o nosso manifest.json de exemplo, contendo campos obrigatórios suficientes para o seu funcionamento:

`{
   "author":"Lucas Ferraz",
   "description":"Exemplo de Add-on.",
   "gateway_specific_settings":{
      "webthings":{
         "exec":"{nodeLoader} {path}",
         "primary_type":"adapter",
         "strict_max_version":"*",
         "strict_min_version":"0.10.0"
      }
   },
   "homepage_url":"https://github.com/danielyujiyamada/CFA-Projetos",
   "id":"exemplo-addon",
   "license":"MPL-2.0",
   "manifest_version":1,
   "name":"Exemplo",
   "options":{
      "default":{
         "devices":[]
      },
      "schema":{
         "type":"object",
         "required":[
            "devices"
         ],
         "properties":{
            "devices":{
               "description":"Lista de dispostivos",
               "type":"array",
               "items":{
                  "type":"object",
                  "properties":{
                     "Texto":{
                        "description":"Algum campo de texto",
                        "type":"string"
                     },
                     "Boolean":{
                        "description":"Algum campo booleano",
                        "type":"boolean"
                     }
                  }
               }
            }
         }
      }
   },
   "short_name":"Exemplo",
   "version":"0.1"
}`

Nas propriedades, definimos um array de dispostivos, cada dispostivo terá dois campos, um texto e um booleano. Os valores inseridos nesses campos podem ser recuperados via código posteriormetne.

## Código

Agora, criaremos o nosso código, criaremos um arquivo index.js e executaremos o comando `npm init`, com este comando, criaremos o nosso projeto Node.js tendo o index.js como arquivo de inicialização e o package.json que guardará a lista de bibliotecas que serão utilizadas e as baixará automaticamente.
![image](https://user-images.githubusercontent.com/56172744/150714088-0c4518da-bb52-4063-9131-7e99dc29ce4e.png)

Teremos 3 classes, separadas em classes Adapter, Device e Property, guardadas em dentro de uma pasta chamada lib. Começaremos com o Adapter, o adapter é reponsável por encontrar e inicializar os dipostivos. Para isso, temos a nossa função startPairing. Note que a função de pareamento depende 100% do seu projeto, você está tentando encontrar algo por Wi-Fi? Você quer se conectar a uma URL especifica (pode aquele campo de texto que está definido como parte do dispositivo no manifest.json)? Quer se conectar a um Arduino? Cada situação terá um código diferente, o importante é que você consiga se conectar ao seu dispostivo de alguma forma e criar um objeto do tipo Device com os dados.

Como o nosso exemplo não possui nenhum tipo de dispostivo em especifico, vou pular a parte do descobrimento e inicializar um novo dispositivo manualmente. É necessário herdar a classe Adapter da biblioteca do gateway (ela pode ser acessada com o require) e chamar o seu construtor super, passando o id do nosso manifesto (acessado via require).
![image](https://user-images.githubusercontent.com/56172744/150715008-f074292a-02d5-4074-9d28-da083e4ab7bf.png)

Após o Adapter descobrir o nosso Device, ele irá criar um objeto Device através do seu construtor. O nosso Device irá apenas guardar um nome e o adapter que o criou:
![image](https://user-images.githubusercontent.com/56172744/150716652-fb9bf448-a54c-4f63-b4b8-8a6d437869e6.png)

Veja que as funções doSomething() e printHelloWorld() não são chamadas pelo construtor, essas funções serão utilizadas pela nossa classe Property. Definimos as propriedades que o nosso Device tem pelo construtor, elas irão aparecer como opções na tela, sempre que forem clicadas, a classe property irá chamar uma função no Device:
![image](https://user-images.githubusercontent.com/56172744/150716695-2ef9c4ed-980b-4be9-a784-acb4ca9bfa86.png)

Agora que já temos tudo pronto, vamos alterar o nosso index.js para chamar o nosso Adapter:
![image](https://user-images.githubusercontent.com/56172744/150716853-3f2f21bb-5eeb-42ec-b5ee-cd86f70748cc.png)

Por fim, precisamos mover o nosso projeto para a pasta ~/.webthings/addons (você pode criar o projeto diretamente aqui se quiser):
![image](https://user-images.githubusercontent.com/56172744/150718201-71393cd1-6d06-44f9-b21b-83489d753d39.png)

## Arquivo SHA SHA256SUMS

Como exigência do gateway, todo add-on precisa ter um arquivo SHA. Este arquivo contém o valor hash SHA de cada arquivo desta pasta e de pastas descendentes, este arquivo SHA é requisitado pelo gateway para que ele consiga ler os add-nos localmente, executaremos o comando `find . -type f -exec sha256sum {} \; > SHA256SUMS` na pasta do nosso add-on para criarmos o arquivo:
![image](https://user-images.githubusercontent.com/56172744/150718288-893a45a7-bdbc-46ee-a511-2c08e9545c10.png)

## Teste

Agora basta inicializar o gateway, quando inicializado, teremos um pequeno "erro" falando que o add-on não está ativado, basta ativar:
![image](https://user-images.githubusercontent.com/56172744/150719044-a1865a46-ff0a-4bdb-b48e-2c8ed42e2853.png)
![image](https://user-images.githubusercontent.com/56172744/150719084-d3d684f1-dfa5-4e35-bc6d-9cddb106a1a8.png)

