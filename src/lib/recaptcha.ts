const RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

type RecaptchaResponse = {
    success: boolean;
    score: number;
    action: string;
    "error-codes"?: string[];
};

export async function verify_recaptcha(token: string, min_score = 0.5): Promise<boolean> {
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    if (!secret) throw new Error("RECAPTCHA_SECRET_KEY is not set");

    const body = new URLSearchParams({ secret, response: token });

    try {
        const res = await fetch(RECAPTCHA_VERIFY_URL, { method: "POST", body });
        if (!res.ok) return false;
        const data: RecaptchaResponse = await res.json();
        return data.success && data.score >= min_score;
    } catch {
        return false;
    }
}
