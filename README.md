# mazesolver

O Mazesolver é uma uma página web que utiliza javascript para criar uma maneira de visualizar o algoritmo Dijkstra.
No projeto utilizamos o framweork Processing.js, que facilita a renderização e vizualiação de dados utilizando javascript.

No código implementamos todas as etapas do algoritmo Dijkstra. 

No início, todos os tiles (quadrados) do mapa iniciam com a estimativa infinita, exceto pelo tile do jogador, que inicia com a
estimativa = 0. Depois, como no algoritmo Dijkstra, o script segue "fechando" todos os nós e calculando suas estimativas, sempre procurando
maneiras de diminuí-las. No final, teremos um caminho otimizado do jogador até o ponto de chegada.

Para rodar o programa basta clonar o repositório e executar o index.html. Por enquanto só é possível colocar um ponto final. É necessário
ter pelo menos um caminho possível do jogador até o ponto final, o script entrará em um loop infinito caso não haja pelo menos um
caminho disponível.

Paredes = tiles vermelhos.
Ponto final = tile verde.
Jogador = tile azul.

Após criar o labirinto desejado, é só clicar no botão "Começar" que o script irá procurar o caminho mais curto e destacá-lo na cor laranja.
