"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from 'next/link';
import BreederProfileLeft from '../../../../../components/BreederProfileLeft'
import BASE_URL from '../../../../utils/constant'

const Post = () => {
  const [token, setToken] = useState(null)

    const router = useRouter();
    const [noPost, setNoPost] = useState(true);
    const [loding, setLoading] = useState(true);
    useEffect(() => {
      // Retrieve values from localStorage and set token
      const storedBreederUserId = localStorage.getItem("breeder_user_id");
      const storedToken = localStorage.getItem("authToken");
  
      if (storedToken) {
        try {
          const parsedToken = JSON.parse(storedToken);
          setToken(parsedToken?.UniqueKey);
        } catch (error) {
          console.error("Error parsing token:", error);
        }
      } else {
        console.error("No token found");
      }
  
      if (!storedBreederUserId) {
        console.error("No breeder user ID found");
      }
    }, []); // Run only once on mount
  
    useEffect(() => {
      const loadPageData = async () => {
        if (!token) {
          console.error("Token not available yet");
          return;
        }
  
        const breederUserId = localStorage.getItem("breeder_user_id");
        if (!breederUserId) {
          console.error("No breeder user ID found");
          return;
        }
  
        const formData = new FormData();
        formData.append("user_breeder_id", breederUserId);
  
        try {
          const response = await axios.post(`${BASE_URL}/api/post_count`, formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          });
  
          setLoading(false);
  
          if (response?.data?.data?.breeder_post > 0) {
            setNoPost(false);
          } else {
            setNoPost(true);
          }
        } catch (error) {
          setLoading(false);
          console.error("Error fetching breeder posts:", error);
        }
      };
  
      loadPageData();
    }, [token]);
    
      if(loding){
            return(
                <>
                <p>Loading...</p>

                </>
            );
      }

      else if(noPost){
        return (
            <>
                {<div className="breedeerdasboard-profile-wrap">
                    <div className="container">
                    <div className="col-lg-12">
                        <div className="breedeerdasboard-profile-inner">
                       
                        
                        <BreederProfileLeft data={breederData}/>
    
                        
                        <div className="leads-right">
                            <h1 style={{color:'black'}}>You have no Posts Created.</h1>
                            <form>
                                <div className="profile-btn-wrap">
                                    <button type="submit" value="Submit"><Link href="create-post" style={{ color:'black'}}>Post a Pet</Link> </button>
                                </div>
                            </form>
                        </div>
                       
                      
                        </div>
                    </div>
                    </div>
                </div>}              
            </>
        );
      }
      else{
        router.push('/breeder/posts');
      }
    
};
export default Post;