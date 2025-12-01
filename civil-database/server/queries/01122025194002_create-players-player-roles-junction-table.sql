CREATE TABLE IF NOT EXISTS players_player_roles
(
    id             BIGSERIAL PRIMARY KEY,
    player_id      BIGINT                      NOT NULL,
    player_role_id BIGINT                      NOT NULL,
    created_at     TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    FOREIGN KEY (player_id) REFERENCES players (id) ON DELETE CASCADE,
    FOREIGN KEY (player_role_id) REFERENCES player_roles (id) ON DELETE CASCADE
);