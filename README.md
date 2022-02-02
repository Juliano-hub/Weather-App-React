# Weather-App-React
Aplicativo feio como treino, é capaz de pegar a latitude e longitude do usuário pelo navegador, e após isso, é feito uma chamada de API
**OpenWeatherMap** passando essas coordenadas e a key gerada pela conta.

# process.env.REACT_APP_KEY
**REACT_APP_KEY** é a variável que foi declarada dentro de um arquivo **.env**, para evitar de ser feito o upload da mesma publicamente. <br/>
A chave é gerada pela sua conta no site **OpenWeatherMap**, onde essa key deve ser atribuída a essa variável **REACT_APP_KEY** no arquivo 
**.env** e chamada np **app.js** pelo comando **process.env.REACT_APP_KEY**
