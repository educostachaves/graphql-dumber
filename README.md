#GraphQL-Dumber
--------------------

Steps to RUM
-------

```console
$ npm install
$ npm run build
$ npm start
```

Then navigate to [http://localhost:3000](http://localhost:3000) and
observe the network request to `/graphql` that Relay makes to retrieve the data.

For development, you can use:

```console
$ npm run dev
```

Which will build the schema and then watch for any file changes, rebuilding the
schema and/or restarting the server as necessary.
