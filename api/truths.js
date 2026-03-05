const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    let client;
    try {
        client = new MongoClient(uri);
        await client.connect();

        const database = client.db('truth_or_dare');
        const truthsCollection = database.collection('truths');

        // Get count of truths
        const count = await truthsCollection.countDocuments();
        
        // Get random truth
        const randomIndex = Math.floor(Math.random() * count);
        const truth = await truthsCollection
            .findOne({}, { skip: randomIndex });

        res.status(200).json({ 
            content: truth?.content || 'No truths found',
            type: 'truth'
        });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Failed to fetch truth' });
    } finally {
        if (client) {
            await client.close();
        }
    }
}
