const { expect } = require("chai");
const ClassMatcherCrcClass = require("../../../../lib/crc/descriptors/class-matcher-crc-class");
const Polygon = require("../../../fixtures/crc/class-declaration/polygon.js");
const Square = require("../../../fixtures/crc/class-declaration/square.js");
const context = require("../../../fixtures/crc/class-declaration/context.json");

describe("ClassMatcherCrcClass", () => {
  describe("overrides the static CrcClass.factory function and", () => {
    it("creates a CrcClass from context", () => {
      const crcClass = ClassMatcherCrcClass.factory(context);

      expect(crcClass.name).to.equal("Polygon");
      expect(crcClass.superClass).to.be.null;
      expect(crcClass.code).to.equal(context.code);
    });
  });
});
