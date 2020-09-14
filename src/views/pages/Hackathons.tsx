import React, { FC } from "react";
import imgRobots from "../../assets/images/banners/robots-lg.jpg";

const Hackathons: FC<void> = () => {
  return (
    <div>
      <header className="w-full">
        <div className="flex flex-col-reverse md:flex-row h-full">
          <aside
            className="w-full md:w-2/4 flex justify-center items-center p-6"
            /* TODO : refactor gradient to tailwind config for global use*/
            style={{
              background: "linear-gradient(45deg, #00A5DB, #00ADD8, #00C7CD, #00DAC6, #00FFB8, #00FF9C)",
            }}
          >
            <div className="max-w-screen-sm flex flex-col py-6 ">
              <h1 className="text-3xl md:text-5xl">Mintbean Hackthons</h1>
              <div className="text-xl md:text-2xl font-semibold">
                <p>You have the skills</p>
                <p>We have the place for you to show them off.</p>
                <p>We want you hired.</p>
              </div>
            </div>
          </aside>
          <div
            className="hidden md:block w-full md:w-2/4 bg-cover bg-center lg:bg-contain "
            style={{ backgroundImage: `url("/${imgRobots}")` }}
          />
        </div>
      </header>

      <main className="container mx-auto max-w-screen-md px-6 py-12">
        <section className="mb-12">
          <h2 className="text-3xl">About us</h2>
          <p className="text-gray-700">
            Mintbean is more than just a single hackathon event. We&apos;re a community of like-minded, hardworking and
            bright developers of all skill levels and backgrounds who are all focused on one thing: growth. We love new
            tech, we applaud trying your best and improvement over time. We value grit, gumption and a good nature,
            which are all equally important as a developer.
          </p>
          <p className="text-gray-700 ">
            What Mintbean does for you is it takes the &quot;blank page, where to start&quot; stage out of building
            projects by providing you a jumping-off point. We highly encourage you to post these projects publicly to
            show everyone you&apos;re actively coding. Besides being able to build projects alongside a community, you
            can compete for the winner title, and get a digital boost to your job search!
          </p>
        </section>
        <section className="mb-12">
          <h2 className="text-3xl">Upcoming Events</h2>
          <p>Coming soon</p>
        </section>
      </main>
    </div>
  );
};

export default Hackathons;
