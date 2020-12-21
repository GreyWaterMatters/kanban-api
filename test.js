require('dotenv').config();

const {Card, List} = require('./app/models');

// un findAll tout simple
//Card.findAll().then(console.log);

// avec include
List.findByPk(1, {
    include: ['cards']
}).then(list => console.log(list.cards[0]));

// avec include NN
Card.findByPk(1, {
    include: ['tags']
}).then(card => console.log(card.tags));