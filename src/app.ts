import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import express from "express";
import hbs from "express-handlebars";
import { exec } from "child_process";

import { Schema } from "./graphql/Schema.js";
import PostModel from "./PostModel.js";

const app = express();
const server = createServer(app);

app.use(express.static("public"));
app.use(cookieParser());
app.use(bodyParser.json());

app.engine(
    "hbs",
    hbs({
        extname: "hbs",
    })
);
app.set("view engine", "hbs");
app.set("views", "./views");

// graphql routes
const schema = await Schema();
const apolloServer = new ApolloServer({
    context: ({ req }) => ({ req }),
    csrfPrevention: true,
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer: server })],
});
await apolloServer.start();
apolloServer.applyMiddleware({ app });

// main entry point
app.get("/", (_req, res) => {
    res.render("index");
    return;
});

app.get("/test", (_req, res) => {
    exec("docker run test-python-runner:0.0.1 abc", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });    
    res.render("index");
    return;
})

await PostModel.sync();

server.listen(process.env.PORT || 3434, () => null);
