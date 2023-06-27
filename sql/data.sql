DELETE FROM member;
INSERT INTO member (username, data) VALUES ('kyle', '{"pwhash": null, "name": "Kyle Hall", "image": null, "location": "Santa Cruz, CA", "website": null, "bio": null}');
INSERT INTO member (username, data) VALUES ('anika', '{"pwhash": null, "name": "Anika Verma", "image": null, "location": "Santa Cruz, CA", "website": null, "bio": null}');
INSERT INTO member (username, data) VALUES ('alex', '{"pwhash": null, "name": "Alex Wu", "image": null, "location": "Santa Cruz, CA", "website": null, "bio": null}');

DELETE FROM posting;
INSERT INTO posting (poster, data) VALUES ('kyle', '{"content": "Who tryna hit the gym", "date": "2023-06-27T17:23:50.641Z"}');
INSERT INTO posting (poster, data) VALUES ('anika', '{"content": "Looking for a girlie to make gains with!", "date": "2023-06-27T16:25:50.641Z"}');
INSERT INTO posting (poster, data) VALUES ('alex', '{"content": "Do you even lift bro? 😈", "date": "2023-06-27T12:25:50.641Z"}');

DELETE FROM message;
INSERT INTO message (sender, receiver, data) VALUES ('anika', 'kyle', '{"content": "Yo hey", "date": "2023-06-27T17:33:51.978Z"}');
INSERT INTO message (sender, receiver, data) VALUES ('kyle', 'anika', '{"content": "On my way to gym rn", "date": "2023-06-27T17:35:51.978Z"}');
