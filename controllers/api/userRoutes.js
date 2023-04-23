const router = require("express").Router();
const { User, Article } = require("../../models/");

// login page route
router.get("/login", async (req, res) => {
  try {
    res.render("login");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// user signup route
router.post("/", async (req, res) => {
  try {
    const userData = await User.create({
      name: req.body.name,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });

    res.status(200).json({ user: userData, message: "You are now registered!" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// user login route
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        name: req.body.name,
      },
    });

    if (!userData) {
      res.status(400).json({ message: "Incorrect username or password" });
      return;
    }

    const validPw = await userData.checkPassword(req.body.password);

    if (!validPw) {
      res.status(400).json({ message: "Incorrect username or password" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.name = userData.name;
      req.session.logged_in = true;

      res
        .status(200)
        .json({ user: userData, message: "You are now logged in!" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// user logout route
router.post("/logout", async (req, res) => {
  try {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
