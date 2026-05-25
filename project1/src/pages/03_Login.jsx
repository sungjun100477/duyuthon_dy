//04_Login.jsx
//로그인 페이지
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // ✅ 로그인 처리 함수
  const handleLogin = async () => {
    // 빈 값 체크
    if (!id || !password) {
      setError("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // 🚀 백엔드 로그인 API 호출
      const response = await axios.post("http://localhost:3000/api/auth/login", {
        email: id,
        password: password
      });

      console.log("로그인 성공:", response.data);

      // ✅ JWT 토큰을 localStorage에 저장
      localStorage.setItem("token", response.data.token);

      // 로그인 성공 알림
      alert("로그인 성공!");

      // 메인 페이지로 이동
      navigate("/main");

    } catch (err) {
      console.error("로그인 실패:", err);
      
      if (err.response) {
        setError(err.response.data.message || "로그인에 실패했습니다.");
      } else if (err.request) {
        setError("서버에 연결할 수 없습니다.");
      } else {
        setError("로그인 중 오류가 발생했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#F9F7ED",
        color: "black",
        minHeight: "100vh",
        paddingTop: "70px"
      }}
    >
      <h1 style={{ color: "black" }}>로그인</h1>

      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          margin: "0 auto",
          marginTop: "50px"
        }}
      >
        {/* 아이디(이메일) 입력 */}
        <div style={{ textAlign: "left", marginBottom: "20px" }}>
          <label>아이디(Email)</label>
          <input
            type="email"
            placeholder="이메일을 입력하세요"
            value={id}
            onChange={(e) => setId(e.target.value)}
            style={{
              backgroundColor: "white",
              color: "black",
              width: "90%",
              padding: "10px",
              marginTop: "5px",
              border: "2px solid black"
            }}
          />
        </div>

        {/* 비밀번호 입력 */}
        <div style={{ textAlign: "left", marginBottom: "30px" }}>
          <label>비밀번호</label>
          <input
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleLogin();
            }}
            style={{
              color: "black",
              backgroundColor: "white",
              width: "90%",
              padding: "10px",
              marginTop: "5px",
              border: "2px solid black"
            }}
          />
        </div>

        {/* 오류 메시지 */}
        {error && (
          <p style={{ color: "red", marginBottom: "15px" }}>
            {error}
          </p>
        )}

        {/* 로그인 버튼 */}
        <button
          onClick={handleLogin}
          disabled={isLoading}
          style={{
            backgroundColor: isLoading ? "#aaa" : "#6EA1CC",
            width: "80%",
            padding: "15px",
            fontSize: "20px",
            cursor: isLoading ? "not-allowed" : "pointer",
            borderRadius: "50px",
            border: "none",
            marginBottom: "15px"
          }}
        >
          {isLoading ? "로그인 중..." : "로그인"}
        </button>

        {/* 회원가입 페이지로 이동 */}
        <p>
          계정이 없으신가요?{" "}
          <span
            onClick={() => navigate("/signup")}
            style={{
              color: "#6EA1CC",
              cursor: "pointer",
              textDecoration: "underline"
            }}
          >
            회원가입
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;