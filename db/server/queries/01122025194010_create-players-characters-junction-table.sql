CREATE TABLE
    IF NOT EXISTS players_characters (
        id BIGSERIAL PRIMARY KEY,
        player_id BIGINT NOT NULL,
        character_id BIGINT NOT NULL,
        active BOOLEAN NOT NULL,
        FOREIGN KEY (player_id) REFERENCES players (id) ON DELETE CASCADE,
        FOREIGN KEY (character_id) REFERENCES characters (id) ON DELETE CASCADE
    );