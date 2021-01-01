import React from 'react'
import styled from 'styled-components'

const SideForm = styled.form`
  background: #FFF;
  width: 250px;
  position: fixed;
  height: 100vh;
  transition: all 0.3s;
  border: 5px solid rgba(92, 92, 92, 1);
  font-size: 1.2rem;
  font-weight: 500;
`;

const Sidebar = () => {

  const art_types = ['Drawing', 'Photography', 'Painting', 'Inking'];
  const icons = ['Hobbyist', 'Student', 'Professional', 'Anonymous'];

  const handleSubmit = (e) => {
    console.log(e);
    
  };

  return (
    <SideForm className="text-center" onSubmit={handleSubmit}>
      <h3 className="text-center border-bottom p-2">Select Filter</h3>
      {art_types.map((type, index) => {
        return (
          <div key={index} className="form-check text-left ml-4">
            <input className="form-check-input" type="checkbox" value="" />
            <label className="form-check-label align-text-bottom">
              {type}
            </label>
          </div>
        );
      })}
      <hr />
      {icons.map((icon, index) => {
        return (
          <div key={index} className="form-check text-left ml-4">
            <input className="form-check-input" type="checkbox" value="" />
            <label className="form-check-label align-text-bottom">
              {icon}
            </label>
          </div>
        );
      })}
      <hr />
      <div className="form-group">
        <input type="text" className="form-control form-control-sm w-75 ml-4" placeholder="#Tag, #Example, #..." />
      </div>
      <hr />
      <button type="submit" className="btn btn-outline-dark mr-4">Search</button>
    </SideForm>
  );
};

export default Sidebar;
