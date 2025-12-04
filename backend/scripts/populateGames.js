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
    console.log(' Conectando na RAWG...');
    
    for (let page = 1; page <= 10; page++) {
      console.log(`\n Baixando Página ${page}...`);

      const response = await axios.get(`https://api.rawg.io/api/games`, {
        params: {
          key: RAWG_API_KEY,
          page_size: 20,
          ordering: '-rating', 
          page: page 
        }
      });

      const gamesList = response.data.results;

      for (const rawGame of gamesList) {
        const gameExists = await Game.findOne({ where: { title: rawGame.name } });

        if (gameExists) {
          process.stdout.write('.');
          continue;
        }

        try {
            const details = await axios.get(`https://api.rawg.io/api/games/${rawGame.id}`, {
                params: { key: RAWG_API_KEY }
            });

            const fullGame = details.data;

            await Game.create({
                title: fullGame.name,
                description: fullGame.description_raw || fullGame.description,
                release_date: fullGame.released,
                cover_url: fullGame.background_image,
                publisher: fullGame.publishers[0]?.name || 'Desconhecido'
            });

            console.log(` ${fullGame.name}`);
        } catch (err) {
            console.log(` Erro ao baixar detalhes de ${rawGame.name}: ${err.message}`);
        }
      }
    }

    console.log('\n Importação finalizada com sucesso!');

  } catch (error) {
    console.error(' Erro fatal:', error.message);
  } finally {
    process.exit();
  }
}

setTimeout(() => {
  populate();
}, 2000);