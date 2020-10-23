"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
const typeorm_1 = require("typeorm");
const connect_redis_1 = __importDefault(require("connect-redis"));
const ioredis_1 = __importDefault(require("ioredis"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const Post_1 = require("./entities/Post");
const User_1 = require("./entities/User");
const Updoot_1 = require("./entities/Updoot");
const hello_1 = require("./resolvers/hello");
const post_1 = require("./resolvers/post");
const user_1 = require("./resolvers/user");
const createUserLoader_1 = require("./utils/createUserLoader");
const createUpdootLoader_1 = require("./utils/createUpdootLoader");
const PORT = process.env.PORT || 4000;
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const conn = yield typeorm_1.createConnection({
        type: "postgres",
        url: constants_1.DATABASE_URL ||
            `postgres://${constants_1.DBUSERNAME}:${constants_1.DBPASSWORD}@localhost:5432/${constants_1.DBNAME}`,
        logging: true,
        synchronize: true,
        migrations: [path_1.default.join(__dirname, "./migrations/*")],
        entities: [Post_1.Post, User_1.User, Updoot_1.Updoot],
    });
    yield conn.runMigrations();
    const app = express_1.default();
    const RedisStore = connect_redis_1.default(express_session_1.default);
    const redis = new ioredis_1.default(constants_1.REDIS_URL);
    app.use(cors_1.default({
        origin: constants_1.CLIENT_ORIGIN,
        credentials: true,
    }));
    app.use(express_session_1.default({
        name: constants_1.COOKIE_NAME,
        store: new RedisStore({
            client: redis,
            disableTouch: true,
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            httpOnly: true,
            sameSite: "lax",
            secure: constants_1.__prod__,
        },
        saveUninitialized: false,
        secret: constants_1.SECRET,
        resave: false,
    }));
    app.get("/", (_, res) => {
        res.send("hello");
    });
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
            resolvers: [hello_1.HelloResolver, post_1.PostResolver, user_1.UserResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({
            req,
            res,
            redis,
            userLoader: createUserLoader_1.createUserLoader(),
            updootLoader: createUpdootLoader_1.createUpdootLoader(),
        }),
    });
    apolloServer.applyMiddleware({ app, cors: false });
    app.listen(PORT, () => {
        console.log(`server started on localhost:${PORT}`);
    });
});
main().catch((error) => {
    console.error(error);
});
//# sourceMappingURL=index.js.map