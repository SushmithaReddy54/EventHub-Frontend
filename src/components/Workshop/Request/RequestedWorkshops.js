

import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRequestedWorkshops } from '../../../store/actions/WorkshopActions';
import { saveRequestedSkills } from '../../../store/reducers/WorkshopReducers';
import { LoadingPage } from '../../Loading/Loading';
import WorkshopTable from '../WorkshopTable';
import { DefaultColumnFilter } from '../../../utils/Common';
import { Container } from 'react-bootstrap';
import { Typography } from '@mui/material';

export default function RequestedWorkshops() {

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const requestedSkills = useSelector((state) => state?.workshop?.value?.requestedSkills);

  useEffect(() => {
    const getSkills = async () => {
      try {
        const skills = await getRequestedWorkshops();
        dispatch(saveRequestedSkills(skills));
        setIsLoading(false);
      } catch (error) {
        console.error("Error : ", error);
        setIsLoading(false);
      }
    };
    if (isLoading) {
      getSkills();
    }
  }, [])

  const columns = useMemo(
    () => [
      { Header: 'Technology', accessor: 'skillName', Filter: DefaultColumnFilter, width: '200px' },
      { Header: 'Requested User', accessor: 'requestedUser', Filter: DefaultColumnFilter, width: '160px' },
      {
        Header: 'Requested Time',
        accessor: 'requestedDate',
        Cell: ({ value }) => new Date(value).toLocaleString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }),
        Filter: DefaultColumnFilter,
        width: '150px',
      }
    ],
    []
  );

  return isLoading ? <LoadingPage /> : (
    <Container className='workshop_page'>
      <Typography automationId='create_workshop_title_page' className='workshop_title_page' id='request_workshop_title_page' variant="h6" >
        Requested Skills
      </Typography>
      <WorkshopTable data={requestedSkills} columns={columns}  />
    </Container>
  );
}
