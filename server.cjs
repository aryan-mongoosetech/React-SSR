// server.cjs
require('@babel/register')({
  extensions: ['.js', '.jsx'],
  ignore: [/node_modules/],
  presets: ['@babel/preset-env', '@babel/preset-react'],
});

const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const Blog = require('./app/components/Blog/index.js').default;
const path = require('path');
const axios = require('axios');
//require('dotenv').config();

const app = express();

app.use(express.static(path.resolve(__dirname, 'build')));
const manifest = require('./build/asset-manifest.json');

app.get('/blog', async (req, res) => {
  const cssFile = manifest['main.css'] ? `${manifest['main.css']}` : '';
  //const jsFile = manifest['main.js'] ? `${manifest['main.js']}` : '';
  const blog = await axios.get(
    `https://staging-cms.mstblockchain.com/api/blogs?filters[slug][$eq]=${'the-rise-of-real-world-asset-tokenization-blockchain-s-next-big-frontier-1'}&populate=*`,
  );
  const { data } = blog;
  const blogHtml = ReactDOMServer.renderToString(
    React.createElement(Blog, { data: data.data[0] }),
  );
  const imageUrl = data.data[0]?.cardImage?.formats?.large?.url;
  const fullImageUrl = imageUrl
    ? `https://staging-cms.mstblockchain.com/${imageUrl}`
    : '';
  // console.log(blog.data.data[0]);

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>React SSR Example</title>
        <meta name="title" content="${data.data[0].metaTitle}" />
        <meta name="description" content="${data.data[0].metaDescription}" />
        <meta name="keywords" content="${data.data[0].metaKeywords}"/>
        <meta property="og:title" content=${data.data[0].metaTitle} />
        <meta property="og:description" content="${data.data[0].metaDescription}" />
        <meta property="og:image" content=${fullImageUrl} />
        <meta property="og:url" content="https://staging.mstblockchain.com/blog-details/${data.data[0].slug}" />
        <meta property="og:type" content="article" />
        <link rel="stylesheet" href="${cssFile}">
      </head>
      <body>
        <div id="root">${blogHtml}</div>
      </body>
    </html>
  `);
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
