import React from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import Terminal from './components/Terminal';

export default function App() {
  return (
    <>
      <main>
        <Hero />
        <About />
        <Features />
        <Terminal />
      </main>
    </>
  );
}
