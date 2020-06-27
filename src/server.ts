import express from 'express'
import dotenv from 'dotenv'

// initialize configuration
dotenv.config()

const app: express.Application = express()
const port = process.env.SERVER_PORT

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started at http://localhost:${port}`)
})
