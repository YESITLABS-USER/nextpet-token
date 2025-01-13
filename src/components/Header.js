"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import routes from "../config/routes";
import "toastr/build/toastr.min.css";
import BASE_URL from "../app/utils/constant";
import axios from "axios";
import { GoClock } from "react-icons/go";
import { FaAngleDown } from "react-icons/fa";
// import { FaAngleUp } from "react-icons/fa";
import { usePathname } from "next/navigation";

function Header() {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const [breederId, setBreederId] = useState(null);
  const [notificationDetails, setNotificationDetails] = useState(null);
  const [mobileToggleBtn, setMobileToggleBtn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(null);
  const pathname = usePathname();
  const isActive = (path) => pathname === path;

  useEffect(() => {
    const breederId = JSON.parse(localStorage.getItem("breeder_user_id"));
    const userId = JSON.parse(localStorage.getItem("user_user_id"));
    const token = localStorage.getItem("authToken")
      if (token) {
        try {
          const parsedToken = JSON.parse(token);
          setToken(parsedToken?.UniqueKey);
        } catch (error) {
          console.error('Error parsing token:', error);
        }
      } else {
        console.error('No token found');
      }

    if (breederId || userId) {
      setUserId(userId);
      setBreederId(breederId);
    } else {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (userId || breederId) {
      getNotification();
      getUserData();
    }
  }, [userId || breederId]);

  const getUserData = async () => {
    let userLogin = breederId
      ? { user_id: breederId || "" }
      : { user_id: userId || "" };

    let apiURL = breederId
      ? `${BASE_URL}/api/get-user`
      : `${BASE_URL}/api/user-get`;
    try {
      const response = await axios.post(apiURL, userLogin, {
        headers: { Authorization: `Bearer ${token}`}});

      if (response.status === 200) {
        setUserData(response?.data?.data)
      }
    } catch (err) {
      console.error("error : ", err);
    }
  };
  const getNotification = async () => {
    let userLogin = breederId
      ? { breeder_id: breederId || "" }
      : { user_id: userId || "" };

    let apiURL = breederId
      ? `${BASE_URL}/api/breeder_notification`
      : `${BASE_URL}/api/user_notification`;
    try {
      const response = await axios.post(apiURL, userLogin,{
        headers: { Authorization: `Bearer ${token}`}});
        console.log(response, 'response_notifiction')
      if (response.data.code === 200) {
        setNotificationDetails(response.data.data);
      }
    } catch (err) {
      console.error("error : ", err);
    }
  };

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
    setDropdownVisible(!isDropdownVisible);
  };

  const closeDropdown = () => {
    setIsOpen(false);
    setDropdownVisible(!isDropdownVisible);
  };

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     // Check if the click is outside the filter dropdown 
  //     if (!event.target.closest(".dropdown-showfilter") && 
  //         !event.target.closest(".dropdown-filterbtn")) {
  //       setDropdownVisible(false);
  //     }
  //   };
  
  //   document.addEventListener("mousedown", handleClickOutside);
  
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);
  
  return (
    <>
      <div className="topbanner-wrap">
        <div className="container">
          <div className="inner-sectiontop">
            <h2>Follow :</h2>
            <div className="social-icons">
              <Link href="#">
                <Image
                  src="/images/Nextpet-imgs/all-icons/Insta.svg"
                  alt="Instagram"
                  width={21}
                  height={20}
                />
              </Link>
              <Link href="#">
                <Image
                  src="/images/Nextpet-imgs/all-icons/Fb.svg"
                  alt="Facebook"
                  width={21}
                  height={20}
                />
              </Link>
              <Link href="#">
                <Image
                  src="/images/Nextpet-imgs/all-icons/twitter.svg"
                  alt="Twitter"
                  width={21}
                  height={20}
                />
              </Link>
            </div>
            <Notification notificationDetails={notificationDetails} />
          </div>
        </div>
      </div>

      <div className="nav-wrap">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container">
              <Link className="navbar-brand" href="/">
                <Image
                  src="/images/Nextpet-imgs/LOGO.png"
                  alt="Logo"
                  width={250}
                  height={250}
                />
              </Link>
              <button onClick={() => setMobileToggleBtn((prev) => !prev)} className="navbar-toggler"
                  type="button" >
                  <span className="navbar-toggler-icon"></span>
              </button>
              <div className={`navbar-collapse ${mobileToggleBtn ? "show" : "collapse"}`} id="navbarNav" >
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className={`nav-link ${isActive("/") ? "active" : ''} `} href="/"  onClick={() => setMobileToggleBtn((prev) => !prev)}>
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className={`nav-link ${isActive("/about-us") ? "active" : ''} `} href="/about-us"  onClick={() => setMobileToggleBtn((prev) => !prev)}>
                      About
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className={`nav-link ${isActive("/pets") ? "active" : ''} `} href="/pets" onClick={() => setMobileToggleBtn((prev) => !prev)}>
                      Pets
                    </Link>
                  </li>
                  <li className="nav-item" style={{paddingRight:'10px'}}>
                    <Link className={`nav-link ${isActive("/breeders") ? "active" : ''} `} href="/breeders" onClick={() => setMobileToggleBtn((prev) => !prev)}>
                      Breeders
                    </Link>
                  </li>
                  {!userId ? (
                    <li className="nav-item">
                      <Link
                        className="nav-link user-signin"
                        href="/user/sign-in"
                        onClick={() => setMobileToggleBtn((prev) => !prev)}
                      >
                        User Sign In
                      </Link>
                    </li>
                  ) : null}

                    {userId || breederId ? (
                  <li className="nav-item">
                      <div className="influ-dropdown">
                        <button
                          className="influ-btn "
                          onClick={toggleDropdown}
                          type="button"
                        >
                          <Image
                            src={(userData?.profile_img || userData?.image) || "/images/Nextpet-imgs/contact-default.webp"}
                            alt="Profile pic"
                            width={100}
                            height={100} style={{ borderRadius: "50%"}}
                          />
                          {/* { userId ? ( userData?.name ? (userData.name.split(" ").length > 10 ? `${userData.name.split(" ").slice(0, 10).join(" ")}...` : userData.name) : "User Profile")
                          : ( userData?.name ? (userData.name.split(" ").length > 10 ? `${userData.name.split(" ").slice(0, 10).join(" ")}...` : userData.name) : "Breeder Profile" ) } */}
                          
                          {userId ? (userData?.name ? (userData.name.length > 10 ? `${userData?.name.slice(0, 10)}...` : userData.name) : "User Profile")
                          : (userData?.name ? (userData.name.length > 10 ? `${userData?.name.slice(0, 10)}...` : userData.name) : "Breeder Profile" )}


                          {/* <i className="far fa-chevron-down"></i> */}
                          <span style={{ display: "inline-block", transition: "transform 0.3s ease",
                            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }} className="mt-1" >
                              
                            <FaAngleDown />
                          </span>

                        </button>

                        <DropdownUserMenu
                          isOpen={isOpen}
                          closeDropdown={closeDropdown}
                          userId={userId}
                          isDropdownVisible={isDropdownVisible}
                        />
                      </div>
                     
                  </li>) : (
                      ""
                    )}

                  {!breederId ? (
                    <li className="nav-item">
                      <Link
                        href={routes.breeder_sign_in}
                        className="nav-link breeder-signin"
                        onClick={() => setMobileToggleBtn((prev) => !prev)}
                      >
                        Breeder Sign In
                      </Link>
                    </li>
                  ) : null}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

const Notification = ({ notificationDetails }) => (
  <div className="notification-in">
    <button type="button">
      <img
        src="/images/Nextpet-imgs/all-icons/notification.svg"
        alt="Notification"
      />
    </button>
    <div className="notification-list">
      <div className="notification-heading">
        <h1>Notifications</h1>
        <label className="switch">
          <input type="checkbox" />
          <span className="slider round"></span>
        </label>
      </div>
      <div className="notification-list-inner">
        {notificationDetails ? (
          notificationDetails.map((item, index) => (
            <NotificationItem key={index} item={item} />
          ))
        ) : (
          <p>No notifications available</p>
        )}
      </div>
    </div>
  </div>
);

const NotificationItem = ({ item }) => (
  <div className="notification-list-item">
    <div className="notification-list-item-image">
      <Image width={40} height={40}
        src={
          ["post_moderate", "post_block_message", "post_hold_up", "account_under_verified"].includes(item?.type_notification)
            ? "/images/Nextpet-imgs/all-icons/retry-notification.svg"
            : ["post_approved", "account_verified"].includes(item?.type_notification)
            ? "/images/Nextpet-imgs/all-icons/success-notification.svg"
            : (item?.user_image || item?.pet_image?.[0])
            ? (item?.user_image || item?.pet_image?.[0])
            : "/images/Nextpet-imgs/all-icons/retry-notification.svg"
        }
        alt="Notification Icon"
      />

    </div>
    <div className="notification-list-item-text">
    {[ "post_moderate", "post_approved", "post_block_message", "account_verified", "post_hold_up",    "account_under_verified", ].includes(item?.type_notification)  ? (
      <>
      <p style={{maxWidth:"300px"}}>{item?.message_one}</p>
      <span>
              <i className="far fa-clock"></i>
              <p>
                <GoClock style={{ margin: "3px", marginBottom: "6px" }} />
                  {item.date_time
                    ? `${new Date(item?.date_time).toLocaleDateString("en-US", {
                        month: "2-digit",
                        day: "2-digit",
                        year: "numeric",
                      })} | ${new Date(item?.date_time).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      }).toLowerCase()}`
                  : "Date not available"}
              </p>
            </span></>
      ) : (
        <>
        <p>
          {item?.breeder_name || item?.user_name
            ? item?.breeder_name || item?.user_name
            : "Richard Brown"} (
          {item?.pet_name && item?.pet_breed && item?.pet_type
            ? `${item.pet_name} ${item.pet_breed} ${item.pet_type}`
            : item?.message_notification
            ? (item?.message_notification)
            : "Notification Not Available"}
          )
        </p>

        <span>
              <i className="far fa-clock"></i>
              <p>
                <GoClock style={{ margin: "3px", marginBottom: "6px" }} />
                  {item.date_time
                    ? `${new Date(item?.date_time).toLocaleDateString("en-US", {
                        month: "2-digit",
                        day: "2-digit",
                        year: "numeric",
                      })} | ${new Date(item?.date_time).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      }).toLowerCase()}`
                  : "Date not available"}
              </p>
            </span>
        </>
      )}

    </div>
  </div>
);

const DropdownUserMenu = ({
  // isOpen,
  closeDropdown,
  userId,
  isDropdownVisible,
}) => {
  return (
    <>
      <div  onMouseLeave={closeDropdown}
        className="influ-drop-list-header"
        style={{
          display: isDropdownVisible ? "block" : "none",
        }}
      >
        {userId ? (
          <div >
            <div className="influ-drop-list-item">
              <Link href="/user/favourites" onClick={() => { 
                setMobileToggleBtn((prev) => !prev); 
                closeDropdown(); // Ensure this is called as a function
              }} >
                <Image
                  src="/images/Nextpet-imgs/all-icons/send.png"
                  alt="Posts"
                  width={15}
                  height={15}
                />
                &nbsp;
                <span className="influ-drop-list-header-text">Favorites</span>
              </Link>
            </div>

            <div className="influ-drop-list-item">
              <Link href="/user/contacts" onClick={() => { 
                setMobileToggleBtn((prev) => !prev); 
                closeDropdown(); // Ensure this is called as a function
              }} >
                <Image
                  src="/images/Nextpet-imgs/all-icons/copy.png"
                  alt="Subscription"
                  width={15}
                  height={15}
                />
                &nbsp;
                <span className="influ-drop-list-header-text">Contacts</span>
              </Link>
            </div>
            <div className="influ-drop-list-item">
              <Link href="/user/alert" onClick={() => { 
                setMobileToggleBtn((prev) => !prev); 
                closeDropdown(); // Ensure this is called as a function
              }} >
              
                <Image
                  src="/images/Nextpet-imgs/all-icons/sms.png"
                  width={15}
                  height={13} style={{marginBottom:'3px'}}
                  alt="Profile"
                />
                &nbsp;
                <span className="influ-drop-list-header-text">Alerts</span>
              </Link>
            </div>
            <div className="influ-drop-list-item">
              <Link href="/user/dashboard-user-profile" onClick={() => { 
                setMobileToggleBtn((prev) => !prev); 
                closeDropdown(); // Ensure this is called as a function
              }} >
                <Image
                  src="/images/Nextpet-imgs/all-icons/profile.png"
                  width={15}
                  height={15}
                  alt="Profile"
                />
                &nbsp;
                <span className="influ-drop-list-header-text">My Profile</span>
              </Link>
            </div>
          </div>
        ) : (
          <div onMouseLeave={closeDropdown}>
            <div className="influ-drop-list-item" >
              <Link href="/breeder/leads" onClick={() => { 
                setMobileToggleBtn((prev) => !prev); 
                closeDropdown(); // Ensure this is called as a function
              }}  >
                <Image
                  src="/images/Nextpet-imgs/all-icons/sms.png"
                  alt=""
                  width={15}
                  height={15}
                />
                &nbsp;
                <span className="influ-drop-list-header-text">Leads</span>
              </Link>
            </div>
            <div className="influ-drop-list-item">
              <Link href="/breeder/posts/no-posts" onClick={() => { 
                setMobileToggleBtn((prev) => !prev); 
                closeDropdown(); // Ensure this is called as a function
              }} >
                <Image
                  src="/images/Nextpet-imgs/all-icons/send.png"
                  alt="Posts"
                  width={15}
                  height={15}
                />
                &nbsp;
                <span className="influ-drop-list-header-text">Posts</span>
              </Link>
            </div>

            <div className="influ-drop-list-item">
              <Link href="/breeder/subscription" onClick={() => { 
                setMobileToggleBtn((prev) => !prev); 
                closeDropdown(); // Ensure this is called as a function
              }} >
                <Image
                  src="/images/Nextpet-imgs/all-icons/copy.png"
                  alt="Subscription"
                  width={15}
                  height={15}
                />
                &nbsp;
                <span className="influ-drop-list-header-text">
                  Subscription
                </span>
              </Link>
            </div>
            <div className="influ-drop-list-item">
              <Link href="/breeder/breeder-profile/dashboard-breeder-profile" onClick={() => { 
                setMobileToggleBtn((prev) => !prev); 
                closeDropdown(); // Ensure this is called as a function
              }} >
                <Image
                  src="/images/Nextpet-imgs/all-icons/profile.png"
                  width={15}
                  height={15}
                  alt="Profile"
                />
                &nbsp;
                <span className="influ-drop-list-header-text">My Profile</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
