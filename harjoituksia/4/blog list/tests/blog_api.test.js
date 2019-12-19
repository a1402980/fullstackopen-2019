const supertest = require('supertest')
const app = require('../app')
const api = supertest(app);
const mongoose = require('mongoose')
const helper = require('./test_helper')
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
  
    const blogObjects = helper.initialBlogs
      .map(blog => new Blog(blog))
      
    const promiseArray = blogObjects.map(note => note.save())
    await Promise.all(promiseArray)
})

test('notes are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

test('test id key', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

test('add blog into db', async () => {
    const initialBlogs = await helper.blogsInDb()

    const testBlog = {
        title: "Mikon Blogi",
        author: "Mikko Lerto",
        url: "google.com",
        likes: 0
    }

    await api
        .post('/api/blogs')
        .send(testBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    expect(initialBlogs.length + 1).toBe(blogsAtEnd.length)
})

afterAll(() => {
    mongoose.connection.close()
  })