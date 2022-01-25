# Criando Add-ons para o gateway WebThings

O gateway WebThings possui uma comunidade ativa, onde uma grande gama de desenvolvedores participam, criando diversas aplicações para a manipulação de dispositivos inteligentes pelo gateway.

A Mozilla disponibilizou arquivos contendo informações sobre os serviços do gateway para desenvolvedores, como APIs, Schemas, Hardware suportado, guias para a criação de Add-ons e etc. Tudo pode ser encontrado nesse [link](https://github.com/WebThingsIO/wiki/wiki).

Os Add-ons podem ser criados em qualquer liguagem, contudo, o gateway disponibiliza suporte oficial para as linguaguens Python e JavaScript, oferecendo bibliotecas para o desenvolvimento de add-ons para elas. A maioria dos add-ons até o momento são feitos em uma dessas duas linguaguens.

Como descrito na página [HOWTO: Create an add on](https://github.com/WebThingsIO/wiki/wiki/HOWTO%3A-Create-an-add-on) (recomendo a leitura), os add-ons são dividos em principais categorias, algumas são:

Adapter: Um objeto que serve para gerenciar a comunicação entre o gateway e dispostivos fisicos, conectando-os ao gateway, um adaptador.

Device: O dispostivo, a representação do dispostivo de hardrware ou virtual via código. Pode-se dizer que é a classe que representará o seu objeto, contendo variáveis, funções e etc.

Property: As propriedades do dispostivo, esta representa as opções que o seu dispostivo apresentará na interface de dispositivo do gateway.

Estas são apenas descrições resumidas, existem outros tipos de add-ons que podem ser encontrados na página HOWTO.

## Criando um add-on com Adapter, Device e Property (Node.js)

Agora que possuimos algum conhecimento, podemos partir para a criação do código. Vamos criar um add-on bem básico, que na verdade, não faz nada. Antes de iniciar o processo, o gateway necessita de algumas definições (arquivos de configuração) para o seu projeto. Estas exigências podem ser encontradas neste [guia](https://github.com/WebThingsIO/addon-list/blob/master/manifest.md).

Primeiro, precisamos de um pasta para o nosso projeto, chamarei de exemplo-addon, esta é a primeira exigência, o `package`.

## manifest.json
Na pasta do nosso add-on, devemos ter um arquivo chamado manifest.json, ele contém informações sobre o nosso add-on (criador, versão, repositório e etc) e guarda quais tipos de opções teremos para ele. O arquivo manifest possui campos obrigatórios, que estão listados no guia.
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

Nas propriedades, definimos um array de dispostivos, cada dispostivo terá dois campos, um textual e um booleano. Os valores inseridos nesses campos podem ser recuperados via código posteriormente.

## Código

Agora, programaremos o nosso código, criaremos um arquivo index.js e executaremos o comando `npm init`, com este comando, inicializaremos o nosso projeto Node.js tendo o index.js como código de inicialização e o package.json como um arquivo que guardará o nome das bibliotecas que serão utilizadas, as baixando automaticamente sempre que o comando `npm install` for executado.

![image](https://user-images.githubusercontent.com/56172744/150714088-0c4518da-bb52-4063-9131-7e99dc29ce4e.png)

Teremos 3 arquivos principais, separados em classes, essas que são ExemploAdapter, ExemploDevice e ExemploProperty, guardadas dentro de uma pasta chamada lib. Começaremos com o Adapter, o adapter é reponsável por encontrar e inicializar os dipostivos. Para isso, temos a nossa função startPairing. Note que a função de pareamento depende 100% do seu projeto, você está tentando encontrar algo por Wi-Fi? Você quer se conectar a uma URL especifica (utilizando o campo de texto que está definido como parte do dispositivo no manifest.json, por exemplo)? Quer se conectar a um Arduino? Cada situação terá um código diferente, o importante é que você consiga se conectar ao seu dispostivo de alguma forma e criar um objeto do tipo Device com os dados.

Como o nosso exemplo não possui nenhum tipo de dispostivo em especifico, vou pular a parte do descobrimento e inicializar um novo dispositivo manualmente. É necessário herdar a classe Adapter da biblioteca do gateway (ela pode ser acessada com o require) e chamar o seu construtor com o comando super, passando o id do nosso manifesto (acessado via require).

![image](https://user-images.githubusercontent.com/56172744/150715008-f074292a-02d5-4074-9d28-da083e4ab7bf.png)

Após o Adapter descobrir o nosso dispositivo, ele irá criar um objeto ExemploDevice. O nosso ExemploDevice terá duas variáveis, um nome e uma variável para guardar o adapter que o criou.

![image](https://user-images.githubusercontent.com/56172744/150885398-c4c331ff-a8c0-45eb-b2cd-6b2730780d9e.png)

Veja que temos duas funções, doSomething() e printHelloWorld(), elas não são chamadas pelo construtor, essas funções serão utilizadas pela nossa classe ExemploProperty. No construtor do nosso Device foram definidas duas propriedades, elas irão aparecer como botões na tela do dispositivo (Thing) no gateway. Sempre que esses botões forem clicados, a classe Property irá chamar uma função correspondente no Device. No caso, temos duas propreidades, uma booleana e outra integer (o tipo de propriedade é definido no campo type, aqui temos uma [lista de todas as propriedades existentes](https://iot.mozilla.org/schemas/#properties)):

![image](https://user-images.githubusercontent.com/56172744/150884490-50e6caaa-ce3d-441a-8a9f-3f4991d6d708.png)

Ao se clicar em um dos botões a função setValue é chamada, nela teremos o nome do botão que foi clicado e o valor que foi passado nesse botão, cabe a você decidir o que fazer com esse acionamento, neste exemplo, cada propreidade (botão) possui uma função de nome correspondente na classe ExemploDevice, quando eles forem clicados, essa função será chamada.

Agora que já temos tudo pronto, vamos alterar o nosso index.js para chamar o nosso Adapter:

![image](https://user-images.githubusercontent.com/56172744/150716853-3f2f21bb-5eeb-42ec-b5ee-cd86f70748cc.png)

Por fim, precisamos mover o nosso projeto para a pasta ~/.webthings/addons (você pode criar o projeto diretamente aqui se quiser):

![image](https://user-images.githubusercontent.com/56172744/150718201-71393cd1-6d06-44f9-b21b-83489d753d39.png)

## Arquivo SHA SHA256SUMS

Como exigência do gateway, todo add-on precisa ter um arquivo SHA. Este arquivo contém o valor hash SHA de cada arquivo desta pasta e de pastas descendentes, este arquivo SHA é requisitado pelo gateway para que ele consiga ler os add-nos localmente, executaremos o comando `find . -type f -exec sha256sum {} \; > SHA256SUMS` na pasta do nosso add-on para criarmos o arquivo:

![image](https://user-images.githubusercontent.com/56172744/150718288-893a45a7-bdbc-46ee-a511-2c08e9545c10.png)

#### Obs: O arquivo SHA256SUMS deve ser refeito sempre que houver uma alteração em qualquer arquivo desta pasta.

## Teste

Agora basta inicializar o gateway, quando inicializado, teremos um pequeno "erro" falando que o add-on não está ativado, basta ativar:

![image](https://user-images.githubusercontent.com/56172744/150719044-a1865a46-ff0a-4bdb-b48e-2c8ed42e2853.png)
![image](https://user-images.githubusercontent.com/56172744/150719084-d3d684f1-dfa5-4e35-bc6d-9cddb106a1a8.png)

Ao clicar em "Configurar" poderemos ver o efeito do nosso manifest.json, o nosso add-on permite a criação de múltiplos dispositivos, cada um com um campo de texto e um campo booleano (como esta no arquivo):

![image](https://user-images.githubusercontent.com/56172744/150882079-20109611-8336-462c-9cb9-93719c68cbe7.png)

Vamos adicionar o dispositivo configurado ao nosso gateway:
![image](https://user-images.githubusercontent.com/56172744/150882259-72b507f0-e420-4f42-91b6-5cf3bf9f0783.png)

Note que, mesmo adicionando duas configurações diferentes na tela de configurar, apenas um dispositivo apareceu, isso acontece porque a nossa classe Adapter cria apenas um dispositivo com um código estático, o correto seria acessar o banco de dados (classe Database do pacote gateway-addon) e criar um Device para cada configuração.

![image](https://user-images.githubusercontent.com/56172744/150885190-313e106a-7574-4869-8db3-7faf291de8f3.png)

Aqui está o nosso dispositivo, como definimos 2 propriedades para ele via construtor na classe ExemploDevice (um boolean e um integer), temos na tela do dispositivo 2 botões, um clicavel(boolean) e um inserivel(integer):

![image](https://user-images.githubusercontent.com/56172744/150885527-77cc0dc4-632c-44d2-baec-db8a011a05d2.png)

Quando o boolean printHelloWorld é marcado como true, a função printHelloWorld é chamada, printando o que foi definido no console:

![image](https://user-images.githubusercontent.com/56172744/150885641-1d379f1f-fa90-4b07-938b-ee9f4ef79033.png)

Quando algo é inserido no campo doSomething, a função doSomething é chamada:

![image](https://user-images.githubusercontent.com/56172744/150885710-9aebab7f-1a26-4706-a0e9-14024535edf2.png)

## Conclusão

Este é o nosso add-on de exemplo, ele é capaz de encontrar dispostivos, cria-los e gerenciar suas propriedades. Claro que ele é bastante simples, mas mostra 3 tipos principais de add-ons.
