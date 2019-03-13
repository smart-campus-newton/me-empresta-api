const db = require("./models/index");
const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// USERS
app.get("/users", function(req, res) {
  db.User.findAll().then(users => {
    res.send(users);
  });
});
app.get("/users/:id", function(req, res) {
  db.User.findByPk(req.params.id).then(user => {
    res.send(user);
  });
});
app.post("/users", function(req, res) {
  db.User.create(req.body).then(user => {
    res.send(`UserId.: ${user.id}`);
  });
});

// POSTS
app.get("/posts", function(req, res) {
  db.Post.findAll({
    include: [{
      model: db.User
    }]
  }).then(posts => {
    res.send(posts);
  });
});
app.post("/posts", function(req, res) {
  db.Post.create(req.body)
    .then(post => {
      res.send(`PostId.: ${post.id}`);
    })
    .catch(err => {
      console.error(err);
    });
});

app.listen(port, () => console.log(`listening on port ${port}!`));
