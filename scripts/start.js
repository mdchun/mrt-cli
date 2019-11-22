process.env.NODE_ENV = 'development'

const webpack = require('webpack')
const logger = require('../lib/logger')
const webpackDevServer = require('webpack-dev-server')
const { cwdPath } = require('../lib/util')
const serverConfig = require('../config/webpack.config.dev')

const compiler = webpack(serverConfig)

const server = new webpackDevServer(compiler, {
  publicPath: serverConfig.output.publicPath,
  hot: true,
  hotOnly: true,
  stats: 'minimal',
  contentBase: cwdPath('./dist'),
  open: true,
  historyApiFallback: true
})

const defaults = {
  host: '0.0.0.0',
  port: 8080,
  https: false
}

server.listen(defaults.port, defaults.host, err => {
  if (err) {
    logger.error(err)
    process.exit(1)
  }
  const url = `http://localhost:${defaults.port}`
  return logger.log(`Development server started. Visit ${url}`)
})

// 也可用下面方式
// app.use(
// 	webpackDevMiddleware(compiler, {
// 		publicPath: serverConfig.output.publicPath,
// 		hot: true,
// 		stats: 'minimal'
// 	})
// )

// app.use(webpackHotMiddleware(compiler))

// const PORT = process.env.PORT || 3233

// app.listen(PORT, err => {
// 	if (err) {
// 		return logger.error(err)
// 	}
// 	const url = `http://localhost:${PORT}`
// 	return logger.log(`Development server started. Visit ${url}`)
// })
