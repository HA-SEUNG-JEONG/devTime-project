import { CustomButton } from "@/components/Button/CustomButton";
import { ErrorModal } from "@/components/ErrorModal";
import SymbolLogo from "@/components/SymbolLogo";
import TextField from "@/components/Text/TextField";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

interface LoginFormData {
  email: string;
  password: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/;

const SignIn = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({ mode: "onChange" });
  const navigate = useNavigate();
  const emailInputRef = useRef<HTMLInputElement>(null);

  const watchedEmail = watch("email");
  const watchedPassword = watch("password");

  const [errorModal, setErrorModal] = useState<{
    open: boolean;
    title: string;
    description: string;
  }>({
    open: false,
    title: "",
    description: "",
  });

  const handleLogin = async (data: LoginFormData) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(
          responseData.message ||
            responseData.error?.message ||
            "로그인 정보를 다시 확인해 주세요.",
        );
      }
      reset();

      // isFirstLogin에 따른 분기 처리
      if (responseData.isFirstLogin) {
        navigate("/profile", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (error) {
      setErrorModal({
        open: true,
        title: "로그인 실패",
        description:
          error instanceof Error
            ? error.message
            : "로그인 정보를 다시 확인해 주세요.",
      });
    }
  };

  const handleCloseModal = () => {
    setErrorModal({ open: false, title: "", description: "" });
    emailInputRef.current?.focus();
  };

  const isButtonDisabled = !isValid || !watchedEmail || !watchedPassword;

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden lg:justify-end">
      {/* 배경 로고 - 태블릿 이상에서만 표시 */}
      <SymbolLogo
        className="text-primary-0 absolute top-[60px] -right-[100px] hidden md:-right-[150px] md:block lg:-right-[213px]"
        width={1090}
        height={530}
      />

      {/* 로그인 폼 */}
      <form
        className="z-10 w-full px-4 sm:px-6 md:px-8 lg:absolute lg:left-[50%] lg:w-[50%] lg:px-0"
        onSubmit={handleSubmit(handleLogin)}
      >
        <div className="mx-auto flex w-full max-w-[400px] flex-col gap-4 rounded-[10px] bg-white/80 p-6 shadow-[0_40px_100px_rgba(0,0,0,0.25)] backdrop-blur-[50px] lg:translate-x-[-50%]">
          <h1 className="typography-heading-b text-primary-0">로그인</h1>
          <TextField>
            <TextField.Label className="text-left">이메일</TextField.Label>
            <TextField.Input
              placeholder="이메일을 입력해주세요."
              className={`h-11 ${errors.email ? "border-secondary-negative border" : ""}`}
              {...register("email", {
                required: "이메일을 입력해 주세요.",
                pattern: {
                  value: EMAIL_REGEX,
                  message: "이메일 형식으로 작성해 주세요.",
                },
              })}
              ref={(e) => {
                register("email").ref(e);
                (
                  emailInputRef as React.MutableRefObject<HTMLInputElement | null>
                ).current = e;
              }}
            />
            {errors.email && (
              <TextField.HelperText variant="error" className="text-left">
                {errors.email.message}
              </TextField.HelperText>
            )}
          </TextField>
          <TextField>
            <TextField.Label className="text-left">비밀번호</TextField.Label>
            <TextField.Input
              placeholder="비밀번호를 입력해주세요."
              type="password"
              className={`h-11 ${errors.password ? "border-secondary-negative border" : ""}`}
              {...register("password", {
                required: "비밀번호를 입력해 주세요.",
                minLength: {
                  value: 8,
                  message:
                    "비밀번호는 8자 이상, 영문과 숫자 조합이어야 합니다.",
                },
                pattern: {
                  value: PASSWORD_REGEX,
                  message:
                    "비밀번호는 8자 이상, 영문과 숫자 조합이어야 합니다.",
                },
              })}
            />
            {errors.password && (
              <TextField.HelperText variant="error" className="text-left">
                {errors.password.message}
              </TextField.HelperText>
            )}
          </TextField>
          <CustomButton
            type="submit"
            label="로그인"
            variant="primary"
            className="mt-8 w-full sm:mt-12"
            disabled={isButtonDisabled}
          />
          <div className="flex flex-col items-center justify-center gap-1 sm:flex-row sm:gap-2">
            <p className="typography-body-r text-primary-0">
              아직 계정이 없으신가요?
            </p>
            <Link to="/signup" className="typography-body-b text-primary-0">
              회원가입 하러 가기
            </Link>
          </div>
        </div>
      </form>

      <ErrorModal
        open={errorModal.open}
        title={errorModal.title}
        description={errorModal.description}
        onOpenChange={handleCloseModal}
      />
    </div>
  );
};

export default SignIn;
