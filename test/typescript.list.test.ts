/// <reference path="../typings/main.d.ts" />
import chai = require("chai");
import sinon = require("sinon");
import sinonChai = require("sinon-chai");
let should = chai.should();
chai.use(sinonChai);

import {List, IList} from "../src/typescript.list";

interface IItem {
    FirstName: string;
    LastName: string;
}

describe("List", () => {
    it("Event should have static default limit of 10 listerens", () => {
       var AddressBook = new List<IItem>();
       AddressBook.push({
           FirstName: "John",
           LastName: "doe"
       });
       AddressBook.push({
           FirstName: "Silke",
           LastName: "de Jong"
        });
       
       let FirstName = "John";
       let filter = (item: IItem, value) => item.FirstName === FirstName;
       let John = AddressBook.where(filter, FirstName);
       John[0].FirstName.should.eql(FirstName);
    });
});
