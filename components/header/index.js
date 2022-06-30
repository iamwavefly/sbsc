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
            name="Dashboard"
            active={activeNav === "Dashboard"}
            onClick={handleItemClick}
          />
          <Menu.Item
            name="users"
            active={activeNav === "users"}
            onClick={handleItemClick}
          />
          <Menu.Item
            name="jobs"
            active={activeNav === "jobs"}
            onClick={handleItemClick}
          />
          <Menu.Menu position="right">
            <Menu.Item>
              <Input icon="search" placeholder="Search users..." />
            </Menu.Item>
            <Menu.Item
              name="profile"
              active={activeNav === "profile"}
              onClick={handleItemClick}
            />
          </Menu.Menu>
        </Menu>
      </Container>
    </MainLayout>
  );
}
