const express = require('express');
const router = express.Router();
const {protect} = require('../middlewares/auth');
const {
    getArticles,
    createArticle,
    deleteArticle,
    updateArticle,
    articlesFeed,
    getArticle,
    addFavoriteArticle,
    deleteFavoriteArticle
} = require("../controllers/articles");

router
    .route("/articles")
    .get(protect, getArticles)
    .post(protect, createArticle);

router.route("/articles/feed").get(protect, articlesFeed);
router.route("/articles/:slug")
    .get(protect, getArticle)
    .put(protect, updateArticle)
    .delete(protect, deleteArticle);

router
    .route("/articles/:slug/favorite")
    .post(protect, addFavoriteArticle)
    .delete(protect, deleteFavoriteArticle);

module.exports = router;