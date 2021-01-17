import React from 'react';
import styled from 'styled-components';

// Images
import x from '../../../images/navIcons/x.svg';

/* Make a comment */

const Container = styled.div`
  background: linear-gradient(
    to bottom,
    #6558fb,
    #af23ff
  );
  border-radius: 10px;
  padding: 5px;

  // Comment icon
  .icon {
    margin-right: 5px;
    position: relative;
    z-index: 1;
    ::after {
      content: '';
      display: inline-block;
      background-color: white;
      height: 90%;
      width: 90%;
      position: absolute;
      right: 0.6px;
      border-radius: 100px;
      z-index: -1;
    }
  }

  // Comment input
  .comment {
    border-radius: 10px;
    flex: 1;
    border: none;
    :focus {
      outline: none;
    }
  }

  // Comment button
  .btn {
    padding: 1px 20px;
    color: white;
  }
`;

const Section = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const CustomInput = styled.label`
  padding: 5px 10px;
  height: fit-content;
  width: fit-content;
  background-color: #70118d;
  border-radius: 10px;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transform: translateY(4px);
  :hover {
    background-color: rgb(112, 17, 141, 0.7);
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

// Loading button styles
const SpinnerButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  // Spinner
  span {
    margin-right: 5px;
  }
`;

const ImageContainer = styled.div`
  height: 10em;
  width: fit-content;
  position: relative;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const Remove = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
`;

const Create = ({ showSpinner, commentInput, changeCommentInput, postComment, picture, changeAttachment, removeAttachment }) => {
  
  return (
    <Container>
      <Section>
        <i className="icon fa fa-user-circle-o fa-2x" aria-hidden="true"></i>
        <input type="text" onChange={changeCommentInput} value={commentInput} maxLength="300" className="comment" placeholder="Type your response here..." />
      </Section>
      <Section>
        <CustomInput htmlFor="file-upload" className="custom-file-upload mx-auto">
          <i className="fa fa-paperclip" aria-hidden="true"></i>
          <span> Attach image</span>
          <HiddenInput disabled={showSpinner} onChange={changeAttachment} id="file-upload" type="file" />
        </CustomInput>
        {showSpinner ? <LoadingButton word='Posting' /> : <button onClick={postComment} disabled={!commentInput} className="btn btn-warning">Post</button> }
      </Section>
      {picture ? <ImageContainer>
                  <Image src={picture} className="img-fluid" />
                  <Remove onClick={removeAttachment} src={x} width="30em" />
                </ImageContainer> : null}
    </Container>
  );
};

// For when the user posts a comment
const LoadingButton = ({ word }) => {
  return (
    <SpinnerButton className="btn btn-warning" type="button" disabled>
      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      {word}...
    </SpinnerButton>
  );
};

export default Create;