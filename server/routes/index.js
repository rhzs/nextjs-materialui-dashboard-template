
function registerRoutes(app, server) {
  server.get('/', (req, res)=> {

    const data = {
      
    };

    app.render(req, res, '/index', data);
  });

  const handle = app.getRequestHandler();

  // Fall-back on other next.js assets.
  server.get('*', (req, res) => {
    return handle(req, res);
  });
}

module.exports = registerRoutes;
