import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnalysisProvider } from '@/context/AnalysisContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LandingPage from '@/pages/LandingPage';
import AnalyzerPage from '@/pages/AnalyzerPage';
import DashboardPage from '@/pages/DashboardPage';
import SkillGapPage from '@/pages/SkillGapPage';
import ResumeTipsPage from '@/pages/ResumeTipsPage';
import AboutPage from '@/pages/AboutPage';
import LoginPage from '@/pages/LoginPage';

export default function App() {
  return (
    <AnalysisProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-white">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/analyzer" element={<AnalyzerPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/skill-gap" element={<SkillGapPage />} />
              <Route path="/tips" element={<ResumeTipsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AnalysisProvider>
  );
}
