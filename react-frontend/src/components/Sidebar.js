import React from 'react'
import styled from 'styled-components'

const SideForm = styled.form`
  background: #FFF;
  position: absolute;
  width: 250px;
  top: 0;
  bottom: 0;
  min-height: 86vh;
  transition: all 0.3s;
  border: 5px solid rgba(92, 92, 92, 1);
  font-size: 1.2rem;
  font-weight: 500;
  z-index: 1;
`;

const Sidebar = ({ artTypes, setArtTypes, icons, setIcons, hashtag, setHashtag }) => {

  const handleSubmit = (e) => {
    console.log(e);
  };

  return (
    <SideForm className="text-center" onSubmit={handleSubmit}>
      <h3 className="text-center border-bottom p-2">Select Filter</h3>
      {artTypes.map((artType, index) => {
        return (
          <div key={index} className="form-check text-left ml-4">
            <input className="form-check-input" type="checkbox" checked={artType.checked} onChange={setArtTypes.bind(null, index)} />
            <label className="form-check-label align-text-bottom">
              {artType.type}
            </label>
          </div>
        );
      })}
      <hr />
      {icons.map((icon, index) => {
        return (
          <div key={index} className="form-check text-left ml-4">
            <input className="form-check-input" type="checkbox" checked={icon.checked} onChange={setIcons.bind(null, index)} />
            <label className="form-check-label align-text-bottom clearfix">
              <img src={icon.img} width="20em" className="pull-left" alt={icon.type} />
              {icon.type}
            </label>
          </div>
        );
      })}
      <hr />
      <div className="form-group">
        <input type="text" className="form-control form-control-sm w-75 ml-4" value={hashtag} onChange={setHashtag} placeholder="#Tag, #Example, #..." />
      </div>
      <hr />
      <button type="submit" className="btn btn-outline-dark mr-4">Search</button>
    </SideForm>
  );
};

export default Sidebar;
