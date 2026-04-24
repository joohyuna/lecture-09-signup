import styled from "styled-components";
import { useState, type SubmitEvent } from "react";
import { useNavigate } from "react-router";
import { Title, Wrap } from "../components/Components.tsx";

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

type ErrorType = {
    // 프로퍼티가 몇개가 될진 모르겠지만, 그 프로퍼티의 key는 string이고 프로퍼티의 값도 모두 string이다
    [key: string]: string;
};

function Home() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");

    const [error, setError] = useState<ErrorType>({});

    const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        const result = validate(); // 유효성 검사에 성공하면true, 실패하며 false
        if (!result) return;

        // 모든 검증을 통과하면, 그 입력한 값들을 백엔드에게 전송
        // 에러나오면 결코 아래로 나가면 안됨

        // 3. 백엔드에게 전송
        const data = { username, password, email, name };
        const queryString = new URLSearchParams(data).toString();
        navigate(`/result?${queryString}`);
    };

    const validate = () => {
        // 잠깐사용알 new 에러
        const newErrors: ErrorType = {};

        // 검사만 신경쓰는것이다.
        // 전송하기 전, 유효성 검사를 먼저 진행하고서 사용자를 이동
        // 1. username이 올바른가
        //if (!username.trim()) setError({ username: "아이디는 필수항목입니다." });
        if (!username.trim()) newErrors.username = "아이디는 필수 입력 항목입니다. ";
        // 2. password 입력이 되었는가
        //if (!password.trim()) setError({ password: "비밀번호는 필수 입니다." });
        //else if (password.length < 6)
        //setError({ password: "비밀번호는 최소 6자 이상이어야 함니다." });
        if (!password.trim()) newErrors.password = "비밀번호는 필수 항목입니다.";
        else if (password.length < 6) newErrors.password = "비밀번호는 최소 6자 이싱이어야 합니다.";

        // 3. 이름잉 입력 외었나
        //if (!name.trim()) setError({ name: "이름은 필수 입력항목입니다." });
        if (!name.trim()) newErrors.name = "이름은 필수 입력항목입니다.";

        // 4. 이메일이 입력 외었는가?
        //if (!email.trim()) setError({ email: "이메일은 필수 입력 항목입니다." });
        //else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email))
        //setError({ email: "이메일 형식이 올바르지 않습니다." });
        if (!email.trim()) newErrors.email = "이메일은 필수 입력 항목입니다.";
        else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email))
            newErrors.email = "이메일 형식이 올바르지 않습니다.";
        // 이메일은 꼭 중간에 @가 들어갔는지 .이 있는지 확인해줘야함
        // 어쩌구@어쩌구 => 뭔가 규칙성을 갖고 있는 string에 대한 검증을 할 때에는 "정규식"을 사용

        setError(newErrors);
        // 정규식 쳇GPT
        // newErrors 를 사용하는 이유
        // 1. 무조건 state의 값을 바꿔주는 건
        // setState 메서드를 통해서만 바꿔줄 수 있기 때문에 => 덮어쓰기
        // 객체(또는 array)라서 어긋난다.
        // 2. setState라는 메서드를 계속 쓰고 있음
        // => 여러번 사용할 때 타이밍의 문제

        // 리턴은 true, false로 검증이 성공했는지 실패했는지만 변환
        // error라고 하는 객체에 항복이 있으면 실패
        // Object.keys(객체) => 매개변수를 넣는 객체의 프로퍼티 key들을 뽐바내는 메서드, 변환감ㅎ을 array
        // 집어넣는 객체가 {username: "실패"} 라면 Object.keys(객체) 의 반환값은 ["username"]
        return Object.keys(newErrors).length === 0; // 시간 타임 에러는
    };
    return (
        <Wrap>
            <Card onSubmit={onSubmit}>
                <Title>회원가입</Title>
                <InputGroup>
                    <Input
                        placeholder={"아이디"}
                        onChange={event => {
                            setUsername(event.target.value);
                        }}
                    />
                    {/* 아이디에 대해 검사하고 실패한 내용을 출력해줘야 함 */}
                    {error.username && <ErrorText>{error.username}</ErrorText>}
                </InputGroup>
                <InputGroup>
                    <Input
                        placeholder={"비밀번호"}
                        type="password"
                        onChange={event => {
                            setPassword(event.target.value);
                        }}
                    />

                    {/* 비밀번호에 대해 검사하고 실패한 내용을 출력해줘야 함 */}
                    {error.password && <ErrorText>{error.password}</ErrorText>}
                </InputGroup>
                <InputGroup>
                    <Input
                        placeholder={"이름"}
                        onChange={event => {
                            setName(event.target.value);
                        }}
                    />
                    {error.name && <ErrorText>{error.name}</ErrorText>}
                </InputGroup>
                <InputGroup>
                    <Input
                        placeholder={"이메일"}
                        type="email"
                        onChange={event => {
                            setEmail(event.target.value);
                        }}
                    />
                    {error.email && <ErrorText>{error.email}</ErrorText>}
                </InputGroup>
                <Button type={"submit"}>회원가입</Button>
            </Card>
        </Wrap>
    );
}

export default Home;
