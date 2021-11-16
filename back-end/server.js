const express = require('express')
const app = express()
const port = process.env.PORT || 5000
app.use(express.static('front-end/build'))
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})