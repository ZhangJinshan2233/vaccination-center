'use strict'

const http = require('http')

const api = require('./api')

const vulcanServer = http.Server(api)

vulcanServer.listen(process.env.PORT || 5000, () => {
    console.log('server is running')
})