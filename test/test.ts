import path from "node:path";
import fs from "node:fs";

import { Zalo } from "../src/index.js";
const zalo = new Zalo({
    selfListen: true,
    logging: true,
});

const api = await zalo.login(JSON.parse(fs.readFileSync(path.resolve("./test/credentials.json"), "utf-8")));

const { listener } = api;

listener.on("connected", () => {
    console.log("Connected");
});

listener.on("closed", (code, reason) => {
    console.log("Closed:", code, reason);
});

listener.on("error", (error) => {
    console.error("Error:", error);
});


listener.on("voip", (data) => {
    console.log(data);
});

listener.on("message", () => {
    // console.log("Message:", message);
});

listener.start();
