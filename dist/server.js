"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
// initialize configuration
dotenv_1.default.config();
const app = express_1.default();
const port = process.env.SERVER_PORT;
app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server started at http://localhost:${port}`);
});
