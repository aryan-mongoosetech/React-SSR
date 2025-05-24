import React from 'react';

function Home() {
  function handleClick() {
    console.log('button Clicked from home');
  }
  return (
    <div>
      Home
      <a href="/blog" className="underline">
        Blog
      </a>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}

export default Home;
