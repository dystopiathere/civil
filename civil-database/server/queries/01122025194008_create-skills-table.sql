CREATE TABLE
    IF NOT EXISTS skills (
        id BIGSERIAL PRIMARY KEY,
        stamina INT NOT NULL DEFAULT 20,
        strength INT NOT NULL DEFAULT 20,
        lung_capacity INT NOT NULL DEFAULT 20,
        wheelie_ability INT NOT NULL DEFAULT 20,
        flying_ability INT NOT NULL DEFAULT 20,
        shooting_ability INT NOT NULL DEFAULT 20,
        stealth_ability INT NOT NULL DEFAULT 20
    );

INSERT INTO
    skills DEFAULT
VALUES;