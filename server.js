const { createServer } = require('http')
const { join } = require('path')
const { URL } = require('url')
const next = require('next')

const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    createServer((req, res) => {
      var baseURL = 'http://' + req.headers.host + '/'
      const parsedUrl = new URL(req.url, baseURL)
      const { pathname } = parsedUrl
      // handle GET request to /service-worker.js
      if (pathname === '/service-worker.js') {
        const filePath = join(__dirname, '.next', 'static', pathname)
        app.serveStatic(req, res, filePath)
      } else {
        handle(req, res, parsedUrl)
      }
    })
      .listen(3000, () => {
        console.log(`> Ready on http://localhost:${3000}`)
      })
  })
