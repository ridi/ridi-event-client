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
  var eventClient = new EventClient({
    deviceType: 'pc',
    uId: 'user-test',
    trackingId: "GTM-ID",
    debug: false,
    autoPageView: true,
  });

  eventClient.initialize().then((_) => {
      eventClient.sendAddPaymentInfo('payment_type', {
        value: 1,
        currency: 'KRW',
        items: [
            {item_id: 'item_id', item_name: 'abcd', item_category: 123456, service_type: 'ridibooks'}
        ]
      });
  });
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
