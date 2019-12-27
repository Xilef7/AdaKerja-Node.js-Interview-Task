const request = require('supertest');
const app = require('../app.js');

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

const textMessageRequest = createTextMessage(0, "Hi");
const textMessage = textMessageRequest.entry[0].messaging[0];

test('Test message controller', async (done) => {
    await request(app)
        .post(`/webhook`)
        .send(createTextMessage(0, "Hi"))
        .then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.text).toBe('EVENT_RECEIVED');
        });

    await request(app)
        .get(`/messages`)
        .then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual([textMessage]);
            done();
        });
});