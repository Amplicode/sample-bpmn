import { Menu } from "react-admin";

export const MainMenu = () => {
  return (
    <Menu>
      <Menu.DashboardItem />
      <Menu.ResourceItem name="PolicyTypeDto" />
      <Menu.ResourceItem name="PolicyholderDto" />
      <Menu.ResourceItem name="PolicyOutputDto" />
      <Menu.ResourceItem name="ClaimOutputDto" />
      <Menu.ResourceItem name="CamundaTask" />
      <Menu.ResourceItem name="CamundaProcessDefinition" />
    </Menu>
  );
};
