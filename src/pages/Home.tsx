import styled from "styled-components";
import { useNavigate } from "react-router";
import { Title, Wrap } from "../components/Components.tsx";
import { useForm } from "react-hook-form";

const Card = styled.form`
    background-color: #fff;
    padding: 40px;
    border-radius: 16px;
    width: 100%;
    max-width: 400px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const Input = styled.input`
    padding: 14px;
    border-radius: 10px;
    border: 1px solid #ddd;
    transition: all 0.5s;

    &:focus {
        outline: none;
        border: 1px solid #6c5ce7;
    }
`;

const Button = styled.button`
    padding: 14px;
    background-color: #6c5ce7;
    color: white;
    border: none;
    border-radius: 10px;
    font-weight: 600;
    margin-top: 20px;
    cursor: pointer;
`;

const ErrorText = styled.span`
    color: #d63031;
    font-size: 12px;
    margin-top: 4px;
`;

const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
`;

type FormValues = {
    username: string;
    password: string;
    name: string;
    email: string;
}

function Home() {
    // 1. 화면에 사용자가 입력해야 할 로그인 폼을 작성하고,
    // --- styled-components의 힘을 빌어서 화면 디자인

    // 2. 그에 대해 사용자가 입력 처리를 끝내면
    // --- 각 input에 대한 useState를 작성
    // --- input과 useState를 연결 (4개 input에 onChange 작성)
    // --- 사용자가 엔터를 칠 때 또는 회원가입 버튼을 눌렀을 때 onSubmit 작성

    // 3. 유효성 검사를 한 후 사용자를 이동 시킨다.
    // --- if 처리를 통해 내가 생각한, 전송에 탈락해야 할 조건을 작성

    // 4. 단, 유효성 검사에 실패하면 에러 메세지를 화면에 출력 시키고 끝낸다.
    // --- useState를 또다시 만들필요가 있음
    // --- 여러개의 에러를 관리할 useState를 만들어도 되고, 하나의 useState를 사용할 수됴 있음
    // --- 하나의  useState를 쓴다면, function안에서 여러번의 setState가 동작되므로
    // --- function 내에서 한 번만 setState 처리를 하기 위해, 새로운 object를 작성하였음

    const navigate = useNavigate();

    const {
        register, // 화면에 존재하는 input과 react-hook-form 연결하는 기능
        handleSubmit, // react-hook-form에서 기재한 유효성 검사를 포함하여 submit 처리 할때 사용하는 기능
        formState: { errors }, //errors: 유효성 검사 결과 값이 저장되는 곳
    } = useForm<FormValues>();
    // 기본은 초기랜더링때는  errors = {} 빈상태
    // 사용자가 입력을 통해 값이 변경된다면, 그에 대한 유효성 검사를 통해
    // errors = { // 유효성이 실패하면 에러 메세지가 출력
    // root: {message: ""}
    // username: {message: ""}
    // password: {message: ""}
    // name:  {message: ""}
    // email:  {message: ""}
    // }
    // errors = {
    // username: {message: "필수값"}
    // }
    // 사용할때 {errors.username && 화면에 출력할 컴포넌트}

    // 예전에 onSubmit 속성에 집어 넣었을 때에는 (event) => {} 의 함수였어야 되는데,
    // react-hook-form을 사용하면 handleSubmit() 안에 매개변수롤 넣어야 되는 함수가 되었기 때문에
    // 그 모양을 (data: 리엑트훌폼에 맠견던 그 타입) => {} 모양이 되어야함
    // 즉, 미개변수인 data,에는 react-hook-form이 갖고 있는 값이 객체로 들어옴
    const onSubmit = (data: FormValues) => {
        // 3. 백엔드에게 전송
        const queryString = new URLSearchParams(data).toString();
        navigate(`/result?${queryString}`);
    };

    // react-hook-form 사용하는 기본순서
    // 1. react-hook-from 에게 맡길 타입 지정
    // 2. useForm<타입>() 을 실행해서 내가 필요한 기능을 뽑아오고 (필수적인것 register, handleSubmit)
    // 3. 각각 input에 가서 register를 실핼해주기
    // 4. form의 onSubmit속성에 handleSubmit으로 감싼 전송 함수넣기
    // 5. 전송 함수 작성하기
    return (
        <Wrap>
            <Card onSubmit={handleSubmit(onSubmit)}>
                <Title>회원가입</Title>
                <InputGroup>
                    <Input
                        placeholder={"아이디"}
                        {...register("username", {
                            required: "아이디는 필수 입력값입니다.",
                        })}
                    />
                    {/* 아이디에 대해 검사하고 실패한 내용을 출력해줘야 함 */}
                    {errors.username && <ErrorText>{errors.username.message}</ErrorText>}
                </InputGroup>
                <InputGroup>
                    <Input
                        placeholder={"비밀번호"}
                        type="password"
                        {...register("password", {
                            required: "비밀번호는 필수 입력 값입니다. ",
                            minLength: {
                                value: 6,
                                message: "비밀번호는 최소 6자 이상이어야 합니다.",
                            },
                        })}
                    />

                    {/* 비밀번호에 대해 검사하고 실패한 내용을 출력해줘야 함 */}
                    {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
                </InputGroup>
                <InputGroup>
                    <Input
                        placeholder={"이름"}
                        {...register("name", {
                            required: "이름은 필수 입력 값입니다.",
                        })}
                    />
                    {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
                </InputGroup>
                <InputGroup>
                    <Input
                        placeholder={"이메일"}
                        type="email"
                        {...register("email", {
                            required: "이메일은 필수 입력 값입니다.",
                            pattern: {
                                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                                message: "올바른 이메일 형식이 아닙니다.",
                            },
                        })}
                    />
                    {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
                </InputGroup>
                <Button type={"submit"}>회원가입</Button>
            </Card>
        </Wrap>
    );
}

export default Home;
