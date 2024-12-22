import React from "react";
import Image from "next/image";
type buttonprops = {
  type: "button" | "submit" | "reset";
  title: string;
  icon?: string;
  variant: "";
};

const Button = ({ type, title, icon, variant }: buttonprops) => {
  return <button
  className={`flexCenter gap-3 rounded-full border ${variant}`}
  type={type}>
    {icon && <Image src={icon} alt={title} width={24} height={24}></Image>}
    <label className="bold-16 whitespace-nowrap">{title}</label>
  </button>;
};

export default Button;
