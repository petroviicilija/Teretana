import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './MemberProfile.module.css'
import { useOutletContext } from 'react-router';
import { MemberProfileCard } from './MemberProfileCard';

//Dodati ime za trenera kad se napravi dugme za dodavanje trenera
export function MemberProfile(){

  const { token } = useOutletContext();
  const [memberInfo, setMemberInfo] = useState();

  async function getMemberInfo(){
    const res = await axios.get(`/api/v1/member`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setMemberInfo(res.data);
  }

  useEffect(() => {
    getMemberInfo();
  },[]);

  if(!memberInfo) return;

  return(
    <div className={styles['profile-page']}>
      <MemberProfileCard memberInfo={memberInfo} token={token} getMemberInfo={getMemberInfo} />
    </div>
  );
}