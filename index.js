const spawnSync = require('child_process').spawnSync

const bin = '/usr/libexec/PlistBuddy'

const commands = [
  'Clear',
  'Print',
  'Set',
  'Add',
  'Copy',
  'Delete',
  'Message',
  'Merge',
  'Import'
]

const api = commands.reduce(function(result, command) {
  result[command.toLowerCase()] = function(key, value) {
    this.commands.push([command, key, value].filter(f => f))
    return this
  }

  return result
}, {})

api.run = function(options) {
  return spawnSync(this.toString(), options)
}

api.toString = function() {
  let cmd  = this.commands.map(c => '-c ' + JSON.stringify(c.join(' '))).join(' ')
  this.commands = []
  return [bin, cmd, this.file].join(' ')
}

const PlistBuddy = function (file) {
  if (!(this instanceof PlistBuddy)) {
    return new PlistBuddy(file)
  }

  this.commands = []
  this.file = file
}

PlistBuddy.prototype = api
module.exports = PlistBuddy
