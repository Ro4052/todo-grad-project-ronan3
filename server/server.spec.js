var server = require('./server');
var request = require('request');
var assert = require('chai').assert;
var mockDb = require('./mockDb');

var testPort = 52684;
var baseUrl = 'http://localhost:' + testPort;
var todoListUrl = baseUrl + '/api/todo';

describe('server', () => {
  var serverInstance;
  beforeEach(() => {
    serverInstance = server(testPort, __dirname, mockDb);
  });

  afterEach(() => {
    mockDb.reset();
    serverInstance.close();
  });
  
  describe('get list of todos', () => {
    it('responds with status code 200', (done) => {
      request(todoListUrl, (error, response) => {
        assert.equal(response.statusCode, 200);
        done();
      });
    });
    it('responds with a body encoded as JSON in UTF-8', (done) => {
      request(todoListUrl, (error, response) => {
        assert.equal(response.headers['content-type'], 'application/json; charset=utf-8');
        done();
      });
    });
    it('responds with a body that is a JSON empty array', (done) => {
      request(todoListUrl, (error, response, body) => {
        assert.equal(body, '[]');
        done();
      });
    });
  });
  describe('create a new todo', () => {
    it('responds with status code 201', (done) => {
      request.post({
        url: todoListUrl,
        json: {
          title: 'This is a TODO item',
          isComplete: false
        }
      }, (error, response) => {
        assert.equal(response.statusCode, 201);
        done();
      });
    });
    it('responds with id of new todo', (done) => {
      request.post({
        url: todoListUrl,
        json: {
          title: 'This is a TODO item',
          isComplete: false
        }
      }, (error, response, body) => {
        assert.equal(body, '0');
        done();
      });
    });
    it('inserts the todo at the end of the list of todos', (done) => {
      request.post({
        url: todoListUrl,
        json: {
          title: 'This is a TODO item',
          isComplete: false
        }
      }, () => {
        request(todoListUrl, (error, response, body) => {
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
  describe('delete a todo', () => {
    it('responds with status code 200', (done) => {
      request.post({
        url: todoListUrl,
        json: {
          title: 'This is a TODO item',
          isComplete: false
        }
      }, () => {
        request.del(todoListUrl + '/0', (error, response) => {
          assert.equal(response.statusCode, 200);
          done();
        });
      });
    });
    it('removes the item from the list of todos', (done) => {
      request.post({
        url: todoListUrl,
        json: {
          title: 'This is a TODO item',
          isComplete: false
        }
      }, () => {
        request.del(todoListUrl + '/0', () => {
          request(todoListUrl, (error, response, body) => {
            assert.deepEqual(JSON.parse(body), []);
            done();
          });
        });
      });
    });
  });
  describe('delete completed todos', () => {
    it('responds with status code 200', (done) => {
      request.post({
        url: todoListUrl,
        json: {
          title: 'This is a TODO item',
          isComplete: true
        }
      }, () => {
        request.del(todoListUrl, (error, response) => {
          assert.equal(response.statusCode, 200);
          done();
        });
      });
    });
    it('doesn\'t delete if there are no complete todos', (done) => {
      request.post({
        url: todoListUrl,
        json: {
          title: 'This is a TODO item',
          isComplete: false
        }
      }, () => {
        request.del(todoListUrl, () => {
          request(todoListUrl, (error, response, body) => {
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
    it('deletes completed todos', (done) => {
      request.post({
        url: todoListUrl,
        json: {
          title: 'This is a TODO item',
          isComplete: true
        }
      }, () => {
        request.del(todoListUrl, () => {
          request(todoListUrl, (error, response, body) => {
            assert.deepEqual(JSON.parse(body), []);
            done();
          });
        });
      });
    });
  });
  describe('update a todo', () => {
    it('changes the title of the todo item', (done) => {
      request.post({
        url: todoListUrl,
        json: {
          title: 'This is a TODO item',
          isComplete: false
        }
      }, () => {
        request.put({
          url: todoListUrl + '/0',
          json: {
            title: 'This is a new name',
            isComplete: false
          }
        }, () => {
          request(todoListUrl, (error, response, body) => {
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
    it('changes the isComplete of the todo item', (done) => {
      request.post({
        url: todoListUrl,
        json: {
          title: 'This is a TODO item',
          isComplete: false
        }
      }, () => {
        request.put({
          url: todoListUrl + '/0',
          json: {
            title: 'This is a TODO item',
            isComplete: true
          }
        }, () => {
          request(todoListUrl, (error, response, body) => {
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
