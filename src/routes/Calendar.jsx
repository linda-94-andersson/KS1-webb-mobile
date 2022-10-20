import React, { useState } from "react";
import DateRangePicker from "@wojtekmaj/react-daterange-picker/dist/entry.nostyle";
import { useUser } from "../context/UserContext";
import { useTask } from "../context/TaskContext";
import { useProject } from "../context/ProjectContext";

function Calendar() {
  const [value, onChange] = useState([new Date(), new Date()]);

  const { userValue } = useUser();
  const { projectValue } = useProject();
  const { taskValue } = useTask();

  const renderDayTaks = () => {
    // console.log(value, " vad är value?");

    return (
      <div>
        {taskValue.task ? (
          taskValue.task.map((t) => (
            <div key={t.id}>
              {projectValue.project
                .filter((p) => p.id === t.projectId)
                .map((i) => (
                  <div key={i.id}>
                    {userValue.user
                      .filter((u) => u.id === i.userId)
                      .map((j) => (
                        <h3 key={j.id}>{j.name}</h3>
                      ))}
                  </div>
                ))}
              <h2>{t.name}</h2>
              <h4>timer</h4>
            </div>
          ))
        ) : (
          <span>No tasks found</span>
        )}
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
