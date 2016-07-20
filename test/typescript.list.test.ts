/// <reference path="../typings/main.d.ts" />
import chai = require("chai");
import sinon = require("sinon");
import sinonChai = require("sinon-chai");
let should = chai.should();
chai.use(sinonChai);

import {List} from "../src/typescript.list";

interface Item {
    Name: string;
}

describe("List", () => {
    it("List should eql Array", () => {
       let Name1: Item = { Name: "Name1" };
       let Name2: Item = { Name: "Name2"  };
       let list = new List<Item>();
       list.push(Name1);
       list.push(Name2);
       let array = new Array<Item>();
       array.push(Name1);
       array.push(Name2);
       list.should.eql(array);
    });
    it("invoke Where(filter, value) should return filetered list", () => {
       let Name1: Item = { Name: "Name1" };
       let Name2: Item = { Name: "Name2"  };
       let list = new List<Item>();
       list.push(Name1);
       list.push(Name2);
       let filter = (item: Item, value: string) => item.Name === value;
       let name = "Name1";
       let filteredList = list.where(filter, name);
       filteredList.length.should.eql(1);
       filteredList[0].Name.should.eql(name);

    });
});
