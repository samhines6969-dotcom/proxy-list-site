-- database layout for proxy manager

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT CHECK(role IN ('admin', 'dropper')) DEFAULT 'dropper'
);

CREATE TABLE IF NOT EXISTS proxy_drops (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    description TEXT,
    url TEXT,
    txt_file_path TEXT,
    scheduled_for DATETIME,
    status TEXT CHECK(status IN ('pending', 'live')) DEFAULT 'pending',
    FOREIGN KEY(user_id) REFERENCES users(id)
);
