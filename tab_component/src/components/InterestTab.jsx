/* eslint-disable react/prop-types */
const interestConfig = [
  {
    name: "Cricket",
    value: "cricket",
  },
  {
    name: "Coding",
    value: "coding",
  },
  {
    name: "Football",
    value: "football",
  },
  {
    name: "Music",
    value: "music",
  },
];

const InterestTab = ({ data, setData, error }) => {
  const { interest } = data;

  const handleDataChange = (value) => {
    setData((prev) => ({
      ...prev,
      interest: prev.interest.includes(value)
        ? prev.interest.filter((val) => val !== value)
        : [...prev.interest, value],
    }));
  };

  return (
    <>
      <div>
        {interestConfig?.map((value) => (
          <label key={value.value} htmlFor={interest.value}>
            <input
              type="checkbox"
              name="interest"
              id={value.value}
              value={value.value}
              checked={interest?.includes(value.value)}
              onChange={(e) => handleDataChange(e.target.value)}
            />
            {value.name}
          </label>
        ))}
      </div>
      {error.interest && <div className="error">{error.interest}</div>}
    </>
  );
};

export default InterestTab;
