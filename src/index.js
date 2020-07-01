const { addHook } = require('pirates')
const fs = require('fs')

const matcher = (filename) => true
const hook = (code, filename) => `
  const fs = require('fs')
  const templateEngine = ${templateEngine.toString()}
  module.exports = (data) => templateEngine(data, '${filename}')
`

const templateEngine = (data, templatePath) => {
  var template = fs.readFileSync(templatePath).toString()

  if (typeof data != 'object') throw new Error('Invalid data for template. Must be object.')

  for (var propertyName in data) {
    var type = typeof data[propertyName]
    if (type != 'string' && type != 'number')
      throw new Error(`Invalid data on attibute ${propertyName}. Must be string or number.`)

    var re = new RegExp(`{{${propertyName}}}`, 'g')
    template = template.replace(re, data[propertyName])
  }

  return template
}

addHook(hook, { exts: ['.chop'], matcher })

module.exports = templateEngine
