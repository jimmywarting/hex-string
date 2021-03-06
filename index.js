var alphabet = '0123456789abcdef'.split('')
var encodeLookup = []
var decodeLookup = []

for (var i = 0; i < 256; i++) {
  encodeLookup[i] = alphabet[i >> 4 & 0xf] + alphabet[i & 0xf]
  if (i < 16) {
    if (i < 10) {
      decodeLookup[0x30 + i] = i
    } else {
      decodeLookup[0x61 - 10 + i] = i
    }
  }
}

exports.encode = function (array) {
  var length = array.length
  var string = ''
  var i = 0
  while (i < length) {
    string += encodeLookup[array[i++]]
  }
  return string
}

exports.decode = function (string) {
  var sizeof = string.length >> 1
  var length = sizeof << 1
  var array = new Uint8Array(sizeof)
  var n = 0
  var i = 0
  while (i < length) {
    array[n++] = decodeLookup[string.charCodeAt(i++)] << 4 | decodeLookup[string.charCodeAt(i++)]
  }
  return array
}
