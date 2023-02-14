import React, { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  useToast,
  Divider,
  Heading,
} from "@chakra-ui/react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import GoogleButton from "react-google-button";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../Context/AuthContext";
import {
  getUserFailure,
  getUserRequest,
  getUserSuccess,
} from "../Redux/AuthReducer/action";
import { useDispatch } from "react-redux";

const Signup = () => {
  const [error, setError] = useState("");
  const [number, setNumber] = useState("");
  const [flag, setFlag] = useState(false);
  const [otp, setOtp] = useState("");
  const [result, setResult] = useState("");
  const [confirmObj, setConfirmObj] = useState("");
  const { setUpRecaptha, googleSignIn, user } = useUserAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useDispatch();

  const getOtp = async (e) => {
    e.preventDefault();
    console.log(number);
    setError("");
    dispatch(getUserRequest());
    if (number === "" || number === undefined)
      return setError("Please enter a valid phone number!");
    try {
      const response = await setUpRecaptha(number);
      setResult(response);
      console.log(response);
      console.log("GetOtp", user);
    } catch (err) {
      dispatch(getUserFailure());
      setError(err.message);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (otp === "" || otp === null) return;
    try {
      await result.confirm(otp);
      const userData = {
        user: user.displayName || user.phoneNumber || "User",
        token: user.accessToken || "Token_89182",
      };
      dispatch(getUserSuccess({ user: userData, token: otp }));

      setFlag(true);
      localStorage.setItem("auth", true);

      toast({
        description: "Login Successfull",
        status: "success",
        position: "top",
        isClosable: true,
        duration: 7000,
      });
      return <Navigate to="/" />;
    } catch (err) {
      setError(err.message);
      dispatch(getUserFailure());
    }
  };

  const handleGoogleSignIn = async (e) => {
    dispatch(getUserRequest());
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/");
      console.log("Hello From fn");
      localStorage.setItem("auth", true);

      const userData = {
        user: user.displayName || user.phoneNumber || "User",
        token: user.accessToken || "Token_89182",
      };

      localStorage.setItem("userData", JSON.stringify(userData));
      toast({
        description: "Login Successfull",
        status: "success",
        position: "top",
        isClosable: true,
        duration: 7000,
      });
    } catch (error) {
      // dispatch(getUserFailure());
      console.log(error.message);
    }
  };
  return (
    <Box
      m="auto"
      p="1rem"
      h="50vh"
      className="data_container"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Heading as="h3" size="md">
        Phone Auth
      </Heading>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={getOtp} style={{ display: !flag ? "block" : "none" }}>
        <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
          <PhoneInput
            defaultCountry="IN"
            value={number}
            onChange={setNumber}
            placeholder="Enter Phone Number"
            className="mb-1"
          />
          <div id="recaptcha-container"></div>
        </Form.Group>

        <div className="button-right mb-1">
        <Link to="/">
              <Button variant="secondary">Cancel</Button>
            </Link>
          &nbsp;
          <Button type="submit" style={{marginTop:"12px"}} className="mb-1" variant="primary">
            Send Otp
          </Button>
        </div>
        <Box
          style={{
            display: !flag ? "block" : "none",
            margin: "2rem",
            witdh: "90%",
            margin: "auto",
          }}
        >
          <Divider m={3} />
          <p style={{ fontSize: "1.2rem", margin: "1rem" }}>OR</p>
          <GoogleButton
            className="g-btn"
            type="dark"
            onClick={handleGoogleSignIn}
          />
        </Box>
      </Form>

      <Form onSubmit={verifyOtp} style={{ display: flag ? "block" : "none" }}>
        <Form.Group className="mb-3" controlId="formBasicOtp">
          <Form.Control
            type="otp"
            placeholder="Enter OTP"
            onChange={(e) => setOtp(e.target.value)}
          />
        </Form.Group>
        <div className="button-right">
          <Button variant="secondary" onClick={() => setFlag(false)}>
            Cancel
          </Button>
          &nbsp;
          <Button type="submit" variant="primary">
            Verify
          </Button>
        </div>
      </Form>
    </Box>
  );
};

export default Signup;
