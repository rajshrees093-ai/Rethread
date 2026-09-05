import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AssistantWidget from './components/AssistantWidget';
import OverviewGallery from './components/OverviewGallery';

import HomePage from './pages/HomePage';
import AnalyzePage from './pages/AnalyzePage';
import ResultPage from './pages/ResultPage';
import UpcyclingPage from './pages/UpcyclingPage';
import HowItWorksPage from './pages/HowItWorksPage';
import ImpactPage from './pages/ImpactPage';
import AboutPage from './pages/AboutPage';
import AuthPage from './pages/AuthPage';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [uploadedImagePreview, setUploadedImagePreview] = useState(null);
  const [quickStartPreset, setQuickStartPreset] = useState(null);

  // User State
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('rethread_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      return null;
    }
  });

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    try {
      localStorage.setItem('rethread_user', JSON.stringify(userData));
    } catch (e) {}
    setActivePage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSignOut = () => {
    setUser(null);
    try {
      localStorage.removeItem('rethread_user');
    } catch (e) {}
    setActivePage('home');
  };

  const handleAnalysisComplete = (resultData, imagePreview) => {
    setAnalysisResult(resultData);
    setUploadedImagePreview(imagePreview);
    setActivePage('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnalyzeAnother = () => {
    setActivePage('analyze');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreUpcycling = () => {
    setActivePage('upcycling');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSwitchAction = (newAction) => {
    if (!analysisResult) return;
    
    const updated = {
      ...analysisResult,
      recommendation: newAction,
      why_points: [
        `You chose to explore ${newAction.toLowerCase()} for your ${analysisResult.clothing_type.toLowerCase()}. This is a viable circular option that helps prevent premature disposal.`
      ]
    };
    setAnalysisResult(updated);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="rethread-bg min-h-screen flex flex-col relative text-[#1F2E24] selection:bg-[#527557]/20">
      
      {/* Floating Glass Navbar */}
      <div className="relative z-40">
        <Navbar
          activePage={activePage}
          setActivePage={setActivePage}
          user={user}
          onSignOut={handleSignOut}
        />
      </div>

      {/* Main Interactive Content View */}
      <main className="flex-1 w-full relative z-10">
        {activePage === 'overview' && (
          <OverviewGallery onSelectPage={(page) => {
            setActivePage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} />
        )}

        {activePage === 'auth' && (
          <AuthPage
            onAuthSuccess={handleAuthSuccess}
            onBackToHome={() => setActivePage('home')}
          />
        )}

        {activePage === 'home' && (
          <HomePage
            setActivePage={setActivePage}
            setQuickStartPreset={setQuickStartPreset}
          />
        )}

        {activePage === 'analyze' && (
          <AnalyzePage
            onAnalysisComplete={handleAnalysisComplete}
            quickStartPreset={quickStartPreset}
            clearQuickStartPreset={() => setQuickStartPreset(null)}
          />
        )}

        {activePage === 'result' && (
          <ResultPage
            resultData={analysisResult}
            imagePreview={uploadedImagePreview}
            onAnalyzeAnother={handleAnalyzeAnother}
            onExploreUpcycling={handleExploreUpcycling}
            onSwitchAction={handleSwitchAction}
          />
        )}

        {activePage === 'upcycling' && (
          <UpcyclingPage
            currentClothingType={analysisResult?.clothing_type || 'Jeans'}
            onBackToResult={analysisResult ? () => setActivePage('result') : null}
            onBackToAnalyze={() => setActivePage('analyze')}
          />
        )}

        {activePage === 'how-it-works' && (
          <HowItWorksPage setActivePage={setActivePage} />
        )}

        {activePage === 'impact' && (
          <ImpactPage setActivePage={setActivePage} />
        )}

        {activePage === 'about' && (
          <AboutPage setActivePage={setActivePage} />
        )}
      </main>

      {/* Floating ReThread Assistant Widget */}
      <div className="relative z-50">
        <AssistantWidget />
      </div>

      {/* Streamlined Clean Footer */}
      <div className="relative z-20">
        <Footer setActivePage={setActivePage} />
      </div>

    </div>
  );
}
