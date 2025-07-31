import { useState, useEffect } from 'react';
import { ChevronRight, Users, Mail, Briefcase, CheckCircle, Database, Send, ArrowRight, Sun, Moon } from 'lucide-react';
import Dashboard from '../assets/image.png'
import '../Landing.css';
import { initializeTheme, toggleTheme } from '../utils/ThemeManager';
import { useSectionTitle } from '../utils/useSectionTitle';

// Inline Logo Component extracted from Login/SignUp
const InlineSecretPlaceLogo = (): JSX.Element => {

    return (
        <div className="logo-container">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 240 60"
                className="secret-place-logo"
            >
                {/* Gradient definitions */}
                <defs>
                    <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#4f46e5" />
                        <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                </defs>

                {/* Main Logo Group */}
                <g fill="url(#logo-gradient)">
                    {/* Abstract icon representing connection/communication */}
                    <g transform="translate(0, 10)">
                        <circle cx="20" cy="20" r="16" fill="none" stroke="url(#logo-gradient)" strokeWidth="2.5" />
                        <path d="M20,10 L30,20 L20,30 L10,20 Z" fill="url(#logo-gradient)" opacity="0.6" />
                        <circle cx="20" cy="20" r="6" fill="url(#logo-gradient)" />
                    </g>

                    {/* Text "SecretPlace" */}
                    <text x="48" y="35" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="24">
                        SecretPlace
                    </text>
                </g>
            </svg>
        </div>
    );
};

