// @ts-nocheck
import React, { FC, useRef } from "react";
import { Helmet } from "react-helmet";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import Label from "components/Label/Label";
import Input from "shared/Input/Input";
import Textarea from "shared/Textarea/Textarea";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RiFacebookFill, RiInstagramFill, RiTwitterFill, RiLinkedinFill } from "react-icons/ri";
import { SiTiktok } from "react-icons/si";


export interface PageContactProps {
  className?: string;
}

const info = [
  {
    title: "💌 EMAIL",
    desc: "support@getcollabo.io",
  },
  {/**
  {
    title: "☎ PHONE",
    desc: "+234-808-898-0832",
  },
 */}
];

const PageContact: FC<PageContactProps> = ({ className = "" }) => {
  const notify = () => toast.success("Your message has been sent!", {position: "top-right", autoClose: 2500, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "colored"});

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('getcollabo', 'getcollabo-id', form.current, 'Dh2oSQ2b4pxSnl7Xg')
      .then((result) => {
          notify(result.text);
      }, (error) => {
          notify(error.text);
      });
  };

  return (
    <div
      className={`nc-PageContact overflow-hidden ${className}`}
      data-nc-id="PageContact"
    >
      <Helmet>
        <title>Contact Us | GetCollabo</title>
      </Helmet>
      <div className="mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Contact Us
        </h2>
        <div className="container mx-auto max-w-7xl">
          <div className="grid flex-shrink-0 grid-cols-1 gap-12 md:grid-cols-2 ">
            <div className="max-w-sm space-y-8">
              {info.map((item, index) => (
                <div key={index}>
                  <h3 className="text-sm font-semibold tracking-wider uppercase dark:text-neutral-200">
                    {item.title}
                  </h3>
                  <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                    {item.desc}
                  </span>
                </div>
              ))}
              <div>
                <h3 className="text-sm font-semibold tracking-wider uppercase dark:text-neutral-200">
                  🌏 SOCIALS
                </h3>
                <ul className="flex mt-3 space-x-8 justify-left items-left">         
                  <li>
                    <a href="https://www.twitter.com/getcollabo" title="Twitter" className="transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80">
                      <RiTwitterFill className="w-6 h-6 dark:fill-white fill-bg-neutral-900"/>
                    </a>
                  </li>

                  <li>
                    <a href="https://www.instagram.com/getcollabo" title="Instagram" className="transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80">
                      <RiInstagramFill className="w-6 h-6 dark:fill-white fill-bg-neutral-900"/>
                    </a>
                  </li>

                  <li>
                    <a href="https://www.linkedin.com/company/getcollabo" title="LinkedIn" className="transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80">
                      <RiLinkedinFill className="w-6 h-6 dark:fill-white fill-bg-neutral-900"/>
                    </a>
                  </li>
            
                  <li>
                    <a href="https://www.tiktok.com/@getcollabo" title="TikTok" className="transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80">
                      <SiTiktok className="w-5 h-6 dark:fill-white fill-bg-neutral-900"/>
                    </a>
                  </li>

                  <li>
                    <a href="https://www.facebook.com/getcollabo" title="Facebook" className="transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80">
                      <RiFacebookFill className="w-6 h-6 dark:fill-white fill-bg-neutral-900"/>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <form ref={form} onSubmit={sendEmail} className="grid grid-cols-1 gap-6">
                <label className="block">
                  <Label>Business Name</Label>

                  <Input
                    placeholder="Enter your business name"
                    type="text"
                    className="mt-1"
                    name="user_name"
                  />
                </label>
                <label className="block">
                  <Label>Email address</Label>

                  <Input
                    type="email"
                    placeholder="example@example.com"
                    className="mt-1"
                    name="user_email"
                  />
                </label>
                <label className="block">
                  <Label>Message</Label>

                  <Textarea name="message" className="mt-1" rows={6} />
                </label>
                <div>
                  <ButtonPrimary type="submit" value="Send">Send Message</ButtonPrimary>
                  <ToastContainer />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* OTHER SECTIONS */}
      <div className="container">
        <div className="relative py-16">
          <SectionSubscribe2 />
        </div>
      </div>
    </div>
  );
};

export default PageContact;
