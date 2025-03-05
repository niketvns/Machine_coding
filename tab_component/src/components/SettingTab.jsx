/* eslint-disable react/prop-types */
const SettingTab = ({ data, setData, error }) => {
  const { theme } = data;

  const handleDataChange = (value) => {
    setData((prev) => ({ ...prev, theme: value }));
  };

  return (
    <>
      <div>
        <label htmlFor="light">
          <input
            type="radio"
            name="theme"
            id="light"
            value="light"
            checked={theme === "light"}
            onChange={(e) => handleDataChange(e.target.value)}
          />
          Light
        </label>
        <label htmlFor="dark">
          <input
            type="radio"
            name="theme"
            id="dark"
            value="dark"
            checked={theme === "dark"}
            onChange={(e) => handleDataChange(e.target.value)}
          />
          Dark
        </label>
      </div>
      {error.theme && <div className="error">{error.theme}</div>}
    </>
  );
};

export default SettingTab;
