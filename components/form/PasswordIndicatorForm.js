import { List } from "semantic-ui-react";
import { passwordIndicator } from "../../middleware/validator";
import React from "react";

const PasswordIndicatorForm = ({ user }) => {
  return (
    <>
      <div className="password-info">
        <List>
          <List.Item
            className={passwordIndicator(user).pLength.verify ? "success" : ""}
          >
            <List.Icon name={passwordIndicator(user).pLength.icon} />
            <List.Content>Minimum of 8 characters</List.Content>
          </List.Item>

          <List.Item
            className={passwordIndicator(user).pNumber.verify ? "success" : ""}
          >
            <List.Icon name={passwordIndicator(user).pNumber.icon} />
            <List.Content>At least one number</List.Content>
          </List.Item>

          <List.Item
            className={passwordIndicator(user).pSpecial.verify ? "success" : ""}
          >
            <List.Icon name={passwordIndicator(user).pSpecial.icon} />
            <List.Content>
              At least one special character [@, #, $, % etc..]
            </List.Content>
          </List.Item>

          <List.Item
            className={passwordIndicator(user).pUpper.verify ? "success" : ""}
          >
            <List.Icon name={passwordIndicator(user).pSpecial.icon} />
            <List.Content>At least one uppercase character</List.Content>
          </List.Item>

          <List.Item
            className={passwordIndicator(user).pLower.verify ? "success" : ""}
          >
            <List.Icon name={passwordIndicator(user).pSpecial.icon} />
            <List.Content>At least one lowercase character</List.Content>
          </List.Item>
        </List>
      </div>
    </>
  );
};

export default PasswordIndicatorForm;
