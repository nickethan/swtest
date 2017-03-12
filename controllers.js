'use strict';

var rp = require('request-promise'),
    _ = require('underscore'),
    methods = require('./methods');

module.exports = {
    getCharacters : function(req, res, next){
        var sortType = req.query.sort;

        methods.getFiftyPeopleByType(sortType)
            .then(function(result) {
                res.json(result);
            })
            .catch(function(err) {
                if (err) return next(err);
            });
    },
    getResidents : function(req, res, next) {
        methods.getPlanets()
            .then(function(planets) {
                var results = {}; // This is gross.

                var planetPromArr =  planets.map(function(planet) {
                    var peoplePromArr = planet.residents.map(function(item) {
                       return methods.getPersonNameByUrl(item);
                    });

                    return Promise.all(peoplePromArr)
                        .then(function(residents) {
                            results[planet.name] = residents; // This is gross.  
                        })
                        .catch(function(err) {
                            if (err) return next(err);
                        });
                });

                Promise.all(planetPromArr)
                    .then(function() {
                        res.json(results); // This is gross.
                    })
                    .catch(function(err) {
                        if (err) return next(err);
                    });
            })
            .catch(function(err) {
                if (err) return next(err);
            });
    },
    renderCharacter : function(req, res, next){
        var characterName = req.params.name;
        
        methods.getPersonByName(characterName)
            .then(function(character) {
                res.render('pages/character', { character : character });
            })
            .catch(function(err) {
                if (err) return next(err);
            });
    },
    renderIndex : function(req, res, next){
        res.render('pages/index');
    }
}
