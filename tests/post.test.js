const Code = require("@hapi/code");
const Lab = require("@hapi/lab");

const { init } = require("../server");

const { expect } = Code;
const { before, describe, it } = (exports.lab = Lab.script());

describe("POST /contacts", () => {
  let resp;

  describe("Quando mando um payload é null", () => {
    before(async () => {
      var server = await init();

      resp = await server.inject({
        method: "post",
        url: "/contacts",
        payload: null,
      });
    });

    it("Deve retornar status code 400", async () => {
      expect(resp.statusCode).to.equal(400);
    });
  });

  describe("Quando mando um payload Ok", () => {
    before(async () => {
      var server = await init();

      let contact = {
        name: "Rafael",
        number: "1999999999",
        description: "Lorem Ipsum Test",
      };

      resp = await server.inject({
        method: "post",
        url: "/contacts",
        payload: contact,
      });
    });

    it("Deve retornar status code 200", async () => {
      expect(resp.statusCode).to.equal(200);
    });

    it("Deve retornar o id do contato", async () => {
      expect(resp.result._id).to.be.a.object();
      expect(resp.result._id.toString().length).to.equal(24);
    });
  });

  describe("Quando o payload não tiver o campo nome", () => {
    before(async () => {
      var server = await init();

      let contact = {
        number: "1999999999",
        description: "Lorem Ipsum Test",
      };

      resp = await server.inject({
        method: "post",
        url: "/contacts",
        payload: contact,
      });
    });

    it("Deve retornar status code 409", async () => {
      expect(resp.statusCode).to.equal(409);
    });

    it("Deve retornar uma mensagem", async () => {
      expect(resp.result.message).to.equal("Name Is required.");
    });
  });

  describe("Quando nome estiver em branco", () => {
    before(async () => {
      var server = await init();

      let contact = {
        name: "",
        number: "1999999999",
        description: "Lorem Ipsum Test",
      };

      resp = await server.inject({
        method: "post",
        url: "/contacts",
        payload: contact,
      });
    });

    it("Deve retornar status code 409", async () => {
      expect(resp.statusCode).to.equal(409);
    });

    it("Deve retornar uma mensagem", async () => {
      expect(resp.result.message).to.equal("Name Is required.");
    });
  });

  describe("Quando o payload não tiver o campo number", () => {
    before(async () => {
      var server = await init();

      let contact = {
        name: "José",
        description: "Lorem Ipsum Test",
      };

      resp = await server.inject({
        method: "post",
        url: "/contacts",
        payload: contact,
      });
    });

    it("Deve retornar status code 409", async () => {
      expect(resp.statusCode).to.equal(409);
    });

    it("Deve retornar uma mensagem", async () => {
        expect(resp.result.message).to.equal("Number Is required.");
      });
  });

  describe("Quando o numero estiver em branco", () => {
    before(async () => {
      var server = await init();

      let contact = {
        nome: "Rafa",
        number: "",
        description: "Lorem Ipsum Test",
      };

      resp = await server.inject({
        method: "post",
        url: "/contacts",
        payload: contact,
      });
    });

    it("Deve retornar status code 409", async () => {
      expect(resp.statusCode).to.equal(409);
    });

    it.skip("Deve retornar uma mensagem", async () => {
        expect(resp.result.message).to.equal("Number Is required.");
      });
  });

  describe("Quando o payload não tiver o campo description", () => {
    before(async () => {
      var server = await init();

      let contact = {
        name: "José",
        number: "1999999999",
      };

      resp = await server.inject({
        method: "post",
        url: "/contacts",
        payload: contact,
      });
    });

    it("Deve retornar status code 409", async () => {
      expect(resp.statusCode).to.equal(409);
    });

    it("Deve retornar uma mensagem", async () => {
        expect(resp.result.message).to.equal("Description Is required.");
      });
  });

  describe("Quando o campo description estiver em branco", () => {
    before(async () => {
      var server = await init();

      let contact = {
        name: "José",
        number: "1999999999",
        description: "",
      };

      resp = await server.inject({
        method: "post",
        url: "/contacts",
        payload: contact,
      });
    });

    it("Deve retornar status code 409", async () => {
      expect(resp.statusCode).to.equal(409);
    });

    it("Deve retornar uma mensagem", async () => {
        expect(resp.result.message).to.equal("Description Is required.");
      });
  });
});
