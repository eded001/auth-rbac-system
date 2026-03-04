-- Extensão para UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =========================
-- USERS
-- =========================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- =========================
-- ROLES
-- =========================
CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) UNIQUE NOT NULL
);

-- =========================
-- PERMISSIONS
-- =========================
CREATE TABLE permissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL
);

-- =========================
-- USER_ROLES (N:N)
-- =========================
CREATE TABLE user_roles (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);

-- =========================
-- ROLE_PERMISSIONS (N:N)
-- =========================
CREATE TABLE role_permissions (
    role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
    permission_id UUID REFERENCES permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

-- =========================
-- Seed inicial
-- =========================

-- Roles
INSERT INTO roles (name)
VALUES
    ('admin'),
    ('user');

-- Permissions
INSERT INTO permissions (name)
VALUES
    ('create_user'),
    ('delete_user'),
    ('view_dashboard'),
    ('edit_profile');

-- Admin recebe todas permissões
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r, permissions p
WHERE r.name = 'admin';

-- User recebe permissões limitadas
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
JOIN permissions p ON p.name IN ('view_dashboard', 'edit_profile')
WHERE r.name = 'user';

-- =========================
-- Criando Usuários
-- =========================

INSERT INTO users (email, password)
VALUES
    ('user@admin.com', 'admin123'),
    ('user@default.com', 'default123');

-- =========================
-- Associando Usuários às Roles
-- =========================

-- user@admin.com recebe role admin
INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id
FROM users u
JOIN roles r ON r.name = 'admin'
WHERE u.email = 'user@admin.com';

-- user@default.com recebe role user
INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id
FROM users u
JOIN roles r ON r.name = 'user'
WHERE u.email = 'user@default.com';