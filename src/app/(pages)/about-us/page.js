"use client";
import React from "react";

function page() {
  return (
    <>
      <div className="about-top-wrap text-center">
        <h1>About Us</h1>
      </div>
      <main>
        <div className="about-bg">
          <div className="container-fluid">
            <div className="aboutus-wrap">
              <div className="row align-items-center">
                <div className="col-lg-6 col-md-6">
                  <div className="aboutus-wrap-in">
                    <div className="aboutus-wrap-in-image">
                      <img
                        src="/images/Nextpet-imgs/Aboutus-imgs/about2-img.svg"
                        alt="About Us Image"
                        loading="lazy"
                      />
                    </div>
                    <div className="bone-img-wrap">
                      <img
                        src="../images/Nextpet-imgs/Aboutus-imgs/bone-img.svg"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="aboutus-wrap-in">
                    <span>About Us</span>
                    <h2>
                      Connecting quality breeders to loving families
                    </h2>
                    <p>
                    NextPet was founded on the idea of providing a platform for breeders to simply create an account and seamlessly connect with loving homes. Users are able to search for pets and breeders by location, breed, and name with the click of a button. By creating an account, breeders are able to post their high-quality pets on NextPet&apos;s platform with ease. 
                    </p>
                    <p>
                    Users are guaranteed that all breeders have been vetted and NextPet certified before posting, ensuring the highest quality of pets. Click the button below to learn more! 
                    </p>
                    {/* <!-- <a href="#">Know More</a> --> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mission-vision-wrap">
          <div className="container">
            <div className="mission-values-inner">
              <div className="box">
                <img
                  src="images/Nextpet-imgs/Aboutus-imgs/1.svg"
                  alt=""
                  loading="lazy"
                />
                <h2>Mission</h2>
                <p>
                  Connect high quality breeders with loving homes.
                </p>
              </div>
              <div className="box">
                <img
                  src="images/Nextpet-imgs/Aboutus-imgs/2.svg"
                  alt=""
                  loading="lazy"
                />
                <h2>Vision</h2>
                <p></p>
                <p>
                  Eliminate unhealthy breeding environments.
                </p>
                <p></p>
              </div>
              <div className="box">
                <img
                  src="images/Nextpet-imgs/Aboutus-imgs/3.svg"
                  alt=""
                  loading="lazy"
                />
                <h2>Values</h2>
                <p></p>
                <p>
                  Transparency, Integrity and Service
                </p>
                <p></p>
              </div>
            </div>
          </div>
        </div>

        <div className="howit-works-wrap">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-8 col-md-6">
                <div className="howit-wrap-in">
                  <span> The Process </span>
                  <h2> How It Works </h2>
                  <p>
                    NextPet is committed to connecting reputable breeders with loving homes. Breeders can create an account, complete our thorough vetting process, and showcase their available pets. To ensure quality and transparency, a one-on-one videoconference is scheduled between the breeder and a NextPet team member before posting. We are dedicated to promoting responsible breeding practices, ensuring that every pet listed on NextPet meets the highest standards of health and care for our users.
                  </p>
                  <ul>
                    <li>
                      <img
                        src="images/Nextpet-imgs/Aboutus-imgs/checklist.png"
                        alt=""
                      />
                      By prioritizing the highest quality of pets for our users, we uphold our core values of transparency, integrity, and exceptional service.
                    </li>
                    <li>
                      <img
                        src="images/Nextpet-imgs/Aboutus-imgs/checklist.png"
                        alt=""
                      />
                      Users can freely browse available pets, viewing detailed posts before deciding to engage with breeders. When ready to take the next step in their pet search, users can easily create an account to get started.
                    </li>
                    <li>
                      <img
                        src="images/Nextpet-imgs/Aboutus-imgs/checklist.png"
                        alt=""
                      />
                      Once their NextPet User account is set up, they can &quot;like&quot; posts, reach out to breeders, and set notifications for future pet availability.

                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="howit-works-imgwrap">
                  <img
                    src="images/Nextpet-imgs/Aboutus-imgs/how-it-img.svg"
                    alt=""
                    className="w-100"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default page;
