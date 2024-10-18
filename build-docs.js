try {
  const fs = require('fs');
  const path = require('path');
  const marked = require('marked');
  const cheerio = require('cheerio');
} catch (error) {
  console.error('Error: Required modules not found. Please ensure Node.js is installed and run "npm install marked cheerio"');
  process.exit(1);
}

const fs = require('fs');
const path = require('path');
const marked = require('marked');
const cheerio = require('cheerio');

const readmeFiles = [
  'CREATING_BROWSER_PERSISTENCE.md',
  'README.md',
  ...fs.readdirSync('packages').flatMap(dir => {
    const readmePath = path.join('packages', dir, 'README.md');
    return fs.existsSync(readmePath) ? [readmePath] : [];
  })
];

function generateTOC(content) {
  const $ = cheerio.load(content);
  let toc = '<ul>';
  $('h1, h2, h3').each((i, elem) => {
    const level = parseInt(elem.name[1]);
    const text = $(elem).text();
    const slug = text.toLowerCase().replace(/[^\w]+/g, '-');
    $(elem).attr('id', slug);
    toc += `<li class="toc-level-${level}"><a href="#${slug}">${text}</a></li>`;
  });
  toc += '</ul>';
  return toc;
}

let fullContent = '';
let toc = '<h2>Table of Contents</h2>';

readmeFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const html = marked.parse(content);
  const sectionToc = generateTOC(html);
  toc += sectionToc;
  fullContent += `<h1>${path.basename(path.dirname(file))}</h1>${html}`;
});

const finalHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Project Documentation</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
        h1 { border-bottom: 1px solid #ddd; }
        .toc-level-2 { margin-left: 20px; }
        .toc-level-3 { margin-left: 40px; }
        pre { background-color: #f4f4f4; padding: 10px; border-radius: 5px; overflow-x: auto; }
        code { background-color: #f4f4f4; padding: 2px 4px; border-radius: 3px; }
    </style>
</head>
<body>
    <h1>Project Documentation</h1>
    ${toc}
    <hr>
    ${fullContent}
</body>
</html>
`;

fs.writeFileSync('documentation.html', finalHtml);
console.log('Documentation generated: documentation.html');
