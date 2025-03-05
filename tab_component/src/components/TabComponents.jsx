import { useState } from "react";
import InterestTab from "./InterestTab";
import { ProfileTab } from "./ProfileTab";
import SettingTab from "./SettingTab";

const TabComponents = () => {
  const [data, setData] = useState({
    name: "Niket",
    age: 22,
    email: "niket@gmail.com",
    interest: ["music", "cricket", "coding"],
    theme: "dark",
  });
  const [error, setError] = useState({});
  const [activeTab, setActiveTab] = useState(0);

  const tabConfig = [
    {
      name: "Profile",
      component: ProfileTab,
      validate: () => {
        let err = {};
        if (!data.name || data.name.length < 2) {
          err.name = "Name is invalid";
        }

        if (!data.age || data.age < 18) {
          err.age = "Age is invalid";
        }

        if (!data.email || data.email.length < 2) {
          err.email = "Email is invalid";
        }

        setError(err);
        return err.name || err.age || err.email;
      },
    },
    {
      name: "Interest",
      component: InterestTab,
      validate: () => {
        let err = {};
        if (data.interest.length < 1) {
          err.interest = "Choose atleast one interest";
        }

        setError(err);
        return !!err.interest;
      },
    },
    {
      name: "Setting",
      component: SettingTab,
      validate: () => {
        let err = {};
        if (!data.theme) {
          err.theme = "Choose a theme";
        }

        setError(err);
        return err.theme;
      },
    },
  ];

  const handleButtonClick = (tab) => {
    if (!tabConfig[activeTab].validate()) {
      setActiveTab(tab);
    }
  };

  const handleNext = () => {
    if (!tabConfig[activeTab].validate()) {
      setActiveTab((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setActiveTab((prev) => prev - 1);
  };

  const handleSubmit = () => {
    if (tabConfig[activeTab].validate()) {
      return alert("Please resolve error");
    }
    alert("Submit Successfully");
  };

  const ActiveTabComponent = tabConfig[activeTab].component;

  return (
    <div>
      <div className="button-container">
        {tabConfig?.map((tab, index) => (
          <button key={tab.name} onClick={() => handleButtonClick(index)}>
            {tab.name}
          </button>
        ))}
      </div>
      <ActiveTabComponent data={data} setData={setData} error={error} />
      <div>
        {activeTab > 0 && <button onClick={handlePrevious}>Prev</button>}

        {activeTab === tabConfig.length - 1 && (
          <button onClick={handleSubmit}>Submit</button>
        )}

        {activeTab < tabConfig.length - 1 && (
          <button onClick={handleNext}>Next</button>
        )}
      </div>
    </div>
  );
};

export default TabComponents;
