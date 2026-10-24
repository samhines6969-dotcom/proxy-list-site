const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

const db = new sqlite3.Database('./proxies.db');

async function setupAdmin() {
    // CHANGE THESE TO WHATEVER YOU WANT
    const adminUsername = 'AdminUsernamefr'; 
    const adminPassword = 'AdminPassW0Rd14214418908103esfjeijfsefiosuefasadppppqaowdoaufoifusdufosudfauwofiueuosudifusdofusdfiuodifusdfousdf67444134sdfosfisdfsfdsfsf696969696996966967676767pesfisepofiaaaaacat'; 

    // hash the password so the server can read it safely
    const saltRounds = 10;
    const hashed = await bcrypt.hash(adminPassword, saltRounds);

    db.serialize(() => {
        // Create tables if they don't exist yet
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            role TEXT CHECK(role IN ('admin', 'dropper')) DEFAULT 'dropper'
        )`);

        // Insert the admin user
        const stmt = db.prepare("INSERT OR REPLACE INTO users (username, password_hash, role) VALUES (?, ?, 'admin')");
        stmt.run(adminUsername, hashed, (err) => {
            if (err) {
                console.error("Error setting up admin account:", err);
            } else {
                console.log(`Success! Admin user [${adminUsername}] created with your hashed password.`);
            }
        });
        stmt.finalize();
    });
}

setupAdmin();
