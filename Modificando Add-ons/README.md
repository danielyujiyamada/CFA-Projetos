# Como modificar o código de add-ons do gateway

![image](https://user-images.githubusercontent.com/56172744/150709236-db1e8819-2243-4f60-83c8-8bb970eec712.png)

A interface de instalação de add-ons do gateway faz o download dos add-ons diretamente do seu respectivo repositório e os instá-la localmente (você pode acessar o repositório do add-on clicando no seu campo por). Estes add-ons são baixados para a pasta ~/.webthings/addons.

![image](https://user-images.githubusercontent.com/56172744/150709258-4503721c-4a0b-4f90-b3e6-abd9ebadccbd.png)

Aqui você conseguirá ver o código fonte que foi baixado para o seu computador. Caso você deseje alterar alguma parte do código, seja mudando a função do add-on, inserindo algum tipo de log etc. Não será possível, pois o gateway irá apagar a pasta em sua inicialização caso o código tenha sido alterado. 

Com a pasta apagada, seria necessário fazer o download do add-on pela interface do gateway novamente, contudo, você receberia o código sem as suas alterações novamente.

Para alterar um add-on já existente, devemos fazer um processo um pouco diferente. Primeiro, deve-se entrar no repositório do add-on desejado e fazer download dos arquivos:

![image](https://user-images.githubusercontent.com/56172744/150709265-23ce6cd1-bf35-480d-b786-c2a65a8eb7b9.png)

Tendo os arquivos em mão, adicione a pasta baixado no caminho ~/.webthings/add-ons

![image](https://user-images.githubusercontent.com/56172744/150709278-9df444ea-21e4-4dbf-9c2f-4f5fcf549aef.png)

Observe que a pasta baixada contém a palavra master, apague-a do nome da pasta.

![image](https://user-images.githubusercontent.com/56172744/150709287-88b6ddff-a845-4ab4-858e-31a08757e941.png)

Na pasta do add-on, abra o terminal e digite npm install:

![image](https://user-images.githubusercontent.com/56172744/150709296-786927fb-b1f7-4580-b333-da1a5e2532dd.png)

Agora, altere o seu código de acordo com o seu desejo, após isso, rode o seguinte comando via terminal dentro da pasta:

![image](https://user-images.githubusercontent.com/56172744/150709305-affb61f6-497c-4f29-b8f8-dd22d5ca3b1a.png)

![image](https://user-images.githubusercontent.com/56172744/150709313-571f0e55-37bd-4872-b62e-8ae912667043.png)

 
Este comando irá criar o arquivo SHA256SUMS. Este arquivo contém o valor hash SHA de cada arquivo desta pasta e de pastas descendentes, este arquivo SHA é requisitado pelo gateway para que ele consiga ler os add-nos localmente:

![image](https://user-images.githubusercontent.com/56172744/150709321-8423e55e-e75c-42f1-a95d-47386ceef17a.png)

Com a alteração feita e o arquivo SHA256SUMS, basta inicializar o seu gateway e ativar a extensão:

Pedindo para ativar a extensão

![image](https://user-images.githubusercontent.com/56172744/150709329-acd5fa93-4f80-49da-b524-77d69040691e.png)

Ativando a extensão

![image](https://user-images.githubusercontent.com/56172744/150709339-ee8de3e5-8367-4491-a0ca-5dd979ef9850.png)

Aqui está a nossa alteração, a adição de um log:

![image](https://user-images.githubusercontent.com/56172744/150709350-38beaa6c-39f4-47d6-b060-abdc555f4a42.png)

Obs: Para TODA alteração que for feita em algum arquivo da pasta, o comando para a criação do SHA256SUMS deve ser executado novamente.
