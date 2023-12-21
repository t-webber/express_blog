//
// Modules
//

// const constants = require('./modulesFolder/constants.js');
const usersModule = require('./modulesFolder/users.js');
const errorModule = require('./modulesFolder/error.js');
const blogModule = require('./modulesFolder/blog.js');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

//
// Constants
//

const app = express();
const jsonParser = bodyParser.json();

//
// Settings
//

app.set('view engine', 'ejs');
app.set('views', 'viewsFolder');

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

app.use(express.static('publicFolder'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

//
// Variables
//

var user = {connected: false};

//
// Main
//

app.get('/', (req, res) => {
  console.log(user);
  res.render('common/main', {pagetitle: 'Home', user, filepath: 'main/home'});
});

app.get('/index', (req, res) => res.redirect('/'));
app.get('/home', (req, res) => res.redirect('/'));
app.get('/main', (req, res) => res.redirect('/'));

app.get('/about', (req, res) => {
  res.render('common/main', {
    pagetitle: 'About',
    user,
    filepath: 'main/about',
  });
});

app.get('/contact', (req, res) => {
  res.render('common/main', {
    pagetitle: 'Contact',
    user,
    filepath: 'main/contact',
  });
});
//
// Blog
//

app.get('/blog', async (req, res) => {
  var blogs = [];
  await blogModule.funlistBlogs(blogs);
  res.render('common/main', {
    pagetitle: 'Blog',
    user,
    filepath: 'blog/home',
    blogs,
    blog: true,
  });
});

app.get('/blog/index', (req, res) => res.redirect('/blog'));
app.get('/blog/home', (req, res) => res.redirect('/blog'));
app.get('/blog/main', (req, res) => res.redirect('/blog'));

app.post('/blog/create', (req, res) => {
  blogModule.createBlog(req, res, user);
});

app.get('/blog/create', (req, res) => {
  res.render('common/main', {
    pagetitle: 'Create',
    user,
    filepath: 'blog/create',
    blog: true,
  });
});

app.get('/blog/edit/:id', async (req, res) => {
  const id = req.params.id;
  const elts = id.toString().split('_');
  const data = await blogModule.getBlogContent(req, res, user, id);
  console.log(' ====== EDITING ====== ');
  console.log(data);
  res.render('common/main', {
    pagetitle: 'Edit',
    user,
    filepath: 'blog/edit',
    blog: {id, title: elts[0], author: elts[1], body: data},
  });
});

app.post('/blog/edit/:id', (req, res) => {
  blogModule.editBlog(req, res, user);
});

app.get('/blog/delete/:id', (req, res) => {
  if (!user.connected) {
    errorModule.error(res, user, '', 'Please connect to delete a blog', 403);
  } else {
    blogModule.deleteBlog(req, res, user);
  }
});

//
// Apps
//

app.get('/apps', (req, res) => {
  res.render('common/main', {pagetitle: 'Apps', user, filepath: 'main/apps'});
});

app.get('/apps/calculator', (req, res) => {
  res.render('common/main', {
    pagetitle: 'Calculator',
    user,
    filepath: 'apps/calculator',
  });
});

app.get('/apps/todo', (req, res) => {
  res.render('common/main', {
    pagetitle: 'To-Do List',
    user,
    filepath: 'apps/todo',
  });
});

app.get('/apps/counter', (req, res) => {
  res.render('common/main', {
    pagetitle: 'Counter',
    user,
    filepath: 'apps/counter',
  });
});

//
// Connexion
//

app.get('/profile', (req, res) => {
  if (!user.connected) {
    res.redirect('/connexion');
  }
  res.render('common/main', {
    pagetitle: 'Profile',
    user,
    filepath: 'main/profile',
  });
});

app.get('/connexion', (req, res) => {
  user = {connected: false};
  res.render('common/main', {
    pagetitle: 'Profile',
    user,
    filepath: 'main/connexion',
  });
});

app.get('/deconnexion', (req, res) => {
  res.redirect('/connexion');
});

app.post('/signIn', jsonParser, async (req, res) => {
  console.log(' ===================== Signing In ===================== ');
  usersModule.checkUser(req.body, res, user);
});

app.post('/signUp', jsonParser, async (req, res) => {
  console.log(' ===================== Signing Up ===================== ');
  usersModule.createUser(req.body, res, user);
});

//
// Catch 404
//

app.use((req, res) => {
  // res.render('common/main', {
  //   pagetitle: '404',
  //   user,
  //   filepath: 'main/404',
  //   err: '',
  //   code: 404,
  //   message: 'Page not found',
  // });
  errorModule.error(res, user, '', 'Page not found', 404);
});
