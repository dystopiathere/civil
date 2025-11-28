CREATE TABLE IF NOT EXISTS head_blends
(
    id              BIGSERIAL PRIMARY KEY,
    shape_first_id  INT                         NOT NULL DEFAULT 0,
    shape_second_id INT                         NOT NULL DEFAULT 45,
    shape_third_id  INT                         NOT NULL DEFAULT 10,
    skin_first_id   INT                         NOT NULL DEFAULT 0,
    skin_second_id  INT                         NOT NULL DEFAULT 45,
    skin_third_id   INT                         NOT NULL DEFAULT 10,
    shape_mix       FLOAT                       NOT NULL DEFAULT 0.0,
    skin_mix        FLOAT                       NOT NULL DEFAULT 0.0,
    third_mix       FLOAT                       NOT NULL DEFAULT 0.0,
    created_at      TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);

INSERT INTO head_blends DEFAULT
VALUES;