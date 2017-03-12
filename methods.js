'use strict';

var rp = require('request-promise'),
    _ = require('underscore'),
    Promise = require('bluebird');

module.exports = {
    getPlanets : function(){        
        var options = {
            method: 'GET', 
            uri: 'http://swapi.co/api/planets/'
        };

        return rp(options)
            .then(function(response) {
                var payload = JSON.parse(response);
                var planets = payload.results;
                
                return planets;
            });
    },
    getPersonByName: function(alias) {
        var options = {
            method: 'GET',
            uri: 'http://swapi.co/api/people/?search=' + alias,
        };

        return rp(options)
            .then(function(response) {
                var payload = JSON.parse(response);
                var character = _.first(payload.results) || null; 

                return character;
            });
    },
    getPersonNameByUrl : function(url) {        
        var options = {
            method: 'GET', 
            uri: url
        };
        
        return rp(options)
            .then(function(response) {
                var people = JSON.parse(response);
            
                return people.name;
            });
    },
    getFiftyPeopleByType : function(sortType) {
        var peoplePromArr = [1, 2, 3, 4, 5].map(function(index) {
            var options = {
                method: 'GET', 
                uri: 'http://swapi.co/api/people/?page=' + index
            };

            return rp(options)
                .then(function(response) {
                    var payload = JSON.parse(response);
                    var people = payload.results;

                    return people;
                });
        });

        return Promise.all(peoplePromArr)
            .then(function(result) {
                var allPeople = [].concat.apply([], result);
                allPeople = _.sortBy(allPeople, sortType);

                return allPeople;
            });
    }
}
