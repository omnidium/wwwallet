-- Reference/localization data only. No user, auth, payee, settings, or
-- transaction/balance tables exist in this schema by design — see the
-- "trustless design" section of the migration plan: that data lives in the
-- client's encrypted vault or is fetched live from external providers.

CREATE TABLE currencies (
    language      VARCHAR(8)   NOT NULL,
    id            INT          NOT NULL,
    key_word      VARCHAR(64)  NOT NULL,
    name          VARCHAR(512) DEFAULT NULL,
    last_modified TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (language, id, key_word)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE languages (
    id       VARCHAR(10) NOT NULL,
    key_word VARCHAR(255) DEFAULT NULL,
    name     VARCHAR(50)  DEFAULT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE msg_codes (
    language      VARCHAR(8)   NOT NULL,
    id            INT          NOT NULL,
    key_word      VARCHAR(64)  NOT NULL,
    name          VARCHAR(512) DEFAULT NULL,
    last_modified TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (language, id, key_word)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE templates (
    language      VARCHAR(8)   NOT NULL DEFAULT '',
    id            VARCHAR(32)  NOT NULL DEFAULT '',
    key_word      VARCHAR(64)  NOT NULL DEFAULT '',
    name          VARCHAR(1024) DEFAULT NULL,
    last_modified TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (language, id, key_word)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
