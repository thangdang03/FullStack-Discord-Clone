const registers = require("./ath/register.rt");
const login = require("./ath/index");
const verify = require("./ath/verify.rt");
const reset = require("./ath/reset.rt");
const handel = require("./ath/handel.token");
const logout = require("./ath/logout");
const server = require("./server/index");
const user = require("./user/index");
const invite = require("./invite/index");
const member = require("./member/index");
const channel = require("./channel/index");
const message = require("./message/index");
const videoCall = require("./videoCall/index");

const Router = (app) => {
    app.use("/api/ath/register",registers);
    app.use("/api/ath/verify",verify);
    app.use("/api/ath/login",login);
    app.use("/api/ath/reset",reset);
    app.use("/api/ath/handel",handel);
    app.use("/api/ath/logout",logout);
    app.use("/api/server",server);
    app.use("/api/invite",invite);
    app.use("/api/user",user);
    app.use("/api/member",member);
    app.use("/api/channel",channel);
    app.use("/api/video",videoCall);
    app.use("/api/message",message);
};

module.exports = Router;