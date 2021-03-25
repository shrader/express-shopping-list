const app = require("./app");
const request = require("supertest")

const items = require("./fakeDb");
const testObj = {name: "carrot", price: "$1.00"};

beforeEach( () => {
  items.add(testObj);
  items.add({name: "banana", price: "$0.50"})
});

afterEach( () => {
  items.deleteAll();
});

describe("should correctly call methods", () => {
  test("gets all items", async () => {
    const resp = await request(app).get('/items');
    
    expect(resp.body.length).toEqual(2);
    expect(resp.statusCode).toEqual(200);
  });

  test("adds new item", async () => {
    const resp = await request(app).post('/items').send({name: "pizza", price: "$10.00"});

    expect(resp.body).toEqual({name: "pizza", price: "$10.00"});
    expect(resp.statusCode).toEqual(201);
  });

  test("gets specific item", async () => {
    const resp = await request(app).get('/items/carrot');

    expect(resp.body).toEqual(testObj);
    expect(resp.statusCode).toEqual(200);
  });

  test("updates specific item", async () => {
    const resp = await request(app).patch('/items/carrot').send({name: "carrot", price: "$3.00"});

    expect(resp.body).toEqual({name: "carrot", price: "$3.00"});
    expect(resp.statusCode).toEqual(200);
  });

  test("deletes specific item", async () => {
    const resp = await request(app).delete('/items/carrot');

    expect(resp.body).toEqual({ message: "Deleted" });
    expect(resp.statusCode).toEqual(200);
  });


});