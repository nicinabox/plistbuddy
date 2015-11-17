var exec = require('child_process').exec
var _ = require('lodash')

var commands = [
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

var quot = function(text) {
  return '"' + text + '"'
}

var joinOnSpace = function(arr) {
  return arr.join(' ')
}

var run = function(cmd, file, callback) {
  var args = ['-c', cmd, file].join(' ')
  return exec('/usr/libexec/PlistBuddy ' + args, callback)
}

var api = _.reduce(commands, function(result, command) {
  result[command.toLowerCase()] = function() {
    var key      = arguments[0]
    var value    = arguments[1]
    var callback = arguments[2]

    if (typeof arguments[1] === 'function') {
      callback = value
      value = null
    }

    commandString = _.compose(quot, joinOnSpace, _.compact)
    callback = callback || _.noop

    run(commandString([command, key, value]), this.options.plistfile,
      function(err, stdout, stderr) {
        if (err) {
          api._catchCallback({
            message: err.message,
            stdout: stdout.trim(),
            arguments: commandString([command, key, value])
          }, stderr || stdout)
        }

        callback(stdout)
      })

    return this
  }

  return result
}, {})

api.catch = function(callback) {
  api._catchCallback = callback || _.noop
}

var PlistBuddy = function (options) {
  if (!(this instanceof PlistBuddy)) {
    return new PlistBuddy(options)
  }

  this.options = _.extend({
    plistfile: ''
  }, options)
}

PlistBuddy.prototype = api

module.exports = PlistBuddy
