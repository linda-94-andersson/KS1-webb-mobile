import React, { useState } from "react";
import DateRangePicker from "@wojtekmaj/react-daterange-picker/dist/entry.nostyle";
import { useUser } from "../context/UserContext";

function Calendar() {
  const [value, onChange] = useState([new Date(), new Date()]);

  const { userValue } = useUser();

  const renderDayTaks = () => {
    console.log(value, " vad är value?");
    return (
      <div>
        <h2>
          {userValue.user ? (
            userValue.user.map((u) => (
              <p key={u.id}>
                <span>{u.name}</span>
              </p>
            ))
          ) : (
            <span>No users found</span>
          )}
        </h2>
        <h3>task name</h3>
        <h4>timer</h4>
      </div>
    );
  };

  return (
    <>
      <header>
        <h1>Calendar</h1>
      </header>
      <section>
        <DateRangePicker
          onChange={onChange}
          value={value}
          disableCalendar={true}
          required={true}
          showLeadingZeros={true}
        />
        {renderDayTaks()}
      </section>
    </>
  );
}

export default Calendar;
