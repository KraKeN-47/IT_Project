import React from "react";

export default function DivWrapper(props: any) {
  return <div {...props}>{props.children}</div>;
}
