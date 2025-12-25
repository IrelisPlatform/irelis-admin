

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { AuthFooter } from "@/components/auth/AuthFooter";
import { toast } from "sonner";
import { useLanguage } from "@/context/LanguageContext";
import { Spinner } from "@/components/ui/spinner";
import Cookies from "js-cookie";

export default function OtpPage() {
    const { t } = useLanguage();
    const router = useRouter();

    let email = "";
    let returnTo = "/";
    if (typeof window !== "undefined") {
        email = localStorage.getItem("auth_email") || "";
        returnTo = localStorage.getItem("auth_returnTo") || "/";
    }

    useEffect(() => {
        if (!email) {
            router.push("/auth/signin");
        }
    }, [email, router]);

    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const [otpExpiry, setOtpExpiry] = useState(600);
    const [resendCountdown, setResendCountdown] = useState(60);
    const [resendDisabled, setResendDisabled] = useState(true);


    useEffect(() => {
        const savedOtpExpiryEnd = localStorage.getItem("otpExpiryEnd");
        const savedResendEnd = localStorage.getItem("resendCountdownEnd");

        if (savedOtpExpiryEnd) {
            const remaining = Math.floor((Number(savedOtpExpiryEnd) - Date.now()) / 1000);
            setOtpExpiry(remaining > 0 ? remaining : 0);
        }

        if (savedResendEnd) {
            const remaining = Math.floor((Number(savedResendEnd) - Date.now()) / 1000);
            setResendCountdown(remaining > 0 ? remaining : 0);
            setResendDisabled(remaining > 0);
        }
    }, []);

    useEffect(() => {
        if (otpExpiry <= 0) return;
        const timer = setInterval(() => {
            setOtpExpiry(prev => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, [otpExpiry]);

    useEffect(() => {
        if (resendCountdown <= 0) {
            setResendDisabled(false);
        } else {
            const timer = setTimeout(() => {
                setResendCountdown(prev => (prev > 0 ? prev - 1 : 0));
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [resendCountdown]);

    useEffect(() => {
        if (otpExpiry > 0) {
            localStorage.setItem("otpExpiryEnd", (Date.now() + otpExpiry * 1000).toString());
        }
    }, [otpExpiry]);

    useEffect(() => {
        if (resendCountdown > 0) {
            localStorage.setItem("resendCountdownEnd", (Date.now() + resendCountdown * 1000).toString());
        }
    }, [resendCountdown]);

    const handleVerify = async () => {
        if (!code) return;
        setLoading(true);
        setError(null);

        try {
            const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
            const res = await fetch(`${backendUrl}/auth/otp/verify`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email, code }),
            });

            const data = await res.json();

            if (res.ok && data.accessToken && data.refreshToken) {
                const preferredRedirect = localStorage.getItem("auth_preferred_redirect");
                const finalRedirect = preferredRedirect || returnTo;

                if (preferredRedirect) {
                    localStorage.removeItem("auth_preferred_redirect");
                }

                Cookies.set("access_token", data.accessToken,{secure:true});
                Cookies.set("refresh_token", data.refreshToken,{secure:true});

                localStorage.removeItem("auth_returnTo");
                localStorage.removeItem("auth_email");
                localStorage.removeItem("auth_role");
                localStorage.removeItem("otpExpiryEnd");
                localStorage.removeItem("resendCountdownEnd");

                window.location.href = finalRedirect;
            } else {
                setError(data.message || t.auth.signin.unknownError);
            }
        } catch (err: any) {
            console.error(err);
            setError(err?.message || t.auth.signin.serverError);
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        setLoading(true);
        setError(null);

        try {
            const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
            const role = typeof window !== "undefined" ? localStorage.getItem("auth_role") : "CANDIDATE";

            const res = await fetch(`${backendUrl}/auth/otp/request`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, userType: role }),
            });

            if (res.ok) {
                toast.success(t.auth.otp.resendSuccess);

                const otpEnd = Date.now() + 600 * 1000;
                const resendEnd = Date.now() + 60 * 1000;

                localStorage.setItem("otpExpiryEnd", otpEnd.toString());
                localStorage.setItem("resendCountdownEnd", resendEnd.toString());

                setOtpExpiry(600);
                setResendCountdown(60);
                setResendDisabled(true);
            } else {
                const err = await res.json().catch(() => ({}));
                toast.error(err.message || t.auth.signin.unknownError);
            }
        } catch (err) {
            console.error(err);
            toast.error(t.auth.signin.serverError);
        } finally {
            setLoading(false);
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };


    return (
        <div className="min-h-screen flex flex-col bg-[#f9fafb]">
            <AuthHeader />
            <main className="flex justify-center flex-1">
                <div className="bg-white p-8 rounded-xl shadow-sm w-full max-w-md border">
                    <h1 className="text-lg font-semibold mb-2">{t.auth.otp.title}</h1>
                    <p
                        className="text-sm text-muted-foreground mb-4"
                        dangerouslySetInnerHTML={{ __html: t.auth.otp.sentTo(email) }}
                    />
                    <p className="text-sm text-muted-foreground mb-4">
                        {t.auth.otp.validFor(formatTime(otpExpiry))}
                    </p>

                    <Input
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="------"
                        className="tracking-widest text-center"
                    />

                    {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

                    <Button
                        className="w-full mt-4"
                        onClick={handleVerify}
                        disabled={loading || !code}
                    >
                        {loading ? (
                            <>
                                <Spinner className="h-4 w-4 text-white" />{" "}
                                <span className="ml-2">{t.auth.otp.verifying}</span>
                            </>
                        ) : (
                            t.auth.otp.verify
                        )}
                    </Button>

                    <div className="mt-4 text-center">
                        <button
                            type="button"
                            onClick={handleResend}
                            disabled={resendDisabled}
                            className={`text-sm ${
                                resendDisabled ? "text-gray-400" : "text-blue-600 hover:underline"
                            }`}
                        >
                            {resendDisabled
                                ? t.auth.otp.resend(resendCountdown)
                                : t.auth.otp.resendNow}
                        </button>
                    </div>
                </div>
            </main>
            <AuthFooter className="mt-10" />
        </div>
    );
}
