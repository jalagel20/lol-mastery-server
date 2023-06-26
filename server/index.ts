const dotenv = require('dotenv');
const express = require('express');
const app = express();
const port = process.env.PORT || 5001;
const cors = require('cors');
const axios = require('axios');

dotenv.config();

app.use(cors());

app.get('/api', (req: any, res: any) => {
  res.send('Hello from the API');
});

app.get('/summoner/:name', async (req: any, res: any) => {
  const { name } = req.params;
  const riotApiKey = process.env.RIOT_API_KEY;

  try {
    const response = await axios.get(
      `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${riotApiKey}`,
    );
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting data from Riot API');
  }
});

app.get('/champion-mastery/:id', async (req: any, res: any) => {
  const { id } = req.params;
  const riotApiKey = process.env.RIOT_API_KEY;

  try {
    const response = await axios.get(
      `https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${id}?api_key=${riotApiKey}`,
    );
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving data from Riot API');
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
