const chai = require('chai')
const chaiHttp = require('chai-http')
const faker = require('faker')
const mysql = require('mysql2')
const { expect } = chai

const server = require('../../app')

chai.use(chaiHttp)

let token
let connection
describe('Access to DB', function () {
  describe('#fail', function () {
    it('should return -1 because wrong credentials', function (done) {
      connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'api_auth_test'
      })
      connection.connect(done)
    })
  })
})

describe('Users route', () => {
  const signup = '/users/signup'
  const signin = '/users/signin'
  const secret = '/users/secret'
  const user = {
    email: faker.internet.email(),
    password: faker.internet.password()
  }
  const preSave = {
    email: 'mr.sometest@gmail.com',
    password: faker.internet.password()
  }

  before((done) => {
    chai
      .request(server)
      .post(signup)
      .send(preSave)
      .end((err, res) => {
        expect(res.status).to.equal(200)
        token = res.body.token
        done()
      })
  })

  // after all test have run we drop our test database
  after('droping test db', (done) => {
    drop_database()
    done()
  })

  describe('signup', () => {
    it('should create new user if email not found', (done) => {
      chai
        .request(server)
        .post(signup)
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body).not.to.be.empty
          expect(res.body).to.have.property('token')
          done()
        })
    })

    it('should return 403 if email was found', (done) => {
      chai
        .request(server)
        .post(signup)
        .send(preSave)
        .end((err, res) => {
          expect(res.status).to.equal(403)
          expect(res.body).to.be.deep.equal({
            error: 'Email is already in use'
          })
          done()
        })
    })
  })

  describe('secrete', () => {
    it('should return status 401', (done) => {
      chai
        .request(server)
        .get(secret)
        .end((err, res) => {
          expect(res.status).to.equal(401)
          expect(res.body).to.be.empty
          done()
        })
    })

    it('should return status 200', (done) => {
      chai
        .request(server)
        .get(secret)
        .set('Authorization', token)
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body).to.deep.equal({ secret: 'resource' })
          done()
        })
    })
  })

  describe('signin', () => {
    it('should return error 400 if user email and password empty', (done) => {
      let user = {}
      chai
        .request(server)
        .post(signin)
        .send(user)
        .end((err, res) => {
          expect(res.status).to.be.equal(400)
          done()
        })
    })

    it('should return 200 and our token', (done) => {
      chai
        .request(server)
        .post(signin)
        .send(preSave)
        .end((err, res) => {
          expect(res.status).to.be.equal(200)
          expect(res.body).not.to.be.empty
          expect(res.body).to.have.property('token')
          done()
        })
    })
  })

  function drop_database() {
    connection.connect(function (err) {
      if (err) throw err
      var sql = 'DROP database api_auth_test'
      connection.query(sql, function (err, result) {
        if (err) throw err
        console.log('Table deleted')
      })
    })
  }
})
