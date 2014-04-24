/**
 * Created by Aliaksandr_Padabed on 4/24/2014.
 */
var test2 = angular.module('test2', []);

test2.controller('test2Controller', function($scope, $http, $q) {

//  $scope.items = [];
//
//  // Get all techTalks
//  $http.get('//54.72.3.96:3000/techtalks')
//    .success(function(items) {
//      $scope.loaded = true;
//      $scope.items = items;
//    }).error(function(err) {
//      alert('Error: ' + err);
//    });

//  $http.defaults.headers.post.method = 'application/json';
//  $http.defaults.headers.put.method = 'application/json';

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

    obj.tags = ['aa', 'bb'];
    var id = obj._id;
    delete obj._id;
    $http.put('//54.72.3.96:3000/techtalks/' + id, angular.toJson(obj),
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


});