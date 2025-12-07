import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { run } from './db/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');

export async function seed() {
    try {
        // run schema by splitting on semicolons
        const stmts = schema.split(';').map(s => s.trim()).filter(Boolean);
        for (const s of stmts) {
            await run(s);
        }

        const sample = [
            ["Vintage Camera", "Electronics", "Classic 35mm film camera", "A lovingly restored 35mm camera with manual controls.", 149.99, "https://via.placeholder.com/400x300?text=Camera"],
            ["Handmade Mug", "Home", "Ceramic mug", "Wheel-thrown ceramic mug, 350ml.", 24.5, "https://via.placeholder.com/400x300?text=Mug"],
            ["Running Shoes", "Sports", "Comfortable running shoes", "Lightweight shoes for road running.", 89.0, "https://via.placeholder.com/400x300?text=Shoes"],
            ["Acoustic Guitar", "Music", "Six-string guitar", "Full-size acoustic with spruce top.", 249.99, "https://via.placeholder.com/400x300?text=Guitar"],
            ["Desk Lamp", "Home", "Adjustable lamp", "LED lamp with adjustable arm.", 39.99, "https://via.placeholder.com/400x300?text=Lamp"],
            ["Wireless Headphones", "Electronics", "Noise cancelling", "Over-ear headphones with ANC.", 129.0, "https://via.placeholder.com/400x300?text=Headphones"]
        ];

        for (const p of sample) {
            await run(
                `INSERT INTO products (name, category, short_desc, long_desc, price, image_url)
            VALUES (?, ?, ?, ?, ?, ?)`,
                p
            );
        }

        console.log('Seed complete.');
    } catch (err) {
        console.error('Seed error:', err);
    } finally {
        process.exit(0);
    }
}

seed()