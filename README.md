# Bem-Vindo!

  Esta é a página do projeto "Campainha com câmera e assistência remota usando WebThings". Cada montagem de componente está subdividido na aba Issues do projeto.

# Introdução

  A ideia inicial do projeto foi criar uma integração de alguns dispositivos físicos (botão, campainha e câmera) e com algumas aplicações pela internet usando o gateway do WebThings para mandar mensagens. A aplicação dela funcionaria da seguinte maneira:
  1. O botão seria pressionado, a campainha (com um buzzer) acionaria, uma foto da pessoa que a acionou seria tirada por uma câmera IP;
  2. Uma mensagem com a foto tirada seria mandada ao e-mail desejado, tendo indicações do tempo em que o evento aconteceu.

  Dessa forma, a pessoa poderia ter um aviso, ou até um histórico, de quem e quando a campainha foi acionada remotamente, desde que ela esteja conectada a internet. 
Para isso, ao longo de toda a progressão, o projeto foi se dividindo em focos distintos e, no final, a integração de todas elas:
  1. Arranjo de dispositivos (utilizando o ESP8266) e programação delas para servir como botão e campainha;
  2. Obtenção, estudo e integração da câmera ao WebThings;
  3. Pesquisa e obtenção para se conseguir enviar mensagens para um e-mail pelo gateway.

# Resultado

  A integração dos dispositivos no gateway foi alcançada, porém sem a integração da câmera. As mensagens também funcionaram com êxito, sendo possível mandar mensagens não só por e-mail, mas também por mensagens no telegram.

![image](https://user-images.githubusercontent.com/91295989/155627179-63e181c2-b07d-47fe-8350-519cfa2dc31f.png)

![20220224_204911](https://user-images.githubusercontent.com/91295989/155627786-b6931c75-f41c-472e-a3d9-14d3a36c8858.jpg)
