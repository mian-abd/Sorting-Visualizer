import React from 'react';
import SortingVisualizer from './SortingVisualizer/SortingVisualizer';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <div className="logo">
          <span className="logo-text">SortViz</span>
          <div className="logo-bars">
            <div className="logo-bar"></div>
            <div className="logo-bar"></div>
            <div className="logo-bar"></div>
            <div className="logo-bar"></div>
          </div>
        </div>
        <nav className="nav-links">
          <a href="https://github.com/mian-abd/Sorting-Visualizer" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </nav>
      </header>
      
      <main className="app-main">
        <SortingVisualizer />
      </main>
      
      <footer className="app-footer">
        <p>
          Created by <a href="https://github.com/mian-abd" target="_blank" rel="noopener noreferrer">Mian Abdullah</a>
        </p>
        <p className="footer-tagline">
          Visualize & understand sorting algorithms
        </p>
      </footer>
    </div>
  );
}

export default App;
