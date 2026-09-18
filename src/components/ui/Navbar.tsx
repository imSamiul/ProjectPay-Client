import { Link, LinkOptions } from "@tanstack/react-router";
import LinkButton from "./LinkButton";
import ThemeSwap from "./ThemeSwap";
import navbarLogo from "../../assets/nav-logo.png";
import { useAuth } from "../../hooks/useAuth";
import Modal from "../modals/Modal";
import { useLogOutUser } from "../../services/mutations/userMutations";

type NavItem = {
  title: string;
  link: LinkOptions["to"];
};
const projectManagerNavItem: NavItem[] = [
  {
    title: "Overview",
    link: "/projectManager/managerOverview",
  },

  {
    title: "Add Project",
    link: "/projectManager/addProject",
  },
];
const clientNavItem: NavItem[] = [
  {
    title: "Overview",
    link: "/",
  },
];

function Navbar() {
  const auth = useAuth();
  const logOutUserMutation = useLogOutUser();

  const isLogged = auth.isLogged();

  const userType = auth.user?.userType;

  let navItem: NavItem[] = [];

  if (isLogged) {
    if (userType === "project manager") {
      navItem = projectManagerNavItem;
    } else if (userType === "client") {
      navItem = clientNavItem;
    }
  }

  function handleLogout() {
    logOutUserMutation.mutate();
  }

  return (
    <div>
      <div className="navbar bg-secondary  font-lexend flex px-4">
        <div className="navbar-start flex-[2] md:flex-1">
          {isLogged && (
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost p-2  lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100  rounded-box z-[1] mt-3 w-52 p-2 shadow "
              >
                {navItem.map((item, index) => (
                  <Link to={item.link} key={index} className="">
                    <li>
                      <p className=" ">{item.title}</p>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          )}

          <Link
            to="/"
            className="flex gap-2 justify-start items-center text-secondary-content "
          >
            <img src={navbarLogo} alt="navbar-logo" className="h-10" />
            <p className="text-xl md:text-2xl font-semibold">Project Pay</p>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex text-secondary-content">
          <ul className="menu menu-horizontal px-1 ">
            {navItem.map((item, index) => (
              <Link
                to={item.link}
                key={index}
                activeProps={{
                  className: "rounded-md bg-neutral/15 font-medium",
                }}
              >
                <li>
                  <p>{item.title}</p>
                </li>
              </Link>
            ))}
          </ul>
        </div>
        <div className="navbar-end flex items-center gap-2 flex-1 ">
          {isLogged ? (
            <Modal
              id="logout"
              title="Logout"
              content="Are you sure you want to logout?"
              openButtonLabel="Logout"
              closeButtonLabel="Cancel"
              confirmButtonLabel="Logout"
              btnConfirmAction={handleLogout}
            />
          ) : (
            <LinkButton title="Sign In" to="/login" className="btn text-sm" />
          )}
          <ThemeSwap />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
