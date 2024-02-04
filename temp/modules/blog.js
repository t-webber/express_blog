const fs = require("fs");
const errorModule = require("./error.js");
const blogPath = "./data/blog/";

if (!fs.existsSync(blogPath)) {
  fs.mkdirSync(blogPath, { recursive: true });
}

function createBlog(req, res, user) {
  console.log("Creating blog with fields = ", req.body);
  const id = req.body.title + ";" + req.body.author;
  const path = blogPath + id + ".txt";

  if (!fs.existsSync(path)) {
    fs.writeFile(path, req.body.body, (err) => {
      if (err) {
        errorModule.error(res, user, err, "In Create Function", 500);
      }
      console.log("The blog was successfully created");
      res.redirect("/blog");
    });
  } else {
    errorModule.error(
      res,
      user,
      "",
      "This blog already exists. Please consider changing the title.",
      409
    );
  }
}

async function getBlogContent(req, res, user, id) {
  return new Promise((resolve, reject) => {
    console.log("Getting blog id = ", id);
    const path = blogPath + req.params.id + ".txt";
    if (fs.existsSync(path)) {
      fs.readFile(path, (err, data) => {
        if (err) {
          errorModule.error(res, user, err, "In Get Function", 500);
        }
        console.log("The blog was successfully read");
        console.log(data.toString());
        resolve(data.toString());
      });
    } else {
      errorModule.error(res, user, "", "This blog doesn't exists", 404);
      reject(new Error("The blog doesn't exists"));
    }
  });
}

function editBlog(req, res, user) {
  console.log("Editing blog id = ", req.params.id);
  const path = blogPath + req.params.id + ".txt";
  if (fs.existsSync(path)) {
    fs.writeFile(path, req.body.body, (err) => {
      if (err) {
        errorModule.error(res, user, err, "In Edit Function", 500);
      }
      console.log("The blog was successfully edited");
      res.redirect("/blog");
    });
  } else {
    errorModule.error(res, user, "", "This blog doesn't exists", 404);
  }
}

function deleteBlog(req, res, user) {
  console.log("Delete called");
  const path = blogPath + req.params.id + ".txt";
  if (fs.existsSync(path)) {
    fs.unlink(path, (err) => {
      if (err) {
        errorModule.error(res, user, err, "In Delete Function", 500);
      }
      console.log("File deleted");
      res.redirect("/blog");
    });
  } else {
    errorModule.error(res, user, "", "This blog doesn't exists", 404);
  }
}

async function pushesABlog(listBlogs, file) {
  return new Promise((resolve, reject) => {
    fs.readFile(blogPath + file, (err, data) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      const elts = file.split(";");
      console.log("Creating blog on");
      console.log(elts);
      listBlogs.push({
        id: file.slice(0, -4),
        title: elts[0],
        author: elts[1].slice(0, -4),
        body: data.toString(),
      });
      resolve();
    });
  });
}

async function completes(listBlogs, filenames) {
  for (const file of filenames) {
    await pushesABlog(listBlogs, file);
  }
}

async function funlistBlogs(listBlogs) {
  const filenames = fs.readdirSync(blogPath);

  console.log("reading started");
  console.log(filenames);

  await completes(listBlogs, filenames);

  console.log("reading ended");
  return listBlogs;
}

module.exports = {
  funlistBlogs,
  createBlog,
  editBlog,
  deleteBlog,
  getBlogContent,
};
