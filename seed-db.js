/**
 * MongoDB Database Seeding Script
 * Run this script to populate your MongoDB Atlas database with truths and dares
 * 
 * Usage:
 * 1. Install MongoDB driver: npm install mongodb
 * 2. Set your MONGODB_URI environment variable
 * 3. Run: node seed-db.js
 */

require('dotenv').config({ path: '.env.local' });
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;

if (!uri) {
    console.error('Error: MONGODB_URI environment variable is not set');
    process.exit(1);
}

const truths = [
    "When was the last time you actually cared about something?",
    "Have you ever pretended to be someone you're really not?",
    "What's the most secretive thing you've kept hidden?",
    "Have you ever lied to someone you really care about?",
    "What's something you do that would upset people if they knew?",
    "Have you ever judged someone unfairly?",
    "What's your most embarrassing moment?",
    "Would you sacrifice yourself to save someone else?",
    "Have you ever been jealous of someone?",
    "What's a total dealbreaker for you in a relationship?",
    "Have you ever done something you were deeply ashamed of?",
    "What's the most ridiculous lie you've told?",
    "Would you take a bullet for someone, or are you too selfish?",
    "What's something about yourself you absolutely hate?",
    "Have you ever sent a message and immediately regretted it?",
    "What's an insecurity that really bothers you?",
    "Have you ever thought someone was better than you in every way?",
    "What's something you spent way too much money on?",
    "Have you ever made fun of someone and felt guilty?",
    "What's a toxic habit you can't seem to give up?",
    "Would you ever cheat if you knew you wouldn't get caught?",
    "What's your worst habit that you can't stop?",
    "Have you ever said 'I love you' and not meant it?",
    "What's the most selfish thing you've ever done?",
    "Have you ever ghosted someone?",
    "What does your internet history say about you?",
    "Have you ever stolen anything?",
    "What's something you think about when no one is watching?",
    "Have you ever been jealous of a friend?",
    "What's the worst advice you've ever given someone?"
];

const dares = [
    "Text your crush and tell them they're attractive",
    "Call your mom right now and tell her you love her",
    "Do your best impression of someone here",
    "Sing your favorite song out loud right now",
    "Act out the most awkward moment of your life",
    "Post something silly on your social media",
    "Call someone and tell them they're awesome",
    "Do 10 pushups right now",
    "Walk around the room like you're on a runway",
    "Dance like nobody's watching",
    "Send a voice message saying something silly",
    "Speak in an accent for the next 3 minutes",
    "Google your name and read the first result out loud",
    "Close your eyes and let someone draw on your face",
    "Do a silly face and have someone take a photo",
    "Try to lick your own elbow",
    "Do your best evil laugh for 30 seconds",
    "Message someone saying 'You're my favorite person'",
    "Act like you're on a game show describing yourself",
    "Say the weirdest thing you can think of dramatically",
    "Impersonate a celebrity for 2 minutes",
    "Write a bad pickup line and send it to someone",
    "Take a silly selfie and post it somewhere",
    "Drink something unusual from the kitchen",
    "Do your best wink and take a photo",
    "Describe a terrible date you went on",
    "Tell someone something you've always wanted to say",
    "Do the weirdest dance move you can think of",
    "Walk backwards for the next 3 minutes",
    "Yell something silly out your window"
];

async function seedDatabase() {
    let client;
    try {
        client = new MongoClient(uri);
        await client.connect();

        const database = client.db('truth_or_dare');
        const truthsCollection = database.collection('truths');
        const daresCollection = database.collection('dares');

        // Clear existing data
        await truthsCollection.deleteMany({});
        await daresCollection.deleteMany({});

        // Insert truths
        const truthDocuments = truths.map(truth => ({ content: truth }));
        const truthResult = await truthsCollection.insertMany(truthDocuments);
        console.log(`✅ Inserted ${truthResult.insertedCount} truths`);

        // Insert dares
        const dareDocuments = dares.map(dare => ({ content: dare }));
        const dareResult = await daresCollection.insertMany(dareDocuments);
        console.log(`✅ Inserted ${dareResult.insertedCount} dares`);

        console.log('\n✨ Database seeded successfully!');
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    } finally {
        if (client) {
            await client.close();
        }
    }
}

seedDatabase();
