import { Button } from "antd/lib/radio";
import React from "react";
import styled from "styled-components";

const AppButton = (props) => {
  return (
    <AppButtonContainer>
      {props.primaryBtn && (
        <Button
          className="primary-btn"
          shape="circle"
          onClick={props.buttonOnClick}
        >
          {props.buttonTitle}
        </Button>
      )}
      {props.priamryOutlineBtn && (
        <Button
          className="primary-btn-outline"
          shape="circle"
          onClick={props.buttonOnClick}
        >
          {props.buttonTitle}
        </Button>
      )}
      {props.LoadprimaryBtn && (
        <Button
          className="load-btn"
          shape="circle"
          onClick={props.buttonOnClick}
        >
          <i className="icon-spinner"> {props.buttonTitle}</i>
        </Button>
      )}

      {props.addprimarybutton && (
        <Button
          className="load-btn"
          shape="circle"
          onClick={props.buttonOnClick}
        >
          <i className="icon-plus"> {props.buttonTitle}</i>
        </Button>
      )}
      {/* icon-print */}

      {props.printprimarybutton && (
        <Button
          className="print-btn"
          shape="circle"
          onClick={props.buttonOnClick}
        >
          <i className="icon-print"> {props.buttonTitle}</i>
        </Button>
      )}
      {props.savebutton && (
        <Button
          className="load-btn"
          shape="circle"
          onClick={props.buttonOnClick}
        >
          <i className="icon-save"> {props.buttonTitle}</i>
        </Button>
      )}

      {/* view button */}
      {props.viewButton && (
        <Button
          className="load-btn"
          shape="circle"
          onClick={props.buttonOnClick}
        >
          <i className="icon-eye-open"> {props.buttonTitle}</i>
        </Button>
      )}

      {/* 
      <Button className='primary-btn-outline' shape="circle" onClick={props.buttonOnClick}>
        {props.buttonTitle}
      </Button> */}
    </AppButtonContainer>
  );
};

export default AppButton;

const AppButtonContainer = styled.div`
  .primary-btn {
    background-color: var(--primary);
    color: #fefefe;
    border-radius: 3px !important;
    width: auto;
    min-height: 30px;
    display: flex;
    align-items: center;
    font-size: 16px;
    padding: 0 10px;
    letter-spacing: 1px;
    justify-content: center;
    font-weight: 400;
    border: 1px solid var(--primary);
    box-shadow: 0 4px 14px 0 rgb(0 118 255 / 19%);
    &:hover {
      /* background-color: transparent; */
      opacity: 0.9;
      color: #fefefe;
      border: 1px solid var(--primary);
      box-shadow: 0 6px 20px rgb(0 118 255 / 23%);
    }
  }
  .primary-btn-outline {
    background-color: transparent;
    color: var(--secondary);
    border-radius: 3px !important;
    min-height: 30px;
    display: flex;
    align-items: center;
    font-size: 16px;
    letter-spacing: 1px;
    font-weight: 400;
    border: 1px solid var(--secondary);
    box-shadow: 0 4px 14px 0 rgb(0 118 255 / 9%);
    &:hover {
      background-color: var(--secondary);
      color: #fefefe;
      border: 1px solid var(--secondary);
      box-shadow: 0 6px 20px rgb(0 118 255 / 23%);
    }
  }
  .load-btn {
    margin-left: 5px;
    background-color: var(--primary);
    color: #fefefe;
    border-radius: 3px !important;
    width: auto;
    min-height: 30px;
    display: flex;
    align-items: center;
    font-size: 16px;
    padding: 0 10px;
    letter-spacing: 1px;
    justify-content: center;
    font-weight: 400;
    border: 1px solid var(--primary);
    box-shadow: 0 4px 14px 0 rgb(0 118 255 / 19%);
    &:hover {
      /* background-color: transparent; */
      opacity: 0.9;
      color: #fefefe;
      border: 1px solid var(--primary);
      box-shadow: 0 6px 20px rgb(0 118 255 / 23%);
    }
  }
  .print-btn {
    background-color: var(--primary);
    /* background-color: #60bf10; */
    margin-left: 4px;
    color: #fefefe;
    border-radius: 3px !important;
    width: auto;
    min-height: 30px;
    display: flex;
    align-items: center;
    font-size: 16px;
    padding: 0 10px;
    letter-spacing: 1px;
    justify-content: center;
    font-weight: 400;
    border: 1px solid var(--primary);
    box-shadow: 0 4px 14px 0 rgb(0 118 255 / 19%);
    &:hover {
      /* background-color: transparent; */
      opacity: 0.9;
      color: #fefefe;
      border: 1px solid var(--primary);
      box-shadow: 0 6px 20px rgb(0 118 255 / 23%);
    }
  }
`;
