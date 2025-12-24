const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'src' directory
// We also mount it under /LearnMatrix to match GitHub Pages sub-path
app.use('/LearnMatrix', express.static(path.join(__dirname, 'src')));
app.use(express.static(path.join(__dirname, 'src')));

// Redirect root to /LearnMatrix/ for local consistency
app.get('/', (req, res) => {
    res.redirect('/LearnMatrix/');
});

// Handle the /LearnMatrix/ root
app.get('/LearnMatrix/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

// Fallback for other HTML pages
app.get('/LearnMatrix/:page', (req, res) => {
    const page = req.params.page;
    const filePath = path.join(__dirname, 'src', page.endsWith('.html') ? page : page + '.html');

    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).send("Page not found");
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Local URL: http://localhost:${PORT}/LearnMatrix/`);
});
