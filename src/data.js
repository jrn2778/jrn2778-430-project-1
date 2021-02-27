const { v4: uuidv4 } = require('uuid');

// Possible tags: individual, environment, people, bring-friends, animals

const goodActions = [
  {
    id: uuidv4(),
    action: 'Pick up litter',
    tags: ['bring-friends', 'environment'],
  },
  {
    id: uuidv4(),
    action: 'Help a friend',
    tags: ['people'],
  },
  {
    id: uuidv4(),
    action: 'Plant something (a tree, vegetable, or anything!)',
    tags: ['environment'],
  },
  {
    id: uuidv4(),
    action: 'Donate blood',
    tags: ['individual'],
  },
  {
    id: uuidv4(),
    action: 'Become an organ donor',
    tags: ['individual'],
  },
  {
    id: uuidv4(),
    action: 'Compliment a stranger',
    tags: ['people'],
  },
  {
    id: uuidv4(),
    action: 'Adopt a rescue pet',
    tags: ['individual', 'animals'],
  },
  {
    id: uuidv4(),
    action: 'Write someone a thank you note',
    tags: ['individual', 'people'],
  },
  {
    id: uuidv4(),
    action: 'Support a local artist',
    tags: ['people'],
  },
  {
    id: uuidv4(),
    action: 'Spend some extra time with a loved one',
    tags: ['people'],
  },
  {
    id: uuidv4(),
    action: 'Walk, bike, or take a bus instead of driving',
    tags: ['individual', 'environment'],
  },
  {
    id: uuidv4(),
    action: 'Recycle',
    tags: ['individual', 'environment'],
  },
  {
    id: uuidv4(),
    action: 'Use a reusable mug/water bottle',
    tags: ['individual', 'environment'],
  },
];

module.exports.goodActions = goodActions;
