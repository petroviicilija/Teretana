import axios from 'axios';
import { useState, useEffect } from 'react';
import { useOutletContext, useParams } from 'react-router';
import styles from './AssignTrainerPage.module.css';
import { AssignTrainerCard } from './AssignTrainerCard.jsx';

export function AssignTrainerPage() {

  const [trainers, setTrainers] = useState();
  const { token } = useOutletContext();
  const { memberId } = useParams();
  const [member, setMember] = useState();

  async function getMember() {
    try {
      const res = await axios.get(`/api/v1/admin/${memberId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMember(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getTrainers() {
    try {
      const res = await axios.get('/api/v1/admin/trainers', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setTrainers(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTrainers();
    getMember();
  }, []);

  if (!trainers || !member) return;

  return (
    <div className={styles['assign-page']}>
      <AssignTrainerCard member={member} trainers={trainers} getMember={getMember} token={token} />
    </div>
  )
}