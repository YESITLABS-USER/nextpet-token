"use client";
import React, { useState, useEffect } from "react";
import BreederProfileLeft from "../../../../../components/BreederProfileLeft";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import BASE_URL from "../../../../utils/constant";
import BreederProtectedRoute from "@/src/app/context/BreederProtectedRoute";
import { toast } from "react-toastify";

const BreederDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({});
  const [overFlow, setOverFlow] = useState(false);

  // Fetch user details from API
  useEffect(() => {
    let isMounted = true; // Flag to check if component is still mounted

    const fetchUserDetails = async () => {
      try {
        const breederUserId = localStorage.getItem("breeder_user_id");
        const authToken = JSON.parse(localStorage.getItem("authToken"));
        const token = authToken?.UniqueKey;

        if (!breederUserId || !token) {
          throw new Error("Missing authentication information.");
        }

        const response = await axios.post(
          `${BASE_URL}/api/get-user`,
          { user_id: breederUserId },
          {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (isMounted) {
          setFormData(response.data.data);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          console.error("Error fetching user details:", err);
          setError("Failed to load user details.");
          setLoading(false);
        }
      }
    };

    fetchUserDetails();

    return () => {
      isMounted = false; // Cleanup flag on component unmount
    };
  }, []);

  if (loading) {
    return <p>Loading user details...</p>;
  }

  if (error) {
    return <p>Network Error...</p>;
  }

  const breederData = {
    page: "dashboard-breeder-profile",
  };
  

  return (
    <>
    <BreederProtectedRoute>
      <div className="breedeerdasboard-profile-wrap">
        <div className="container">
          <div className="col-lg-12">
            <div className="breedeerdasboard-profile-inner">
              <BreederProfileLeft data={breederData} />
              <div className="breedeerdasboard-profile-right">
                <div className="profile-pic-wrap">
                  <form>
                    <div className="edit-profile-icon">
                      <Link href="/breeder/breeder-profile">
                        <Image
                          src="/images/Nextpet-imgs/dashboard-imgs/edit-profile-icon.svg"
                          alt="Edit Profile"
                          width={50}
                          height={50}
                        />
                      </Link>
                    </div>
                    <h1>Profile</h1>
                    <div className="profile-right-img">
                      <div
                        className="profile-right-img-prev"
                        style={{
                          backgroundImage: formData?.image
                            ? `url(${formData?.image})`
                            : "url('/images/Nextpet-imgs/contact-default.webp')",
                        }}
                        id="imagePreview"
                      />
                      {/* <label className="upload-icon">
                        <Image
                          src="/images/Nextpet-imgs/profile-page-imgs/breeder-img.svg"
                          alt="Upload Icon"
                          width={15}
                          height={15}
                        />
                        <input type="file" />
                      </label> */}
                    </div>
                    <div className="profile-form-wrap">
                      <label>
                        <Image
                          src="/images/Nextpet-imgs/breeder-signin-imgs/user.svg"
                          alt="Input Icon"
                          width={15}
                          height={15}
                        />
                        <input
                          type="text"
                          value={formData?.name}
                          placeholder="Your Name*"
                          required=""
                          readOnly
                        />
                      </label>
                      <label>
                        <Image
                          src="/images/Nextpet-imgs/breeder-signin-imgs/user.svg"
                          alt="Input Icon"
                          width={15}
                          height={15}
                        />
                        <input
                          type="text"
                          value={formData?.business_name}
                          placeholder="Business Name (optional)"
                          readOnly
                        />
                      </label>
                      <label>
                        <Image
                          src="/images/Nextpet-imgs/breeder-signin-imgs/mail-icon.svg"
                          alt="Email Icon"
                          width={15}
                          height={15}
                        />
                        <input
                          type="email"
                          value={formData?.email}
                          placeholder="Email*"
                          required=""
                          readOnly
                        />
                      </label>
                      <label>
                        <Image
                          src="/images/Nextpet-imgs/profile-page-imgs/call.svg"
                          alt="Phone Icon"
                          width={15}
                          height={15}
                        />
                        <input
                          type="number"
                          value={formData?.phone}
                          placeholder="Phone Number*"
                          required=""
                          maxLength="10"
                          minLength="10"
                          readOnly
                        />
                      </label>
                      <label>
                        <Image
                          src="/images/Nextpet-imgs/profile-page-imgs/location.svg"
                          alt="Website Icon"
                          width={15}
                          height={15}
                        />
                        <input
                          type="text"
                          value={formData?.website}
                          placeholder="Website*"
                          required=""
                          readOnly
                        />
                      </label>
                      <label>
                        <Image
                          src="/images/Nextpet-imgs/profile-page-imgs/location.svg"
                          alt="Location Icon"
                          width={15}
                          height={15}
                        />
                        <input
                          type="text"
                          value={formData?.location}
                          placeholder="Location*"
                          required=""
                          readOnly
                        />
                      </label>
                      <label>
                        <textarea placeholder="Business Description*" readOnly>
                          {formData?.bio}
                        </textarea>
                      </label>

                      <div className="gallery-imgs-wp">
                        <div className="gallery-heading">
                          <h3>Gallery</h3>
                          <div className="tooltip">
                            <Image
                              src="/images/Nextpet-imgs/profile-page-imgs/i-icon.svg"
                              alt="Info Icon"
                              width={15}
                              height={15}
                            />
                            <span className="tooltiptext">
                              A simple gallery of nine photos of the breeder’s
                              choice.
                            </span>
                          </div>
                        </div>
                        <div className="gallery-uploadedbox-wrap" onMouseEnter={() => setOverFlow(!overFlow)} onMouseLeave={() => setOverFlow(!overFlow)}  style={{ overflowX: overFlow ? 'auto' : 'hidden', padding:'10px 0'}}>
                          {formData?.breeder_image.map((image, index) => (
                            <div className="gallery-uploadedimg-box" key={index}>
                              <Image src={image} alt={`Image ${index}`} width={110} height={110} style={{ minHeight: '110px', minWidth: '110px', borderRadius:"10px"}}/>
                            </div>
                          ))}
                        </div>
                      </div>

                      <AvailablePlansSection />
                      {/* Coaching Section */}
                      <CoachingSection />
                      <div className="profile-btn-wrap">
                        <button
                          type="button"
                          data-bs-target="#contact-coach"
                          data-bs-toggle="modal"
                        >
                          Contact a Coach
                        </button>
                      </div>
                    </div>
                  </form>
                <ContactCoach />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BreederProtectedRoute>
    </>
  );
};

const AvailablePlansSection = () => (
  <div className="available-plans-wp">
    <div className="available-heading">
      <h3>Available Plans</h3>
      <div className="tooltip">
        <Image
          src="/images/Nextpet-imgs/profile-page-imgs/i-icon.svg"
          alt="Info Icon"
          width={15}
          height={15}
        />
        <span className="tooltiptext">
          A simple gallery of nine photos of the breeder’s choice.
        </span>
      </div>
    </div>
    <div className="available-plansbox-wrap">
      {[
        {
          name: "Free",
          price: "$0",
          description: "First 6 posts are free",
          buttonText: "Active",
        },
        {
          name: "Silver",
          price: "$20",
          description: "First 6 posts are free",
          buttonText: "Subscribe",
        },
        {
          name: "Gold",
          price: "$150",
          description: "First 6 posts are free",
          buttonText: "Subscribe",
        },
        {
          name: "Platinum",
          price: "$480",
          description: "First 6 posts are free",
          buttonText: "Subscribe",
        },
      ].map((plan, index) => (
        <div className="available-plans-box" key={index}>
          <div className="price-sec-wrap">
            <span>{plan.name}</span>
            <span>{plan.price}</span>
          </div>
          <p>{plan.description}</p>
          <div className="available-plans-btns">
            <Link
              href={{
                pathname: `/breeder/subscription/payment`,
                query: {
                  // user_id: lead?.user_id,
                  // sub_id: lead?.post_id,
                  price: plan?.price,
                  sub_plan: plan?.name,
                  // name:
                },
              }}
              // href={`/breeder/subscription/payment/${plan.name}/${plan.price} `}
            >
              <button
                type="button"
                className={plan.name === "Free" ? "active" : ""}
                onClick={() => {
                  // Add logic to handle subscription
                  console.log(`Subscribed777 ${plan.name} plan`);
                }}
              >
                {plan.buttonText}
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
    <div className="note-wrap">
      <p>
        <span>Note:&nbsp;</span>Post Validity 1 month, per post payment $20
      </p>
    </div>
  </div>
);

const CoachingSection = () => (
  <div className="coaching-wp">
    <div className="coaching-heading">
      <h3>Coaching</h3>
    </div>
    <p>
      NextPet provides one on one coaching from experienced breeders. Click the
      button below to connect for more information.
    </p>
  </div>
);

export default BreederDashboard;

const ContactCoach = () => {
  const [animals, setAnimals] = useState([]); 
  // const [selectedAnimal, setSelectedAnimal] = useState(""); 
  const [breeds, setBreeds] = useState([]); 
  const [formData2, setFormData2] = useState({
    name: "",
    email: "",
    selectedAnimal: "",
    selectedBreed: "",
    details: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/additional_request_web`);
        // Ensure data is an array and set it
        if (Array.isArray(response.data.data)) {
          setAnimals(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching animal data:", error);
      }
    };

    fetchData();
  }, []);

  const handleAnimalChange = (e) => {
    const animal = e.target.value;
    // setSelectedAnimal(animal); // Update the selected animal in state

    // Update formData2 to reflect the selected animal
    setFormData2((prevState) => ({
      ...prevState,
      selectedAnimal: animal, // Set selected animal in formData2 as well
      selectedBreed: "", // Reset breed when the animal is changed
    }));

    // Find and set breeds based on the selected animal
    const animalData = animals.find((item) => item.animal === animal);
    if (animalData) {
      setBreeds(animalData.sub[0]?.breed_type || []);
    } else {
      setBreeds([]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData2((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleContactCoach = async () => {
    const breeder_id = localStorage.getItem("breeder_user_id");
    const token = JSON.parse(localStorage.getItem("authToken"))?.UniqueKey;
  
    const payload = {
      breeder_id: breeder_id,
      name: formData2.name,
      email: formData2.email,
      animal: formData2.selectedAnimal,
      breed: formData2.selectedBreed,
      message: formData2.details,
    };

    if(!(payload.breeder_id, payload.name, payload.email, payload.breed, payload.message)){
      toast.error("Please fill all the required fields");
      return;
    }
  
    try {
      const response = await axios.post(`${BASE_URL}/api/contact_coach`, payload, {
        headers: { "Authorization": `Bearer ${token}` }
      });
  
      if (response.data.code === 200) {
        toast.success("Coach request sent successfully");
      } else {
        toast.error("Failed to send coach request");
      }
    } catch (error) {
      console.error("Error contacting coach:", error);
      toast.error("An error occurred while sending the request");
    }
  };
  

  return (
    <div className="modal fade modal-common" id="contact-coach" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div className="modal-dialog modal-dialog-edit" role="document">
        <div className="modal-content">
          <div className="modal-heading">
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" style={{ background: 'url(/images/Nextpet-imgs/close-icon.svg', backgroundSize: 'contain' }}></button>
          </div>
          <div className="modal-body">
            <div>
              <div className="conatctcpach-popup-wrap">
                <h1>Contact Coach</h1>
                <div className="coach-form-wrap">
                  <input
                    name="name"
                    type="text"
                    placeholder="Anna Brown"
                    onChange={handleInputChange}
                    value={formData2.name}
                  />
                  <input
                    name="email"
                    type="text"
                    placeholder="richardbrown78@gmai.com"
                    onChange={handleInputChange}
                    value={formData2.email}
                  />
                  <select
                    name="selectedAnimal"
                    id="animal-select"
                    onChange={handleAnimalChange}
                    value={formData2.selectedAnimal} // Bind to formData2.selectedAnimal
                  >
                    <option value="">Select animal type</option>
                    {animals.map((animal) => (
                      <option key={animal.id} value={animal.animal}>
                        {animal.animal}
                      </option>
                    ))}
                  </select>
                  <select
                    name="selectedBreed"
                    id="breed-select"
                    onChange={handleInputChange}
                    value={formData2.selectedBreed}
                  >
                    <option value="">Select breed type</option>
                    {breeds.map((breed, index) => (
                      <option key={index} value={breed}>
                        {breed}
                      </option>
                    ))}
                  </select>
                  <textarea
                    name="details"
                    placeholder="Please add details"
                    onChange={handleInputChange}
                    value={formData2.details}
                  ></textarea>
                  <div className="d-flex justify-content-center">
                    <button onClick={handleContactCoach} data-bs-toggle="modal" data-bs-dismiss="close">
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
