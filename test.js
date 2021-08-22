const mongoose = require("mongoose");
const app = require("./server");
const request = require("supertest");

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose.connect("mongodb://localhost:27017/testing", options);

const {User} = require("./db/models/user");

describe("does Jest work", () => {
  test("pulse check", () => {
    expect(1).toBe(1);
  });
});

beforeAll(async () => {
    await User.remove();
  });
  afterEach(async () => {
    await User.remove();
  });
  afterAll(async () => {
    await User.remove();
    await mongoose.connection.close();
  });

describe("Testing the schema", () => {
    test("is model defined", () => {
        expect(User).toBeDefined();
    });

    
    test("will save a User", async () => {
    const userInfo = {
      nickName: "test",
      email: "test",
      password: "test",
      age: 22,
      city: "test",
      phoneNo: "test",
      IBAN: "test",
      role: "60c460bb1d246d3110e885fa",
    };
    const moh = new User(userInfo);
    await moh.save();

    const checkUser = await User.findOne({ nickName: "test" });
    expect(checkUser.nickName).toBe(userInfo.nickName);
  });
});

describe("Testing User APIs", () => {
    const userBody = {
        nickName: "test",
        email: "test",
        password: "test",
        age: 22,
        city: "test",
        phoneNo: "test",
        IBAN: "test",
        role: "60c460bb1d246d3110e885fa",
    };
    it("shuold be able to creat a user", async () => {
      const newuser = await await request(app).post("/user").send(userBody);
      expect(typeof newuser.body).toEqual(typeof userBody);
    });
  });

