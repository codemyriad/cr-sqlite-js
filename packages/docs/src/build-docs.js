const fs = require('fs');
const path = require('path');
const marked = require('marked');
const cheerio = require('cheerio');

// Function to recursively find all README.md files
function findReadmeFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(findReadmeFiles(file));
    } else if (file.endsWith('README.md')) {
      results.push(file);
    }
  });
  return results;
}

// Find all README.md files
const readmeFiles = [
  'CREATING_BROWSER_PERSISTENCE.md',
  'README.md',
  ...findReadmeFiles('packages')
];

function generateTOC(content, fileInfo) {
  const $ = cheerio.load(content);
  let toc = `<h3>${fileInfo.title}</h3><ul>`;
  $('h1, h2, h3, h4').each((i, elem) => {
    const level = parseInt(elem.name[1]);
    const text = $(elem).text();
    const slug = `${fileInfo.slug}-${text.toLowerCase().replace(/[^\w]+/g, '-')}`;
    $(elem).attr('id', slug);
    toc += `<li class="toc-level-${level}"><a href="#${slug}">${text}</a></li>`;
  });
  toc += '</ul>';
  return { toc, content: $.html() };
}

let fullContent = '';
let toc = '<h2>Table of Contents</h2>';

readmeFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const html = marked.parse(content);
  const fileInfo = {
    title: path.basename(path.dirname(file)),
    slug: path.basename(path.dirname(file)).toLowerCase().replace(/[^\w]+/g, '-')
  };
  const { toc: sectionToc, content: processedHtml } = generateTOC(html, fileInfo);
  toc += sectionToc;
  fullContent += `<h2 id="${fileInfo.slug}">${fileInfo.title}</h2>${processedHtml}`;
});

const finalHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CR-SQLite Documentation</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 1000px; margin: 0 auto; padding: 20px; }
        h1, h2 { border-bottom: 1px solid #ddd; }
        .toc-level-2 { margin-left: 20px; }
        .toc-level-3 { margin-left: 40px; }
        .toc-level-4 { margin-left: 60px; }
        pre { background-color: #f4f4f4; padding: 10px; border-radius: 5px; overflow-x: auto; }
        code { background-color: #f4f4f4; padding: 2px 4px; border-radius: 3px; }
        #toc { position: fixed; top: 0; left: 0; width: 300px; height: 100%; overflow-y: auto; padding: 20px; background-color: #f8f8f8; }
        #content { margin-left: 320px; }
    </style>
</head>
<body>
    <div id="toc">
        <h1>CR-SQLite Documentation</h1>
        ${toc}
    </div>
    <div id="content">
        ${fullContent}
    </div>
</body>
</html>
`;

fs.writeFileSync('documentation.html', finalHtml);
console.log('Documentation generated: documentation.html');
