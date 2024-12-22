import React from "react";
import Image from "next/image";
type buttonprops = {
  type: "button" | "submit" | "reset";
  title: string;
  icon?: string;
  variant: "";
};

const Button = ({ type, title, icon, variant }: buttonprops) => {
  return <button type={type}>
    {icon && <Image src={icon} alt={title} width={24} height={24}></Image>}
  </button>;
};

export default Button;
