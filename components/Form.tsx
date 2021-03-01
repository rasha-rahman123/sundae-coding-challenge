import React, { useState } from "react";
import { NextPage } from "next";
import Image from "next/image";
import { useAppContext } from "../context/state";
import {useRouter} from 'next/router'
interface RegistrationProps {}

export const Registration: NextPage<RegistrationProps> = ({}) => {
    //@ts-ignore
  const { state, setState } = useAppContext();
  const [showPass, setShowPass] = useState<boolean>(false);
  const [valid, setValid] = useState<boolean>(false);

  const [pass, setPass] = useState<string>();
  const [user, setUser] = useState<string>();
  const [email, setEmail] = useState<string>();
  
  const router = useRouter();
  
  const checkThis = (e) => {
    setValid(e.target.checked);
  };
  const text = state ? "SIGN IN" : "SIGN UP";
  return (
    <form className="form" onSubmit={e => {
      e.preventDefault();
      router.push('/editor')
    }}>
      {!state && (
        <>
          <label>your full name</label>
          <input
            type="text"
            className="fname"
            placeholder="John Doe"
            autoComplete="name"
            value={user}
          />
        </>
      )}
      <label>your email</label>
      <input
        type="text"
        className="ename"
        autoComplete="email"
        placeholder="JohnDoe@gmail.com"
        value={email}
      />
      <label>your password</label>
      <div className="passwordInput">
        <img
          onClick={() => setShowPass(!showPass)}
          className="passImg"
          src={showPass ? "/eyeRed.svg" : "/eye.svg"}
          width={24}
          height={24}
        />
        <input
          className="pname"
          type={showPass ? "text" : "password"}
          placeholder="********"
          value={pass}
        />
      </div>

      <button>
        <p>{text}</p> <img src="/rArrow.svg" width={24} height={24} />
      </button>
      {!state ? (
        <div className="selectr">
          <p>Terms and Conditions</p>
          <label className="switch">
            <input type="checkbox" onChange={(e) => checkThis(e)} />
            <span className="slider round"></span>
          </label>
        </div>
      ) : (
        <div>
          <h4>Or Sign in with</h4>
          <div className="socials">
            <div className="icon">
              <Image src="/fba.svg" width={32} height={32} layout="fixed" />
            </div>
            <div className="icon">
              <Image src="/gpa.svg" width={32} height={32} layout="fixed" />
            </div>
            <div className="icon">
              <Image src="/iga.svg" width={32} height={32} layout="fixed" />
            </div>
            <div className="icon">
              <Image src="/twa.svg" width={32} height={32} layout="fixed" />
            </div>
          </div>
        </div>
      )}
    </form>
  );
};
