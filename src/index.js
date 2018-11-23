const Koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views');

const app = new Koa();

const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);

const router = new Router();

// Default render ** must be used before router **
app.use(views(__dirname + '/../public', {
  map: {
    html: 'nunjucks',
  }
}));

router.get('/', (ctx, next) => {
  return ctx.render('index.html');
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

app.use(router.routes());
app.use(router.allowedMethods());

app.start = (port = 3000) => {
  server.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
  });
}

module.exports = app;