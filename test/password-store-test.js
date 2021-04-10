const { expect } = require("chai");

describe("PasswordStore", () => {
  it("Should return the added entries", async () => {
    const PasswordStore = await ethers.getContractFactory("PasswordStore");
    const passwordStore = await PasswordStore.deploy();

    await passwordStore.deployed();
    expect(await passwordStore.getEntries()).to.be.an("array").that.is.empty;
    await passwordStore.addEntry("Test Entry");
    expect(await passwordStore.getEntries()).to.include("Test Entry");
  });
});
