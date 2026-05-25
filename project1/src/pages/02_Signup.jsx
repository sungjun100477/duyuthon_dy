//02_Signup.jsx
//2. 회원가입 페이지 (1/2)
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  // 페이지 이동용
  const navigate = useNavigate();

  // 아이디(이메일) 저장
  const [id, setId] = useState("");

  // 비밀번호 저장
  const [password, setPassword] = useState("");

  // 오류 메시지 상태
  const [error, setError] = useState("");

  // 비밀번호 재확인 저장
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleNext = () => {
    // ✅ 1) 빈 값 체크 (추가)
    if (!id || !password || !confirmPassword) {
      setError("모든 항목을 입력해주세요.");
      return;
    }

    // ✅ 2) 이메일 형식 체크 (추가) - 백엔드가 email로 처리하므로
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(id)) {
      setError("올바른 이메일 형식이 아닙니다. (예: user@example.com)");
      return;
    }

    // ✅ 3) 비밀번호 길이 체크 (추가)
    if (password.length < 6 || password.length > 12) {
      setError("비밀번호는 6~12자 사이여야 합니다.");
      return;
    }

    // 비밀번호 확인
    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 오류 제거
    setError("");

    // 회원가입 정보 임시 저장 (다음 페이지에서 사용)
    localStorage.setItem(
      "signupData",
      JSON.stringify({
        email: id,        // ✅ 백엔드는 email이라는 키를 사용하므로 변경
        password
      })
    );

    // 다음 페이지 이동 (이름 등 추가 정보 입력)
    navigate("/signup2");
  };

  return (
    <div
      style={{
        backgroundColor: "#F9F7ED",
        color: "black",
        minHeight: "100vh",
        paddingTop: "70px",
        textAlign: "Flex"
      }}
    >
      <h1 style={{ color: "black" }}>회원가입</h1>

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
            placeholder="사용하실 이메일을 입력하세요"
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
        <div style={{ textAlign: "left", marginBottom: "20px" }}>
          <label>비밀번호(6~12자의 영문 및 숫자 조합 권장)</label>
          <input
            type="password"
            placeholder="사용하실 비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

        {/* 비밀번호 재확인 입력 */}
        <div style={{ textAlign: "left", marginBottom: "30px" }}>
          <label>비밀번호 재확인</label>
          <input
            type="password"
            placeholder="비밀번호를 다시 입력하세요"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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

        {/* 다음으로 버튼 */}
        <button
          onClick={handleNext}
          style={{
            backgroundColor: "#6EA1CC",
            width: "80%",
            padding: "15px",
            fontSize: "20px",
            cursor: "pointer",
            borderRadius: "50px",
            border: "none"
          }}
        >
          다음으로
        </button>
      </div>
    </div>
  );
}

export default Signup;