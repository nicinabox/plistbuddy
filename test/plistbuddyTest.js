var expect = require('unexpected')
var plistbuddy = require('../index')

describe('plistbuddy', () => {
  let plist = plistbuddy('./mocks/Info.plist')

  it('sets a single property', () => {
    expect(
      plist.set(':CFBundleShortVersionString', '2.0.0').toString(),
      'to equal',
      '/usr/libexec/PlistBuddy -c "Set :CFBundleShortVersionString 2.0.0" ./mocks/Info.plist'
    )
  })

  it('sets multiple properties', () => {
    let expected = plist
      .set(':CFBundleShortVersionString', '2.0.0')
      .set(':CFBundleVersion', '2')
      .toString()

    expect(
      expected,
      'to equal',
      '/usr/libexec/PlistBuddy -c "Set :CFBundleShortVersionString 2.0.0" -c "Set :CFBundleVersion 2" ./mocks/Info.plist'
    )
  })
})
