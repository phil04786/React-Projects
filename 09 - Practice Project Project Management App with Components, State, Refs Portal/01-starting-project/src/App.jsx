import { useState } from "react";
import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import ProjectSidebar from "./components/ProjectSidebar.jsx";
import SelectedProjects from "./components/SelectedProjects.jsx";

import { v4 as uuidv4 } from "uuid";

function App() {
  const [projectState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  function handleAddTask(text) {
    setProjectsState((prevState) => {
      // const taskId = Math.random();
      const taskId = uuidv4();
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId,
      };
      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks],
      };
    });
  }

  function handleDeleteTask(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id),
      };
    });
  }

  function handleSelectProject(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  }

  function handleStartAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  }

  function handleCancelAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  }

  function handleAddProject(projectData) {
    setProjectsState((prevState) => {
      // const projectId = Math.random();
      const projectId = uuidv4();
      const newProject = {
        ...projectData,
        id: projectId,
      };
      return {
        ...prevState,
        selectedProjectId: undefined, //projectId
        projects: [...prevState.projects, newProject],
      };
    });
  }

  function handleDeleteProject() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );
    if (!confirmDelete) return;
    setProjectsState((prevState) => {
      const remainingProjects = prevState.projects.filter(
        (project) => project.id !== prevState.selectedProjectId
      );
      const remainingTasks = prevState.tasks.filter(
        (task) => task.projectId !== prevState.selectedProjectId
      );

      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: remainingProjects,
        tasks: remainingTasks,
      };
    });
  }

  // console.log(projectState);

  const selectedProject = projectState.projects.find(
    (project) => project.id === projectState.selectedProjectId
  );
  /*
      Uses the actual project object.
      Uses optional chaining (?.) to safely access id in case selectedProject is undefined.
      Very readable and safe against null/undefined project.
 
  */

  const projectTasks = projectState.tasks.filter(
    (task) => task.projectId === selectedProject?.id
  );

  let content = (
    <SelectedProjects
      project={selectedProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectTasks}
      // tasks={projectState.tasks}
      // tasks={projectState.tasks.filter(
      //   (task) => task.projectId === projectState.selectedProjectId
      // )}
    />
  );

  if (projectState.selectedProjectId === null) {
    content = (
      <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
    );
  } else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar
        onStartAddProject={handleStartAddProject}
        projects={projectState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectState.selectedProjectId}
      />
      {/* <NoProjectSelected onStartAddProject={handleStartAddProject} /> */}
      {content}
    </main>
  );
}

export default App;

// selectedProjectId:-

// undefined:- is to use the store the Id of the project that was selected when we have multiple projects that can be selected,  or if we are not adding a new project and we also did not select any project.  So are neither adding a new project nor have a project selected. On adding a project set it to null.
// undefined:- Means we are doing Nothing.
//null:- if we want to add we project or now we are adding a project
//null:- means we are adding a project.
