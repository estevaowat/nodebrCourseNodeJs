
/*
-- CREATE TABLE

DROP TABLE IF EXISTS TB_HEROES;
CREATE TABLE TB_HEROES(
    ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
    NAME  TEXT NOT NULL,
    POWER TEXT NOT NULL
)
*/

-- CREATE
INSERT INTO TB_HEROES (NAME, POWER)
VALUES('Flash', 'Speed'),
('Spiderman', 'spider'),
('Batman', 'Money')

-- READ
SELECT * FROM TB_HEROES
WHERE NAME = 'Flash'

-- UPDATE
UPDATE TB_HEROES
SET NAME = 'Goku', POWER = 'God'
WHERE ID = 1

--DELETE
DELETE FROM TB_HEROES
WHERE ID = 2;

SELECT * FROM TB_HEROES;