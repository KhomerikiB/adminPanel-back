const router = require("express").Router();
const Category = require("../models/category");
const { checkCategoryValidation } = require("../service/category/validation");
router.post("/add", async (req, res) => {
  const { title, submenu } = req.body;
  const result = await checkCategoryValidation(title, submenu);

  if (result.mainSlug || result.childSlugs) {
    return res.status(401).json({ error: "Slug exists" });
  }
  const createCategory = new Category({
    title: result.title,
    slug: result.title,
    submenu: result.submenu
  });
  try {
    await createCategory.save();
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(404).json({ error });
  }
});

router.get("/all", async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json({ categories });
  } catch (error) {
    res.status(404).json({ error });
  }
});
router.delete("/remove/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Category.deleteOne({ _id: id });
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(401).json({ error });
  }
});
module.exports = router;
