# How it works: Proving a Client's Identity to an Authorization Server

## `code/main.py`

```text
Companion code for:
certifications/mcpa/lessons/24-client-registration-and-identity/docs/en.md
A registration planner and a CIMD validator for an MCP client an authorization server has never
met.
Sources: MCP 2026-07-28 Client Registration page; Client ID Metadata Documents; RFC 7591.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def make_request(request_id, method, params, capabilities, version)`](code/main.py#L26)
- [`def make_result(request_id, result_type)`](code/main.py#L37)
- [`def make_error(request_id, code, message, data)`](code/main.py#L41)
- [`class AuthServerMetadata`](code/main.py#L56)
- [`class ClientCredentials`](code/main.py#L63)
- [`class RegistrationDecision`](code/main.py#L70)
- [`def choose_registration_path(as_metadata, pre_registered)`](code/main.py#L76)
- [`def validate_cimd(url, document)`](code/main.py#L96)
- [`def application_type_for(redirect_uri)`](code/main.py#L118)
- [`class CredentialStore`](code/main.py#L126)
  - [`def register(self, creds)`](code/main.py#L129)
  - [`def credentials_for(self, issuer)`](code/main.py#L132)
  - [`def use(self, issuer, creds)`](code/main.py#L135)
- [`class ProxyConsentLedger`](code/main.py#L144)
  - [`def record_consent(self, static_client_id, downstream_client_id)`](code/main.py#L147)
  - [`def may_forward(self, static_client_id, downstream_client_id)`](code/main.py#L150)
- [`def recommend_auth_extension(has_interactive_user, enterprise_idp)`](code/main.py#L154)
- [`def build_authorization_servers()`](code/main.py#L162)
- [`class RegisteredMcpServer`](code/main.py#L206)
  - [`def _server_meta(self)`](code/main.py#L210)
  - [`def handle(self, message)`](code/main.py#L213)
- [`def obtain_client_credentials_token(client_id, issuer)`](code/main.py#L240)
- [`def wrap_http(message, token)`](code/main.py#L244)
- [`class RegisteredClient`](code/main.py#L259)
  - [`def send(self, method, params)`](code/main.py#L266)
  - [`def discover(self)`](code/main.py#L277)
  - [`def call(self, name, arguments)`](code/main.py#L280)
- [`def run_scenario()`](code/main.py#L284)
- [`def transcript()`](code/main.py#L329)
- [`def render_decision(issuer, decision)`](code/main.py#L333)
- [`def demo()`](code/main.py#L338)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
