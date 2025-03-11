import app from "..";
import { User } from "../models";
import { sequelize } from "../utils/db";
import request from 'supertest'


describe('user creation', () => {
  beforeEach(async () => {
    await User.sync({force: true})
  })

  test('creation succeeds', async () => {
    try {
      const usersAtStart = await User.findAll()
      const testUser = {
        username: "Ville",
        password: "salainen"
      }

      //use userCreation api with supertest to create user
      await request(app)
        .post('/api/users')
        .send(testUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await User.findAll()

      expect(usersAtStart.length).toBe(0)
      expect(usersAtEnd.length).toBe(1)

    } finally {
      await sequelize.close()
    } 


  })
})
