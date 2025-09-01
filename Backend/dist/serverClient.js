"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverClient = exports.apiSecret = exports.apiKey = void 0;
const stream_chat_1 = require("stream-chat");
exports.apiKey = process.env.STREAM_APOI_KEY;
exports.apiSecret = process.env.STREAM_API_SECRET;
if (!exports.apiKey || !exports.apiSecret) {
    throw new Error("Missing required environment variables for STREAM_API and STREAM_API_SECRET");
}
exports.serverClient = stream_chat_1.StreamChat.getInstance(exports.apiKey, exports.apiSecret);
//# sourceMappingURL=serverClient.js.map