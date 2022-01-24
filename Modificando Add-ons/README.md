# Como modificar o código de add-ons do gateway

![image](https://user-images.githubusercontent.com/56172744/150709761-6ad9737c-e14e-4291-88c0-e92e4c8b8ff9.png)

A interface de instalação de add-ons do gateway faz o download dos add-ons diretamente do seu respectivo repositório e os instala localmente (você pode acessar o repositório do add-on clicando no seu campo por). Estes add-ons são baixados para a pasta ~/.webthings/addons.

![image](https://user-images.githubusercontent.com/56172744/150709814-01956fba-ca1b-4e03-8af1-16e88ba7c185.png)

Aqui você conseguirá ver o código fonte que foi baixado para o seu computador. Caso você deseje alterar alguma parte do código, seja mudando a função do add-on, inserindo algum tipo de log etc. Não será possível, pois o gateway irá apagar a pasta em sua inicialização caso o código tenha sido alterado. 

Com a pasta apagada, seria necessário fazer o download do add-on pela interface do gateway novamente, contudo, você receberia o código sem as suas alterações novamente.

Para alterar um add-on já existente, devemos fazer um processo um pouco diferente. Primeiro, deve-se entrar no repositório do add-on desejado e fazer download dos arquivos:

![image](https://user-images.githubusercontent.com/56172744/150709885-896d1658-5287-4ebd-92a9-8f5b0d57df09.png)

Tendo os arquivos em mão, adicione a pasta baixado no caminho ~/.webthings/add-ons

![image](https://user-images.githubusercontent.com/56172744/150709944-119822d0-abe1-4d33-ba6d-ff7c59a2555c.png)

Observe que a pasta baixada contém a palavra master, apague-a do nome da pasta.

![image](https://user-images.githubusercontent.com/56172744/150709999-1fecd163-5f19-4f64-bd96-0dcb3e6a3745.png)

Na pasta do add-on, abra o terminal e digite npm install:

![image](https://user-images.githubusercontent.com/56172744/150710072-9447d77d-16e2-4328-ac0f-37534ef24481.png)

Agora, altere o seu código de acordo com o seu desejo, após isso, rode o seguinte comando via terminal dentro da pasta:

![image](https://user-images.githubusercontent.com/56172744/150710125-1de3b32a-783e-43f3-a818-4e1ef5e4c8a7.png)

`find . -type f -exec sha256sum {} \; > SHA256SUMS`

![image](https://user-images.githubusercontent.com/56172744/150710215-24dd5f2b-a146-4de2-92df-a8009f16b865.png)

Este comando irá criar o arquivo SHA256SUMS. Este arquivo contém o valor hash SHA de cada arquivo desta pasta e de pastas descendentes, este arquivo SHA é requisitado pelo gateway para que ele consiga ler os add-nos localmente:

![image](https://user-images.githubusercontent.com/56172744/150710237-787bf351-ab3e-4706-818c-40f77100c56b.png)

Com a alteração feita e o arquivo SHA256SUMS, basta inicializar o seu gateway e ativar a extensão:

Pedindo para ativar a extensão

![image](https://user-images.githubusercontent.com/56172744/150710553-30431ec7-0a93-49ee-ae64-7f072fce605a.png)

Ativando a extensão

![image](https://user-images.githubusercontent.com/56172744/150710585-7a27ce08-5940-4930-8447-ba63eaac9844.png)

Aqui está a nossa alteração, a adição de um log:

![image](https://user-images.githubusercontent.com/56172744/150710674-5640632c-3c09-4764-a316-6393680d5ce8.png)

##Obs: Para TODA alteração que for feita em algum arquivo da pasta, o comando para a criação do SHA256SUMS deve ser executado novamente.
