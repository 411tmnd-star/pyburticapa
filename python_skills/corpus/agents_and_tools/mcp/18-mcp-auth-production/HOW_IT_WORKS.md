# How it works: MCP Auth in Production: Issuer-Bound Enrollment and Tokens

## `code/main.py`

```text
Phase 13 Lesson 18: MCP 2026-07-28 authorization in production.

A stdlib walk-through of the current MCP authorization surface:

  - RFC 8414 authorization server metadata
  - Client ID Metadata Documents first, deprecated RFC 7591 DCR as fallback
  - PKCE (RFC 7636) authorization code flow with audience pinning (RFC 8707)
  - RFC 9207 authorization-response issuer validation
  - JWT validation on the resource server
  - JWKS cache refresh on a schedule (the IdP rotates keys; the resource
    server only re-fetches them)
  - Audience-replay rejection via the aud claim
  - Client registration keyed by issuer and access tokens keyed by issuer plus resource

Three roles model the system: an AuthorizationServer that issues tokens and
rotates its signing keys, a ResourceServer (the MCP server) that caches the
JWKS and validates every request, and a Client that enrolls and obtains tokens.

Stdlib only. Run: python3 main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def b64url(raw)`](code/main.py#L40)
- [`def b64url_decode(s)`](code/main.py#L44)
- [`def jwt_sign(payload, kid, secret)`](code/main.py#L49)
- [`def jwt_decode(token)`](code/main.py#L57)
- [`def jwt_verify(token, secret)`](code/main.py#L64)
- [`def protected_resource_metadata_url(resource)`](code/main.py#L70)
- [`def parsed_absolute_redirect_uri(value)`](code/main.py#L99)
- [`def valid_web_redirect_uri(value)`](code/main.py#L120)
- [`def valid_private_use_scheme(scheme)`](code/main.py#L125)
- [`def valid_native_redirect_uri(value)`](code/main.py#L137)
- [`class IdPKey`](code/main.py#L154)
- [`class AuthorizationServer`](code/main.py#L161)
  - [`def current_key(self)`](code/main.py#L172)
  - [`def rotate_key(self)`](code/main.py#L175): AS-side key rotation: introduce the next key, retire the oldest.
  - [`def jwks(self)`](code/main.py#L188)
  - [`def metadata(self)`](code/main.py#L196): RFC 8414 authorization server metadata.
  - [`def register_cimd(self, document_url, document)`](code/main.py#L213): Resolve a Client ID Metadata Document without minting an identifier.
  - [`def register_client(self, body)`](code/main.py#L260): Deprecated RFC 7591 registration retained for compatibility.
  - [`def pre_register_client(self, client_id)`](code/main.py#L307)
  - [`def begin_authorization(self)`](code/main.py#L350)
  - [`def redeem_code(self)`](code/main.py#L397)
  - [`def issue_token(self, client_id, user, scopes, resource)`](code/main.py#L428): Issue an audience-pinned access token signed by the current key.
- [`class ResourceServer`](code/main.py#L451)
  - [`def resource_metadata(self)`](code/main.py#L458)
  - [`def refresh_jwks(self)`](code/main.py#L461): Re-fetch the AS's published JWKS into the cache. Idempotent.
  - [`def cached_kids(self)`](code/main.py#L476)
  - [`def validate(self, token, required_scope)`](code/main.py#L480)
  - [`def call_tool(self, tool, bearer)`](code/main.py#L522)
- [`class Client`](code/main.py#L536)
  - [`def discover(self)`](code/main.py#L547)
  - [`def register(self)`](code/main.py#L561): Use the deprecated DCR fallback and key the credential by issuer.
  - [`def enroll(self)`](code/main.py#L580): Prefer CIMD; use DCR only when the current issuer cannot resolve it.
  - [`def validate_authorization_response_issuer(self, returned_issuer)`](code/main.py#L602)
  - [`def use_authorization_server(self, auth_server)`](code/main.py#L612): Switch issuer without copying a client identifier or access token.
  - [`def authorize(self, scopes, resource, user)`](code/main.py#L618)
- [`def demo()`](code/main.py#L655)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
