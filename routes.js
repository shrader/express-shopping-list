const express = require("express");
const app = require("./app");
const { NotFoundError } = require("./expressError");
const items = require("./fakeDb");
const router = new express.Router();


/** GET /users: get list of users */
router.get("/", function (req, res, next) {
  return res.json(items.all());
});

router.get("/:name", function (req, res, next) {
  if ( items.get(req.params.name)) {
    return res.json(items.get(req.params.name))
  } else {
    throw new NotFoundError()
  }
});

router.post('/', function (req, res, next){
  let item = req.body;
  return res.status(201).json(items.add(item));
});

router.patch('/:name', function(req, res, next){
  if (items.updateItem(req.params.name, req.body ) ) {
    return res.json(items.updateItem(req.params.name, req.body))
  } else {
    throw new NotFoundError()
  }
});

/** DELETE /users/[id]: delete user, return {message: Deleted} */
router.delete("/:name", function (req, res, next) {
  items.delete(req.params.name);
  if (items.delete) {
    return res.json({ message: "Deleted" });
  } else {
  throw new NotFoundError();
  }
});

module.exports = router;