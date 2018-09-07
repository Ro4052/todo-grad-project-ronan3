var server = require('./server');
var request = require('request');
var assert = require('chai').assert;

var mockDb = require('./mockDb');
var testPort = 52684;
var baseUrl = 'http://localhost:' + testPort;
var todoListUrl = baseUrl + '/api/todo';

describe('server', function () {
  var serverInstance;
  beforeEach(function () {
    serverInstance = server(testPort, __dirname, mockDb);
  });

  afterEach(function () {
    mockDb.reset();
    serverInstance.close();
  });
  
  describe('get list of todos', function () {
    it('responds with status code 200', function (done) {
      request(todoListUrl, function (error, response) {
        assert.equal(response.statusCode, 200);
        done();
      });
    });
    it('responds with a body encoded as JSON in UTF-8', function (done) {
      request(todoListUrl, function (error, response) {
        assert.equal(response.headers['content-type'], 'application/json; charset=utf-8');
        done();
      });
    });
    it('responds with a body that is a JSON empty array', function (done) {
      request(todoListUrl, function (error, response, body) {
        assert.equal(body, '[]');
        done();
      });
    });
  });
  describe('create a new todo', function () {
    it('responds with status code 201', function (done) {
      request.post({
        url: todoListUrl,
        json: {
          title: 'This is a TODO item',
          isComplete: false
        }
      }, function (error, response) {
        assert.equal(response.statusCode, 201);
        done();
      });
    });
    it('responds with id of new todo', function (done) {
      request.post({
        url: todoListUrl,
        json: {
          title: 'This is a TODO item',
          isComplete: false
        }
      }, function (error, response, body) {
        assert.equal(body, '0');
        done();
      });
    });
    it('inserts the todo at the end of the list of todos', function (done) {
      request.post({
        url: todoListUrl,
        json: {
          title: 'This is a TODO item',
          isComplete: false
        }
      }, function () {
        request.get(todoListUrl, function (error, response, body) {
          assert.deepEqual(JSON.parse(body), [{
            title: 'This is a TODO item',
            isComplete: false,
            id: '0'
          }]);
          done();
        });
      });
    });
  });
  describe('delete a todo', function () {
    it('responds with status code 200', function (done) {
      request.post({
        url: todoListUrl,
        json: {
          title: 'This is a TODO item',
          isComplete: false
        }
      }, function () {
        request.del(todoListUrl + '/0', function (error, response) {
          assert.equal(response.statusCode, 200);
          done();
        });
      });
    });
    it('removes the item from the list of todos', function (done) {
      request.post({
        url: todoListUrl,
        json: {
          title: 'This is a TODO item',
          isComplete: false
        }
      }, function () {
        request.del(todoListUrl + '/0', function () {
          request.get(todoListUrl, function (error, response, body) {
            assert.deepEqual(JSON.parse(body), []);
            done();
          });
        });
      });
    });
  });
  describe('update a todo', function () {
    it('changes the title of the todo item', function (done) {
      request.post({
        url: todoListUrl,
        json: {
          title: 'This is a TODO item',
          isComplete: false
        }
      }, function (error, response) {
        request.put({
          url: todoListUrl + '/0',
          json: {
            title: 'This is a new name',
            isComplete: false
          }
        }, function (error, response) {
          request.get(todoListUrl, function (error, response, body) {
            assert.deepEqual(JSON.parse(body), [{
              title: 'This is a new name',
              isComplete: false,
              id: '0'
            }]);
            done();
          });
        });
      });
    });
    it('changes the isComplete of the todo item', function (done) {
      request.post({
        url: todoListUrl,
        json: {
          title: 'This is a TODO item',
          isComplete: false
        }
      }, function (error, response) {
        request.put({
          url: todoListUrl + '/0',
          json: {
            title: 'This is a TODO item',
            isComplete: true
          }
        }, function (error, response) {
          request.get(todoListUrl, function (error, response, body) {
            assert.deepEqual(JSON.parse(body), [{
              title: 'This is a TODO item',
              isComplete: true,
              id: '0'
            }]);
            done();
          });
        });
      });
    });
  });
});
