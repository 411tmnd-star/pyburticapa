# How it works: Authorizing Access to an MCP Server

## `code/main.py`

```text
Companion code for:
certifications/mcpa/lessons/23-oauth-authorization/docs/en.md
OAuth 2.1 authorization guarding one MCP tool call.
Sources: MCP 2026-07-28 Authorization; OAuth 2.1; RFCs 7636, 8414, 8707, 9207, and 9728.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def make_request(request_id, method, params, capabilities, version)`](code/main.py#L31)
- [`def make_result(request_id, result_type)`](code/main.py#L42)
- [`def make_error(request_id, code, message, data)`](code/main.py#L46)
- [`def www_authenticate_challenge(resource_metadata_url, scope)`](code/main.py#L53)
- [`def parse_resource_metadata_url(www_authenticate)`](code/main.py#L60)
- [`def protected_resource_metadata_urls(mcp_endpoint)`](code/main.py#L67)
- [`def discover_protected_resource_metadata(mcp_endpoint, www_authenticate)`](code/main.py#L77)
- [`def as_metadata_discovery_urls(issuer)`](code/main.py#L84)
- [`class MetadataValidationError`](code/main.py#L100)
- [`def validate_authorization_server_metadata(issuer, metadata)`](code/main.py#L104)
- [`def generate_code_verifier(nbytes)`](code/main.py#L112)
- [`def code_challenge_s256(code_verifier)`](code/main.py#L116)
- [`def require_pkce_s256_support(as_metadata)`](code/main.py#L121)
- [`def canonical_resource_uri(url)`](code/main.py#L131)
- [`class AuthorizationRequest`](code/main.py#L141)
- [`def build_authorization_request(as_metadata, client_id, redirect_uri, resource, code_verifier, scope)`](code/main.py#L152)
- [`class IssuerMismatch`](code/main.py#L165)
- [`def validate_authorization_response_issuer(expected_issuer, returned_iss, issuer_param_advertised)`](code/main.py#L169)
- [`class TokenRequest`](code/main.py#L184)
- [`def build_token_request(authorization_request, code, code_verifier)`](code/main.py#L193)
- [`class AccessToken`](code/main.py#L205)
- [`class AuthDecision`](code/main.py#L213)
- [`class ResourceServer`](code/main.py#L220)
  - [`def authorize(self, authorization_header)`](code/main.py#L225)
- [`def build_request_target(canonical_uri, token_value)`](code/main.py#L239)
- [`class McpServer`](code/main.py#L243)
  - [`def _server_meta(self)`](code/main.py#L249)
  - [`def handle_tools_call(self, message, authorization_header)`](code/main.py#L252)
- [`class McpClient`](code/main.py#L273)
  - [`def call_tool(self, name, arguments, authorization_header)`](code/main.py#L279)
- [`def simulate_authorization_flow()`](code/main.py#L302)
- [`def run_scenario()`](code/main.py#L337)
- [`def transcript()`](code/main.py#L351)
- [`def demo()`](code/main.py#L355)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
