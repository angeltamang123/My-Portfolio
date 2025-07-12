import React from "react";
import MyName from "./myName";
import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <div className="bg-[#151616] border-t-2 flex grow items-start border-teal-500 relative h-30 w-full z-20">
      <div className="w-11/12 flex flex-row mt-4 justify-between">
        <div>
          <MyName />
        </div>
        <div className="flex flex-col relative -mr-12">
          <h3
            className="text-white flex gap-4 text-md cursor-pointer hover:text-teal-400
            "
            onClick={() =>
              window.open(
                "https://www.linkedin.com/in/angel-tamang-28438027a/",
                "_blank"
              )
            }
          >
            linkedin <Linkedin />
          </h3>

          <h3
            className="text-white flex gap-6 text-md cursor-pointer hover:text-teal-400 "
            onClick={() =>
              window.open("https://github.com/angeltamang123", "_blank")
            }
          >
            Github <Github />
          </h3>
          <h3
            className="text-white flex gap-6 text-md cursor-pointer hover:text-teal-400"
            onClick={() =>
              window.open(
                "https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=cm&to=tamangangel2057@gmail.com",
                "_blank"
              )
            }
          >
            E-mail <Mail />
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Footer;
