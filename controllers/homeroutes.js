const router = require("express").Router();
const getAuth = require("../utils/helpers");
const { User, Article } = require("../models");

// homepage
router.get("/", async (req, res) => {
  try {
    const articleData = await Article.findAll({
      include: [{ model: User, attributes: ["name"] }],
    });
    const articles = articleData.map((article) => article.get({ plain: true }));
    res.render("homepage", { articles });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// get login page
router.get("/login", async (req, res) => {
  try {
    res.render("login");
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//dashboard
router.get("/dashboard", getAuth, async (req, res) => {
  try {
    if (!req.session.loggedIn) {
      res.redirect("/login");
      return;
    }
    const articleData = await Article.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [{ model: User, attributes: ["name"] }],
    });
    const articles = articleData.map((article) => article.get({ plain: true }));
    res.render("dashboard", { articles });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// post article
router.post("/", async (req, res) => {
  try {
    const articleData = await Article.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(articleData);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
