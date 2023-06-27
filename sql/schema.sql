DROP TABLE IF EXISTS member;
CREATE TABLE member (
  username VARCHAR(32) PRIMARY KEY NOT NULL,
  data JSONB,
  UNIQUE (username)
);

DROP TABLE IF EXISTS posting;
CREATE TABLE posting (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  poster VARCHAR(32) REFERENCES Member (username),
  data JSONB,
  UNIQUE (id)
);

DROP TABLE IF EXISTS message;
CREATE TABLE message (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender VARCHAR(32) REFERENCES Member (username),
  receiver VARCHAR(32) REFERENCES Member (username),
  data JSONB,
  UNIQUE (id)
);
