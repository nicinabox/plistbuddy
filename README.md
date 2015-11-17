# plistbuddy

A handy tool to manipulate plist files. Useful for iOS development.

## Usage

```javascript
var plistbuddy = require('plistbuddy')({
  plistfile: './ios/MyApp/Info.plist'
})

plistbuddy
  .set(':CFBundleShortVersionString', '1.0.0')
  .set(':CFBundleVersion', '42')
  .catch(function(err) {
    console.log(err.message)
  })
```

## API

`plistbuddy` wraps the following commands with a chainable api:

```
Clear, Print, Set, Add, Copy, Delete, Message, Merge, Import'
```

The general argument pattern is `key`, `value`, `callback`. For commands where a value doesn't make sense (like `print`), you may omit the `value` argument.

Each command is asynchronous, but will report any errors in the `catch` callback similar to a promise.
