const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const restaurants = {
    total: 7,
    items: [
        {
            id: 1,
            name: 'Pod Lipom',
            isActive: false,
            meals: [],
            dailyMenus: []
        },
        {
            id: 2,
            name: 'Topli Obrok',
            isActive: false,
            meals: [],
            dailyMenus: []
        },
        {
            id: 3,
            name: 'Mimas',
            isActive: false,
            meals: [],
            dailyMenus: []
        },
        {
            id: 4,
            name: 'Index House',
            isActive: false,
            meals: [],
            dailyMenus: []
        },
        {
            id: 5,
            name: 'Šerpica',
            isActive: false,
            meals: [],
            dailyMenus: []
        }
    ]
}

const { items } = restaurants;

app.get('/api/restaurants', (req, res) => {
    res.send(items);
});

app.get('/api/restaurants/:id', (req, res) => {
    const restaurant = items.find(c => c.id === parseInt(req.params.id));
    if (!restaurant) return res.status(404).send(`The restaurant with the given ID ${req.params.id} was not found.`);
    res.send(restaurant);
});

app.post('/api/restaurants', (req, res) => {
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const restaurant = {
        id: items.length + 1,
        name: req.body.name
    };
    items.push(restaurant);
    res.send(restaurant);
});

app.put('/api/restaurants/:id', (req, res) => {
    const restaurant = items.find(c => c.id === parseInt(req.params.id));
    if (!restaurant) return res.status(404).send(`The restaurant with the given ID ${req.params.id} was not found.`);

    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    restaurant.name = req.body.name;
    res.send(restaurant);
});

app.delete('/api/restaurants/:id', (req, res) => {
    const restaurant = items.find(c => c.id === parseInt(req.params.id));
    if (!restaurant) return res.status(404).send(`The restaurant with the given ID ${req.params.id} was not found.`);

    const index = items.indexOf(restaurant);
    items.splice(index, 1);

    res.send(restaurant);
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}