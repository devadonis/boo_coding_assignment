const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../app');

describe('Profile and Comment API', () => {
  let profile_id, commentor_id, comment_id, mongoServer;

  beforeAll(async () => {
    // await connect();
    mongoServer = await MongoMemoryServer.create();
    const URI = mongoServer.getUri();

    mongoose.createConnection(URI, { dbName: "boo" });
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
    app.close();
  });

  test('POST /profile - create profile', async () => {
    const response = await request(app)
      .post('/profile')
      .send({
        id: 1,
        name: "Elon Musk",
        description: "Elon Reeve Musk FRS(/'i:lon/; born June 28, 1971) is a technology entrepreneur, investor, and engineer. He holds South African, Canadian, and U.S. citizenship and is the founder, CEO, and lead designer of SpaceX; co-founder, CEO, and product architect of Tesla, Inc.; co-founder and CEO of Neuralink; founder of the Boring Company; co-founder and co-chairman of OpenAI; and co-founder of PayPal. As of February 2021, Musk's net worth stands at $184 billion, making him the 2nd richest person in the world.",
        mbti: "INTP",
        enneagram: "5w6",
        variant: "so/sp",
        tritype: 513,
        socionics: "ILE",
        sloan: "RCOEI",
        psyche: "VLFE",
        image: "https://soulverse.boo.world/images/1.png"
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    profile_id = response.body.id;
    commentor_id = response.body._id;
  });

  test('GET /profile/:profile_id - retrieve profile', async () => {
    const response = await request(app)
      .get(`/profile/${profile_id}`);

    expect(response.status).toBe(200);
  });

  test('POST /comment/:profile_id - create comment', async () => {
    const response = await request(app)
      .post(`/comment/${profile_id}`)
      .send({
        commentorId: commentor_id,
        description: "Hello Elon Musk!",
        mbti: "INTP",
        enneagram: "3w4",
        zodiac: "Leo"
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    comment_id = response.body._id;
  });

  test('PUT /comment/like/:comment_id - like comment', async () => {
    const response = await request(app)
      .put(`/comment/like/${comment_id}`)
      .send({ fanId: commentor_id });

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toContain(commentor_id);
  });

  test('PUT /comment/unlike/:comment_id - unlike comment', async () => {
    const response = await request(app)
      .put(`/comment/unlike/${comment_id}`)
      .send({ fanId: commentor_id });

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).not.toContain(commentor_id);
  });
});
