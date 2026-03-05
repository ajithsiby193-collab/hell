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
        const daresCollection = database.collection('dares');

        // Get count of dares
        const count = await daresCollection.countDocuments();
        
        // Get random dare
        const randomIndex = Math.floor(Math.random() * count);
        const dare = await daresCollection
            .findOne({}, { skip: randomIndex });

        res.status(200).json({ 
            content: dare?.content || 'No dares found',
            type: 'dare'
        });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Failed to fetch dare' });
    } finally {
        if (client) {
            await client.close();
        }
    }
}
