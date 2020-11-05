# ridi-event-client

[![npm](https://img.shields.io/npm/v/@ridi/ridi-event-client.svg)](https://www.npmjs.com/package/@ridi/ridi-event-client)

## Getting Started

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Title</title>
</head>
<body>
<script src="./dist/umd/bundle.min.js"></script>
<script>
  var tracker = new EventClient({
    deviceType: 'pc',
    uId: 'user-test',
    trackingId: "GTM-ID",
    debug: true,
    autoPageView: true,
  });

  tracker.sendPageView('http://naver.com')
  tracker.sendEvent("test", {abcd: "efg"})

</script>
<script>
  </script>
</body>
</html>
```

## Test

```bash
$ npm run test
```

## Publish

```bash
$ npm login
$ npm run deploy
$ # or
$ npm run build && npm publish --access public
```

## LICENSE

MIT
