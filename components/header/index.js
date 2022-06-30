import React, { useState } from "react";
import { Container, Input, Menu } from "semantic-ui-react";
import MainLayout from "../../layout";

export default function MainHeader() {
  const [activeNav, setActiveNav] = useState("");
  const handleItemClick = (e, { name }) => setActiveNav(activeNav);
  return (
    <MainLayout>
      <Container>
        <Menu secondary>
          <Menu.Item
            name="My Account"
            active={activeNav === "My Account"}
            onClick={handleItemClick}
          />
          <Menu.Item
            name="Users"
            active={activeNav === "Users"}
            onClick={handleItemClick}
          />
          <Menu.Menu position="right">
            <Menu.Item>
              <Input icon="search" placeholder="Search users..." />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </Container>
    </MainLayout>
  );
}
