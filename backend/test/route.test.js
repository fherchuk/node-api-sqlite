const { describe, it } = require("mocha");
const request = require("supertest");
const app = require("../app");
const subscriber = require("../models/subscriberModel");

describe("Subscriber Routes", () => {
  describe("GET /api/subscribers", () => {
    it("should return all subscribers", async () => {
      const response = await request(app).get("/api/subscribers");
      if (response.status !== 200) {
        throw new Error(
          "Expected status code 200, but received: " + response.status
        );
      }
      if (!Array.isArray(response.body)) {
        throw new Error("Expected response body to be an array");
      }
    });
  });

  describe("POST /api/subscribers", () => {
    it("should add a new subscriber", async () => {
      const newSubscriber = {
        id: 3,
        email: "testemail@g.com",
        name: "TEST",
      };
      const response = await request(app)
        .post("/api/subscribers")
        .send(newSubscriber);
      if (response.status !== 201) {
        throw new Error(
          "Expected status code 201, but received: " + response.status
        );
      }

      if (response.body.subscriber.email !== newSubscriber.email) {
        throw new Error(
          `Expected response body email to be ${newSubscriber.email} || Got: ${response.body.subscriber.email}`
        );
      }
      if (response.body.subscriber.name !== newSubscriber.name) {
        throw new Error(
          "Expected response body name to be " + newSubscriber.name
        );
      }
    });
  });

  describe("GET /api/subscribers/:id", () => {
    it("should return a specific subscriber", async () => {
      // Assuming you have an existing subscriber with ID "123"
      const subscriberId = 1;
      const response = await request(app).get(
        `/api/subscribers/${subscriberId}`
      );
      if (response.status !== 200) {
        throw new Error(
          "Expected status code 200, but received: " + response.status
        );
      }
      if (!response.body.id) {
        throw new Error("Expected response body to have an 'id' property");
      }
      if (response.body.id !== subscriberId) {
        throw new Error(
          `Expected response body id to be ${subscriberId}(${typeof subscriberId}) || Got: ${
            response.body.id
          }(${typeof response.body.id})`
        );
      }
    });
  });

  describe("PUT /api/subscribers/:id", () => {
    it("should update a specific subscriber", async () => {
      // Assuming you have an existing subscriber with ID "123"
      const subscriberId = "2";
      const updatedSubscriber = {
        id: subscriberId,
        email: "fherchook.uri.edu",
        name: "Rick",
      };
      const response = await request(app)
        .put(`/api/subscribers/${subscriberId}`)
        .send(updatedSubscriber);
      if (response.status !== 200) {
        throw new Error(
          "Expected status code 200, but received: " + response.status
        );
      }
      if (!response.body.updatedSubscriber.id) {
        throw new Error(
          `Expected response body to have an 'id' property || ${response.body.updatedSubscriber.id}`
        );
      }
      if (response.body.updatedSubscriber.id !== subscriberId) {
        throw new Error("Expected response body id to be " + subscriberId);
      }
      if (response.body.updatedSubscriber.email !== updatedSubscriber.email) {
        throw new Error(
          "Expected response body email to be " + updatedSubscriber.email
        );
      }
      if (response.body.updatedSubscriber.name !== updatedSubscriber.name) {
        throw new Error(
          "Expected response body name to be " + updatedSubscriber.name
        );
      }
    });
  });

  describe("DELETE /api/subscribers/:id", () => {
    it("should delete a specific subscriber", async () => {
      // Assuming you have an existing subscriber with ID "123"
      const subscriberId = "3";
      const response = await request(app).delete(
        `/api/subscribers/${subscriberId}`
      );
      if (response.status !== 200) {
        throw new Error(
          "Expected status code 200, but received: " + response.status
        );
      }
      if (response.body.message !== "Subscriber deleted") {
        throw new Error(
          "Expected response body message to be 'Subscriber deleted'"
        );
      }
    });
  });
});
