import { useState } from "react";
import { toast } from "react-toastify";
import Button from "../shared/ui/Button";
import Input from "../shared/ui/Input";
import logo from "./../assets/logo.jpg";
export default function SignIn({ onSuccess }) {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState(null);
  const [step, setStep] = useState("PHONE");

  const sendCode = () => {
    if (phone.length < 10) {
      toast.error("شماره معتبر نیست");
      return;
    }

    const otp = Math.floor(10000 + Math.random() * 90000);
    setGeneratedCode(String(otp));
    setStep("CODE");

    toast.info(`کد ورود: ${otp}`, {
      theme: "dark",
      position: "top-center",
    });
  };

  const verifyCode = () => {
    if (code === generatedCode) {
      onSuccess();
    } else {
      toast.error("کد اشتباه است", { theme: "dark" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="w-full max-w-sm bg-slate-800 border border-slate-700 rounded-2xl shadow-xl shadow-black/30 p-6 space-y-5">
        <div className="flex item-center justify-between">
          <h2 className="font-[lale] text-2xl text-white">خوش آمدید </h2>
          <div className="w-[70px] h-[70px]">
            <img className="h-full w-full rounded-full" src={logo} alt="" />
          </div>
        </div>

        {step === "PHONE" && (
          <>
            <p className=" font-title text-slate-100 text-center font-[lale]">
              برای ورود به سیستم شماره موبایل خود را وارد کنید
            </p>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="شماره موبایل"
            />

            <Button onClick={sendCode} className="w-full font-[lale]">
              ارسال کد
            </Button>
          </>
        )}

        {step === "CODE" && (
          <>
            <h4 className=" text-slate-100 text-center font-[lale]">
              کد ارسال شده را وارد کنید
            </h4>
            <Input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="کد ۵ رقمی"
            />

            <Button onClick={verifyCode} className="w-full font-[lale]">
              ورود
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
