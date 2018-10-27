const express = require('express')
const app = express()
const nunjucks = require('nunjucks')
const path = require('path')
const stylus = require('stylus')
const controller = require('./controller')

app.set('views', path.join(__dirname, 'views'))

nunjucks.configure(path.resolve(__dirname, 'views'),{
  autoescape: true,
  express: app,
  watch: true
})

.addFilter('substring', (str,num=120) => {
  let substring = str.substring(0, num)
  if(str.length > num){
    return substring.concat('...')
  }
  return substring
})

app.set('view engine', 'njk')
app.use(stylus.middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => controller(req, res))


app.listen(3000, () => console.log(`Rodando na porta 3000`))