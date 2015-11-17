# plistbuddy

A handy tool to manipulate plist files. Useful for iOS development.

## Usage

```javascript
var plistbuddy = require('./plistbuddy')({
  plistfile: './ios/AdventureCompass/Info.plist'
})

plistbuddy
  .set(':CFBundleShortVersionString', '1.0.0')
  .set(':CFBundleVersion', '42')
  .catch(function(err) {
    console.log(err.message)
  })
```
