import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllWorkshops } from '../../../store/actions/WorkshopActions';
import { saveAllWorkshops } from '../../../store/reducers/WorkshopReducers';
import { LoadingPage } from '../../Loading/Loading';
import WorkshopTable from '../WorkshopTable';
import { DefaultColumnFilter, getTimelineStatus } from '../../../utils/Common';
import { Container } from 'react-bootstrap';
import { Typography } from '@mui/material';

export default function SearchWorkshop() {

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const allWorkshops = useSelector((state) => state?.workshop?.value?.allWorkshops);

  useEffect(() => {
    const getWorkshops = async () => {
      try {
        const response = await getAllWorkshops();
        console.log(response);
        dispatch(saveAllWorkshops(response));
        setIsLoading(false);
      } catch (error) {
        console.error("Error : ", error);
        setIsLoading(false);
      }
    };
    if (isLoading) {
      getWorkshops();
    }
  })

  const columns = useMemo(
    () => [
      { Header: 'Workshop Title', accessor: 'title', Filter: DefaultColumnFilter, width: '200px' },
      {
        Header: 'Skills',
        accessor: (row) => row.selectedSkills.map(skill => skill.skillName).join(', '),
        Filter: DefaultColumnFilter,
        width: '150px',
      },
      { Header: 'Instructor', accessor: 'createdUser', Filter: DefaultColumnFilter, width: '140px' },
      {
        Header: 'Workshop Time',
        accessor: 'startTime',
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
      },
      {
        Header: 'Duration',
        accessor: (row) => `${Math.floor((new Date(row.endTime) - new Date(row.startTime)) / 3600000)} hr ${Math.floor(((new Date(row.endTime) - new Date(row.startTime)) % 3600000) / 60000)} min`,
        Filter: DefaultColumnFilter,
        width: '90px',
      },
      { Header: 'Location', accessor: 'venue', Filter: DefaultColumnFilter, width: '150px' },
      { Header: 'Status',
       accessor: (row) => getTimelineStatus(new Date(row.startTime), new Date(row.endTime)),
       Filter: DefaultColumnFilter, width: '70px' }
    ],
    []
  );

  return isLoading ? <LoadingPage /> : (
    <Container  className='workshop_page'>
      <Typography variant="h6"  className='workshop_title_page' sx={{ marginTop: '1rem', marginBottom: '1rem' }}>
        Workshops
      </Typography>
      <WorkshopTable data={allWorkshops} columns={columns}  forwardUrl={'/view-workshop'}/>
    </Container>
  );
}
