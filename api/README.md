# gymme landing - api

## Prerequisites

Using Turso, so you need to:

- install Turso CLI

```
brew install tursodatabase/tap/turso
```

- authenticate

```
turso auth signup
```

- retrieve db url

```
turso db show --url db_name

```

- get db auth token

```
turso db tokens create db_name

```

## Deployment

Using Vercel for deployment

- build

```
vercel
```

- deploy on prod

```
vercel --prod
```
