import Head from "next/head";
import React from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Registration } from "../components/Form";
import { useAppContext } from "../context/state";

export default function Home() {
  //@ts-ignore
  const { state, setState } = useAppContext();
  const text = {
    h1: state ? <h1>Sign In</h1> : <h1>Sign Up</h1>,
    h4: state ? (
      <h4>
        Don't have an account? <a onClick={() => setState(false)}>Sign Up</a>
      </h4>
    ) : (
      <h4>
        Already have an account? <a onClick={() => setState(true)}>Sign In</a>
      </h4>
    ),
  };
  return (
    <div className="full">
            <Header />
      <div className="leftPage">
        
        <img src="/Image.png" />
      </div>
      <div>
      <div className="container">
        <Head>
          <title>Sundae Coding Challenge - Rasha Rahman - Login/SignUp</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
      
        <div className="main">
  
          {text.h1}
          {text.h4}
          <Registration />
        </div>
      </div>
      <Footer />
      </div>
    </div>
  );
}
