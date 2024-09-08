import React from "react";
import BaseTwo from "../Components/Base/BaseTwo";
import DosDonts from "../Components/DashboardDosDonts/DosDonts";
import { getUser } from "../Helpers";

const Header = () => {
  return (
    <div className="mt-10">
      <h2 className="text-white text-2xl">
        Namaste, <strong></strong>
      </h2>
      <p className="text-white text-sm pt-1">Hope you are having a nice day!</p>
    </div>
  );
};

const Dashboard = () => {
  const dosData = [
    {
      text: "Respect Wildlife: Always maintain a safe distance from elephants. Use binoculars for a closer view rather than approaching them.",
    },
    {
      text: "Stay Quiet: Keep noise levels to a minimum to avoid startling the elephants or disrupting their natural behavior.",
    },
    {
      text: "Follow Guidelines: Adhere to the guidelines set by wildlife authorities or tour guides regarding elephant sightings.",
    },
    {
      text: "Keep the Environment Clean: Dispose of trash properly and avoid leaving any litter that could harm the wildlife.",
    },
    {
      text: "Be Patient: Allow other visitors to enjoy the sighting as well; do not rush or disturb the elephants.",
    },
    {
      text: "Use Designated Viewing Areas: Stick to marked paths and viewing areas to avoid disturbing the natural habitat.",
    },
    {
      text: "Observe from a Safe Distance: Never approach or attempt to touch the elephants. Respect their space and follow safety protocols.",
    },
    {
      text: "Report Issues: If you notice any signs of distress or unsafe behavior, report it to the park rangers or guides immediately.",
    },
  ];

  const dontsData = [
    {
      text: "Avoid Flash Photography: Do not use flash photography, as it can startle or disturb the elephants.",
    },
    {
      text: "Do Not Feed the Elephants: Feeding wildlife can disrupt their natural diet and behavior.",
    },
    {
      text: "No Loud Noises: Avoid making loud noises or shouting, which can agitate or scare the elephants.",
    },
    {
      text: "Do Not Approach Closely: Refrain from getting too close to the elephants. Maintain a safe distance at all times.",
    },
    {
      text: "No Sudden Movements: Avoid sudden movements that might startle the animals.",
    },
    {
      text: "Do Not Litter: Do not leave food, trash, or any items behind that could harm the environment or wildlife.",
    },
    {
      text: "Avoid Using Bright Lights: Bright lights or flash photography can disturb the elephants, especially during nighttime observations.",
    },
    {
      text: "Do Not Engage in Aggressive Behavior: Maintain a calm demeanor and do not engage in any behavior that could be perceived as threatening.",
    },
  ];

  return (
    <BaseTwo header={<Header />} style="bg-white rounded-t-2xl">
      <div className="flex flex-col items-start p-5">
        <DosDonts title="Do's" data={dosData} />
        <DosDonts title="Don'ts" data={dontsData} />
      </div>
    </BaseTwo>
  );
};

export default Dashboard;