const Landing = () => {
    const sections = [
        { id: 'hero', title: 'SecretPlace - Welcome' },
        { id: 'features', title: 'SecretPlace - Features' },
        { id: 'trusted', title: 'SecretPlace - Trusted Companies' },
        { id: 'how-it-works', title: 'SecretPlace - How it works' },
        { id: 'testimonials', title: 'SecretPlace - Testimonies' },
        { id: 'pricing', title: 'SecretPlace - Pricing' },
        { id: 'management', title: 'SecretPlace - Get Started' },

    ];

    useSectionTitle(sections);

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.substring(1);
            const section = sections.find(s => s.id === hash);
            if (section) {
                document.title = section.title;
            }
        };

        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, [sections]);

    // State for mobile navigation and theme
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(true);

    // Initialize theme on component mount
    useEffect(() => {
        const initialTheme = initializeTheme();
        setDarkMode(initialTheme);
    }, []);

    // Toggle theme function
    const handleToggleTheme = () => {
        const newTheme = toggleTheme(darkMode);
        setDarkMode(newTheme);
    };

    // Sample testimonials
    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "Marketing Manager at TechCorp",
            text: "This platform has revolutionized how I manage my marketing team. The email features save me hours every week."
        },
        {
            name: "David Chen",
            role: "Sales Director at GrowthLabs",
            text: "Having all my team's information in one place with the ability to send personalized mass emails has boosted our conversion rates by 35%."
        },
        {
            name: "Maria Rodriguez",
            role: "Product Manager at InnovateSoft",
            text: "The AI email generation is a game-changer. It helps me communicate effectively with my team across multiple time zones."
        }
    ];

    return (
        <div className={`app-container ${darkMode ? 'dark' : 'light'}`}>
            {/* Navigation */}
            <nav className="navbar">
                <div className="container">
                    <div className="navbar-content">
                        <div className="logo">
                            <InlineSecretPlaceLogo />
                        </div>

                        {/* Desktop Navigation */}
                        <div className="desktop-nav">
                            <a href="#features" className="nav-link">Features</a>
                            <a href="#how-it-works" className="nav-link">How It Works</a>
                            <a href="#testimonials" className="nav-link">Testimonials</a>
                            <a href="#pricing" className="nav-link">Pricing</a>

                            {/* Theme Toggle */}
                            <button
                                onClick={handleToggleTheme}
                                className="theme-toggle"
                                aria-label="Toggle theme"
                            >
                                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                            </button>

                            <a href="/login" className="login-link">Login</a>
                            <a href="/register" className="signup-button">Sign Up</a>
                        </div>

                        {/* Mobile menu button */}
                        <div className="mobile-nav-buttons">
                            {/* Mobile Theme Toggle */}
                            <button
                                onClick={handleToggleTheme}
                                className="theme-toggle-mobile"
                                aria-label="Toggle theme"
                            >
                                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                            </button>

                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="mobile-menu-button"
                            >
                                <svg className="hamburger-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    {mobileMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    {mobileMenuOpen && (
                        <div className="mobile-nav">
                            <a href="#features" className="mobile-nav-link">Features</a>
                            <a href="#how-it-works" className="mobile-nav-link">How It Works</a>
                            <a href="#testimonials" className="mobile-nav-link">Testimonials</a>
                            <a href="#pricing" className="mobile-nav-link">Pricing</a>
                            <div className="mobile-nav-buttons">
                                <a href="/login" className="mobile-login-link">Login</a>
                                <a href="/register" className="mobile-signup-button">Sign Up</a>
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* Hero Section */}
            <header className="hero" id='hero'>
                <div className="container">
                    <div className="hero-content">
                        <div className="hero-text">
                            <h1 className="hero-title">
                                Organize Your Team. Communicate Effortlessly.
                            </h1>
                            <p className="hero-description">
                                The all-in-one platform for professionals to manage their teams, track employee details, and send personalized mass emails with AI assistance.
                            </p>
                            <div className="hero-buttons">
                                <a href="/register" className="get-started-button">
                                    Get Started Free
                                    <ChevronRight className="button-icon" />
                                </a>
                                <a href="#demo" className="demo-button">
                                    Watch Demo
                                </a>
                            </div>
                        </div>
                        <div className="hero-image-container">
                            <div className="blob-1"></div>
                            <div className="blob-2"></div>
                            <div className="blob-3"></div>
                            <div className="hero-image">
                                <img
                                    src={Dashboard}
                                    alt="Dashboard preview"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Trusted By Section */}
            {/* Trusted By Section */}
            <section className="trusted-section" id='trusted'>
                <div className="container">
                    <p className="trusted-title">
                        Trusted by forward-thinking companies
                    </p>
                    <div className="trusted-logos">
                        <div className="logo-item">
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                                <img
                                    src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                                    alt="GitHub"
                                />
                            </a>
                        </div>
                        <div className="logo-item">
                            <a href="https://google.com" target="_blank" rel="noopener noreferrer">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" 
                                    alt="Google"
                                />
                            </a>
                        </div>
                        <div className="logo-item">
                            <a href="https://stripe.com" target="_blank" rel="noopener noreferrer">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" 
                                    alt="Stripe"
                                />
                            </a>
                        </div>
                        <div className="logo-item">
                            <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
                                <img
                                    src="https://assets.vercel.com/image/upload/front/assets/design/vercel-triangle-black.svg"
                                    alt="Vercel"
                                />
                            </a>
                        </div>
                        <div className="logo-item">
                            <a href="https://twilio.com" target="_blank" rel="noopener noreferrer">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Twilio-logo-red.svg"
                                    alt="Twilio"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="features-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-subtitle">Features</h2>
                        <p className="section-title">
                            Everything you need to manage your team
                        </p>
                        <p className="section-description">
                            Our platform is designed specifically for Sales Marketers, Web Developers, Product Designers, Marketing Managers, and Financial Analysts.
                        </p>
                    </div>

                    <div className="features-grid">
                        {/* Feature 1 */}
                        <div className="feature-card">
                            <div className="feature-icon">
                                <Users />
                            </div>
                            <h3 className="feature-title">Team Organization</h3>
                            <p className="feature-description">
                                Keep track of all your team members in one place with comprehensive profiles including work experience, position, and status.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="feature-card">
                            <div className="feature-icon">
                                <Mail />
                            </div>
                            <h3 className="feature-title">AI-Powered Email Generation</h3>
                            <p className="feature-description">
                                Generate professional emails with AI assistance. Simply describe what you want to say, and let our system craft the perfect message.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="feature-card">
                            <div className="feature-icon">
                                <Send />
                            </div>
                            <h3 className="feature-title">Mass Email Campaigns</h3>
                            <p className="feature-description">
                                Send personalized emails to multiple team members at once, saving time while maintaining a personal touch.
                            </p>
                        </div>

                        {/* Feature 4 */}
                        <div className="feature-card">
                            <div className="feature-icon">
                                <Briefcase />
                            </div>
                            <h3 className="feature-title">Detailed Work Profiles</h3>
                            <p className="feature-description">
                                Access comprehensive information about each team member including their experience, current position, and work status.
                            </p>
                        </div>

                        {/* Feature 5 */}
                        <div className="feature-card">
                            <div className="feature-icon">
                                <CheckCircle />
                            </div>
                            <h3 className="feature-title">Email Integration</h3>
                            <p className="feature-description">
                                Connect your personal email accounts to send messages directly from our platform with your own email address.
                            </p>
                        </div>

                        {/* Feature 6 */}
                        <div className="feature-card">
                            <div className="feature-icon">
                                <Database />
                            </div>
                            <h3 className="feature-title">Connection Management</h3>
                            <p className="feature-description">
                                Track connections between team members and visualize your organizational structure for better collaboration.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="how-it-works-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-subtitle">How It Works</h2>
                        <p className="section-title">
                            Streamline your team management
                        </p>
                        <p className="section-description">
                            Get started in minutes and transform how you organize and communicate with your team.
                        </p>
                    </div>

                    <div className="steps-container">
                        {/* Step 1 */}
                        <div className="step-card">
                            <div className="step-number">
                                <span>1</span>
                            </div>
                            <div className="step-content">
                                <h3 className="step-title">Set Up Your Account</h3>
                                <p className="step-description">
                                    Create your account, connect your email, and set up your profile in just a few minutes.
                                </p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="step-card">
                            <div className="step-number">
                                <span>2</span>
                            </div>
                            <div className="step-content">
                                <h3 className="step-title">Add Your Team Members</h3>
                                <p className="step-description">
                                    Import your team or add members individually with their details and work information.
                                </p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="step-card">
                            <div className="step-number">
                                <span>3</span>
                            </div>
                            <div className="step-content">
                                <h3 className="step-title">Start Communicating</h3>
                                <p className="step-description">
                                    Use our AI to generate emails or write your own, then send them to individuals or groups.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="testimonials-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-subtitle">Testimonials</h2>
                        <p className="section-title">
                            Trusted by professionals worldwide
                        </p>
                    </div>

                    <div className="testimonials-grid">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="testimonial-card">
                                <div className="testimonial-header">
                                    <div className="testimonial-avatar">
                                        <img src={`/api/placeholder/48/48`} alt={testimonial.name} />
                                    </div>
                                    <div className="testimonial-author">
                                        <h4 className="testimonial-name">{testimonial.name}</h4>
                                        <p className="testimonial-role">{testimonial.role}</p>
                                    </div>
                                </div>
                                <p className="testimonial-text">"{testimonial.text}"</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="pricing-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-subtitle">Pricing</h2>
                        <p className="section-title">
                            Plans for teams of all sizes
                        </p>
                        <p className="section-description">
                            Choose the plan that fits your needs. All plans include our core features.
                        </p>
                    </div>

                    <div className="pricing-grid">
                        {/* Starter Plan */}
                        <div className="pricing-card">
                            <div className="pricing-content">
                                <h3 className="pricing-title">Starter</h3>
                                <p className="pricing-description">Perfect for individuals and small teams.</p>
                                <p className="pricing-price">
                                    <span className="price-amount">$10</span>
                                    <span className="price-period">/month</span>
                                </p>
                                <ul className="pricing-features">
                                    <li className="pricing-feature">
                                        <CheckCircle className="feature-check" />
                                        <span>Up to 10 team members</span>
                                    </li>
                                    <li className="pricing-feature">
                                        <CheckCircle className="feature-check" />
                                        <span>Basic AI email generation</span>
                                    </li>
                                    <li className="pricing-feature">
                                        <CheckCircle className="feature-check" />
                                        <span>Connect 1 email account</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="pricing-action">
                                <a href="/register" className="pricing-button outlined">
                                    Get started
                                </a>
                            </div>
                        </div>

                        {/* Pro Plan */}
                        <div className="pricing-card popular">
                            <div className="popular-badge">MOST POPULAR</div>
                            <div className="pricing-content">
                                <h3 className="pricing-title">Pro</h3>
                                <p className="pricing-description">For growing teams and businesses.</p>
                                <p className="pricing-price">
                                    <span className="price-amount">$50</span>
                                    <span className="price-period">/month</span>
                                </p>
                                <ul className="pricing-features">
                                    <li className="pricing-feature">
                                        <CheckCircle className="feature-check" />
                                        <span>Up to 50 team members</span>
                                    </li>
                                    <li className="pricing-feature">
                                        <CheckCircle className="feature-check" />
                                        <span>Advanced AI email generation</span>
                                    </li>
                                    <li className="pricing-feature">
                                        <CheckCircle className="feature-check" />
                                        <span>Connect 3 email accounts</span>
                                    </li>
                                    <li className="pricing-feature">
                                        <CheckCircle className="feature-check" />
                                        <span>Advanced analytics</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="pricing-action">
                                <a href="/register" className="pricing-button filled">
                                    Get started
                                </a>
                            </div>
                        </div>

                        {/* Enterprise Plan */}
                        <div className="pricing-card">
                            <div className="pricing-content">
                                <h3 className="pricing-title">Enterprise</h3>
                                <p className="pricing-description">For large organizations and teams.</p>
                                <p className="pricing-price">
                                    <span className="price-amount">$100</span>
                                    <span className="price-period">/month</span>
                                </p>
                                <ul className="pricing-features">
                                    <li className="pricing-feature">
                                        <CheckCircle className="feature-check" />
                                        <span>Unlimited team members</span>
                                    </li>
                                    <li className="pricing-feature">
                                        <CheckCircle className="feature-check" />
                                        <span>Premium AI email generation</span>
                                    </li>
                                    <li className="pricing-feature">
                                        <CheckCircle className="feature-check" />
                                        <span>Connect unlimited email accounts</span>
                                    </li>
                                    <li className="pricing-feature">
                                        <CheckCircle className="feature-check" />
                                        <span>Dedicated support</span>
                                    </li>
                                    <li className="pricing-feature">
                                        <CheckCircle className="feature-check" />
                                        <span>Custom integrations</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="pricing-action">
                                <a href="/contact" className="pricing-button outlined">
                                    Contact sales
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section" id='management'>
                <div className="container">
                    <div className="cta-content">
                        <h2 className="cta-title">
                            <span>Ready to streamline your team management?</span>
                            <span className="cta-subtitle">Start your free trial today.</span>
                        </h2>
                        <div className="cta-buttons">
                            <a href="/register" className="cta-button primary">
                                Get started
                                <ArrowRight className="button-icon" />
                            </a>
                            <a href="/demo" className="cta-button secondary">
                                Schedule demo
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-links">
                        <div className="footer-group">
                            <h3 className="footer-title">Product</h3>
                            <ul className="footer-list">
                                <li><a href="#features">Features</a></li>
                                <li><a href="#pricing">Pricing</a></li>
                                <li><a href="#demo">Demo</a></li>
                                <li><a href="/updates">Updates</a></li>
                            </ul>
                        </div>
                        <div className="footer-group">
                            <h3 className="footer-title">Support</h3>
                            <ul className="footer-list">
                                <li><a href="/docs">Documentation</a></li>
                                <li><a href="/guides">Guides</a></li>
                                <li><a href="/contact">Contact Us</a></li>
                                <li><a href="/faq">FAQ</a></li>
                            </ul>
                        </div>
                        <div className="footer-group">
                            <h3 className="footer-title">Company</h3>
                            <ul className="footer-list">
                                <li><a href="/about">About</a></li>
                                <li><a href="/careers">Careers</a></li>
                                <li><a href="/blog">Blog</a></li>
                                <li><a href="/press">Press</a></li>
                            </ul>
                        </div>
                        <div className="footer-group">
                            <h3 className="footer-title">Legal</h3>
                            <ul className="footer-list">
                                <li><a href="/privacy">Privacy</a></li>
                                <li><a href="/terms">Terms</a></li>
                                <li><a href="/cookies">Cookies</a></li>
                                <li><a href="/security">Security</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <div className="social-links">
                            <a href="#" className="social-link">
                                <span className="sr-only">Facebook</span>
                                <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a href="#" className="social-link">
                                <span className="sr-only">Twitter</span>
                                <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                </svg>
                            </a>
                            <a href="#" className="social-link">
                                <span className="sr-only">LinkedIn</span>
                                <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" clipRule="evenodd" />
                                </svg>
                            </a>
                        </div>
                        <p className="copyright">
                            &copy; 2025 SecretPlace. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;