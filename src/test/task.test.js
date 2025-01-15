const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../src/app");
const Task = require("../src/models/Task");
const expect = chai.expect;

chai.use(chaiHttp);

describe("Tasks API", () => {
  beforeEach(async () => {
    await Task.deleteMany({});
  });

  describe("GET /api/tasks", () => {
    it("should get all tasks", async () => {
      const res = await chai.request(app).get("/api/tasks");
      expect(res).to.have.status(200);
      expect(res.body).to.have.property("success").equal(true);
      expect(res.body).to.have.property("data").to.be.an("array");
    });
  });

  describe("POST /api/task", () => {
    it("should create a new task", async () => {
      const task = {
        title: "Test Task",
        description: "Test Description",
      };

      const res = await chai.request(app).post("/api/task").send(task);

      expect(res).to.have.status(201);
      expect(res.body).to.have.property("success").equal(true);
      expect(res.body.data).to.have.property("title").equal(task.title);
    });

    it("should not create task without title", async () => {
      const task = {
        description: "Test Description",
      };

      const res = await chai.request(app).post("/api/task").send(task);

      expect(res).to.have.status(500);
      expect(res.body).to.have.property("success").equal(false);
    });
  });

  describe("PUT /api/task/:id", () => {
    it("should update a task", async () => {
      const task = new Task({
        title: "Test Task",
        description: "Test Description",
      });
      await task.save();

      const res = await chai
        .request(app)
        .put(`/api/task/${task._id}`)
        .send({ title: "Updated Task" });

      expect(res).to.have.status(200);
      expect(res.body.data).to.have.property("title").equal("Updated Task");
    });
  });

  describe("DELETE /api/task/:id", () => {
    it("should delete a task", async () => {
      const task = new Task({
        title: "Test Task",
        description: "Test Description",
      });
      await task.save();

      const res = await chai.request(app).delete(`/api/task/${task._id}`);

      expect(res).to.have.status(200);
      expect(res.body).to.have.property("success").equal(true);
    });
  });
});
