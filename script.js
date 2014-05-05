/**
 * Created by Aliaksandr_Padabed on 4/24/2014.
 */
var test2 = angular.module('test2', []);

test2.controller('test2Controller', function($scope, $http, $q, $filter) {

  var objToAdd = {
    "date": "4\/21\/2014",
    "title": "AJAX",
    "lector": [
      "alena_karaba"
    ],
    "location": "K1\/3",
    "description": "some description",
    "level": "D1-D5",
    "notes": "",
    "attendees": [
      "alena_karaba"
    ],
    "tags": [
      "ajax",
      "xmlhttprequest",
      "promises"
    ]
  };

  var addRecord = function(obj) {
    var deferred = $q.defer();

    console.log('About to add record');

    $http.post('//54.72.3.96:3000/techtalks', angular.toJson(obj),
      {'Content-Type': 'application/json'})
      .success(function(item) {
        deferred.resolve(item._id);
      }).error(function(err) {
        deferred.reject('Error: ' + err);
      });

    return deferred.promise;
  };

  var readRecord = function(id) {
    var deferred = $q.defer();

    console.log('About to read record');

    $http.get('//54.72.3.96:3000/techtalks/' + id)
      .success(function(item) {
        deferred.resolve(item);
      }).error(function(err) {
        deferred.reject('Error: ' + err);
      });

    return deferred.promise;
  };

  var updateRecord = function(obj) {
    var deferred = $q.defer();

    console.log('About to update record');

    var change = {'tags': ['aa', 'bb']};
    var id = obj._id;
    $http.put('//54.72.3.96:3000/techtalks/' + id, angular.toJson(change),
      {'Content-Type': 'application/json'})
      .success(function(item) {
        deferred.resolve(id);
      }).error(function(err) {
        deferred.reject('Error: ' + err);
      });

    return deferred.promise;
  };

  var deleteRecord = function(id) {
    var deferred = $q.defer();

    console.log('About to delete record');

    $http.delete('//54.72.3.96:3000/techtalks/' + id)
      .success(function(item) {
        deferred.resolve();
      }).error(function(err) {
        deferred.reject('Error: ' + err);
      });

    return deferred.promise;
  };

  addRecord(objToAdd).then(readRecord).then(updateRecord).then(deleteRecord)
    .catch(function(error) {
      console.log('Errors: ' + error);
    });

  var getList = function() {
    var deferred = $q.defer();

    console.log('About to get list');

    $http.get('//54.72.3.96:3000/techtalks')
      .success(function(items) {
        deferred.resolve(items);
      }).error(function(err) {
        deferred.reject('Error: ' + err);
      });

    return deferred.promise;
  };

  var getAttendees = function() {
    var deferred = $q.defer();

    console.log('About to get attendees');

    $http.get('//54.72.3.96:3000/attendees')
      .success(function(items) {
        deferred.resolve(items);
      }).error(function(err) {
        deferred.reject('Error: ' + err);
      });

    return deferred.promise;
  };

  var getPersonByName = function(arr, name) {
    var found = $filter('filter')(arr, {'name': name}, true);
    if (found.length) {
     return found[0];
    }
  };

  var compose = function(results) {
    console.log('composing...');

    list = results[0];
    attendees = results[1];

    var rez = [];
    for (var i = 0; i < list.length; i++) {
      var item = list[i];
      var lectors = item.lector;
      var lector;
      if (lectors instanceof Array && lectors.length > 0) {
        lector = getPersonByName(attendees, item.lector[0]);
        if (lector) {
          item.fullName = lector.full_name;
          item.email = lector.email[0];
        }
      }

      rez.push(item);
    }

    $scope.items = rez;
  };

  $q.all([getList(), getAttendees()]).then(compose);

});