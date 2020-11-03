# ridi-event-client

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
    var client = new EventClient({
    deviceType: 'pc',
    uId: 'uId',
    debug: true,
    development: true,
    tagManagerOptions: {
      trackingId: "GTM-ID"
    },
    autoPageView: true,
  });
  client.initialize();
  client.sendPurchase(...);

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
$ npm run deploy
$ # or
$ npm run build && npm publish --access public
```

## LICENSE

MIT
