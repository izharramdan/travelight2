import { useState } from "react";
import Logo from "../../../assets/travelight.png";
import { useNavigate } from "react-router-dom";
import {
  Card,
  List,
  Typography,
  Chip,
  Collapse,
  Avatar,
  IconButton,
} from "@material-tailwind/react";
import {
  Archive,
  EmptyPage,
  Folder,
  LogOut,
  Mail,
  MoreHorizCircle,
  NavArrowRight,
  NavArrowLeft,
  Pin,
  SendDiagonal,
  Bin,
  UserXmark,
} from "iconoir-react";

const Links = [
  {
    icon: Mail,
    title: "Dashboard",
    href: "#",
    badge: 14,
  },
  {
    icon: SendDiagonal,
    title: "Banner",
    href: "#",
  },
  {
    icon: EmptyPage,
    title: "Promo",
    href: "#",
  },
  {
    icon: Pin,
    title: "Category",
    href: "#",
  },
  {
    icon: Archive,
    title: "Activity",
    href: "#",
  },
  {
    icon: Bin,
    title: "Transaction",
    href: "#",
  },
  {
    icon: Bin,
    title: "User",
    href: "#",
  },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className={`flex flex-col h-screen ${
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
            {/* {!isCollapsed && (
              <Typography className="font-semibold">Dashboard</Typography>
            )} */}
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
                href={href}
                className="flex items-center gap-2"
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
              </List.Item>
            ))}
            <hr className="-mx-3 my-3 border-secondary" />
            <List.Item
              onClick={() => setIsOpen((cur) => !cur)}
              className="flex items-center gap-2"
            >
              <List.ItemStart>
                <MoreHorizCircle className="h-[18px] w-[18px]" />
              </List.ItemStart>
              {!isCollapsed && (
                <>
                  More
                  <List.ItemEnd>
                    <NavArrowRight
                      className={`h-4 w-4 ${isOpen ? "rotate-90" : ""}`}
                    />
                  </List.ItemEnd>
                </>
              )}
            </List.Item>
            <Collapse open={isOpen}>
              <List>
                <List.Item className="flex items-center gap-2">
                  <List.ItemStart>
                    <Folder className="h-[18px] w-[18px]" />
                  </List.ItemStart>
                  {!isCollapsed && "Spam"}
                </List.Item>
                <List.Item className="flex items-center gap-2">
                  <List.ItemStart>
                    <UserXmark className="h-[18px] w-[18px]" />
                  </List.ItemStart>
                  {!isCollapsed && "Blocked"}
                </List.Item>
                <List.Item className="flex items-center gap-2">
                  <List.ItemStart>
                    <Folder className="h-[18px] w-[18px]" />
                  </List.ItemStart>
                  {!isCollapsed && "Important"}
                </List.Item>
              </List>
            </Collapse>
          </List>
        </Card.Body>
        <Card.Footer className="mt-auto p-3">
          <List.Item className="text-error hover:bg-error/10 hover:text-error focus:bg-error/10 focus:text-error flex items-center gap-2">
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
