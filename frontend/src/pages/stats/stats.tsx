import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { api } from "../../services/api";
import { TrendingUp, Users, DollarSign, PieChart, ArrowLeft } from "lucide-react";

interface StatsData {
    avg_income: number;
    risk_distribution: {
        [key: string]: number;
    };
}

const Stats = () => {
    const [stats, setStats] = useState<StatsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        api.get<StatsData>("/stats")
            .then(res => {
                setStats(res);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch stats:", err);
                setError("Failed to load statistics data.");
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-400 animate-pulse">Loading Analytics...</p>
                </div>
            </div>
        );
    }

    if (error || !stats) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center p-8">
                <div className="max-w-md text-center bg-neutral-900 border border-red-900/50 p-8 rounded-2xl">
                    <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
                    <p className="text-gray-400 mb-6">{error || "Something went wrong"}</p>
                    <Link to="/" className="px-6 py-2 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-colors">
                        Return Home
                    </Link>
                </div>
            </div>
        );
    }

    const totalLoans = Object.values(stats.risk_distribution).reduce((a, b) => a + b, 0);
    const defaultCount = stats.risk_distribution["1"] || 0;
    const nonDefaultCount = stats.risk_distribution["0"] || 0;
    const defaultRate = (defaultCount / totalLoans) * 100;

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <Link to="/" className="text-gray-400 hover:text-white flex items-center gap-2 mb-4 transition-colors group">
                            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                            Back to Dashboard
                        </Link>
                        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                            Platform Analytics
                        </h1>
                        <p className="text-gray-400 mt-2">Historical data overview from our credit registries</p>
                    </div>

                    <div className="bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-2xl p-4 flex items-center gap-4">
                        <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500">
                            <Users size={24} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Total Records</p>
                            <p className="text-2xl font-mono font-bold text-white">{totalLoans.toLocaleString()}</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                                <DollarSign size={80} />
                            </div>
                            <div className="relative z-10">
                                <p className="text-sm font-medium text-gray-400 mb-1">Average Income</p>
                                <h3 className="text-3xl font-bold text-white mb-4">
                                    ${stats.avg_income.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                </h3>
                                <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
                                    <TrendingUp size={16} />
                                    <span>Verified across registry</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                                <TrendingUp size={80} />
                            </div>
                            <div className="relative z-10">
                                <p className="text-sm font-medium text-gray-400 mb-1">Default Rate</p>
                                <h3 className="text-3xl font-bold text-white mb-4">
                                    {defaultRate.toFixed(1)}%
                                </h3>
                                <div className="w-full bg-neutral-800 rounded-full h-2 overflow-hidden">
                                    <div
                                        className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-full transition-all duration-1000 ease-out"
                                        style={{ width: `${defaultRate}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl sm:col-span-2">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold">Loan Status Distribution</h3>
                                <PieChart size={20} className="text-gray-500" />
                            </div>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-emerald-400 font-medium">Non-Default (Success)</span>
                                        <span className="text-gray-400">{nonDefaultCount.toLocaleString()} units</span>
                                    </div>
                                    <div className="h-4 bg-neutral-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-emerald-500 transition-all duration-1000 ease-out delay-300"
                                            style={{ width: `${(nonDefaultCount / totalLoans) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-red-400 font-medium">Default (At Risk)</span>
                                        <span className="text-gray-400">{defaultCount.toLocaleString()} units</span>
                                    </div>
                                    <div className="h-4 bg-neutral-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-red-500 transition-all duration-1000 ease-out delay-500"
                                            style={{ width: `${(defaultCount / totalLoans) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl flex flex-col items-center justify-center">
                        <h3 className="text-lg font-bold mb-8 text-center">Inference Profile</h3>
                        <div className="relative w-48 h-48">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle
                                    cx="96"
                                    cy="96"
                                    r="80"
                                    stroke="currentColor"
                                    strokeWidth="12"
                                    fill="transparent"
                                    className="text-neutral-800"
                                />
                                <circle
                                    cx="96"
                                    cy="96"
                                    r="80"
                                    stroke="currentColor"
                                    strokeWidth="12"
                                    fill="transparent"
                                    strokeDasharray={2 * Math.PI * 80}
                                    strokeDashoffset={2 * Math.PI * 80 * (1 - nonDefaultCount / totalLoans)}
                                    strokeLinecap="round"
                                    className="text-emerald-500 transition-all duration-1000 ease-out"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center tracking-tighter">
                                <span className="text-3xl font-black text-white">{Math.round((nonDefaultCount / totalLoans) * 100)}%</span>
                                <span className="text-[10px] text-gray-500 uppercase font-bold">Stability</span>
                            </div>
                        </div>
                        <div className="mt-8 flex gap-4 w-full">
                            <div className="flex-1 text-center">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 mx-auto mb-1"></div>
                                <p className="text-[10px] text-gray-500 uppercase">Secure</p>
                            </div>
                            <div className="flex-1 text-center">
                                <div className="w-2 h-2 rounded-full bg-red-500 mx-auto mb-1"></div>
                                <p className="text-[10px] text-gray-500 uppercase">Risk</p>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="mt-8 p-6 bg-gradient-to-br from-blue-900/20 to-emerald-900/20 border border-neutral-800 rounded-2xl">
                    <p className="text-gray-300 italic text-center">
                        "The dataset shows a healthy stability ratio of {Math.round((nonDefaultCount / totalLoans) * 100)}%, suggesting a balanced lending portfolio for model training."
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Stats;