const templateEngine = require('./index')

test('Should only accept data as object', () => {
  try {
    const template = templateEngine('invalid', __dirname + '/template.chop')
    expect(1).toBe(2)
  } catch (err) {
    expect(err.message).toBe('Invalid data for template. Must be object.')
  }
})

test('Should only accept string and number on data properties', () => {
  try {
    const template = templateEngine({ name: 'Raffa', age: 41, getBalance: () => 0 }, __dirname + '/template.chop')
    expect(1).toBe(2)
  } catch (err) {
    expect(err.message).toBe('Invalid data on attibute getBalance. Must be string or number.')
  }
})

test('Should render when all ok', () => {
  try {
    const template = templateEngine({ name: 'Raffa', age: 41 }, __dirname + '/template.chop')
    expect(template).toBe('hello, my name is Raffa.\nmy age is 41.\nRaffa is developer.')
  } catch (err) {
    console.log(err)
    expect(1).toBe(2)
  }
})
