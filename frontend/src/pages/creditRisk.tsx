import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../components/ui/select';
import { creditService, type CreditPredictRequest, type CreditPredictResponse, HOME_OWNERSHIP_OPTIONS, LOAN_INTENT_OPTIONS, DEFAULT_ON_FILE_OPTIONS } from '../services';

const CreditRisk = () => {
    const [formData, setFormData] = useState<CreditPredictRequest>({
        person_age: 25,
        person_income: 50000,
        person_emp_length: 2,
        loan_amnt: 5000,
        loan_int_rate: 10.5,
        loan_percent_income: 0.1,
        cb_person_cred_hist_length: 3,
        person_home_ownership: 'RENT',
        loan_intent: 'PERSONAL',
        cb_person_default_on_file: 'N'
    });

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<CreditPredictResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await creditService.predict(formData);
            setResult(response);
        } catch (err: any) {
            setError(err.message || 'Error occurred while predicting');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) : value
        }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-4xl mx-auto mb-6 flex items-center">
                <Link to="/" className="text-gray-400 hover:text-white flex items-center gap-2 transition-colors">
                    Back to Home
                </Link>
            </div>
            <h1 className="text-4xl font-extrabold mb-10 text-center bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                Credit Risk Analysis
            </h1>

            <div className="max-w-4xl mx-auto bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-2xl">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Numeric Inputs */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-400">Age</label>
                        <Input name="person_age" value={formData.person_age} onChange={handleChange} className="bg-neutral-800 border-neutral-700" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-400">Income</label>
                        <Input name="person_income" value={formData.person_income} onChange={handleChange} className="bg-neutral-800 border-neutral-700" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-400">Employment Length (Years)</label>
                        <Input name="person_emp_length" value={formData.person_emp_length} onChange={handleChange} className="bg-neutral-800 border-neutral-700" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-400">Loan Amount</label>
                        <Input name="loan_amnt" value={formData.loan_amnt} onChange={handleChange} className="bg-neutral-800 border-neutral-700" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-400">Interest Rate</label>
                        <Input name="loan_int_rate" value={formData.loan_int_rate} onChange={handleChange} className="bg-neutral-800 border-neutral-700" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-400">Loan % of Income (0.0 - 1.0)</label>
                        <Input name="loan_percent_income" value={formData.loan_percent_income} onChange={handleChange} className="bg-neutral-800 border-neutral-700" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-400">Credit History (Years)</label>
                        <Input name="cb_person_cred_hist_length" value={formData.cb_person_cred_hist_length} onChange={handleChange} className="bg-neutral-800 border-neutral-700" />
                    </div>

                    {/* Categorical Inputs */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-400">Home Ownership</label>
                        <Select value={formData.person_home_ownership} onValueChange={(val) => handleSelectChange('person_home_ownership', val)}>
                            <SelectTrigger className="bg-neutral-800 border-neutral-700">
                                <SelectValue placeholder="Select home ownership" />
                            </SelectTrigger>
                            <SelectContent>
                                {HOME_OWNERSHIP_OPTIONS.map(opt => (
                                    <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-400">Loan Intent</label>
                        <Select value={formData.loan_intent} onValueChange={(val) => handleSelectChange('loan_intent', val)}>
                            <SelectTrigger className="bg-neutral-800 border-neutral-700">
                                <SelectValue placeholder="Select loan intent" />
                            </SelectTrigger>
                            <SelectContent>
                                {LOAN_INTENT_OPTIONS.map(opt => (
                                    <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-400">Recent Default Event?</label>
                        <Select value={formData.cb_person_default_on_file} onValueChange={(val) => handleSelectChange('cb_person_default_on_file', val)}>
                            <SelectTrigger className="bg-neutral-800 border-neutral-700">
                                <SelectValue placeholder="Select default status" />
                            </SelectTrigger>
                            <SelectContent>
                                {DEFAULT_ON_FILE_OPTIONS.map(opt => (
                                    <SelectItem key={opt} value={opt}>{opt === 'Y' ? 'Yes' : 'No'}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="md:col-span-2 mt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-xl font-bold text-lg hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                        >
                            {loading ? 'Analyzing Data...' : 'Analyze Credit Risk'}
                        </button>
                    </div>
                </form>

                {error && (
                    <div className="mt-8 p-4 bg-red-900/30 border border-red-800/50 rounded-lg text-red-200 text-sm">
                        {error}
                    </div>
                )}

                {result && (
                    <div className={`mt-8 p-8 rounded-xl border ${result.prediction === 1 ? 'bg-red-900/20 border-red-800' : 'bg-emerald-900/20 border-emerald-800'}`}>
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-bold mb-1">Result: {result.prediction === 1 ? 'High Risk' : 'Low Risk'}</h3>
                                <p className="text-neutral-400">Probability: {result.risk_probability}%</p>
                            </div>
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl ${result.prediction === 1 ? 'bg-red-500/20 text-red-500' : 'bg-emerald-500/20 text-emerald-500'}`}>
                                {result.prediction === 1 ? '⚠️' : '✅'}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreditRisk;