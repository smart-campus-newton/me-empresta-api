const shortid = require('shortid')
const removeDiacritics = require('diacritics').remove

shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@')

const generate = (prefix) => {
  if (prefix) {
    let code = `${prefix}_${shortid.generate()}`
    code = code.split('@').join('a')
    code = code.split('$').join('s')

    return code
  }
  return shortid.generate()
}

const generateByName = (name) => {
  if (name) {
    let aux = removeDiacritics(name.toLowerCase())
    aux = aux.split(' ').join('-')
    return aux
  }
  return generate()
}

module.exports = {
  generate,
  generateByName
}
