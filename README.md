# plistbuddy

A handy tool to manipulate plist files. Useful for iOS development.

## Usage

```javascript
var plistbuddy = require('plistbuddy')('./ios/MyApp/Info.plist')

plistbuddy
  .set(':CFBundleShortVersionString', '1.0.0')
  .set(':CFBundleVersion', '42')
  .run()
```

## API

`plistbuddy` wraps the following commands with a chainable api:

```
Clear, Print, Set, Add, Copy, Delete, Message, Merge, Import'
```
