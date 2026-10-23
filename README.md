# Identra

**A centralized identity and authentication service built with TypeScript, Node.js, and PostgreSQL.**

Identra is a backend-focused Single Sign-On (SSO) project designed to centralize user authentication and provide a foundation for secure identity management across multiple applications.

The project explores authentication architecture, session lifecycle management, cryptographic key handling, and communication between independent services.

## Overview

Identra separates user-facing HTTP operations from application-facing TCP communication, providing distinct interfaces for identity management and service integration.

The main goals are to:

- Centralize authentication and identity management.
- Provide secure user authentication and session management.
- Support communication between applications and the identity service over TCP.
- Implement cryptographic signing and public-key verification for authentication tokens.
- Maintain a modular backend architecture with clear separation of responsibilities.

## Architecture

Identra consists of two primary server components:

### HTTP Server

The HTTP server handles user-facing authentication and account-management operations.

Responsibilities include:

- User registration and login.
- JWT-based authentication.
- Email verification and password-management workflows.
- Protected endpoints and session validation.
- Administrative access control.

### TCP Server

The TCP server provides a separate communication interface for applications integrating with Identra.

It is designed to support application-to-identity-service communication without requiring every integration to use the same HTTP interface.

### Authentication Flow

1. A user submits their credentials to the HTTP server.
2. The server validates the credentials and creates a session.
3. A signed JWT is issued with the relevant identity and session information.
4. Protected requests validate the JWT and verify that its associated session remains valid.
5. Revoking the session invalidates subsequent requests using the associated token, even before its expiration.

## Security

Security is a core design consideration throughout the project.

### Authentication and Sessions

- JWT-based authentication with token expiration.
- Database-backed sessions associated with authenticated users.
- Session validation on protected requests.
- Session revocation to invalidate otherwise unexpired tokens.
- Separation of authentication and authorization logic.

### Cryptography

Identra uses RSA key pairs and RS256 signatures as part of its token-signing and public-key verification design.

The project also explores key identifiers, key rotation, and the separation of private and public key material.

Private keys are intended to remain within the trusted identity-service environment, while public keys can be used by authorized integrating services to verify signatures.

### Account Security

Account-management workflows include email verification and password-management functionality. Passwords are stored as hashes rather than plaintext.

### Authorization

Administrative access is separated from ordinary user access. Administrative operations are protected by dedicated authorization middleware and are intended to be restricted to explicitly authorized accounts.

## Technology Stack

- **Language:** TypeScript
- **Runtime:** Node.js
- **HTTP framework:** Fastify
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JSON Web Tokens (JWT)
- **Cryptography:** RSA / RS256
- **Password hashing:** Argon2
- **Communication:** HTTP and TCP

## Project Structure

The codebase separates server entry points, database access, authentication logic, and cryptographic components.

```text
src/
├── database/
├── HTTP-server/
├── TCP-server/
├── keys/
└── ...
```

The structure is intended to keep transport-layer concerns separate from database operations and authentication logic.

## Engineering Focus

Identra is an opportunity to explore and implement concepts relevant to backend and systems engineering:

- Authentication and authorization boundaries.
- Session lifecycle and token revocation.
- TCP-based service communication.
- Cryptographic signing and public-key verification.
- Relational data modeling and database constraints.
- Separation of concerns in a backend application.
- Secure account-management workflows.

## Development Status

Identra is an evolving project. Its architecture and authentication workflows are being developed incrementally, with an emphasis on security, maintainability, and clear service boundaries.

Not every planned capability should be considered production-ready. Before deploying the service, additional review, automated testing, operational hardening, and security assessment are necessary.

## Future Improvements

Potential areas for further development include:

- Comprehensive automated tests for authentication and authorization.
- Improved audit logging for security-sensitive operations.
- More extensive session-management and administrative tooling.
- Hardened application authentication for TCP integrations.
- Monitoring, rate limiting, and operational observability.
- Further improvements to key rotation and lifecycle management.

## Author

Developed as a personal backend engineering project focused on identity management, authentication, network communication, and application security.
