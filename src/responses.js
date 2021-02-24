// const _ = require('underscore');

const jokes = [
  { q: 'What do you call a very small valentine?', a: 'A valen-tiny!' },
  { q: 'What did the dog say when he rubbed his tail on the sandpaper?', a: 'Ruff, Ruff!' },
  { q: "Why don't sharks like to eat clowns?", a: 'Because they taste funny!' },
  { q: 'What did the boy cat say to the girl cat?', a: "You're Purr-fect!" },
  { q: "What is a frog's favorite outdoor sport?", a: 'Fly Fishing!' },
  { q: 'I hate jokes about German sausages.', a: 'Theyre the wurst.' },
  { q: 'Did you hear about the cheese factory that exploded in France?', a: 'There was nothing left but de Brie.' },
  { q: 'Our wedding was so beautiful ', a: 'Even the cake was in tiers.' },
  { q: 'Is this pool safe for diving?', a: 'It deep ends.' },
  { q: 'Dad, can you put my shoes on?', a: 'I dont think theyll fit me.' },
  { q: 'Can February March?', a: 'No, but April May' },
  { q: 'What lies at the bottom of the ocean and twitches?', a: 'A nervous wreck.' },
  { q: 'Im reading a book on the history of glue.', a: 'I just cant seem to put it down.' },
  { q: 'Dad, can you put the cat out?', a: 'I didnt know it was on fire.' },
  { q: 'What did the ocean say to the sailboat?', a: 'Nothing, it just waved.' },
  { q: 'What do you get when you cross a snowman with a vampire?', a: 'Frostbite' },
];

// Converts a joke to XML
const jokeAsXML = (joke) => `<joke>
    <q>${joke.q}</q>
    <a>${joke.a}</a>
  </joke>`;

// Source: https://stackoverflow.com/questions/2219526/how-many-bytes-in-a-javascript-string/29955838
// Refactored to an arrow function by ACJ
const getBinarySize = (string) => Buffer.byteLength(string, 'utf8');

// Gets a single joke
const getRandomJoke = (isXML = false) => {
  const randIndex = Math.floor(Math.random() * jokes.length);

  // Check for XML or JSON version
  if (isXML) return `<?xml version="1.0" ?>\n${jokeAsXML(jokes[randIndex])}`;
  return JSON.stringify(jokes[randIndex]);
};

// Gets one or more jokes
const getRandomJokes = (enteredLimit = 1, isXML = false) => {
  // Make sure limit is within bounds (1 - jokes length)
  let limit = Math.floor(Number(enteredLimit));
  limit = !limit ? 1 : limit;
  limit = limit < 1 ? 1 : limit;
  limit = limit > jokes.length ? jokes.length : limit;

  // Shuffle the jokes and grab the first of amount 'limit'
  // jokes = _.shuffle(jokes);
  const chosenJokes = [];
  for (let i = 0; i < limit; i++) {
    chosenJokes.push(jokes[i]);
  }

  // Check for XML or JSON
  if (isXML) {
    let xml = '<?xml version="1.0" ?>\n<jokes>';

    chosenJokes.forEach((joke) => {
      xml += jokeAsXML(joke);
    });

    xml += '</jokes>';

    return xml;
  } return JSON.stringify(chosenJokes);
};

// Response for /random-joke (one joke)
const getRandomJokeResponse = (request, response, params, acceptedTypes, httpMethod) => {
  const isXML = acceptedTypes.includes('text/xml');
  const contentType = isXML ? 'text/xml' : 'application/json';
  const content = getRandomJoke(isXML);

  const headers = { 'Content-Type': contentType };
  if (httpMethod === 'HEAD') headers['Content-Length'] = getBinarySize(content);

  response.writeHead(200, headers);
  if (httpMethod !== 'HEAD') response.write(content);
  response.end();
};

// Response for /random-jokes (one or more jokes)
const getRandomJokesResponse = (request, response, params, acceptedTypes, httpMethod) => {
  const isXML = acceptedTypes.includes('text/xml');
  const contentType = isXML ? 'text/xml' : 'application/json';
  const content = getRandomJokes(params.limit, isXML);

  const headers = { 'Content-Type': contentType };
  if (httpMethod === 'HEAD') headers['Content-Length'] = getBinarySize(content);

  response.writeHead(200, headers);
  if (httpMethod !== 'HEAD') response.write(content);
  response.end();
};

module.exports = {
  getRandomJokeResponse,
  getRandomJokesResponse,
};
