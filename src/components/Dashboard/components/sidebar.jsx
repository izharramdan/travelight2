import { useState } from "react";
import Logo from "../../../assets/travelight.png";
import { useNavigate } from "react-router-dom";
import useLogout from "../../../hooks/useLogout";
import { Card, List, Chip, Avatar, IconButton } from "@material-tailwind/react";
import {
  LogOut,
  NavArrowRight,
  NavArrowLeft,
  MoneySquare,
  User,
  Activity,
  GridPlus,
  Percentage,
  WhiteFlagSolid,
  Dashboard,
} from "iconoir-react";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { handleLogout, isLoading } = useLogout();
  const navigate = useNavigate();

  const Links = [
    {
      icon: Dashboard,
      title: "Dashboard",
      href: "/dashboard/",
    },
    {
      icon: WhiteFlagSolid,
      title: "Banner",
      href: "/dashboard/banner",
    },
    {
      icon: Percentage,
      title: "Promo",
      href: "/dashboard/promo",
    },
    {
      icon: GridPlus,
      title: "Category",
      href: "/dashboard/category",
    },
    {
      icon: Activity,
      title: "Activity",
      href: "/dashboard/activity",
    },
    {
      icon: MoneySquare,
      title: "Transaction",
      href: "/dashboard/transaction",
    },
    {
      icon: User,
      title: "User",
      href: "/dashboard/user",
    },
  ];

  return (
    <div
      className={`sticky top-0 flex flex-col h-screen ${
        isCollapsed ? "w-16" : "w-64"
      } transition-width duration-300`}
    >
      <Card className="flex flex-col h-full w-full">
        <Card.Header
          className={`flex items-center ${
            isCollapsed ? "justify-center" : "justify-between"
          } p-3`}
        >
          <div className="flex items-center gap-4">
            <Avatar
              size="md"
              src={Logo}
              alt="Travelight Logo"
              className={`${isCollapsed ? "hidden" : "block"} cursor-pointer`}
              onClick={() => navigate("/")}
            />
          </div>
          <IconButton
            onClick={() => setIsCollapsed(!isCollapsed)}
            variant="outline"
            className="rounded-full"
          >
            {isCollapsed ? (
              <NavArrowRight className="h-5 w-5" />
            ) : (
              <NavArrowLeft className="h-5 w-5" />
            )}
          </IconButton>
        </Card.Header>
        <Card.Body className="flex-grow p-3">
          <List>
            {Links.map(({ icon: Icon, title, href, badge }) => (
              <List.Item
                key={title}
                className="flex items-center gap-2 cursor-pointer"
              >
                <a
                  href={href}
                  onClick={(e) => {
                    e.preventDefault(); // Cegah reload halaman
                    navigate(href); // Navigasi internal menggunakan navigate
                  }}
                  className="flex items-center gap-2 w-full"
                >
                  <List.ItemStart>
                    <Icon className="h-[18px] w-[18px]" />
                  </List.ItemStart>
                  {!isCollapsed && (
                    <>
                      {title}
                      {badge && (
                        <List.ItemEnd>
                          <Chip size="sm" variant="ghost">
                            <Chip.Label>{badge}</Chip.Label>
                          </Chip>
                        </List.ItemEnd>
                      )}
                    </>
                  )}
                </a>
              </List.Item>
            ))}
            <hr className="-mx-3 my-3 border-secondary" />
          </List>
        </Card.Body>
        <Card.Footer className="mt-auto p-3">
          <List.Item
            className="text-error hover:bg-error/10 hover:text-error focus:bg-error/10 focus:text-error flex items-center gap-2"
            onClick={handleLogout}
          >
            <List.ItemStart>
              <LogOut className="h-[18px] w-[18px]" />
            </List.ItemStart>
            {!isCollapsed && "Logout"}
          </List.Item>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default Sidebar;
