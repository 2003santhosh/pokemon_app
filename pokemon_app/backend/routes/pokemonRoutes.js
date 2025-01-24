const express = require('express');
const { getPokemons, getPokemonById } = require('../models/pokemonModel');

const router = express.Router();

router.get('/pokemons', async (req, res) => {
  const { page = 1, type, sort, name } = req.query;
  const limit = 10;
  const offset = (page - 1) * limit;

  try {
    const result = await getPokemons(offset, limit, type, sort, name);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/pokemon/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getPokemonById(id);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
