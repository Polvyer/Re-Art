import React from 'react'
import styled from 'styled-components'

const SideForm = styled.form`
  background: #FFF;
  position: absolute;
  width: 250px;
  top: 0;
  bottom: 0;
  height: 450px;
  transition: all 0.3s;
  border: 5px solid rgba(92, 92, 92, 1);
  font-size: 1.2rem;
  font-weight: 500;
  z-index: 1;

  input[type="text"] {
    border: 1px solid black;
  }

  img {
    width: 1em;
    transform: translateY(5px);
  }

  small {
    display: block;
    margin-top: 5px;
    transform: translateX(-7px);
  }
`;

const Sidebar = ({ artTypes, setArtTypes, icons, setIcons, hashtag, setHashtag }) => {

  return (
    <SideForm className="text-center">
      <h3 className="text-center border-bottom p-2">Select Results</h3>
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
              <img src={icon.img} className="pull-left" alt={icon.type} />
              {icon.type}
            </label>
          </div>
        );
      })}
      <hr />
      <div className="form-group">
        <input type="text" className="form-control form-control-sm w-75 ml-4" value={hashtag} onChange={setHashtag} placeholder="surrealism cubism ..." />
        <small className="text-muted">Separate <i>tags</i> by spaces</small>
      </div>
    </SideForm>
  );
};

export default Sidebar;
