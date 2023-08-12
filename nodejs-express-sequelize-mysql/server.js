const express = require('express');
require('dotenv').config();
const sequelize = require('./util/database');
const morgan = require('morgan');
const {errorHandler} = require("./middlewares/errorHandler");

//Import Models
const User = require("./models/User");
const Article = require("./models/Article");
const Tag = require("./models/Tag");
const Comment = require("./models/Comments");

const app = express();
const port = process.env.PORT || 8080;

//Body parser
app.use(express.json());
app.use(morgan('dev'));

//Handle CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "Content-Type, Origin, X-Requested-With, Accept, Authorization");

    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({message: "CORS pass"});
    }

    next();
});

//Route files
const articles = require("./routes/articles");
const users = require("./routes/users");
const tags = require("./routes/tags");
const comments = require("./routes/comments");
const profiles = require("./routes/profiles");
//Mount routes
app.use(articles);
app.use(users);
app.use(tags);
app.use(comments);
app.use(profiles);

app.use(errorHandler)
//Relation database
User.belongsToMany(User, {
    as: "followers",
    through: "Followers",
    foreignKey: 'userId',
    timestamps: false
});

User.belongsToMany(User, {
    as: "following",
    through: "Followers",
    foreignKey: "followerId",
    timestamps: false
});

User.hasMany(Article, {
    foreignKey: 'authorId',
    onDelete: "CASCADE",
});

Article.belongsTo(User, {
    as: "author",
    foreignKey: "authorId"
});

User.hasMany(Comment, {
    foreignKey: "authorId",
    onDelete: "CASCADE"
});

Comment.belongsTo(User, {
    as: 'author',
    foreignKey: "authorId"
});

Article.hasMany(Comment, {
    foreignKey: "articleId",
    onDelete: "CASCADE"
});

Comment.belongsTo(Article, {foreignKey: "articleId"});

User.belongsToMany(Article, {
    as: "favorites",
    through: "Favorites",
    timestamps: false
});

Article.belongsToMany(User, {
    through: "Favorites",
    foreignKey: 'articleId',
    timestamps: false
});

Article.belongsToMany(Tag, {
    through: "TagLists",
    as: "tagLists",
    foreignKey: "articleId",
    timestamps: false,
    onDelete: "CASCADE"
})
Tag.belongsToMany(Article, {
    through: "ArticleTags",
    uniqueKey: false,
    timestamps: false
});

const sync = async () => await sequelize.sync({force: true});
sync().then(() => {
    User.create({
        email: "test@test.com",
        password: "123456",
        username: "neo",
    });
    User.create({
        email: "test2@test.com",
        password: "123456",
        username: "celeb_neo4",
    });
    User.create({
        email: "test3@test.com",
        password: "123456",
        username: "celeb_neo3",
    });
    User.create({
        email: "test4@test.com",
        password: "123456",
        username: "celeb_neo2",
    });
    User.create({
        email: "test5@test.com",
        password: "123456",
        username: "celeb_neo1",
    });
});

app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});
