import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { getCalendarFB } from './redux/modules/calendar';
import './Main.css';
import Modal from './Modal';
import Hambuger from '@material-ui/icons/Menu';

function Main(props) {
  // Get schedule list from Redux
  const schedule_list = useSelector((state) => state.calendar.schedule);
  const dispatch = useDispatch();

  // State variables for Modal content
  const [todo_info, setTodo] = useState();
  const [time_info, setTime] = useState();
  const [day_info, setDay] = useState();
  const [date_info, setDate] = useState();
  const [id_info, setId] = useState();
  const [status, isModalOpen] = useState(false);

  // Open the Modal
  const openModal = (id) => {
    const daily_schedule = schedule_list.find((schedule) => schedule.id === id);
    const time = daily_schedule.date.split('T')[1];
    let hour = time.split(':')[0];
    const minute = time.split(':')[1];
    let day = 'AM';

    if (hour >= 12) {
      day = 'PM';
    }

    if (hour > 12) {
      hour = hour - 12;
    }

    setTodo(daily_schedule.title);
    setTime(`${hour}:${minute}`);
    setDay(day);
    setDate(daily_schedule.date.split('T')[0]);
    setId(id);
    isModalOpen(true);
  };

  // Close the Modal
  const closeModal = () => {
    isModalOpen(false);
  };

  // Load schedule data on initial render
  useEffect(() => {
    dispatch(getCalendarFB());
  }, []);

  // Generate event list for FullCalendar
  const calendar_list = schedule_list.map((r) => ({
    title: r.title,
    start: r.date,
    id: r.id,
    color: r.completed ? 'red' : 'green',
  }));

  // Generate list of completed events
  const complete_list = calendar_list.filter((r) => r.color === 'red');

  // Navbar toggle button event listener
  const toggleBtn = document.querySelector('.navbar_toggles');
  const menu = document.querySelector('.navbar_menu');

  toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('active');
  });

  return (
    <div className="headerNav">
      {/* Hamburger menu button */}
      <a href="#" className="navbar_toggles">
        <Hambuger />
      </a>

      {/* Navigation menu */}
      <div className="navbar_menu">
        {/* Add schedule button */}
        <AddBtn>
          <button
            id="addBtn"
            aria-label="add"
            variant="extended"
            onClick={() => {
              props.history.push('/upload');
            }}
          >
            Add
          </button>
        </AddBtn>
      </div>

      {/* FullCalendar component */}
      <FullCalendar
        plugins={[dayGridPlugin]}
        headerToolbar={{
          start: '',
          center: 'title',
          end: 'today prevYear,prev,next,nextYear',
        }}
        initialView="dayGridMonth"
        height="80vh"
        events={visible ? calendar_list : complete_list}
        eventClick={(info) => {
          openModal(info.event.id);
        }}
      />

      {/* Modal component */}
      <Modal id={id_info} date={date_info} day={day_info} time={time_info} todo={todo_info} status={status} close={closeModal} />
    </div>
  );
}

// Styled component definition
const AddBtn = styled.div`
  position: fixed;
  left: 30px;
  z-index: 10;

  @media (max-width: 425px) {
    top: 100px;
  }
`
const Word = styled.span`
  @media (max-width:425px){
    display: none;

  }

  @media (max-width:820px){
    display: none;

  }
export default Main;
