/* eslint-disable react/prop-types */
export const ProfileTab = ({ data, setData, error }) => {
  const { name, age, email } = data;

  const handleDataChange = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <div>
        <label htmlFor="">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => handleDataChange(e.target.id, e.target.value)}
        />
      </div>
      {error.name && <div className="error">{error.name}</div>}
      <div>
        <label htmlFor="">Age</label>
        <input
          type="number"
          name="age"
          id="age"
          value={age}
          onChange={(e) => handleDataChange(e.target.id, e.target.value)}
        />
      </div>
      {error.age && <div className="error">{error.age}</div>}
      <div>
        <label htmlFor="">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => handleDataChange(e.target.id, e.target.value)}
        />
      </div>
      {error.email && <div className="error">{error.email}</div>}
    </div>
  );
};
