# web-request-analyzer

rest api that returns nicely formatted data gathered from the request headers from the client

## response

### request

-   ip `(cf-connecting-ip)`
-   country `(cf-ipcountry)`
-   ray id `(cf-ray)`
-   host `(host)`
-   colo `(raw req cf colo)`

### user agent

-   parsed user agent data `(ua-parser-js)`
-   do not track `(dnt)`
-   accept header `(accept)`

## usage

### local dev

```bash
gh repo clone wanderer-moe/web-request-analyzer && cd web-request-analyzer
pnpm i && pnpm dev
```

### deployment

```bash
pnpm deploy
```
