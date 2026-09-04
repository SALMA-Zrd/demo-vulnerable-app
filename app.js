const express = require("express");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ===============================
// VULNERABILITY 1: SQL Injection
// ===============================
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    // Intentionally vulnerable code for security testing
    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

    console.log("Executed query:", query);

    res.json({
        message: "Login request processed",
        query: query
    });
});

// ===============================
// VULNERABILITY 2: Reflected XSS
// ===============================
app.get("/search", (req, res) => {
    const q = req.query.q || "";

    // Intentionally vulnerable: user input is directly inserted into HTML
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Search</title>
        </head>
        <body>
            <h1>Search results</h1>
            <p>You searched for: ${q}</p>
        </body>
        </html>
    `);
});

// ===============================
// VULNERABILITY 3: Hardcoded Secret
// ===============================
const JWT_SECRET = "DEMO_ONLY_FAKE_SECRET_123456";

console.log("Demo application loaded");
console.log("JWT secret configured:", JWT_SECRET);

// ===============================
// Health check
// ===============================
app.get("/health", (req, res) => {
    res.json({
        status: "ok",
        application: "demo-vulnerable-app"
    });
});

// ===============================
// Start server
// ===============================
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Demo vulnerable app running on http://localhost:${PORT}`);
});