import React, { FC } from "react";
import Badge from "shared/Badge/Badge";

export interface SectionHowItWorkProps {
  className?: string;
  data?: typeof DEMO_DATA[0][];
}

const DEMO_DATA = [
  {
    id: 1,
    title: "Sign up",
    desc: "Click on the Sign Up button to create an account",
  },
  {
    id: 2,
    title: "Start your search",
    desc: "Search and filter through industries & booking rates",
  },
  {
    id: 3,
    title: "Find and chat",
    desc: "Click on the profile of the creator that fits your brand",
  },
  {
    id: 4,
    title: "Book",
    desc: "Choose through their available deliverables and book them",
  },
];

const SectionHowItWork: FC<SectionHowItWorkProps> = ({
  className = "",
  data = DEMO_DATA,
}) => {
  return (
    <div
      className={`nc-SectionHowItWork  ${className}`}
      data-nc-id="SectionHowItWork"
    >
      <div className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4 sm:gap-16 xl:gap-20">
        {data.map((item: typeof DEMO_DATA[number], index: number) => (
          <div
            key={item.id}
            className="relative flex flex-col items-center max-w-xs mx-auto"
          >
            <div className="mt-auto space-y-5 text-center">
              <Badge
                name={`Step ${index + 1}`}
                color={
                  !index
                    ? "blue"
                    : index === 1
                    ? "pink"
                    : index === 2
                    ? "yellow"
                    : "green"
                }
              />
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <span className="block text-neutral-500 dark:text-neutral-400">
                {item.desc}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionHowItWork;
