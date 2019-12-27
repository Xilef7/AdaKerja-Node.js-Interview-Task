const request = require('supertest');
const app = require('../app.js');

describe('Test webhook setup', () => {
    test('Should respond with 200 CHALLENGE_ACCEPTED', (done) => {
        let VERIFY_TOKEN = process.env.VERIFY_TOKEN;
        request(app)
            .get(`/webhook?hub.verify_token=${VERIFY_TOKEN}&hub.challenge=CHALLENGE_ACCEPTED&hub.mode=subscribe`)
            .then(response => {
                expect(response.statusCode).toBe(200);
                expect(response.text).toBe('CHALLENGE_ACCEPTED');
                done();
            });
    });
});

describe('Test messenger conversation', () => {
    function createTextMessage(mid, text) {
        return {
            "object": "page",
            "entry": [
                {
                    "id": "0",
                    "time": Date.now(),
                    "messaging": [
                        {
                            "sender": {
                                "id": "2799591356763719"
                            },
                            "recipient": {
                                "id": "110270583817741"
                            },
                            "message": {
                                "mid": mid,
                                "text": text
                            }
                        }
                    ]
                }
            ]
        };
    }

    function createQuickReplyMessage(mid, text, payload) {
        return {
            "object": "page",
            "entry": [
                {
                    "id": "0",
                    "time": Date.now(),
                    "messaging": [
                        {
                            "sender": {
                                "id": "2799591356763719"
                            },
                            "recipient": {
                                "id": "110270583817741"
                            },
                            "message": {
                                "quick_reply": {
                                    "payload": payload
                                },
                                "mid": mid,
                                "text": text
                            }
                        }
                    ]
                }
            ]
        };
    }

    test('Initiate conversation', async (done) => {
        await request(app)
            .post(`/webhook`)
            .send(createTextMessage(0, "Hi"))
            .then(response => {
                expect(response.statusCode).toBe(200);
                expect(response.text).toBe('EVENT_RECEIVED');
                done();
            });
    });

    test('Tell first name', async (done) => {
        await request(app)
            .post(`/webhook`)
            .send(createTextMessage(1, "Felix"))
            .then(response => {
                expect(response.statusCode).toBe(200);
                expect(response.text).toBe('EVENT_RECEIVED');
                done();
            });
    });

    test('Tell birth date', async (done) => {
        await request(app)
            .post(`/webhook`)
            .send(createTextMessage(2, "1993-02-12"))
            .then(response => {
                expect(response.statusCode).toBe(200);
                expect(response.text).toBe('EVENT_RECEIVED');
                done();
            });
    });

    test('Calculate days left using text', async (done) => {
        await request(app)
            .post(`/webhook`)
            .send(createQuickReplyMessage(3, "yes", "yes"))
            .then(response => {
                expect(response.statusCode).toBe(200);
                expect(response.text).toBe('EVENT_RECEIVED');
                done();
            });
    });
});