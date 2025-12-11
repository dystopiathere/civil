CREATE TABLE
    IF NOT EXISTS player_roles (
        id BIGSERIAL PRIMARY KEY,
        name VARCHAR(30) NOT NULL
    );

INSERT INTO
    player_roles (name)
VALUES
    ('player'),
    ('assistant'),
    ('admin'),
    ('senior'),
    ('coordinator'),
    ('lead'),
    ('owner');