# Express Gallery

Share a directory of images using express and socket.io.

## Setup

```bash
make install
```

## Run

```bash
# node app.js <path/to/images>
node app.js ~/Pictures
```

Images are served from ./images by default. Pass a folder as an
argument to change the directory.

For development:

```bash
gulp
```

## Use

Clients should connect to `/`. Then go to `/control` to change the
pictures for all the clients.

## License

MIT
