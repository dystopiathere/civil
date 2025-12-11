CREATE TABLE
    IF NOT EXISTS connections (
        id BIGSERIAL PRIMARY KEY,
        player_id BIGINT NOT NULL,
        identifiers jsonb NOT NULL,
        date TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW (),
        FOREIGN KEY (player_id) REFERENCES players (id) ON DELETE CASCADE
    );