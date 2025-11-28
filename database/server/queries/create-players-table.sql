CREATE TABLE IF NOT EXISTS players
(
    id                 BIGSERIAL PRIMARY KEY,
    steam              VARCHAR                     NOT NULL,
    discord            VARCHAR                     NOT NULL,
    license            VARCHAR                     NOT NULL,
    whitelisted        BOOLEAN                     NOT NULL DEFAULT FALSE,
    banned             BOOLEAN                     NOT NULL DEFAULT FALSE,
    ban_reason         VARCHAR                     NULL,
    last_connection_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    created_at         TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at         TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);

TRUNCATE players CASCADE;