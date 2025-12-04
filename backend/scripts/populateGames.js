require('dotenv').config();
const axios = require('axios');
const connection = require('../src/database');
const Game = require('../src/models/Game');

const RAWG_API_KEY = process.env.RAWG_API_KEY;

if (!RAWG_API_KEY) {
  console.error(" ERRO: Adicione RAWG_API_KEY no arquivo .env");
  process.exit(1);
}

async function populate() {
  try {
    console.log(' Conectando na RAWG (Modo Jogos Populares)...');
    
    // Vamos pegar 5 páginas (100 jogos)
    for (let page = 1; page <= 5; page++) {
      console.log(`\n Baixando Página ${page}...`);

      const response = await axios.get(`https://api.rawg.io/api/games`, {
        params: {
          key: RAWG_API_KEY,
          page_size: 20,
          // MUDANÇA AQUI: Ordenar por quem tem mais adições em bibliotecas (Jogos Famosos)
          ordering: '-added', 
          // Opcional: Filtrar datas para não pegar jogos muito antigos se não quiser
          // dates: '2010-01-01,2025-12-31', 
          page: page 
        }
      });

      const gamesList = response.data.results;

      for (const rawGame of gamesList) {
        // Verifica duplicidade
        const gameExists = await Game.findOne({ where: { title: rawGame.name } });

        if (gameExists) {
          process.stdout.write('.'); 
          continue;
        }

        try {
            // Busca detalhes
            const details = await axios.get(`https://api.rawg.io/api/games/${rawGame.id}`, {
                params: { key: RAWG_API_KEY }
            });

            const fullGame = details.data;

            // Tratamento da Descrição: Remove tags HTML simples (<p>, <br>) se vierem
            // O rawg as vezes manda HTML na description. O description_raw é texto puro.
            let description = fullGame.description_raw || fullGame.description || "Sem descrição.";
            
            await Game.create({
                title: fullGame.name,
                description: description,
                release_date: fullGame.released,
                cover_url: fullGame.background_image,
                publisher: fullGame.publishers[0]?.name || 'Desconhecido'
            });

            console.log(` [${fullGame.released ? fullGame.released.split('-')[0] : 'N/A'}] ${fullGame.name}`);
        } catch (err) {
            console.log(` Erro ao baixar ${rawGame.name}: ${err.message}`);
        }
      }
    }

    console.log('\n🏁 Importação finalizada com sucesso! Só a nata dos games.');

  } catch (error) {
    console.error(' Erro fatal:', error.message);
  } finally {
    process.exit();
  }
}

// Delay para garantir conexão
setTimeout(() => {
  populate();
}, 2000);