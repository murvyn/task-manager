"use client";
import React, { Suspense, useContext, useEffect } from "react";
import { TaskContext } from "@/contexts/taskContext";
import Loading from "../../loading";
import { isSameDate } from "@/helpers";

const TaskCard = React.lazy(() => import("@/components/TaskCard"));

const ImportantBox = () => {
  const {
    tasks,
    setAllTaskCount,
    setCompletedCount,
    setImportantCount,
    setTodayCount,
    allTaskCount,
    completedCount,
    importantCount,
    todayCount,
  } = useContext(TaskContext);
  const completedTasks = tasks?.filter((task) => task.complete === true);
  const currentDate = new Date();
  const importantTasks = tasks?.filter((task) => task.important === true);
  const DoItTodayTasks = tasks?.filter((task) => {
    return isSameDate(new Date(task.dateTime), currentDate);
  });
  useEffect(() => {
    setAllTaskCount(tasks!.length);
    setCompletedCount(completedTasks!.length);
    setTodayCount(DoItTodayTasks!.length);
    setImportantCount(importantTasks!.length);
  }, [
    allTaskCount,
    completedCount,
    importantCount,
    todayCount,
    DoItTodayTasks,
    importantTasks,
    tasks,
    completedTasks,
  ]);

  return (
    <>
      <div>
        <h2 className="card-title mb-5 w-auto flex flex-col items-start ">
          Important
          <span className=" max-sm:w-1/12 w-10 h-1 bg-primary"></span>
        </h2>
        <Suspense fallback={<Loading />}>
          <TaskCard tasks={importantTasks} />
        </Suspense>
      </div>
    </>
  );
};

export default ImportantBox;
