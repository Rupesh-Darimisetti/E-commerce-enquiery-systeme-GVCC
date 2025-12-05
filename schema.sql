-- database: :memory:
CREATE TABLE
    products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT,
        short_desc TEXT,
        long_desc TEXT,
        price DECIMAL(10, 2),
        image_url TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    enquiries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id INTEGER,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        message TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (product_id) REFERENCES products (id)
    );

CREATE TABLE
    users (
        id INTEGER PRIMARY key AUTOINCREMENT,
        username TEXT not null UNIQUE,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role TEXT DEFAULT 'user'
    )
