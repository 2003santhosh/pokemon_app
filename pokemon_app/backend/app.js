const express = require('express');
const pokemonRoutes = require('./routes/pokemonRoutes');

const app = express();
app.use(express.json());
app.use('/api', pokemonRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
