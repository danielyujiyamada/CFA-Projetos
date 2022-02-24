# Bem-Vindo!

  Esta é a página do projeto "Campainha com câmera e assistência remota usando WebThings". Cada montagem de componente está subdividido na aba Issues do projeto.

# Introdução

  A ideia inicial do projeto foi criar uma integração de alguns dispositivos físicos (botão, campainha e câmera) e com algumas aplicações pela internet usando o gateway do WebThings para mandar mensagens notificando quando os dispositivos serem acionados. A aplicação dela funcionaria da seguinte maneira:
  1. O botão seria pressionado, a campainha (com um buzzer) acionaria, uma foto da pessoa que a acionou seria tirada por uma câmera IP;
  2. Uma mensagem seria mandada ao e-mail desejado.

  Dessa forma, a pessoa poderia ter um aviso, ou até um histórico, de quem e quando a campainha foi acionada, desde que ela esteja conectada a internet. 
Para isso, ao longo de toda a progressão, o projeto foi se dividindo em focos diferentes e, no final, a integração de todas elas:
  1. Arranjo de dispositivos (utilizando o ESP8266) e programação delas para servir como botão e campainha;
  2. Obtenção, estudo e integração da câmera ao WebThings;
  3. Pesquisa e obtenção para se conseguir enviar mensagens para um e-mail pelo gateway.

# Resultado

  A integração dos dispositivos no gateway foi alcançada, porém sem a integração da câmera. As mensagens também funcionaram com êxito, sendo possível mandar mensagens não só por e-mail, mas também por mensagens no telegram.
