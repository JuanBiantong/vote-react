import React, { useContext } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./index";
import {BsFillForwardFill} from "react-icons/bs"

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);

  return (
    <BoxContainer>
      <FormContainer>
        <Input type="number" autoFocus placeholder="Nomor Hp" />
        <Input type="password" placeholder="Password" />
        <Input type="password" placeholder="Confirm Password" />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton type="submit">Ganti Password</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink>
        Klik tanda panah untuk kembali ke halaman sebelumnya!{" "}
        <BoldLink href="#" onClick={switchToSignin}>
         <BsFillForwardFill/>
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
