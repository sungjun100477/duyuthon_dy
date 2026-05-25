import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup2() {
  const [interest, setInterest] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 이전 단계 데이터 확인
  useEffect(() => {
    const signupData = localStorage.getItem("signupData");
    if (!signupData) {
      alert("회원가입 정보를 다시 입력해주세요.");
      navigate("/signup");
    }
  }, [navigate]);

  const handleStart = async () => {
  if (interest.length < 2 || interest.length > 7) {
    setError("2~7자로 입력해주세요.");
    return;
  }
  setError("");
  
  const signupData = JSON.parse(localStorage.getItem("signupData"));
  if (!signupData) {
    alert("회원가입 정보를 다시 입력해주세요.");
    navigate("/signup");
    return;
  }

  try {
    await axios.post("https://duyuthon7.onrender.com/api/auth/signup", {  // ⭐ 상대 경로!
      email: signupData.id,
      password: signupData.password,
      name: signupData.id,
      interest: interest,
    });
    localStorage.removeItem("signupData");
    navigate("/login");
  } catch (err) {
    setError(err.response?.data?.message || "회원가입에 실패했습니다.");
  }
};

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#F9F7ED",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 20px",
        fontFamily: "sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "28px",
          fontWeight: "bold",
          marginBottom: "10px",
          textAlign: "center",
          lineHeight: "1.4",
          color: "black",
        }}
      >
        RE:50과 가장 쉽게
        <br />
        지속가능 실천을
        <br />
        시작해볼까요?
      </h1>

      <p
        style={{
          fontSize: "14px",
          color: "#555",
          marginBottom: "40px",
          textAlign: "center",
        }}
      >
        당신의 환경 관심사를 알려주세요
      </p>

      <input
        type="text"
        placeholder="환경 관심사 (예: 제로웨이스트)"
        value={interest}
        onChange={(e) => setInterest(e.target.value)}
        style={{
          width: "80%",
          padding: "12px 0",
          fontSize: "16px",
          border: "none",
          borderBottom: "1px solid #999",
          outline: "none",
          backgroundColor: "transparent",
          marginBottom: "10px",
          textAlign: "center",
          color: "black",
        }}
      />

      {error && (
        <p style={{ color: "red", fontSize: "13px", marginBottom: "20px" }}>
          {error}
        </p>
      )}

      <button
        onClick={handleStart}
        style={{
          marginTop: "30px",
          width: "80%",
          padding: "14px",
          fontSize: "16px",
          fontWeight: "bold",
          color: "white",
          backgroundColor: "#6EA1CC",
          border: "none",
          borderRadius: "50px",
          cursor: "pointer",
        }}
      >
        시작하기
      </button>
    </div>
  );
}