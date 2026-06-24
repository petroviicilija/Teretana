import { useState } from 'react';
import { useOutletContext } from 'react-router';
import styles from './TrainerMembersPage.module.css';
import axios from 'axios';
import { ClientCard } from './ClientCard';
import { PrimaryButton, Pagination } from '../../../components';
import { useEffect } from 'react';

export function TraienrMembersPage() {

  const { token } = useOutletContext();

  const [searchText, setSearchText] = useState('');
  const [clients, setClients] = useState();
  const [totalPages, setTotalPages] = useState();
  const [page, setPage] = useState();
  const [loading, setLoading] = useState(true);

  async function getClients() {
    try {
      const res = await axios.get('/api/v1/trainer/members', {
        params: {
          search: searchText,
          page
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setClients(res.data.clients);
      setTotalPages(res.data.totalPages);
      setPage(res.data.currentPage);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getClients();
  },[]);

  if (loading) return;

  return (
    <div className={styles['clients-page']}>
      <div className={styles['search-section']}>

        <div className={styles['header-section']}>
          <h1>Clients</h1>
          <p>Manage all trainings for your clients!</p>
        </div>

        <div className={styles['filters-container']}>
          <input type="text" value={searchText} placeholder='Search by name or email' onChange={(event) => setSearchText(event.target.value)} />
          <PrimaryButton buttonText={'Search'} handleClick={getClients} />
        </div>
      </div>

      <div className={styles['clients-grid']}>
        {
          clients.map((client) => {
            return <ClientCard key={client.email} client={client}/>
          })
        }
      </div>

      <div className={styles['page-buttons-container']}>
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </div>
    </div>
  );
}