const { replaceCharacters, replaceSpace } = require("../../validation/regex");
const Category = require("../../models/category");
const checkMainSlug = async title => {
  const slugExists = await Category.find({
    $or: [
      { title },
      {
        submenu: {
          $elemMatch: { slug: title }
        }
      }
    ]
  });

  if (slugExists.length > 0) {
    return true;
  } else return false;
};

const checkSubmenuSlug = async submenu => {
  let childSlugs = [];
  if (submenu && submenu.length > 0) {
    submenu.forEach(inner => {
      childSlugs.push(inner.slug);
    });
  }
  const slugChildExists = await Category.find({
    $or: [
      {
        submenu: {
          $elemMatch: { slug: childSlugs }
        }
      },
      { title: childSlugs }
    ]
  });
  if (slugChildExists.length > 0) {
    return true;
  } else {
    return false;
  }
};

const checkCategoryValidation = async (title, submenu) => {
  title = replaceCharacters(title).toLowerCase();
  submenu = submenu.map(inner => {
    return {
      title: replaceCharacters(inner.title).toLowerCase(),
      slug: replaceSpace(replaceCharacters(inner.title)).toLowerCase()
    };
  });
  const mainResult = await checkMainSlug(title);
  const childResult = await checkSubmenuSlug(submenu);
  return {
    title,
    submenu,
    mainSlug: mainResult,
    childSlugs: childResult
  };
};
module.exports = { checkCategoryValidation };
