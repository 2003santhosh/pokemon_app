const { Client } = require('pg');
const fetch = require('node-fetch');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'pokemon',
  password: 'PerCh21@458',
  port: 5432,
});

client.connect();

const seedDatabase = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
  const data = await response.json();

  for (const pokemon of data.results) {
    const details = await fetch(pokemon.url).then((res) => res.json());

    const query = `
      INSERT INTO pokemon (name, type, image_url, height, weight, hp, attack, defense, special_attack, special_defense)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING id;
    `;
    const values = [
      details.name,
      details.types[0].type.name,
      details.sprites.front_default,
      details.height,
      details.weight,
      details.stats[0].base_stat,
      details.stats[1].base_stat,
      details.stats[2].base_stat,
      details.stats[3].base_stat,
      details.stats[4].base_stat,
    ];

    await client.query(query, values);
  }

  console.log('Database seeded successfully!');
  client.end();
};

seedDatabase();
