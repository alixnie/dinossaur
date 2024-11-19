// Variáveis do jogo
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let dinossauro = {
  x: 100,
  y: 500,
  largura: 50,
  altura: 50,
  velocidade: 5
};
let obstaculos = [];
let pontuacao = 0;

// Função para desenhar o dinossauro
function desenharDinossauro() {
  ctx.fillStyle = 'green';
  ctx.fillRect(dinossauro.x, dinossauro.y, dinossauro.largura, dinossauro.altura);
}

// Função para desenhar os obstáculos
function desenharObstaculos() {
  for (let i = 0; i < obstaculos.length; i++) {
    ctx.fillStyle = 'red';
    ctx.fillRect(obstaculos[i].x, obstaculos[i].y, obstaculos[i].largura, obstaculos[i].altura);
  }
}

// Função para atualizar o jogo
function atualizarJogo() {
  // Limpar o canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Desenhar o dinossauro
  desenharDinossauro();

  // Desenhar os obstáculos
  desenharObstaculos();

  // Atualizar a pontuação
  pontuacao++;

  // Verificar se o dinossauro colidiu com um obstáculo
  for (let i = 0; i < obstaculos.length; i++) {
    if (dinossauro.x + dinossauro.largura > obstaculos[i].x &&
        dinossauro.x < obstaculos[i].x + obstaculos[i].largura &&
        dinossauro.y + dinossauro.altura > obstaculos[i].y &&
        dinossauro.y < obstaculos[i].y + obstaculos[i].altura) {
      // Fim do jogo
      alert('Fim do jogo! Sua pontuação foi: ' + pontuacao);
      location.reload();
    }
  }

  // Adicionar novos obstáculos
  if (Math.random() < 0.1) {
    obstaculos.push({
      x: canvas.width,
      y: Math.random() * (canvas.height - 50),
      largura: 50,
      altura: 50
    });
  }

  // Atualizar a posição dos obstáculos
  for (let i = 0; i < obstaculos.length; i++) {
    obstaculos[i].x -= 5;
    if (obstaculos[i].x < -50) {
      obstaculos.splice(i, 1);
    }
  }

  // Atualizar a posição do dinossauro
  if (dinossauro.y + dinossauro.altura < canvas.height) {
    dinossauro.y += dinossauro.velocidade;
  }

  // Chamar a função novamente após 16ms
  setTimeout(atualizarJogo, 16);
}

// Iniciar o jogo
atualizarJogo();

// Adicionar evento de teclado para pular
document.addEventListener('keydown', function(event) {
  if (event.key === ' ') {
    dinossauro.velocidade = -10;
  }
});

// Adicionar evento de teclado para parar de pular
document.addEventListener('keyup', function(event) {
  if (event.key === ' ') {
    dinossauro.velocidade = 5;
  }
});
