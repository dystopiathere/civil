CREATE TABLE
    IF NOT EXISTS characters_character_roles (
        id BIGSERIAL PRIMARY KEY,
        character_id BIGINT NOT NULL,
        character_role_id BIGINT NOT NULL,
        created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW (),
        FOREIGN KEY (character_id) REFERENCES characters (id) ON DELETE CASCADE,
        FOREIGN KEY (character_role_id) REFERENCES character_roles (id) ON DELETE CASCADE
    );