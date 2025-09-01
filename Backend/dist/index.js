"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: "*" }));
app.get("/", (req, res) => {
    res.json({ message: "Server is up and running" });
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port http://locahost:${port}`);
});
//# sourceMappingURL=index.js.map