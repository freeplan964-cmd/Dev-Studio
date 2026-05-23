import type { SkillAreaData } from "../../types/skills";
import { Shield, Globe2, Key, Lock, PlugZap, Server as ServerIcon } from "lucide-react";

export const securityArea: SkillAreaData = {
  id: "security",
  label: "Security",
  icon: Shield,
  description:
    "Protect applications from vulnerabilities — from OWASP Top 10 to authentication, cryptography, API security, and infrastructure hardening.",
  subAreasLabel: "Topics",
  concepts: [
    {
      title: "Defence in Depth",
      body: "Layer multiple security controls so that when one fails, another catches it. No single mechanism is sufficient — validate input at every layer, not just the edge.",
    },
    {
      title: "Principle of Least Privilege",
      body: "Grant only the permissions required to perform a task and no more. A database user for the API should not have DROP TABLE rights. A Lambda function should not have full S3 access.",
    },
    {
      title: "Assume Breach",
      body: "Design as if attackers will eventually get in. Segment networks, encrypt data at rest and in transit, log everything, and implement detection — not just prevention.",
    },
    {
      title: "Shift Left on Security",
      body: "Find vulnerabilities in development, not production. Run SAST/DAST in CI, review dependencies for CVEs on every PR, and threat-model new features before writing a line of code.",
    },
  ],
  resources: [
    {
      label: "OWASP Top 10",
      url: "https://owasp.org/www-project-top-ten/",
      desc: "The essential checklist of the 10 most critical web application security risks.",
    },
    {
      label: "PortSwigger Web Security Academy",
      url: "https://portswigger.net/web-security",
      desc: "Free, hands-on labs for every major web vulnerability — the best practical security training.",
    },
    {
      label: "OWASP Cheat Sheet Series",
      url: "https://cheatsheetseries.owasp.org",
      desc: "Quick-reference guides for securing authentication, sessions, APIs, and cryptography.",
    },
    {
      label: "Security Headers",
      url: "https://securityheaders.com",
      desc: "Scan any URL and grade its HTTP security headers — CSP, HSTS, X-Frame-Options.",
    },
  ],
  checklist: [
    { id: "sec-owasp", label: "OWASP Top 10 reviewed and mitigations applied" },
    { id: "sec-input", label: "All user input validated and sanitized server-side" },
    { id: "sec-sql", label: "Parameterized queries used everywhere — no SQL string concatenation" },
    {
      id: "sec-headers",
      label: "Security headers set: HSTS, CSP, X-Frame-Options, Referrer-Policy",
    },
    { id: "sec-auth", label: "Passwords hashed with bcrypt/argon2 — never MD5 or SHA-1" },
    { id: "sec-secrets", label: "Secrets in environment variables / vault — never in source code" },
    { id: "sec-deps", label: "Dependencies audited for CVEs on every build (npm audit / snyk)" },
    { id: "sec-https", label: "HTTPS enforced everywhere; HTTP redirects to HTTPS" },
    { id: "sec-rate", label: "Rate limiting on all auth and sensitive endpoints" },
    { id: "sec-logs", label: "Security events logged and monitored with alerts" },
  ],
  subAreas: [
    {
      id: "web-security",
      label: "Web Vulnerabilities",
      icon: Globe2,
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["owasp", "xss", "csrf", "sqli", "injection"],
      concepts: [
        {
          title: "SQL Injection",
          body: "Attacker injects SQL via input fields to read, modify, or delete data. Prevention: parameterized queries / prepared statements everywhere. ORM does not automatically protect you.",
        },
        {
          title: "Cross-Site Scripting (XSS)",
          body: "Attacker injects malicious scripts into pages viewed by other users. Prevention: escape output, use Content Security Policy, avoid innerHTML with user data, validate on server side.",
        },
        {
          title: "CSRF",
          body: "Cross-Site Request Forgery — tricks a logged-in user's browser into making an unwanted request. Prevention: CSRF tokens, SameSite cookie attribute, verifying Origin/Referer headers.",
        },
        {
          title: "Broken Access Control",
          body: "OWASP #1 — users accessing data they shouldn't. Enforce authorization checks on every endpoint, not just the UI. Test by changing IDs in requests (IDOR — Insecure Direct Object Reference).",
        },
        {
          title: "Security Misconfiguration",
          body: "Default credentials, debug modes in production, overly permissive CORS, directory listing enabled. Automate configuration checks with security scanners in your CI pipeline.",
        },
      ],
      resources: [
        {
          label: "OWASP Top 10",
          url: "https://owasp.org/www-project-top-ten/",
          desc: "The 10 most critical web application security risks.",
        },
        {
          label: "PortSwigger Web Security Academy",
          url: "https://portswigger.net/web-security",
          desc: "Free hands-on labs for every major web vulnerability.",
        },
      ],
    },
    {
      id: "auth-security",
      label: "Authentication & Authorization",
      icon: Key,
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["auth", "jwt", "oauth", "rbac", "mfa"],
      concepts: [
        {
          title: "Password Hashing",
          body: "Use bcrypt, scrypt, or Argon2. Never MD5 or SHA-1 — they're not designed for passwords. Add a salt (built into bcrypt). Use a cost factor that makes cracking impractical.",
        },
        {
          title: "JWT Best Practices",
          body: "Sign with RS256 (asymmetric) in production. Validate issuer, audience, and expiry on every request. Store in httpOnly cookies, not localStorage (XSS resistant). Keep payloads small.",
        },
        {
          title: "OAuth 2.0 & OIDC",
          body: "OAuth 2.0 is for authorization (access to resources). OIDC adds authentication (identity). Use the Authorization Code flow with PKCE for web and mobile — never Implicit flow.",
        },
        {
          title: "RBAC / ABAC",
          body: "Role-Based Access Control assigns permissions to roles, not users. ABAC evaluates attributes (user, resource, environment) for fine-grained decisions. Enforce at the service layer, not just UI.",
        },
        {
          title: "Multi-Factor Authentication",
          body: "Something you know (password) + something you have (TOTP app) + something you are (biometrics). Even weak passwords become safe with MFA — enforce it for all admin accounts.",
        },
      ],
      resources: [
        {
          label: "OWASP Authentication Cheat Sheet",
          url: "https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html",
          desc: "Complete guide to secure authentication implementation.",
        },
        {
          label: "JWT.io",
          url: "https://jwt.io",
          desc: "Decode, verify, and generate JWT tokens — with library references.",
        },
      ],
    },
    {
      id: "cryptography",
      label: "Cryptography",
      icon: Lock,
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["crypto", "tls", "encryption", "hashing", "certificates"],
      concepts: [
        {
          title: "Symmetric vs Asymmetric Encryption",
          body: "Symmetric (AES): same key encrypts and decrypts — fast, used for bulk data. Asymmetric (RSA/ECC): public key encrypts, private key decrypts — used for key exchange and signatures.",
        },
        {
          title: "TLS / HTTPS",
          body: "TLS authenticates the server, negotiates a symmetric key, and encrypts all traffic. Always use TLS 1.2+. Disable weak ciphers. Use HSTS to prevent downgrade attacks.",
        },
        {
          title: "Hashing vs Encryption",
          body: "Hashing is one-way (SHA-256, bcrypt). Encryption is reversible. Use hashing for passwords and integrity checks. Use encryption for data you need to retrieve (tokens, PII, secrets).",
        },
        {
          title: "Key Management",
          body: "Never hardcode keys. Rotate them regularly. Use a dedicated secret store (AWS KMS, HashiCorp Vault). Separate keys per environment. Audit every key access.",
        },
      ],
      resources: [
        {
          label: "Crypto 101 (free book)",
          url: "https://www.crypto101.io",
          desc: "Free cryptography primer — block ciphers, hashing, TLS, and public-key infrastructure.",
        },
        {
          label: "SSL Labs Server Test",
          url: "https://www.ssllabs.com/ssltest/",
          desc: "Grade your TLS configuration and find weak cipher suites.",
        },
      ],
    },
    {
      id: "api-sec",
      label: "API Security",
      icon: PlugZap,
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["api-security", "rate-limiting", "owasp-api", "cors"],
      concepts: [
        {
          title: "OWASP API Security Top 10",
          body: "API-specific risks: Broken Object Level Authorization, Excessive Data Exposure, Lack of Resources & Rate Limiting, Broken Function Level Authorization. Different from the classic OWASP Top 10.",
        },
        {
          title: "Rate Limiting & Throttling",
          body: "Limit requests per IP and per API key. Use token bucket or sliding window algorithms. Return 429 with Retry-After header. Protect auth endpoints most aggressively.",
        },
        {
          title: "Input Validation on Every Endpoint",
          body: "Validate all inputs — type, length, format, range — at the server, not just the frontend. Use schema validation libraries (Zod, Joi). Reject malformed requests before business logic runs.",
        },
        {
          title: "CORS Configuration",
          body: "Don't use Access-Control-Allow-Origin: * on authenticated endpoints. Whitelist specific origins. CORS is a browser control — it doesn't protect server-to-server API calls.",
        },
      ],
      resources: [
        {
          label: "OWASP API Security Top 10",
          url: "https://owasp.org/www-project-api-security/",
          desc: "The API-specific version of the OWASP Top 10.",
        },
        {
          label: "OWASP API Security Cheat Sheet",
          url: "https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html",
          desc: "REST API security best practices from OWASP.",
        },
      ],
    },
    {
      id: "infra-security",
      label: "Infrastructure Security",
      icon: ServerIcon,
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["infrastructure", "cloud-security", "network", "iam"],
      concepts: [
        {
          title: "Least Privilege IAM",
          body: "Cloud IAM roles should grant only the permissions needed. Avoid wildcard permissions (*). Use service accounts per workload. Audit permission usage with Cloud IAM analyser.",
        },
        {
          title: "Network Segmentation",
          body: "Put databases and internal services in private subnets — not publicly accessible. Use security groups or firewall rules to allow only required traffic between services.",
        },
        {
          title: "Secrets Management",
          body: "Never commit secrets to version control. Use a dedicated vault (AWS Secrets Manager, HashiCorp Vault). Rotate secrets regularly. Audit every secret access. Scan repos for leaked secrets.",
        },
        {
          title: "Patch Management",
          body: "Run automated vulnerability scans on container images and dependencies. Use minimal base images (Alpine, Distroless). Rebuild and redeploy images regularly — don't SSH into running containers.",
        },
      ],
      resources: [
        {
          label: "HackTheBox",
          url: "https://www.hackthebox.com",
          desc: "Hands-on security labs — CTF challenges and career paths for developers.",
        },
        {
          label: "AWS Security Best Practices",
          url: "https://docs.aws.amazon.com/security/",
          desc: "AWS security documentation — IAM, VPC, encryption, compliance.",
        },
      ],
    },
  ],
};
