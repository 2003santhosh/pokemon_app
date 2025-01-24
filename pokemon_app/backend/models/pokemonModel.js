const pool = require('../db');

const getPokemons = async (offset, limit, type, sort, name) => {
  let query = `SELECT * FROM pokemon`;
  const filters = [];

  if (type) filters.push(`type = '${type}'`);
  if (name) filters.push(`name ILIKE '%${name}%'`);

  if (filters.length > 0) query += ` WHERE ${filters.join(' AND ')}`;
  if (sort) query += ` ORDER BY name ${sort === 'desc' ? 'DESC' : 'ASC'}`;

  query += ` LIMIT ${limit} OFFSET ${offset}`;
  return pool.query(query);
};

const getPokemonById = async (id) => {
  const query = `SELECT * FROM pokemon WHERE id = $1`;
  return pool.query(query, [id]);
};

module.exports = { getPokemons, getPokemonById };
