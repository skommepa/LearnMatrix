const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'src' directory
app.use(express.static(path.join(__dirname, 'src')));

// Route for the root to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

// Fallback for other HTML pages in root of src
app.get('/:page', (req, res) => {
    const page = req.params.page;
    if (page.endsWith('.html')) {
         res.sendFile(path.join(__dirname, 'src', page));
    } else {
        // Try adding .html extension
        res.sendFile(path.join(__dirname, 'src', page + '.html'), (err) => {
            if (err) {
                 res.status(404).send("Page not found");
            }
        });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
