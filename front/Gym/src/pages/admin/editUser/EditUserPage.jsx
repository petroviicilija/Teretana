import styles from './EditUserPage.module.css';
import { useState, useEffect } from 'react';
import { useOutletContext, useParams } from 'react-router';
import { EditUserCard } from './EditUserCard.jsx';
import axios from 'axios';

export function EditUserPage() {
  const { token } = useOutletContext();
  const { userId } = useParams();
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/api/v1/admin/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchUser();
  }, [userId]);


  if (!user) return;

  return (
    <div className={styles['edit-user-page']}>
      <EditUserCard user={user} token={token} userId={userId} />
    </div>
  )
}