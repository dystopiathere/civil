CREATE TABLE IF NOT EXISTS player_roles
(
    id   BIGSERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

TRUNCATE player_roles CASCADE;

INSERT INTO player_roles (name)
VALUES ('player'),
       ('assistant'),
       ('admin'),
       ('senior'),
       ('coordinator'),
       ('lead'),
       ('owner');