import { Link } from 'react-router-dom';

const HeroSection = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
            <h1 className="text-5xl font-extrabold mb-8 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                Credit Risk Predictor
            </h1>
            <p className="text-gray-400 mb-12 text-lg max-w-md text-center">
                Analyze financial data using machine learning to predict credit risk and loan default probability with high accuracy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                <Link
                    to="/predict"
                    className="px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-all shadow-lg hover:shadow-blue-500/20 text-center"
                >
                    Start Prediction
                </Link>
                <Link
                    to="/stats"
                    className="px-8 py-4 bg-neutral-900 text-white border border-neutral-800 rounded-full font-bold text-lg hover:bg-neutral-800 transition-all text-center"
                >
                    View Analytics
                </Link>
            </div>
        </div>
    )
}

export default HeroSection;