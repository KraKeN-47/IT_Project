import { Fade } from "@material-ui/core";
import React from "react";

import DivWrapper from "./divWrapper";

export default function FadeWrapper(props: any) {
  return (
    <Fade in={true} timeout={500}>
      <DivWrapper>{props.children}</DivWrapper>
    </Fade>
  );
}
