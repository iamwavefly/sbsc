import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Icon,
  Transition,
} from "semantic-ui-react";
import MainLayout from "../layout";
import {
  emailRegex,
  errorClass,
  errorMsg,
  passwordIndicator,
  passwordRegex,
} from "../middleware/validator";
import { Transition as RCTransition } from "react-transition-group";

import Styles from "./styles.module.scss";
import PasswordIndicatorForm from "../components/form/PasswordIndicatorForm";
import baseUrl from "../middleware/baseUrl";
import { catchErrors, notifyErrorHandler } from "../middleware/catchErrors";
import axios from "axios";
import { loginHandler, setSignUpToken } from "../middleware/auth";
import Link from "next/link";
const validator = {
  email_address: { error: false, msg: null },
  password: { error: false, msg: null },
};
const duration = 300;
const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
  display: "none",
};
const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1, display: "inherit" },
  exiting: { opacity: 1 },
  exited: { opacity: 0 },
};

const defaultUser = {
  email_address: "",
  password: "",
};

export default function SignUp() {
  const [validateUser, setValidateUser] = useState(validator);
  const [formField, setFormField] = useState("");
  const [user, setUser] = useState(defaultUser);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showPwdInd, setShowPwdInd] = useState(false);
  const [password, setPassword] = useState({
    mode: true,
    type: "password",
    label: "SHOW",
    icon: <Icon name="eye slash" />,
  });

  useEffect(() => {
    const isFormValid =
      user.email_address &&
      user.password.length > 7 &&
      passwordRegex(user.password);

    isFormValid ? setDisabled(false) : setDisabled(true);
    if (formField) validateInput(formField);

    passwordIndicator(user);
  }, [user]);

  const validateInput = (name) => {
    //1. Regex
    const regex = {
      minLength: {
        password: 8,
      },
    };

    //2. User Friendly Names mapping for Error config
    const friendly = {
      email_address: "Email address",
      password: "Password",
    };

    //3.  Empty Field Validation
    if (!user[name]) {
      const value = {
        error: true,
        msg: `${friendly[name]} is required.`,
      };
      setValidateUser((prevState) => ({ ...prevState, [name]: value }));
    }

    //4. Mini Length Field Validation
    else if (
      regex.minLength[name] &&
      user[name].trim().length < regex.minLength[name]
    ) {
      const value = {
        error: true,
        msg: `This field requires at least ${regex.minLength[name]} characters`,
      };
      setValidateUser((prevState) => ({ ...prevState, [name]: value }));
    }

    //5. Invalid Email Field Validation
    else if (name === "email_address") {
      const validEmail = emailRegex(user[name]);
      if (!validEmail) {
        const value = {
          error: true,
          msg: `${friendly[name]} is invalid.`,
        };
        setValidateUser((prevState) => ({ ...prevState, [name]: value }));
      } else {
        clearError(name);
      }
    }

    //6. Password Strength Validation
    else if (name === "password") {
      const validPassword = passwordRegex(user[name]);
      if (!validPassword) {
        const value = {
          error: true,
          msg: `${friendly[name]} must include all of the checks below`,
        };
        setValidateUser((prevState) => ({ ...prevState, [name]: value }));
      } else {
        clearError(name);
      }
    }

    //. Final Validation /Graceful fallback for happy path ..No errors
    else {
      clearError(name);
    }
  };

  const clearError = (field) => {
    const value = {
      error: false,
      msg: null,
    };
    setValidateUser((prevState) => ({ ...prevState, [field]: value }));
  };

  // toggle password
  const togglePassword = (e) => {
    e.preventDefault();
    const mode = !password.mode;

    mode
      ? setPassword({
          mode,
          type: "password",
          label: "SHOW",
          icon: <Icon name="eye slash" />,
        })
      : setPassword({
          mode,
          type: "text",
          label: "HIDE",
          icon: <Icon name="eye" />,
        });
  };
  // update form input value
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
    setFormField(name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!disabled) {
      try {
        setLoading(true);
        setError("");
        const url = `${baseUrl}/login`;
        const payload = {
          email: user.email_address,
          password: user.password,
        };
        const { status, data } = await axios.post(url, payload);
        if (status == 200) {
          loginHandler(data);
        }
      } catch (error) {
        catchErrors(error, setError);
        notifyErrorHandler({
          type: "error",
          title: "Singup Error",
          msg: error,
          duration: 5000,
        });

        setLoading(false);
      }
    }
  };

  return (
    <MainLayout>
      <div className={Styles.container}>
        <Head>
          <title>Login | TestBoy</title>
          <meta name="description" content="testboi assessment" />
          <link
            rel="icon"
            href="https://icons-for-free.com/iconfiles/png/512/NextJS-1324888744726908747.png"
          />
        </Head>
        <Form onSubmit={handleSubmit} className={Styles.formWrapper}>
          <div className={Styles.header}>
            <Header as="h1">Welcome TestBoi</Header>
            <p>Login to access your TestBoi Account</p>
          </div>
          <div>
            <Form.Input
              placeholder="testboy@test.com"
              label="Email address"
              name="email_address"
              value={user.email_address}
              onChange={handleChange}
              disabled={loading}
              className={errorClass(
                "onboarding",
                validateUser,
                "email_address"
              )}
            />
            <Transition
              visible={validateUser.email_address.error}
              animation="fade down"
              duration={500}
            >
              <div className="error-box">
                {errorMsg(validateUser, "email_address")}
              </div>
            </Transition>
          </div>
          <div>
            <Form.Input
              label="Password"
              name="password"
              value={user.password}
              type={password.type}
              onChange={handleChange}
              disabled={loading}
              className={errorClass("onboarding", validateUser, "password")}
            />
            <span onClick={togglePassword} tabIndex={-1} id="password-toggler">
              {password.icon}
            </span>
            <Transition
              visible={validateUser.password.error}
              animation="fade down"
              duration={500}
            >
              <div className="error-box">
                {errorMsg(validateUser, "password")}
              </div>
            </Transition>
            <RCTransition
              in={user.password.length && validateUser.password.error}
              timeout={300}
            >
              {(state) => (
                <div
                  style={{
                    ...defaultStyle,
                    ...transitionStyles[state],
                  }}
                >
                  <PasswordIndicatorForm user={user} />
                </div>
              )}
            </RCTransition>
          </div>
          <div className={Styles.footer}>
            Don't have an account?
            <Link href="/signup">
              <a>Sign up</a>
            </Link>
          </div>
          <Button
            disabled={loading || disabled}
            loading={loading}
            type="submit"
          >
            Log in
          </Button>
        </Form>
      </div>
    </MainLayout>
  );
}
