export interface CreditPredictRequest {
    person_age: number;
    person_income: number;
    person_emp_length: number;
    loan_amnt: number;
    loan_int_rate: number;
    loan_percent_income: number;
    cb_person_cred_hist_length: number;
    person_home_ownership: 'RENT' | 'OWN' | 'MORTGAGE' | 'OTHER';
    loan_intent: 'PERSONAL' | 'EDUCATION' | 'MEDICAL' | 'VENTURE' | 'HOMEIMPROVEMENT' | 'DEBTCONSOLIDATION';
    cb_person_default_on_file: 'Y' | 'N';
}

export interface CreditPredictResponse {
    prediction: number;
    risk_probability: number;
}
