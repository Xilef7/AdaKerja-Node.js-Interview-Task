# Messenger Bot Demo for Interview Task
This bot will do the following things:
1. Ask your first name
2. Ask your birth date
3. Ask whether you want to calculate how many days until your next birthday

# Try the bot
This bot has not been submitted to Facebook for approval. To try this bot, you should contact me to assign a tester role for your Facebook account. Then, go to [this page](m.me/110270583817741) to try the bot.

# How to Run
1. Setup your Facebook App using [this instruction](https://developers.facebook.com/docs/messenger-platform/getting-started/app-setup)
2. Run `npm install`
3. Create `.env` file in the root folder that contains the followings:
```
VERIFY_TOKEN=<YOUR_VERIFY_TOKEN>
PAGE_ACCESS_TOKEN=<YOUR_PAGE_ACCESS_TOKEN>
```
3. Run `npm start`

# Test Script
To run the test script, use the following commands:
```
npm test
```
The test case are not complete. But it has a few basic test case for `/message` endpoint and `/webhook` endpoint.