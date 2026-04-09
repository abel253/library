import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [stats, setStats] = useState({ students: 0, books: 0 });
  const [researchList, setResearchList] = useState([]); // ለሪሰርች ዝርዝር
  const [file, setFile] = useState(null); // ለሚጫነው ፋይል
  const [title, setTitle] = useState(''); // ለሪሰርች ርዕስ

  useEffect(() => {
    fetchStats();
    fetchResearch(); // ገጹ ሲከፈት ሪሰርቾችን እንዲያመጣ
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost/library/get_stats.php');
      const data = await response.json();
      setStats({ students: data.studentCount, books: data.bookCount });
    } catch (error) { console.error("Stats Error:", error); }
  };

  const fetchResearch = async () => {
    try {
      const response = await fetch('http://localhost/library/get_research.php');
      const data = await response.json();
      setResearchList(data);
    } catch (error) { console.error("Research Fetch Error:", error); }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !title) return alert("Please fill all fields!");

    const formData = new FormData();
    formData.append('title', title);
    formData.append('research_file', file);

    try {
      const response = await fetch('http://localhost/library/upload_research.php', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      if (result.status === 'success') {
        alert("Upload successful!");
        setTitle('');
        fetchResearch(); // ዝርዝሩን እንዲያድስ
      }
    } catch (error) { console.error("Upload Error:", error); }
  };

  return (
    <div className="home-main-container">
      {/* 1. Hero Section (ያለውን አላጠፋሁትም) */}
      <header className="home-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="animate-reveal">
            Knowledge is the <br/> 
            <span className="gold-text">Gateway to the Future</span>
          </h1>
          <p className="animate-fade-in">
            The official heart of academic excellence at Mekdela Amba University. 
            Explore thousands of resources with ease, precision, and global access.
          </p>
          <div className="hero-btns animate-fade-in">
            <Link to="/public-search" className="main-btn">Explore Books Now</Link>
            <Link to="/services" className="secondary-btn">Explore Services</Link>
          </div>
        </div>
      </header>

      {/* 2. Floating Stats (ያለውን አላጠፋሁትም) */}
      <section className="stats-container">
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-info">
            <h3>{stats.books}+</h3>
            <p>Academic Books</p>
          </div>
        </div>
        <div className="stat-card gold-accent">
          <div className="stat-icon">🎓</div>
          <div className="stat-info">
            <h3>{stats.students}+</h3>
            <p>Active Students</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🌐</div>
          <div className="stat-info">
            <h3>24/7</h3>
            <p>Digital Access</p>
          </div>
        </div>
      </section>

      {/* 3. The Borrowing Journey (ያለውን አላጠፋሁትም) */}
      <section className="services-section container">
        <div className="phys-section-title">
          <h2>The Borrowing Journey</h2>
          <p>From finding the shelf to the circulation desk.</p>
        </div>
        <div className="journey-grid">
          <div className="journey-card">
            <div className="j-number">01</div>
            <div className="j-icon">📍</div>
            <h4>Locate on Shelf</h4>
            <p>Find the book's Shelf Number from search terminals.</p>
          </div>
          <div className="journey-card">
            <div className="j-number">02</div>
            <div className="j-icon">🎟️</div>
            <h4>Present MAU ID</h4>
            <p>Take the book to the Circulation Desk with your ID.</p>
          </div>
          <div className="journey-card">
            <div className="j-number">03</div>
            <div className="j-icon">✍️</div>
            <h4>Physical Signature</h4>
            <p>Sign in the register to finalize your borrowing.</p>
          </div>
        </div>
      </section>

      {/* --- አዲስ: Research Portal Section --- */}
      <section className="research-portal container">
        <div className="section-header">
          <span className="badge">Digital Repository</span>
          <h2>Student Research & Proposals</h2>
          <div className="underline"></div>
        </div>

        <div className="research-layout">
          {/* ፋይል መጫኛ (Upload) */}
          <div className="upload-side card">
            <h4>Upload Your Work</h4>
            <form onSubmit={handleUpload}>
              <input 
                type="text" 
                placeholder="Project/Research Title" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="file-input-wrapper">
                <input type="file" onChange={(e) => setFile(e.target.files[0])} />
              </div>
              <button type="submit" className="upload-action-btn">Submit to Library</button>
            </form>
          </div>

          {/* ፋይል ማሳያ (View) */}
          <div className="display-side card">
            <h4>Recent Submissions</h4>
            <div className="research-feed">
              {researchList.length > 0 ? researchList.map((res, i) => (
                <div key={i} className="res-item">
                   <div className="res-meta">
                      <h5>{res.title}</h5>
                      <small>Uploaded on: {res.upload_date}</small>
                   </div>
                   <a href={`http://localhost/library/${res.file_path}`} target="_blank" className="dl-link">View PDF</a>
                </div>
              )) : <p>No research papers found yet.</p>}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;